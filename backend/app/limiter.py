"""Shared slowapi limiter (in-memory; correct only with a single worker)."""
from __future__ import annotations

from slowapi import Limiter
from slowapi.util import get_remote_address

# In-memory storage is consistent because the API runs `uvicorn --workers 1`
# (see entrypoint.sh). Scaling workers later REQUIRES moving this to Redis.
limiter = Limiter(key_func=get_remote_address)
