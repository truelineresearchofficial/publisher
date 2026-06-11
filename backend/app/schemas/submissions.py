"""Request schemas for POST /api/v1/submissions (Trueline Publishers).

Nested Pydantic v2 discriminated union:
  outer discriminator  = form_type  (contact | submit | reviewer | newsletter)
  inner (contact) disc = variant    (editorial | services | institution)

`submit` is the full manuscript intake (with the originality declaration and a
constrained article-type); the Contact tab's editorial enquiry is form_type=contact.
"""
from __future__ import annotations

import hashlib
import json
from typing import Annotated, ClassVar, Literal

from pydantic import BaseModel, ConfigDict, EmailStr, Field, RootModel, field_validator

Str120 = Annotated[str, Field(min_length=1, max_length=120)]
Str200 = Annotated[str, Field(min_length=1, max_length=200)]
Str320 = Annotated[str, Field(min_length=1, max_length=320)]
Text5k = Annotated[str, Field(min_length=1, max_length=5000)]

ArticleType = Literal[
    "Original research",
    "Systematic review",
    "Methods",
    "Short communication",
    "Case report",
]

_CONTROL = {"website", "form_type", "variant"}


class FormBase(BaseModel):
    model_config = ConfigDict(extra="ignore", str_strip_whitespace=True)

    website: str = Field("", max_length=200)  # honeypot; checked in the handler

    NAME_FIELD: ClassVar[str | None] = None
    ORG_FIELD: ClassVar[str | None] = None

    @property
    def is_bot(self) -> bool:
        return bool(self.website.strip())

    def normalized(self) -> dict:
        return self.model_dump(exclude=_CONTROL)

    def common(self) -> dict:
        name = getattr(self, self.NAME_FIELD) if self.NAME_FIELD else None
        org = getattr(self, self.ORG_FIELD) if self.ORG_FIELD else None
        return {
            "form_type": self.form_type,
            "variant": self.variant,
            "email": self.email,
            "name": name,
            "organisation": org,
            "payload": self.normalized(),
        }

    def dedupe_key(self) -> str:
        payload = dict(self.normalized())
        if "email" in payload:
            payload["email"] = str(payload["email"]).lower()
        basis = json.dumps(
            {"f": self.form_type, "v": self.variant, "p": payload},
            sort_keys=True,
            separators=(",", ":"),
            default=str,
        )
        return hashlib.sha256(basis.encode()).hexdigest()


# ----- contact: 3 variants -----
class ContactEditorial(FormBase):
    form_type: Literal["contact"] = "contact"
    variant: Literal["editorial"] = "editorial"
    corresponding_author: Str200
    email: EmailStr
    affiliation_orcid: Str200
    manuscript_title: Str320
    article_type: Str120
    abstract: Text5k
    NAME_FIELD = "corresponding_author"


class ContactServices(FormBase):
    form_type: Literal["contact"] = "contact"
    variant: Literal["services"] = "services"
    full_name: Str200
    email: EmailStr
    service_needed: Str200
    manuscript_length: Str120
    target_journal: Str200
    NAME_FIELD = "full_name"


class ContactInstitution(FormBase):
    form_type: Literal["contact"] = "contact"
    variant: Literal["institution"] = "institution"
    name_role: Str200
    institution: Str200
    country: Str120
    email: EmailStr
    message: Text5k
    NAME_FIELD = "name_role"
    ORG_FIELD = "institution"


# ----- submit: full manuscript intake -----
class Submit(FormBase):
    form_type: Literal["submit"] = "submit"
    variant: Literal["default"] = "default"
    corresponding_author: Str200
    email: EmailStr
    affiliation_orcid: Str200
    manuscript_title: Str320
    article_type: ArticleType
    abstract: Text5k
    originality_confirmed: bool
    NAME_FIELD = "corresponding_author"

    @field_validator("originality_confirmed")
    @classmethod
    def _must_confirm(cls, v: bool) -> bool:
        if v is not True:
            raise ValueError("You must confirm the originality declaration to submit.")
        return v


# ----- reviewer pool -----
class Reviewer(FormBase):
    form_type: Literal["reviewer"] = "reviewer"
    variant: Literal["default"] = "default"
    full_name: Str200
    email: EmailStr
    affiliation_orcid: Str200
    area_of_expertise: Str200
    experience: Annotated[str, Field(max_length=5000)] = ""
    NAME_FIELD = "full_name"


# ----- newsletter -----
class Newsletter(FormBase):
    form_type: Literal["newsletter"] = "newsletter"
    variant: Literal["default"] = "default"
    email: EmailStr


ContactUnion = Annotated[
    ContactEditorial | ContactServices | ContactInstitution,
    Field(discriminator="variant"),
]

SubmissionUnion = Annotated[
    ContactUnion | Submit | Reviewer | Newsletter,
    Field(discriminator="form_type"),
]


class SubmissionRequest(RootModel[SubmissionUnion]):
    """Validated request body; `.root` is the concrete form model."""


class SubmissionAck(BaseModel):
    id: str
    status: Literal["received"] = "received"
