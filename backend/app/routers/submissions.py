"""POST /api/v1/submissions — the single ingest endpoint for every form.

The body is the discriminated union itself via `Body(...)`, so `payload` is
already the concrete form model. (Avoid `from __future__ import annotations`
here and avoid a RootModel wrapper — both confuse FastAPI's body/param and
OpenAPI handling for nested discriminated unions.)
"""
from uuid import uuid4

import structlog
from fastapi import APIRouter, BackgroundTasks, Body, Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud
from app.config import settings
from app.db import get_db
from app.limiter import limiter
from app.logging import hash_email
from app.schemas import SubmissionAck, SubmissionUnion
from app.services.sheets import sync_submission

router = APIRouter()
log = structlog.get_logger()


@router.post("/submissions", status_code=201, response_model=SubmissionAck)
@limiter.limit(settings.rate_limit_submit)
async def create_submission(
    request: Request,
    background: BackgroundTasks,
    payload: SubmissionUnion = Body(...),
    db: AsyncSession = Depends(get_db),
) -> SubmissionAck:
    form = payload  # already the concrete, validated form model

    # Honeypot: indistinguishable success, no persistence.
    if form.is_bot:
        log.info("honeypot_drop", form_type=form.form_type)
        return SubmissionAck(id=str(uuid4()))

    source_ip = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")

    row, created = await crud.insert_submission(db, form, source_ip, user_agent)
    if created:
        background.add_task(sync_submission, row.id)

    log.info(
        "submission",
        form_type=form.form_type,
        variant=form.variant,
        email=hash_email(form.email),
        created=created,
    )
    return SubmissionAck(id=str(row.id))
