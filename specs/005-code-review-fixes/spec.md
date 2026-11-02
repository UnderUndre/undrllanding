# Feature Specification: 005-code-review-fixes — Remediation of Full-Codebase Review & Security Audit

**Feature Directory**: `specs/005-code-review-fixes`
**Repository**: `undrllanding`
**Created**: 2026-11-02
**Status**: Clarified (Q1–Q4 resolved, ready for plan)
**Parent Feature**: `specs/004-landing-template-updates` (delta hardening; inherits 003 engine contracts)
**Input**: `docs/reviews/code-review-antigravity.md` (verdict HIGH: 3 CRITICAL / 8 WARNING / 4 SUGGESTION) + `docs/reviews/security-audit-antigravity.md` (verdict CRITICAL: 1 CRITICAL / 2 HIGH / 4 MEDIUM / 5 LOW), commit `cd57751`.
**Scope decision (Q1)**: all 26 findings, one wave — P1 perimeter/scaffold → P2 test contour → P3 hygiene.
**Business plan**: unchanged (technical-debt hardening; no ICP/pricing/gate delta).

---

## 1. Executive Context

Full-codebase review and security audit (2026-11-02) surfaced 26 findings across two reports. This feature remediates them as one bounded hardening sprint. Four remediation tracks:

1. **Secrets & perimeter (S-01..S-03)** — token rotation verification, rate-limiter IP trust fix, security headers.
2. **Scaffold & icon route (F-01, F-02, F-04, S-04, S-05)** — substitution injection, partial-write rollback, path re-anchor, SVG headers.
3. **Test & verify contour (F-03)** — vitest unit contour for pure logic + `scripts/verify-gates.mjs` per the 004 contract (T005/T006 debt).
4. **Hygiene (remaining WARNING/SUGGESTION)** — dead code removal, Docker runner env, lead schema bounds, misc.

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 — Secrets Perimeter Closed (Priority: P1)

As the site owner,
I want live tokens out of all synced/copied surfaces and a guard against future leaks,
so that a machine compromise does not hand over the lead-relay bot.

**Acceptance Scenarios**:

1. **Given** the owner rotated both Telegram tokens at @BotFather, **When** the new tokens are placed into `.env`/`.env.production` on the deploy host, **Then** lead submission works end-to-end and old tokens return 401 from Telegram API.
2. **Given** a gitleaks pre-commit hook, **When** a commit contains a token-shaped string (`[0-9]{8,10}:[A-Za-z0-9_-]{30,}`), **Then** the commit is rejected.
3. **Given** the `.history/` directory, **When** scanned, **Then** zero token-shaped strings exist in the repository tree (excluding `*.example` placeholders).

### User Story 2 — Scaffold Is Idempotent and Injection-Safe (Priority: P1)

As a template consumer,
I want `pnpm project:create` to fail loudly and roll back cleanly on any input or mid-run error,
so that a scaffolded brand never leaves the repository non-compiling.

**Acceptance Scenarios**:

1. **Given** `--name` containing `"` or `$&`, **When** the CLI runs, **Then** it exits with a validation error before any file write.
2. **Given** a simulated failure after the registry rewrite, **When** the CLI aborts, **Then** `lib/project-config.ts`, `lib/project-pages.ts` are byte-identical to pre-run state and `projects/<slug>/` is removed.
3. **Given** a successful run, **When** `pnpm validate` executes, **Then** it passes and the appended import sits adjacent to existing imports.

### User Story 3 — Public Perimeter Hardened (Priority: P1)

As a visitor,
I want security headers, an honest rate limiter, and a non-traversable icon route,
so that the site resists clickjacking, spam relay, and path-based file reads.

**Acceptance Scenarios**:

1. **Given** any page response, **When** inspected, **Then** HSTS, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, and CSP (allowing Umami analytics origin) are present.
2. **Given** 10 rapid lead submissions from one IP, **When** the 6th arrives within 60s, **Then** it returns 429; rate-limit map size stays bounded under a spoofed-IP flood.
3. **Given** a brand config with `iconUrl: "../.env"`, **When** the icon route is requested, **Then** the response is 404 and no file outside `public/` is read.
4. **Given** an SVG icon navigated directly, **When** the response arrives, **Then** it carries `Content-Security-Policy: default-src 'none'` and `nosniff`.

### User Story 4 — Pure Logic Under Test (Priority: P2)

As a maintainer,
I want the risky pure functions covered by a unit contour wired into CI,
so that i18n fallback, PII masking, and schema bounds cannot silently regress.

**Acceptance Scenarios**:

1. **Given** `pnpm test`, **When** it runs, **Then** `pick()` fallback matrix (uk→en→ru→""), `maskEmail`, `escapeHtml`, lead-schema bounds (metadata keys ≤50 chars / ≤20 entries, finite numbers), and content loaders against `projects/_template/data` all pass.
2. **Given** `scripts/verify-gates.mjs` per the 004 contract, **When** `pnpm verify` runs post-build, **Then** gates V1/V2/V2a/V3 report PASS/FAIL per contract (V3 baseline comparison included).

### User Story 5 — Hygiene Sweep (Priority: P3)

