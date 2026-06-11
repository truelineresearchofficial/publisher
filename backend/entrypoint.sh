#!/bin/sh
# Migrate, then serve. Single worker: in-memory rate limiting stays consistent.
set -e
alembic upgrade head
exec uvicorn app.main:app \
  --host 0.0.0.0 --port 8000 \
  --workers 1 \
  --proxy-headers --forwarded-allow-ips="*"
