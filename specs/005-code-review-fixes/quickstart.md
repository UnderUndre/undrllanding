# Quickstart: 005-code-review-fixes

Verify the hardening in under 15 minutes.

## 1. Token rotation verification (US1, owner)

1. Rotate both tokens at @BotFather; put new values into server-side `.env` / `.env.production`.
2. Submit a lead via the live site → arrives in Telegram (new token works).
3. `curl -s "https://api.telegram.org/bot<OLD_TOKEN>/getMe" | grep -o '"ok":false'` → old token rejected.

## 2. Perimeter smoke (US3)

```bash
pnpm build && pnpm start
# security headers present on every route:
curl -sI localhost:3000/ | grep -Ei "strict-transport|x-frame|x-content-type|referrer-policy|content-security"
# rate limit: 6th POST /api/lead within 60s from one IP → 429
# icon traversal: brand config with "../.env" → 404, no body leak
# SVG direct navigation:
curl -sI localhost:3000/icon.svg | grep -i "content-security-policy: default-src 'none'"
```

## 3. Gitleaks hook (US1)

```bash
# one-time (gitleaks must be on PATH)
gitleaks protect --staged --redact -c .gitleaks.toml   # manual pre-commit check
# or activate as hook:
echo 'gitleaks protect --staged --redact -c .gitleaks.toml' > .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
# sanity: .env.example placeholders must PASS (allowlist), a fake token in a tracked file must FAIL
```

## 4. Test contour (US2/US4)

```bash
pnpm validate && pnpm test && pnpm verify
# → vitest: pick fallback matrix, maskEmail/escapeHtml, schema bounds, loaders, rate-limit, registry-miss
# → verify gates V1/V2/V2a/V3 PASS (V3 compares response BODY only — headers excluded)
```

## 5. Scaffold safety (US2)

```bash
pnpm project:create --slug=demo --name='Br"and $&X'     # → clean validation error, no files written
pnpm project:create --slug=demo --name="Demo $& Co" --domain=Demo.COM   # → domain rejected
pnpm project:create --slug=demo --name="Demo Co" --domain=demo.com
# simulate failure: make validate fail → registry files restored byte-identical, projects/demo/ removed
NEXT_PUBLIC_PROJECT_NAME=demo pnpm build                 # compiles; unknown name without scaffold → build FAILS (FR-010)
```

## 6. Hygiene spot-check (US5)

```bash
grep -rn "revshare_\|econ_domain\|undrlla_lang" lib/ context/ components/ projects/ | wc -l   # → 0
curl -s -o /dev/null -w "%{http_code}" localhost:3000/api/hello                               # → 404
```
