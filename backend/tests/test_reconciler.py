"""Integration test for the Sheets reconciler (requires Postgres)."""
from __future__ import annotations

from sqlalchemy import select

import app.services.sheets as sheets
from app.models import Submission
from app.services import reconciler
from tests.conftest import requires_db

pytestmark = requires_db


async def test_reconcile_drains_unsynced_rows(session_factory, monkeypatch):
    monkeypatch.setattr(sheets, "_append_blocking", lambda row: None)
    monkeypatch.setattr(sheets, "SessionLocal", session_factory)
    monkeypatch.setattr(reconciler, "SessionLocal", session_factory)

    async with session_factory() as s:
        s.add(
            Submission(
                form_type="newsletter",
                variant="default",
                email="x@y.com",
                payload={},
                dedupe_key="k1",
            )
        )
        await s.commit()

    n = await reconciler.reconcile_once()
    assert n == 1

    async with session_factory() as s:
        row = (await s.execute(select(Submission))).scalar_one()
    assert row.synced is True
    assert row.synced_at is not None


async def test_reconcile_retries_then_succeeds(session_factory, monkeypatch):
    calls = {"n": 0}

    def flaky(row):
        calls["n"] += 1
        if calls["n"] == 1:
            raise RuntimeError("429")

    monkeypatch.setattr(sheets, "_append_blocking", flaky)
    monkeypatch.setattr(sheets, "SessionLocal", session_factory)
    monkeypatch.setattr(reconciler, "SessionLocal", session_factory)

    async with session_factory() as s:
        s.add(
            Submission(
                form_type="newsletter",
                variant="default",
                email="z@y.com",
                payload={},
                dedupe_key="k2",
            )
        )
        await s.commit()

    assert await reconciler.reconcile_once() == 0  # first attempt fails
    assert await reconciler.reconcile_once() == 1  # retry succeeds

    async with session_factory() as s:
        row = (await s.execute(select(Submission))).scalar_one()
    assert row.synced is True
    assert row.sync_attempts == 2
