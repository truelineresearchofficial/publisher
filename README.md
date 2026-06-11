# Trueline Publishers — website + lead-capture backend

Marketing/journal site (Vite + React) plus a small FastAPI backend that captures
every form submission to Postgres and mirrors it to a Google Sheet (the read-only
view for the marketing/sales team). Single domain: the site at `/`, the API at `/api`.

```
trueline-publisher/
├─ frontend/            Vite + React + TS SPA (the existing site)
│  ├─ Dockerfile        multi-stage: node build -> nginx:alpine
│  ├─ nginx/default.conf  SPA fallback (no /api proxy; host nginx does that)
│  └─ src/lib/submit.ts  shared POST helper used by every form
├─ backend/            FastAPI + SQLAlchemy 2.0 (async) + Alembic
│  ├─ app/             schemas (discriminated union), crud, sheets, reconciler
│  ├─ migrations/      alembic
│  ├─ tests/           pytest (unit + integration)
│  └─ Dockerfile
├─ docker-compose.yml  frontend + api + db (Postgres)
└─ .github/workflows/ci.yml  test -> build-on-server deploy
```

## Forms captured

| form_type | where | notes |
|---|---|---|
| `contact` (`editorial`/`services`/`institution`) | `/contact` | 3-tab enquiry; editorial carries manuscript context |
| `submit` | `/submit` | full manuscript: `article_type` (enum) + required originality declaration |
| `reviewer` | `/resources` | join the reviewer/editorial pool (`experience` optional) |
| `newsletter` | `/spectrum` | email |

All go to one Postgres table (`submissions`, typed columns + jsonb payload) and to
the Google Sheet tabs `Contact` / `Submit` / `Reviewer` / `Newsletter`.

## Local development

```bash
# backend
cd backend
python -m venv .venv && . .venv/bin/activate    # on exFAT use a venv off the SSD
pip install -e ".[dev]"
ruff check . && pytest -q                         # integration tests need TEST_DATABASE_URL

# frontend
cd ../frontend
npm ci
npm run typecheck && npm run test
npm run dev                                        # http://localhost:5176
```

Full stack via Docker (needs `backend/.env` + `backend/secrets/google_sa.json`):

```bash
cp backend/.env.example backend/.env               # fill in values, chmod 600
docker compose up -d --build
curl -s localhost:8101/api/health                  # {"status":"ok"}
```

## Deploy (contabo-damu)

CI = GitHub Actions, **test → build on server**. On push to `main`: lint +
typecheck + tests, then a deploy job SSHes to the box and, **after backing up the
DB and code**, runs `git pull && docker compose build && alembic upgrade head && up -d`.
See `DEPLOY.md` for first-time server setup. No container registry.

- Live at `https://truelinepublishers.yazhl.dpdns.org`
- Ports (loopback): api `8101`, frontend `8111`, postgres `5446`
- Per-deploy backups: `/var/backups/trueline-publisher/` (last 10)

## Required GitHub secrets

`DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY` (+ optional `DEPLOY_SSH_PORT`).
The GitHub **PAT** is server-side only (git credential store) for `git pull`.

Origin: `git@github.com:truelineresearchofficial/publisher.git` (SSH for local
push; the server pulls the same repo over HTTPS with the PAT). See `DEPLOY.md`.
