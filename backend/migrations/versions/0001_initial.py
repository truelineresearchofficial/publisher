"""initial submissions table

Revision ID: 0001_initial
Revises:
Create Date: 2026-06-11
"""
from __future__ import annotations

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "submissions",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            server_default=sa.text("gen_random_uuid()"),
            primary_key=True,
        ),
        sa.Column("form_type", sa.String(32), nullable=False),
        sa.Column("variant", sa.String(32), server_default="default", nullable=False),
        sa.Column("name", sa.String(255)),
        sa.Column("email", sa.String(320), nullable=False),
        sa.Column("organisation", sa.String(255)),
        sa.Column("payload", postgresql.JSONB(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column("source_ip", postgresql.INET()),
        sa.Column("user_agent", sa.Text()),
        sa.Column("dedupe_key", sa.String(64)),
        sa.Column("synced", sa.Boolean(), server_default=sa.text("false"), nullable=False),
        sa.Column("synced_at", sa.DateTime(timezone=True)),
        sa.Column("sync_attempts", sa.Integer(), server_default=sa.text("0"), nullable=False),
        sa.Column("sync_error", sa.Text()),
    )
    op.create_index(
        "ix_submissions_unsynced",
        "submissions",
        ["created_at"],
        postgresql_where=sa.text("synced = false"),
    )
    op.create_index(
        "ix_submissions_form_type",
        "submissions",
        ["form_type", sa.text("created_at DESC")],
    )
    op.create_index("ux_submissions_dedupe", "submissions", ["dedupe_key"], unique=True)


def downgrade() -> None:
    op.drop_index("ux_submissions_dedupe", table_name="submissions")
    op.drop_index("ix_submissions_form_type", table_name="submissions")
    op.drop_index("ix_submissions_unsynced", table_name="submissions")
    op.drop_table("submissions")