As a maintainer,
I want dead legacy code removed and runtime faults to fail gracefully,
so that the codebase does not render wrong-brand copy or kill the server on bad data.

**Acceptance Scenarios**:

1. **Given** the dictionary audit, **When** undrlla marketplace keys are referenced by no component, **Then** they are deleted from ru/en and explicit lines 579–590 in uk, and `pnpm validate` passes.
2. **Given** a malformed brand JSON file at runtime, **When** a page renders, **Then** the server returns an error boundary (500 page), not `process.exit`.
3. **Given** unknown `NEXT_PUBLIC_PROJECT_NAME`, **When** the build runs, **Then** the build fails loudly instead of silently rendering the `underundre` brand.

---

## 3. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `create-project.mjs` MUST validate `name` (printable, no `"`, ≤80 chars) and `domain` (`/^[a-z0-9.-]+$/i`, ≤253) before any file write, and MUST use function-form `replaceAll(token, () => value)` for all substitutions.
- **FR-002**: `create-project.mjs` MUST snapshot both registry files in memory before rewrite and restore them (plus remove the copied project dir) on any failure, including non-zero `pnpm validate` exit.
- **FR-003**: The lead rate limiter MUST key on the trusted upstream header set by Caddy (`X-Real-IP`, env-configurable via `LEAD_TRUSTED_IP_HEADER`), falling back to `x-forwarded-for` (first hop) or loopback `127.0.0.1` (with dev warning) when absent; it MUST throttle eviction sweeps (at most once per 10s) and enforce a hard cap / FIFO eviction when map size reaches 10,000 to prevent event-loop exhaustion.
- **FR-004**: `next.config.js` MUST emit security headers on all routes in enforcing mode: HSTS (`max-age=63072000; includeSubDomains`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and enforcing CSP `default-src 'self'; script-src 'self' https://analytics.underundre.com; connect-src 'self' https://analytics.underundre.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` (Umami analytics script and beacon/connect origins allowlisted; no Report-Only phase — Q4 decision).
- **FR-005**: The icon route MUST sanitize `iconUrl` by stripping leading slashes before resolving, re-anchor the resolved path inside `public/` (reject otherwise with 404), restrict extensions to `.svg/.png/.ico`, use async fs with lazy in-memory buffer caching on request, and serve SVG with `Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'` + `nosniff`.
- **FR-006**: A vitest unit contour MUST cover: `pick()` fallback matrix, `maskEmail`, `escapeHtml`, lead schema bounds, content loaders vs `_template` fixtures; `pnpm test` wired into CI before deploy.
- **FR-007**: `scripts/verify-gates.mjs` MUST be implemented per `specs/004-landing-template-updates/contracts/verify-gates.md` (gates V1, V2, V2a, V3 with V3 stripping `<script>` and RSC hydration payloads from HTML body before diffing; CLI `--brand`; `pnpm verify` script entry).
- **FR-008**: `lib/schemas/content-schema.ts` MUST bound metadata keys (`k.length <= 50`), require finite numbers, and the route MUST check `Content-Length` before buffering the body.
- **FR-009**: Content loaders MUST throw typed errors instead of `process.exit(1)`; the build-time halt remains only in an explicit build-validation path.
- **FR-010**: `lib/project-config.ts` and `lib/project-pages.ts` MUST fail fast (throw) on registry miss for unknown project names or unmapped home page components; the `undreseller → underundre` alias stays the sole fallback.
- **FR-011**: Dead legacy copy MUST be removed: undrlla marketplace keys from `lib/i18n.ts` across `ru`, `en`, and explicitly lines 579–590 in `uk`, `.faq` blocks from `projects/underundre/locales.ts`, the unused `ForkServiceLine` import, and the legacy `undrlla_lang` storage key + custom-event listener from `lang-context.tsx` (single `app_lang` key remains).
- **FR-012**: The Docker runner stage MUST receive `NEXT_PUBLIC_PROJECT_NAME` via ARG/ENV; `/api/hello` demo route MUST be removed.
- **FR-013**: A gitleaks (or equivalent) pre-commit hook MUST reject token-shaped strings; `.history/` MUST be scanned and cleaned of token duplicates.
- **FR-014**: Lead API error responses MUST expose only field paths (no full Zod error map) in production; `ctaHref`/nav/footer `href` MUST validate against `https?:` scheme allowlist at schema level.

### Non-Functional Requirements

- **NFR-001**: `pnpm validate` passes; `pnpm test` passes; existing pages byte-identical for `underundre` ru/en output EXCEPT where intentionally changed by this feature (no baseline regression).
- **NFR-002**: No new runtime dependencies beyond dev-dependency `vitest` (and gitleaks as an external tool, not an npm dep).
- **NFR-003**: All changes preserve the additive brand-config contract (003/004); no breaking changes to `projects/<slug>/` structure.

### Security & Threat Mitigation (STRIDE)

> Directly the subject of this feature: see `docs/reviews/security-audit-antigravity.md`. In-scope: S-02 (spoofing/rate-limit), S-03 (misconfig/headers), S-04 (path traversal), S-05 (SVG XSS), S-07 (schema bounds), S-08 (error disclosure). S-01 token rotation itself is an owner action in @BotFather (Q4 decision) — this feature covers the verification, gitleaks hook, and `.history/` scan (US1).

## 5. Clarification Log

| # | Question | Resolution |
|---|----------|------------|
| Q1 | Scope: all 26 findings or a subset? | **All 26, one wave** — P1 perimeter/scaffold, P2 test contour, P3 hygiene in one feature. |
| Q2 | Rate-limiter IP source behind Caddy? | **Env-configurable trusted header** (`X-Real-IP` set by Caddy, `LEAD_TRUSTED_IP_HEADER`), fallback to socket remote address. |
| Q3 | CSP mode for security headers? | **Enforcing immediately** — no Report-Only phase; Umami origin allowlisted. |
| Q4 | S-01 token rotation in code scope? | **Owner action outside the repo** (@BotFather); the feature covers verification (US1), gitleaks hook, `.history/` scan. |

## 6. Finding Disposition Map

| Finding (source) | Disposition | FR |
|---|---|---|
| S-01 token leak (SEC, CRITICAL) | Owner rotation + US1 verification, gitleaks hook, `.history/` scan | FR-013 |
| S-02 rate-limit spoofing (SEC, HIGH) | Trusted header + map eviction | FR-003 |
| S-03 no security headers (SEC, HIGH) | Enforcing headers in `next.config.js` | FR-004 |
| S-04 icon path traversal (SEC, MEDIUM) | Re-anchor + extension allowlist | FR-005 |
| S-05 SVG stored-XSS (SEC, MEDIUM) | Per-route CSP + nosniff | FR-005 |
| S-06 sync fs icon route (SEC/CODE, MEDIUM/WARNING) | Async fs + module-init cache | FR-005 |
| S-07 schema bounds (SEC, MEDIUM) | Key length cap, finite numbers, Content-Length pre-check | FR-008 |
| S-08 Zod error map to client (SEC, LOW) | Field-paths only in production | FR-014 |
| S-09 href scheme allowlist (SEC, LOW) | `https?:` validation | FR-014 |
| S-10 floating deps (SEC, LOW) | Pin `next` exact version; `patches/` README | FR-015 |
| S-11 preview.html in tree (SEC, LOW) | `.gitignore` rule + dockerignore fix | FR-016 |
| F-01 substitution injection (CODE, CRITICAL) | Function-form replaceAll + input validation | FR-001 |
| F-02 partial-write no rollback (CODE, CRITICAL) | Snapshot/restore registry + dir cleanup | FR-002 |
| F-03 zero tests (CODE, CRITICAL) | vitest contour + CI wiring | FR-006 |
| F-04 icon route (overlaps S-04/05/06) | Same as FR-005 | FR-005 |
| F-05 silent brand fallback (CODE, WARNING) | Build fails on registry miss | FR-010 |
| F-06 process.exit in loaders (CODE, WARNING) | Typed errors | FR-009 |
| F-07 rate-limit map leak (CODE, WARNING) | Same as FR-003 eviction | FR-003 |
| F-08 stale marketplace copy (CODE, WARNING) | Dictionary audit + deletion | FR-011 |
| F-09 form setState after unmount (CODE, WARNING) | AbortController cleanup | FR-017 |
| F-10 runner env (CODE, WARNING) | ARG/ENV in runner stage | FR-012 |
| F-11 legacy lang-storage (CODE, WARNING) | Single `app_lang` key | FR-011 |
| F-12 metadata duplication (CODE, SUGGESTION) | Delete page-level function | FR-018 |
| F-13 preview slug validation (CODE, SUGGESTION) | Regex validation + hint fix | FR-016 |
| F-14 dead `.faq` blocks + ForkServiceLine (CODE, SUGGESTION) | Deletion | FR-011 |
| F-15 minor consistency (CODE, SUGGESTION) | Body-limit fix, `/api/hello` removal, fallback comment | FR-012, FR-008 |

*FR-015*: `package.json` pins `next` to the exact resolved version; `patches/README.md` documents the undesign patch rationale.
*FR-016*: `generate-preview.mjs` validates slug against `/^[a-z][a-z0-9-]*$/` and fixes the regenerate hint; `projects/*/preview.html` added to `.gitignore` and `.dockerignore`.
*FR-017*: Lead forms wire an `AbortController` (or mounted-ref) so no `setState` fires after unmount.
*FR-018*: `app/(default)/page.tsx` drops the page-level `generateMetadata` (root layout is the single source).

## 4. Success Criteria *(mandatory)*

- **SC-001**: All findings from both audit reports are either remediated in code or explicitly dispositioned in this spec (S-01 rotation = owner action verified by US1).
- **SC-002**: `pnpm validate && pnpm test && pnpm build && pnpm verify` all green in CI.
- **SC-003**: Re-running the security audit shows zero CRITICAL/HIGH findings; re-running the code review shows zero CRITICAL findings.
- **SC-004**: `pnpm project:create --slug=demo --name='Br"and $&X'` either fails validation cleanly or produces a compiling repo (never a broken intermediate state).
