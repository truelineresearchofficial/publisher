"""Background reconciler: re-drives any submission left unsynced to Sheets.

This is the durability guarantee. `FOR UPDATE SKIP LOCKED` keeps the
append-on-insert background task and the reconciler from racing the same row.
"""
from __future__ import annotations

import asyncio

import structlog
from sqlalchemy import select

from app.config import settings
from app.db import SessionLocal
from app.models import Submission
from app.services.sheets import _try_append

log = structlog.get_logger()

BATCH = 50


async def reconcile_once() -> int:
    if not settings.sheets_sync_enabled:
        return 0
    async with SessionLocal() as db:
        rows = (
            await db.execute(
                select(Submission)
                .where(
                    Submission.synced.is_(False),
                    Submission.sync_attempts < settings.sync_max_attempts,
                )
                .order_by(Submission.created_at)
                .limit(BATCH)
                .with_for_update(skip_locked=True)
            )
        ).scalars().all()

        synced = 0
        for row in rows:
            if await _try_append(row):
                synced += 1
        await db.commit()
        return synced


async def reconciler_loop(stop: asyncio.Event) -> None:
    log.info("reconciler_started", interval=settings.reconciler_interval_seconds)
    while not stop.is_set():
        try:
            n = await reconcile_once()
            if n:
                log.info("reconciled", count=n)
        except Exception as e:  # noqa: BLE001 — never let the loop die
            log.warning("reconcile_failed", error=str(e))
        try:
            await asyncio.wait_for(stop.wait(), timeout=settings.reconciler_interval_seconds)
        except TimeoutError:
            pass
    log.info("reconciler_stopped")
