"""Regression guard (no DB): the submissions endpoint must take a JSON *body*.

`from __future__ import annotations` in the router once made FastAPI mis-classify
the body model and BackgroundTasks as query params -> every valid POST 422'd.
This test fails fast if that regresses, without needing Postgres.
"""
from app.main import app


def _post_op():
    return app.openapi()["paths"]["/api/v1/submissions"]["post"]


def test_submission_takes_a_request_body():
    op = _post_op()
    assert "requestBody" in op, "submissions POST lost its request body"


def test_payload_and_background_are_not_query_params():
    op = _post_op()
    names = {p["name"] for p in op.get("parameters", [])}
    assert "payload" not in names
    assert "background" not in names
