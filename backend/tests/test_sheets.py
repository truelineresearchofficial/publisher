"""Unit tests for the Sheets layer: sanitizer, row manifest, sync bookkeeping (no DB)."""
from __future__ import annotations

from datetime import UTC, datetime
from uuid import uuid4

import pytest

from app.models import Submission
from app.services import sheets


def test_sanitize_cell_blocks_formula_injection():
    assert sheets.sanitize_cell("=SUM(A1:A9)") == "'=SUM(A1:A9)"
    assert sheets.sanitize_cell("+1") == "'+1"
    assert sheets.sanitize_cell("-1") == "'-1"
    assert sheets.sanitize_cell("@here") == "'@here"
    assert sheets.sanitize_cell("normal text") == "normal text"
    assert sheets.sanitize_cell(None) == ""


def _row(form_type, variant="default", name="X", **payload):
    return Submission(
        id=uuid4(),
        form_type=form_type,
        variant=variant,
        email="a@b.com",
        name=name,
        payload=payload,
        created_at=datetime(2026, 6, 11, tzinfo=UTC),
        synced=False,
        sync_attempts=0,
    )


def test_contact_row_aligns_to_header():
    _, header, row_fn = sheets.MANIFEST["contact"]
    row = row_fn(
        _row(
            "contact",
            "editorial",
            manuscript_title="On methods",
            article_type="Original research",
            abstract="A",
        )
    )
    assert len(row) == len(header)
    assert row[header.index("Manuscript title")] == "On methods"
    assert row[header.index("Abstract / message")] == "A"


def test_submit_row_marks_originality():
    _, header, row_fn = sheets.MANIFEST["submit"]
    row = row_fn(
        _row(
            "submit",
            originality_confirmed=True,
            manuscript_title="T",
            article_type="Methods",
            abstract="A",
        )
    )
    assert len(row) == len(header)
    assert row[header.index("Originality confirmed")] == "yes"


def test_reviewer_and_newsletter_rows():
    _, rh, rfn = sheets.MANIFEST["reviewer"]
    assert len(rfn(_row("reviewer", area_of_expertise="Genomics"))) == len(rh)
    _, nh, nfn = sheets.MANIFEST["newsletter"]
    assert len(nfn(_row("newsletter"))) == len(nh) == 3


@pytest.mark.asyncio
async def test_try_append_marks_synced_on_success(monkeypatch):
    monkeypatch.setattr(sheets, "_append_blocking", lambda row: None)
    row = _row("newsletter")
    assert await sheets._try_append(row) is True
    assert row.synced is True
    assert row.sync_attempts == 1


@pytest.mark.asyncio
async def test_try_append_records_error_on_failure(monkeypatch):
    def boom(row):
        raise RuntimeError("quota")

    monkeypatch.setattr(sheets, "_append_blocking", boom)
    row = _row("newsletter")
    assert await sheets._try_append(row) is False
    assert row.synced is False
    assert "quota" in row.sync_error
    assert row.sync_attempts == 1
