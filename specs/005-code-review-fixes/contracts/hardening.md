# Contract: 005 Hardening — env, headers, gitleaks, test contour

**Feature**: 005-code-review-fixes
**Consumers**: app runtime (`app/api/lead`, `app/icon.svg/route.ts`), CI pipeline, pre-commit hook, deploy runbook.

## 1. Env contract (additive)

| Variable | Scope | Default | Purpose |
|---|---|---|---|
| `LEAD_TRUSTED_IP_HEADER` | runtime (server) | `x-real-ip` | Header set by the trusted edge (Caddy) carrying the real client IP. Empty/unset → limiter falls back to `x-forwarded-for` (first hop) or loopback `127.0.0.1` (with dev warning), as Next.js Web Request lacks direct socket access. |
| `NEXT_PUBLIC_PROJECT_NAME` | build + runner ARG/ENV | `underundre` | Existing; runner stage now receives it too (FR-012). |

No other env changes. `TELEGRAM_*` secrets remain runtime-only via `env_file` (unchanged).

## 2. Security headers contract (FR-004)

Global (`next.config.js headers()`), all routes, enforcing:

- `Strict-Transport-Security: max-age=63072000; includeSubDomains`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' <umami-origin>; connect-src 'self' <umami-origin>; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`
- `<umami-origin>` is derived at build time from `NEXT_PUBLIC_UMAMI_SRC` (analytics host is env-configurable).
- *Drift note 2026-11-03*: research R-04 assumed "no inline scripts exist" — wrong for the Next.js App Router, which emits inline bootstrap/hydration scripts. Nonce-based CSP was rejected (middleware forces dynamic rendering on a 1 GB VPS); `script-src 'unsafe-inline'` accepted as the static-landing trade-off (React escapes all content; base-uri/form-action/frame-ancestors remain enforcing).

Icon route SVG responses additionally carry `Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'` (per-response override) and `X-Content-Type-Options: nosniff`.
*Dual-CSP Note (analyze L1)*: On `/icon.svg`, the global CSP and per-route CSP merge via browser conjunction (intersection); `default-src 'none'` strictly blocks any script execution in direct SVG view.

## 3. Gitleaks contract (FR-013)

- Config: `.gitleaks.toml` — default ruleset + allowlist for `*.env.example` / `*.env.production.example` / `docs/` (audit hand-off #1: placeholder tokens must not block commits).
- Hook: pre-commit runs `gitleaks protect --staged --redact -c .gitleaks.toml`; non-zero exit blocks the commit.
- One-time: `.history/` scanned, token-shaped duplicates removed in an implementation commit.
- Install: documented in quickstart (§3) — `gitleaks` expected on PATH; hook activation command provided.

## 4. Test contour contract (FR-006/007)

- `pnpm test` → vitest (configured with `vitest.config.ts` mapping `@/*` path alias), files under `tests/unit/**`:
  - `pick.test.ts` — fallback matrix: uk present/absent × lang ru/en/uk; empty input → `""`.
  - `mask-escape.test.ts` — `maskEmail` (a@b.c → a***@b.c shapes), `escapeHtml` (`<>&"'`).
  - `lead-schema.test.ts` — metadata bounds: 20/21 keys, key length 50/51, `1e308` → reject, finite ok; message/email caps.
  - `content-loaders.test.ts` — fixtures from `projects/_template/data` parse; malformed fixture → typed error (no `process.exit`).
  - `rate-limit.test.ts` — window BVA (5 ok / 6th 429), eviction throttle + FIFO cap at 10,000 entries, header-present/absent matrix.
  - `project-config.test.ts` — registry miss → throw; `projectPages` miss → throw; alias `undreseller` → `underundre`.
- `pnpm verify` → `scripts/verify-gates.mjs` per `specs/004-landing-template-updates/contracts/verify-gates.md` with the amendment: **gate V3 byte-diff compares normalized DOM content (stripping `<script>` tags and `self.__next_f` RSC hydration payloads, since component chunk hashes change)** — security headers (FR-004) are response-level and excluded from baseline comparison (audit hand-off #2).
- CI order: `pnpm validate → pnpm test → pnpm build → pnpm verify` (SC-002).

## 5. Error-response contract (FR-014)

- Lead API 400 in production: `{ success: false, message, errors: [{ path, message }] }` — field paths only; the full Zod error map is returned only when `NODE_ENV !== "production"`.
- 413 (new): body exceeds `Content-Length` pre-check.
- 429 (existing): unchanged shape, now keyed on the trusted IP source.
