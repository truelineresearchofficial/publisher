"""Test fixtures. Integration fixtures skip unless TEST_DATABASE_URL is set."""
from __future__ import annotations

import os

import pytest
import pytest_asyncio

TEST_DB = os.getenv("TEST_DATABASE_URL")
requires_db = pytest.mark.skipif(not TEST_DB, reason="requires TEST_DATABASE_URL")


@pytest_asyncio.fixture
async def engine():
    if not TEST_DB:
        pytest.skip("requires TEST_DATABASE_URL")
    from sqlalchemy.ext.asyncio import create_async_engine

    from app.models import Base

    eng = create_async_engine(TEST_DB)
    async with eng.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    yield eng
    await eng.dispose()


@pytest_asyncio.fixture
async def session_factory(engine):
    from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker

    return async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


@pytest_asyncio.fixture
async def client(session_factory, monkeypatch):
    from httpx import ASGITransport, AsyncClient

    import app.services.sheets as sheets
    from app.db import get_db
    from app.limiter import limiter
    from app.main import app

    # Don't touch Google; record what would be appended.
    appended: list = []
    monkeypatch.setattr(sheets, "_append_blocking", lambda row: appended.append(row))
    monkeypatch.setattr(sheets, "SessionLocal", session_factory)

    # Disable rate limiting so test volume doesn't trip it.
    limiter.enabled = False

    async def override_get_db():
        async with session_factory() as s:
            yield s

    app.dependency_overrides[get_db] = override_get_db
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as c:
        c.appended = appended  # type: ignore[attr-defined]
        yield c
    app.dependency_overrides.clear()
    limiter.enabled = True
