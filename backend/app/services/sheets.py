"""Google Sheets mirror — the read-only view for the marketing/sales team.

DB is the source of truth. Each submission is appended to its form-type tab
(Contact / Submit / Reviewer / Newsletter). Append-on-insert (BackgroundTask)
gives speed; the reconciler re-drives anything left `synced=false`.
"""
from __future__ import annotations

import asyncio
import random
import time
from datetime import UTC, datetime

import structlog

from app.config import settings
from app.db import SessionLocal
from app.models import Submission

log = structlog.get_logger()

# ---- formula-injection guard ---------------------------------------------
_DANGEROUS_PREFIX = ("=", "+", "-", "@", "\t", "\r", "\n")


def sanitize_cell(value: object) -> str:
    """Neutralise spreadsheet formula injection: prefix risky leading chars with '."""
    if value is None:
        return ""
    s = str(value)
    if s and s[0] in _DANGEROUS_PREFIX:
        return "'" + s
    return s


# ---- per-form-type column manifest ---------------------------------------
def _ts(row: Submission) -> str:
    return row.created_at.astimezone(UTC).isoformat() if row.created_at else ""


def _contact_row(row: Submission) -> list[str]:
    p = row.payload or {}
    name = (
        p.get("corresponding_author")
        or p.get("full_name")
        or p.get("name_role")
        or row.name
        or ""
    )
    return [
        _ts(row),
        row.variant,
        name,
        row.email,
        p.get("affiliation_orcid", ""),
        p.get("institution", ""),
        p.get("country", ""),
        p.get("manuscript_title", ""),
        p.get("article_type", ""),
        p.get("service_needed", ""),
        p.get("manuscript_length", ""),
        p.get("target_journal", ""),
        p.get("abstract") or p.get("message", ""),
        str(row.id),
    ]


def _submit_row(row: Submission) -> list[str]:
    p = row.payload or {}
    return [
        _ts(row),
        p.get("corresponding_author", ""),
        row.email,
        p.get("affiliation_orcid", ""),
        p.get("manuscript_title", ""),
        p.get("article_type", ""),
        p.get("abstract", ""),
        "yes" if p.get("originality_confirmed") else "no",
        str(row.id),
    ]


def _reviewer_row(row: Submission) -> list[str]:
    p = row.payload or {}
    return [
        _ts(row),
        p.get("full_name", ""),
        row.email,
        p.get("affiliation_orcid", ""),
        p.get("area_of_expertise", ""),
        p.get("experience", ""),
        str(row.id),
    ]


def _newsletter_row(row: Submission) -> list[str]:
    return [_ts(row), row.email, str(row.id)]


# tab name, header row, row-builder
MANIFEST: dict[str, tuple[str, list[str], callable]] = {
    "contact": (
        "Contact",
        [
            "Timestamp",
            "Variant",
            "Name",
            "Email",
            "Affiliation / ORCID",
            "Institution",
            "Country",
            "Manuscript title",
            "Article type",
            "Service needed",
            "Manuscript length",
            "Target journal",
            "Abstract / message",
            "ID",
        ],
        _contact_row,
    ),
    "submit": (
        "Submit",
        [
            "Timestamp",
            "Corresponding author",
            "Email",
            "Affiliation & ORCID",
            "Manuscript title",
            "Article type",
            "Abstract",
            "Originality confirmed",
            "ID",
        ],
        _submit_row,
    ),
    "reviewer": (
        "Reviewer",
        [
            "Timestamp",
            "Full name",
            "Email",
            "Affiliation & ORCID",
            "Area of expertise",
            "Experience",
            "ID",
        ],
        _reviewer_row,
    ),
    "newsletter": ("Newsletter", ["Timestamp", "Email", "ID"], _newsletter_row),
}

# ---- gspread plumbing (lazy; blocking — always called via to_thread) ------
_spreadsheet = None


_SCOPES = ["https://www.googleapis.com/auth/spreadsheets"]


def _get_spreadsheet():
    global _spreadsheet
    if _spreadsheet is None:
        import json

        import gspread  # imported lazily so unit tests need no creds

        with open(settings.google_sa_json_path) as f:
            info = json.load(f)

        if info.get("type") == "service_account":
            client = gspread.service_account(filename=settings.google_sa_json_path)
        else:
            # OAuth authorized-user token (client_id + client_secret + refresh_token);
            # google-auth refreshes the access token automatically.
            from google.oauth2.credentials import Credentials

            creds = Credentials.from_authorized_user_info(info, scopes=_SCOPES)
            client = gspread.authorize(creds)

        _spreadsheet = client.open_by_key(settings.sheets_doc_id)
    return _spreadsheet


def _get_or_create_ws(sh, title: str, header: list[str]):
    from gspread.exceptions import WorksheetNotFound

    try:
        return sh.worksheet(title)
    except WorksheetNotFound:
        ws = sh.add_worksheet(title=title, rows=1000, cols=max(len(header), 14))
        ws.append_row(header, value_input_option="RAW")
        return ws


def _append_blocking(row: Submission) -> None:
    """Synchronous append with 429/5xx exponential backoff. Runs in a worker thread."""
    from gspread.exceptions import APIError

    tab, header, row_fn = MANIFEST[row.form_type]
    cells = [sanitize_cell(c) for c in row_fn(row)]
    attempts = 5
    for i in range(attempts):
        try:
            sh = _get_spreadsheet()
            ws = _get_or_create_ws(sh, tab, header)
            ws.append_row(cells, value_input_option="RAW")
            return
        except APIError as e:
            status = getattr(getattr(e, "response", None), "status_code", None)
            if status in (429, 500, 502, 503) and i < attempts - 1:
                time.sleep(min(2**i, 30) + random.random())
                continue
            raise


# ---- async entrypoints ----------------------------------------------------
async def _try_append(row: Submission) -> bool:
    """Append one row + update its sync bookkeeping in place (no commit)."""
    ok = False
    try:
        await asyncio.to_thread(_append_blocking, row)
        row.synced = True
        row.synced_at = datetime.now(UTC)
        row.sync_error = None
        ok = True
    except Exception as e:  # noqa: BLE001 — record + let the reconciler retry
        row.sync_error = f"{type(e).__name__}: {e}"[:500]
        log.warning("sheet_append_failed", submission_id=str(row.id), error=row.sync_error)
    row.sync_attempts += 1
    return ok


async def sync_submission(submission_id) -> None:
    """BackgroundTask: append a single new submission and mark it synced."""
    if not settings.sheets_sync_enabled:
        return
    async with SessionLocal() as db:
        row = await db.get(Submission, submission_id)
        if row is None or row.synced:
            return
        await _try_append(row)
        await db.commit()
