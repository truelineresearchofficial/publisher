"""ORM models. Single `submissions` table: typed common columns + jsonb payload."""
from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Index, Integer, String, Text, func, text
from sqlalchemy.dialects.postgresql import INET, JSONB, UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Submission(Base):
    __tablename__ = "submissions"
    # Declared on the model so create_all (tests) matches the Alembic migration
    # (prod). The unique dedupe_key index is required by crud's ON CONFLICT.
    __table_args__ = (
        Index("ix_submissions_unsynced", "created_at", postgresql_where=text("synced = false")),
        Index("ix_submissions_form_type", "form_type", text("created_at DESC")),
        Index("ux_submissions_dedupe", "dedupe_key", unique=True),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, server_default=func.gen_random_uuid()
    )
    form_type: Mapped[str] = mapped_column(String(32))
    variant: Mapped[str] = mapped_column(String(32), server_default="default")
    name: Mapped[str | None] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(320))
    organisation: Mapped[str | None] = mapped_column(String(255))
    payload: Mapped[dict] = mapped_column(JSONB)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    source_ip: Mapped[str | None] = mapped_column(INET)
    user_agent: Mapped[str | None] = mapped_column(Text)
    dedupe_key: Mapped[str | None] = mapped_column(String(64))

    # sheets sync bookkeeping
    synced: Mapped[bool] = mapped_column(Boolean, server_default=text("false"))
    synced_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    sync_attempts: Mapped[int] = mapped_column(Integer, server_default=text("0"))
    sync_error: Mapped[str | None] = mapped_column(Text)
