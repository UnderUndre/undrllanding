# Deploy Runbook: underundre.com → VPS (Caddy edge)

Target: single Next.js landing container (`underundre-landing:3000`) behind the
undevops Caddy edge proxy on the shared `caddy` Docker network. No host ports,
automatic Let's Encrypt TLS, zero-downtime hot reloads.

---

## 0. Architecture

```
[ Client ] ──HTTPS 443──▶ [ Caddy (edge, auto-TLS) ] ──caddy network──▶ [ underundre-landing:3000 ]
                                  │ admin API 127.0.0.1:2019 (loopback)
                                  └ sites registered via caddy-add-site.sh
```

- **Edge**: `undevops/scripts/server/install-caddy.sh` (caddy:2.7, ports 80/443, JSON config, admin loopback-only).
- **Deploy driver**: `undevops/scripts/deploy/deploy.sh` — repo-agnostic; run it FROM the
  undrllanding checkout. It syncs git, clones on the server, uploads env, and triggers the
  detached `server-deploy.sh` (docker compose build/up + health wait, survives SSH drop).
- **Build args**: all `NEXT_PUBLIC_*` (analytics, contact channels, socials, Cal.com triage)
  are inlined at build time — compose interpolates them from the server-side `.env`.
  Runtime secrets (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_ALERT_CHAT_ID`) flow via `env_file`
  and never enter the image (`.dockerignore` excludes `.env*`).

---

## 1. One-time server prerequisites

```bash
# 1.1 SSH into the VPS, install Docker (if not yet) + Caddy edge
ssh $VPS
curl -fsSL https://get.docker.com | sh
bash <(cat undevops/scripts/server/install-caddy.sh)   # or scp + run

# 1.2 Verify Caddy admin API (loopback only)
curl -s http://127.0.0.1:2019/config/ | head -c 200

# 1.3 DNS: A-records → VPS IP
#   underundre.com      A     <VPS_IP>
#   www.underundre.com  A     <VPS_IP>
# UFW: allow 22, 80, 443. NEVER open 2019 (loopback invariant FR-028).
```

---

## 2. Local repo config (undrllanding checkout)

```bash
cd undrllanding
cp .env.production.example .env.production
# edit: PROD_SSH_HOST, REMOTE_APP_DIR, REMOTE_REPO_URL
```

Server-side runtime/build env (`.env`) is created from `.env.example` on first
deploy — fill there: `TELEGRAM_BOT_TOKEN`, `TELEGRAM_ALERT_CHAT_ID`,
`NEXT_PUBLIC_UMAMI_*`, `NEXT_PUBLIC_CAL_TRIAGE_URL`, `NEXT_PUBLIC_SOCIAL_*`,
`NEXT_PUBLIC_CONTACT_CHANNELS`.

> **Note:** any `NEXT_PUBLIC_*` change requires an image rebuild (build-time inlining),
> not just a container restart — deploys rebuild anyway.

---

## 3. First deploy

```bash
cd undrllanding

# 3.1 Dry setup: clone + env, no build
bash ../undevops/scripts/deploy/deploy.sh --setup-only

# 3.2 Fill the server-side .env
ssh $PROD_SSH_HOST 'nano /root/apps/underundre-landing/.env'   # from .env.example

# 3.3 Full deploy (build takes ~2-3 min; survives disconnect)
bash ../undevops/scripts/deploy/deploy.sh --fast
ssh $PROD_SSH_HOST 'tail -f /root/apps/underundre-landing/deploy.log'   # watch

# 3.4 Verify container health
ssh $PROD_SSH_HOST 'docker ps --filter name=underundre-landing'
curl -s http://localhost:3000/ -o /dev/null -w '%{http_code}\n'   # on VPS: 200
```

---

## 4. Register the site in Caddy (once per domain)

From undevops checkout (script needs `jq` on the server: `apt install -y jq`):

```bash
scp undevops/scripts/server/caddy-add-site.sh $PROD_SSH_HOST:/root/
ssh $PROD_SSH_HOST 'bash /root/caddy-add-site.sh \
    --name underundre-landing \
    --domain underundre.com --domain www.underundre.com \
    --upstream underundre-landing:3000'

# Verify
ssh $PROD_SSH_HOST 'bash /root/caddy-add-site.sh --list'
curl -sI https://underundre.com | head -5     # 200, TLS issued automatically
```

Re-runs are idempotent (same `@id` / intersecting hosts replace the route).

---

## 5. Smoke test (post-deploy checklist)

1. `https://underundre.com` renders — hero "Stop Burning $15k–$40k/Yr…" (or RU equivalent).
2. Tab favicon = UnderUndre icon; title has no `| Undrlla`.
3. Header CTA scrolls to `#contact`; form submits → Telegram push arrives (check
   `TELEGRAM_ALERT_CHAT_ID` chat) → Thank-You state shows 4h Loom SLA.
4. Favicon request ≤ 15 KB; `curl -sI https://underundre.com/projects/underundre/favicon.ico`.
5. Umami dashboard receives a pageview (if `NEXT_PUBLIC_UMAMI_WEBSITE_ID` set).
6. Contact block shows ONLY channels listed in `NEXT_PUBLIC_CONTACT_CHANNELS`.

---

## 6. Update deploys

```bash
cd undrllanding && bash ../undevops/scripts/deploy/deploy.sh --fast
```

Git sync → server `git reset --hard origin/main` → compose build → up (old container
replaced only after health passes). Telegram deploy notifications fire automatically
if `TELEGRAM_NOTIFY_*` set in `.env.production`.

## 7. Rollback / logs / hygiene

```bash
bash ../undevops/scripts/deploy/rollback.sh          # previous release
bash ../undevops/scripts/deploy/logs.sh              # follow remote logs
ssh $PROD_SSH_HOST 'bash undevops/scripts/server/health-check.sh'
ssh $PROD_SSH_HOST 'docker image prune -f'           # occasional cleanup
```

## 8. undrlla landing (later)

Same repo ships the undrlla lander: `pnpm build:undrlla` exists; switch compose
build arg `NEXT_PUBLIC_PROJECT_NAME=undrlla`, second service + second
`caddy-add-site.sh` registration (`undrlla.com`). No Dockerfile edits needed.
