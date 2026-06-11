"""Unit tests for the discriminated-union request schemas (no DB)."""
from __future__ import annotations

import pytest
from pydantic import ValidationError

from app.schemas import SubmissionRequest

EDITORIAL = {
    "form_type": "contact",
    "variant": "editorial",
    "corresponding_author": "Asha Rao",
    "email": "asha@example.edu",
    "affiliation_orcid": "PSG / 0000-0001",
    "manuscript_title": "On methods",
    "article_type": "Original research",
    "abstract": "Short abstract.",
}

SUBMIT = {
    "form_type": "submit",
    "corresponding_author": "Asha Rao",
    "email": "asha@example.edu",
    "affiliation_orcid": "PSG / 0000-0001",
    "manuscript_title": "On methods",
    "article_type": "Systematic review",
    "abstract": "Short abstract.",
    "originality_confirmed": True,
}


def parse(data: dict):
    return SubmissionRequest.model_validate(data).root


def test_contact_editorial_valid():
    form = parse(EDITORIAL)
    c = form.common()
    assert c["form_type"] == "contact"
    assert c["variant"] == "editorial"
    assert c["name"] == "Asha Rao"
    assert c["payload"]["manuscript_title"] == "On methods"


def test_contact_services_and_institution():
    services = parse(
        {
            "form_type": "contact",
            "variant": "services",
            "full_name": "B",
            "email": "b@x.com",
            "service_needed": "Editing",
            "manuscript_length": "6000 words",
            "target_journal": "TJ",
        }
    )
    assert services.common()["name"] == "B"

    inst = parse(
        {
            "form_type": "contact",
            "variant": "institution",
            "name_role": "VP",
            "institution": "Gulf U",
            "country": "UAE",
            "email": "vp@gulf.ae",
            "message": "Partnership.",
        }
    )
    assert inst.common()["organisation"] == "Gulf U"


def test_submit_valid():
    form = parse(SUBMIT)
    assert form.common()["form_type"] == "submit"
    assert form.common()["payload"]["originality_confirmed"] is True


def test_submit_requires_originality_confirmation():
    with pytest.raises(ValidationError):
        parse({**SUBMIT, "originality_confirmed": False})


def test_submit_rejects_unknown_article_type():
    with pytest.raises(ValidationError):
        parse({**SUBMIT, "article_type": "Op-ed"})


def test_reviewer_experience_optional():
    form = parse(
        {
            "form_type": "reviewer",
            "full_name": "Rev",
            "email": "rev@x.com",
            "affiliation_orcid": "U / 0000",
            "area_of_expertise": "Genomics",
        }
    )
    assert form.common()["payload"]["experience"] == ""


def test_newsletter_minimal():
    form = parse({"form_type": "newsletter", "email": "x@y.com"})
    assert form.common()["form_type"] == "newsletter"


def test_missing_required_field_raises():
    bad = {**EDITORIAL}
    del bad["email"]
    with pytest.raises(ValidationError):
        parse(bad)


def test_invalid_email_raises():
    with pytest.raises(ValidationError):
        parse({"form_type": "newsletter", "email": "nope"})


def test_unknown_variant_raises():
    with pytest.raises(ValidationError):
        parse({**EDITORIAL, "variant": "ghost"})


def test_honeypot_flag():
    assert parse({**EDITORIAL, "website": "spam"}).is_bot is True
    assert parse(EDITORIAL).is_bot is False


def test_dedupe_key_case_insensitive():
    a = parse({"form_type": "newsletter", "email": "Dup@Y.com"})
    b = parse({"form_type": "newsletter", "email": "dup@y.com"})
    c = parse({"form_type": "newsletter", "email": "other@y.com"})
    assert a.dedupe_key() == b.dedupe_key()
    assert a.dedupe_key() != c.dedupe_key()
