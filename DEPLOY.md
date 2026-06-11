# DEPLOY — Trueline Publishers (first-time server setup)

Target: **contabo-damu** (45.136.17.109, Ubuntu 24.04, Nginx + Docker).
Domain: **truelinepublishers.yazhl.dpdns.org**. Ports (loopback): api `8101`,
frontend `8111`, postgres `5446`. Install path: `/var/www/tools/trueline-publisher`.

The flow is identical to the Research repo — only the names/ports/domain differ.

---

## 0. DNS

`truelinepublishers.yazhl.dpdns.org → 45.136.17.109`. Verify with `dig +short`.

## 1. GitHub repo (org `truelineresearchofficial`, repo `publisher`)

Local push over **SSH**; server pulls via **PAT over HTTPS** (§2).

```bash
git init
git config user.name  "Damu"
git config user.email "damu.tealorca@gmail.com"
git add -A
git commit -m "feat: forms backend + dockerised stack + CI/CD"
git branch -M main
git remote add origin git@github.com:truelineresearchofficial/publisher.git
git push -u origin main
```

## 2. Fine-grained PAT (server-side `git pull` only — NOT a CI secret)

Fine-grained token, owner **truelineresearchofficial**, repo `publisher`,
**Contents: Read-only**, 90-day expiry.

```bash
sudo install -d -o $USER -g $USER /var/www/tools
cd /var/www/tools
git config --global credential.helper store
git clone https://<PAT>@github.com/truelineresearchofficial/publisher.git trueline-publisher
chmod 600 ~/.git-credentials
```

(If both Trueline repos share the box, the global `credential.helper store` +
`~/.git-credentials` already holds both tokens.)

## 3. SSH deploy key + GitHub secrets

Reuse the same approach as Research (a separate key is fine, or reuse the deploy
key if the same deploy user serves both). Secrets on the `trueline-publisher` repo:
`DEPLOY_HOST=45.136.17.109`, `DEPLOY_USER`, `DEPLOY_SSH_KEY` (private), optional
`DEPLOY_SSH_PORT`. PAT is **not** a secret.

## 4. Secrets + env

```bash
cd /var/www/tools/trueline-publisher/backend
cp .env.example .env
#  - POSTGRES_PASSWORD = openssl rand -hex 24 (mirror it inside DATABASE_URL)
#  - SHEETS_DOC_ID = the Publisher Google Sheet id
chmod 600 .env
install -d -m 700 secrets
nano secrets/google_sa.json && chmod 600 secrets/google_sa.json
```

Share the **Publisher** Sheet doc with the service-account email (Editor). The
SA may be the same one used for Research — just share both docs with it; each
backend targets its own `SHEETS_DOC_ID`.

## 5. Backups dir

```bash
sudo install -d -m 700 -o $USER /var/backups/trueline-publisher
```

## 6. First build + run

```bash
cd /var/www/tools/trueline-publisher
docker compose up -d --build
curl -s http://127.0.0.1:8101/api/health     # {"status":"ok"}
```

## 7. Host Nginx vhost + TLS

Same vhost as Research with these substitutions:
`server_name truelinepublishers.yazhl.dpdns.org;`, `/api/ -> 127.0.0.1:8101`,
`/ -> 127.0.0.1:8111`, cert path under `…/truelinepublishers.yazhl.dpdns.org/`.

```bash
sudo certbot certonly --webroot -w /var/www/certbot -d truelinepublishers.yazhl.dpdns.org
sudo nginx -t && sudo systemctl reload nginx
```

## 8. Smoke test

```bash
curl -s https://truelinepublishers.yazhl.dpdns.org/api/health
# submit each form on the live site; rows land in Postgres and in the Sheet tabs
# Contact / Submit / Reviewer / Newsletter within ~60s.
docker compose exec db psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" \
  -c "select form_type,variant,email,synced from submissions order by created_at desc limit 8;"
```

Verify the manuscript `/submit` form: article type + the originality checkbox are
required; a deep-link refresh on `/journals/the-journal` returns 200 (SPA fallback).

## 9. Day-2 / rollback / restore

Identical to Research — see that repo's `DEPLOY.md §9`, substituting
`trueline-publisher`, `trueline-publisher-api`, and `/var/backups/trueline-publisher`.

## 10. Update the server profile

Record ports `8101/8111/5446`, the vhost, and the backup path in
`.claude/deployment-knowledge/server-profiles/contabo-damu.md`.
