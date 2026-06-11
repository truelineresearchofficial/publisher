"""Integration tests for POST /api/v1/submissions (requires Postgres)."""
from __future__ import annotations

from sqlalchemy import func, select

from app.models import Submission
from tests.conftest import requires_db

pytestmark = requires_db

SUBMIT = {
    "form_type": "submit",
    "corresponding_author": "Asha Rao",
    "email": "asha@example.edu",
    "affiliation_orcid": "PSG / 0000-0001",
    "manuscript_title": "On methods",
    "article_type": "Original research",
    "abstract": "Short abstract.",
    "originality_confirmed": True,
}

EDITORIAL = {
    "form_type": "contact",
    "variant": "editorial",
    "corresponding_author": "Asha Rao",
    "email": "asha@example.edu",
    "affiliation_orcid": "PSG / 0000-0001",
    "manuscript_title": "On methods",
    "article_type": "Original research",
    "abstract": "Short abstract.",
}


async def _count(session_factory) -> int:
    async with session_factory() as s:
        return (await s.execute(select(func.count()).select_from(Submission))).scalar_one()


async def test_submit_happy_path_persists_and_syncs(client, session_factory):
    r = await client.post("/api/v1/submissions", json=SUBMIT)
    assert r.status_code == 201
    async with session_factory() as s:
        row = (await s.execute(select(Submission))).scalar_one()
    assert row.form_type == "submit"
    assert row.payload["article_type"] == "Original research"
    assert row.payload["originality_confirmed"] is True
    assert row.synced is True
    assert len(client.appended) == 1  # type: ignore[attr-defined]


async def test_contact_editorial_happy_path(client, session_factory):
    r = await client.post("/api/v1/submissions", json=EDITORIAL)
    assert r.status_code == 201
    assert await _count(session_factory) == 1


async def test_submit_without_originality_is_422(client):
    r = await client.post("/api/v1/submissions", json={**SUBMIT, "originality_confirmed": False})
    assert r.status_code == 422
    assert r.json()["error"]["code"] == "validation_error"


async def test_validation_error_uses_envelope(client):
    r = await client.post("/api/v1/submissions", json={**SUBMIT, "email": "nope"})
    assert r.status_code == 422
    err = r.json()["error"]
    assert err["code"] == "validation_error"
    assert any("email" in f["loc"] for f in err["fields"])


async def test_honeypot_silent_drop(client, session_factory):
    r = await client.post("/api/v1/submissions", json={**SUBMIT, "website": "bot"})
    assert r.status_code == 201
    assert await _count(session_factory) == 0


async def test_duplicate_is_idempotent(client, session_factory):
    r1 = await client.post("/api/v1/submissions", json=SUBMIT)
    r2 = await client.post("/api/v1/submissions", json=SUBMIT)
    assert r1.json()["id"] == r2.json()["id"]
    assert await _count(session_factory) == 1
    assert len(client.appended) == 1  # type: ignore[attr-defined]
