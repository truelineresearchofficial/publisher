"""Structured JSON logging via structlog."""
from __future__ import annotations

import hashlib
import logging

import structlog


def configure_logging(level: str = "INFO") -> None:
    lvl = getattr(logging, level.upper(), logging.INFO)
    logging.basicConfig(format="%(message)s", level=lvl)
    structlog.configure(
        processors=[
            structlog.contextvars.merge_contextvars,
            structlog.processors.add_log_level,
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.JSONRenderer(),
        ],
        wrapper_class=structlog.make_filtering_bound_logger(lvl),
        cache_logger_on_first_use=True,
    )


def hash_email(email: str) -> str:
    """Stable, non-reversible tag for correlating without logging PII."""
    return hashlib.sha256(email.lower().encode()).hexdigest()[:12]
