"""FastAPI app: ingest endpoint, consistent error envelope, Sheets reconciler."""
from __future__ import annotations

import asyncio
from contextlib import asynccontextmanager
from uuid import uuid4

import structlog
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from slowapi.errors import RateLimitExceeded
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.config import settings
from app.limiter import limiter
from app.logging import configure_logging
from app.routers import health, submissions
from app.services.reconciler import reconciler_loop

configure_logging(settings.log_level)
log = structlog.get_logger()


def _envelope(
    request: Request, status: int, code: str, message: str, fields: list | None = None
) -> JSONResponse:
    body = {
        "error": {
            "code": code,
            "message": message,
            "fields": fields or [],
            "request_id": getattr(request.state, "request_id", None),
        }
    }
    return JSONResponse(status_code=status, content=body)


@asynccontextmanager
async def lifespan(app: FastAPI):
    stop = asyncio.Event()
    task = asyncio.create_task(reconciler_loop(stop))
    log.info("startup", site=settings.site_name, env=settings.app_env)
    try:
        yield
    finally:
        stop.set()
        await task


app = FastAPI(title="Trueline Publishers — forms API", lifespan=lifespan)
app.state.limiter = limiter


# ---- middleware ----------------------------------------------------------
@app.middleware("http")
async def request_context(request: Request, call_next):
    request_id = request.headers.get("x-request-id") or f"req_{uuid4().hex[:16]}"
    request.state.request_id = request_id
    structlog.contextvars.bind_contextvars(request_id=request_id)

    # Hard body-size guard (defence in depth; nginx also caps).
    cl = request.headers.get("content-length")
    if cl and cl.isdigit() and int(cl) > settings.max_body_bytes:
        return _envelope(request, 413, "payload_too_large", "Request body is too large.")

    try:
        response = await call_next(request)
    finally:
        structlog.contextvars.clear_contextvars()
    response.headers["X-Request-ID"] = request_id
    return response


# ---- error envelope handlers --------------------------------------------
@app.exception_handler(RequestValidationError)
async def on_validation_error(request: Request, exc: RequestValidationError):
    fields = []
    for e in exc.errors():
        loc = [str(p) for p in e["loc"] if p != "body"]
        fields.append({"loc": ".".join(loc), "msg": e["msg"]})
    return _envelope(
        request, 422, "validation_error", "One or more fields are invalid.", fields
    )


@app.exception_handler(RateLimitExceeded)
async def on_rate_limited(request: Request, exc: RateLimitExceeded):
    return _envelope(
        request, 429, "rate_limited", "Too many submissions. Please try again shortly."
    )


@app.exception_handler(StarletteHTTPException)
async def on_http_error(request: Request, exc: StarletteHTTPException):
    code = {400: "bad_request", 404: "not_found", 413: "payload_too_large"}.get(
        exc.status_code, "error"
    )
    return _envelope(request, exc.status_code, code, str(exc.detail))


@app.exception_handler(Exception)
async def on_unhandled(request: Request, exc: Exception):
    log.error("unhandled_error", error=f"{type(exc).__name__}: {exc}")
    return _envelope(request, 500, "internal", "Something went wrong. Please try again.")


# ---- routes --------------------------------------------------------------
app.include_router(health.router, prefix="/api")
app.include_router(submissions.router, prefix="/api/v1")


@app.get("/", include_in_schema=False)
async def root() -> dict:
    """Small landing at the site root linking to docs and health.

    Hidden from OpenAPI (`include_in_schema=False`) to keep the spec tidy.
    """
    return {
        "status": "ok",
        "links": {"docs": "/docs", "redoc": "/redoc", "health": "/api/health"},
    }
