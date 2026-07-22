# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/journal site for **Trueline Publishers** (Vite + React SPA) plus a small FastAPI
backend that captures every form submission to Postgres and mirrors it to a Google Sheet.
Single domain: site at `/`, API at `/api`. Live at `https://truelinepublishers.yazhl.dpdns.org`.

Note: `frontend/README.md` is stale — it describes the sibling *Trueline Research* site
(different pages, port 5175). The root `README.md` is the accurate one.

## Commands

```bash
# frontend (cwd: frontend/)
npm ci
npm run dev          # http://localhost:5176
npm run typecheck    # tsc -b
npm run test         # vitest run
npx vitest run src/pages/__tests__/Submit.test.tsx   # single test file
npm run build        # tsc -b && vite build -> dist/

# backend (cwd: backend/, Python 3.12)
pip install -e ".[dev]"
ruff check .
pytest -q                                   # integration tests skip without TEST_DATABASE_URL
pytest tests/test_schemas.py::test_name -q   # single test
alembic upgrade head

# full stack (repo root; needs backend/.env + backend/secrets/google_sa.json)
docker compose up -d --build
curl -s localhost:8101/api/health   # {"status":"ok"}
```

Integration tests need a live Postgres via `TEST_DATABASE_URL`; they are marked
`integration` and silently skip when it is unset. CI (`.github/workflows/ci.yml`) runs
ruff → `alembic upgrade head` → pytest for the backend, and typecheck → vitest → build
for the frontend, then deploys on push to `main` (prod) or `dev` (staging).

## Architecture

**One ingest endpoint for every form.** All four forms POST to `/api/v1/submissions`.
The request body is a nested Pydantic v2 discriminated union (`backend/app/schemas/submissions.py`):
outer discriminator `form_type` (`contact` | `submit` | `reviewer` | `newsletter`), and for
`contact` an inner discriminator `variant` (`editorial` | `services` | `institution`).

**Adding or changing a form field touches three places that must stay in sync:**
1. `frontend/src/lib/content.ts` — `CONTACT_FORMS` has parallel `fields[]` (labels) and
   `keys[]` (wire names) arrays; the page renders by zipping them by index.
2. The page component that builds the payload (e.g. `frontend/src/pages/Submit.tsx`).
3. The matching Pydantic model, plus the column manifest in `backend/app/services/sheets.py`
   (tab name + header row + row builder per form type). A field added to the schema but not
   the manifest silently never reaches the Sheet.

**Persistence + delivery.** One `submissions` table: typed common columns
(`form_type`, `variant`, `name`, `email`, `organisation`) plus a `jsonb` payload
(`backend/app/models.py`). Idempotency is content-based: `dedupe_key` is a sha256 of the
normalized payload, inserted with `ON CONFLICT DO NOTHING` on a unique index
(`backend/app/crud.py`). The returned `created` flag gates the Sheets append so duplicates
are not re-appended.

**Sheets sync is best-effort with a durability net.** DB is the source of truth; the Sheet is
a read-only view for the marketing team. On insert a `BackgroundTask` appends the row; if that
fails, `synced` stays false and `services/reconciler.py` re-drives it on a loop using
`FOR UPDATE SKIP LOCKED` (so the background task and reconciler never race the same row),
up to `sync_max_attempts`. `sanitize_cell` prefixes `=`/`+`/`-`/`@` to block spreadsheet
formula injection — keep it on every cell.

**Anti-abuse.** Every form carries an off-screen `website` honeypot field. When filled, the
API returns an indistinguishable success with a random id and persists nothing. Rate limiting
via slowapi; a body-size guard sits in the `request_context` middleware.

**Error envelope.** All errors return `{"error": {code, message, fields[], request_id}}`
(`backend/app/main.py`). `frontend/src/lib/submit.ts` is the single POST helper for every form
and reads `body.error.message` for the user-facing string — don't fetch the API directly from
a page.

### Backend gotchas

- **Do not add `from __future__ import annotations` to `app/routers/submissions.py`**, and do
  not wrap the body in a `RootModel`. Both make FastAPI mis-classify the body model and
  `BackgroundTasks` as query params, 422-ing every valid POST. `tests/test_openapi_contract.py`
  guards this without needing Postgres.
- Model `__table_args__` (indexes, unique `dedupe_key`) are declared on the ORM model so
  `create_all` in tests matches the Alembic migration in prod. Change both together.
- `conftest.py` force-enables `sheets_sync_enabled` (CI sets it false) and monkeypatches
  `_append_blocking`, so sync assertions run without touching Google.

### Frontend conventions

- `src/lib/content.ts` is the single source of truth for all copy and data — edit copy there,
  not in page components. It opens with the integrity constraints this site must honor
  (never "guaranteed publication" / "pay to publish"; indexing shown as a labelled roadmap;
  ISSN/DOI status stated honestly as pending). Respect them in any copy you write.
- Layout primitives live in `src/lib/ui.tsx` (`Container`, `Reveal`, `SectionHead`, `Eyebrow`,
  `ArrowLink`, `Pill`). `Reveal` is the standard scroll-in wrapper and already honors
  reduced-motion.
- Tailwind uses a custom semantic palette (`ink`, `ink-soft`, `paper`, `canvas`, `line`,
  `brand-*`) and two fonts (`font-display` Fraunces, `font-sans` Inter Tight). Use those
  tokens rather than raw hex or default grays.
- Routes are declared centrally in `src/App.tsx`; the container nginx does SPA fallback so
  deep links refresh cleanly.
- `VITE_API_BASE` defaults to `/api` (same-origin; the host nginx routes `/api` to the
  backend container). The frontend container has **no** `/api` proxy.

## Deploy

GitHub Actions, test → **build on the server** (no registry). The deploy job SSHes in, backs
up the DB and code to `/var/backups/<project>/` (last 10), then
`git pull && docker compose build && alembic upgrade head && up -d`. `main` → prod
(`/var/www/publisher-prod`), `dev` → staging (`/var/www/publisher`). Loopback ports:
api `8101`, frontend `8111`, postgres `5446`. See `DEPLOY.md` for first-time server setup.
