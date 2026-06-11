"""Persistence for submissions, with content-based idempotency."""
from __future__ import annotations

from sqlalchemy import select
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Submission
from app.schemas import FormBase


async def insert_submission(
    db: AsyncSession,
    form: FormBase,
    source_ip: str | None,
    user_agent: str | None,
) -> tuple[Submission, bool]:
    """Insert a submission. On dedupe-key conflict return the existing row.

    Returns (row, created). `created` gates the Sheets append so duplicates
    are not re-appended.
    """
    values = {
        **form.common(),
        "dedupe_key": form.dedupe_key(),
        "source_ip": source_ip,
        "user_agent": user_agent,
    }
    stmt = (
        pg_insert(Submission)
        .values(**values)
        .on_conflict_do_nothing(index_elements=["dedupe_key"])
        .returning(Submission.id)
    )
    new_id = (await db.execute(stmt)).scalar_one_or_none()
    await db.commit()

    if new_id is None:  # duplicate — fetch the original
        row = (
            await db.execute(
                select(Submission).where(Submission.dedupe_key == values["dedupe_key"])
            )
        ).scalar_one()
        return row, False

    row = await db.get(Submission, new_id)
    assert row is not None
    return row, True
