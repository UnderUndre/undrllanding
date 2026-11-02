# Implementation Plan: 005-code-review-fixes

**Branch**: `specs/005-code-review-fixes` | **Date**: 2026-11-02 | **Spec**: [spec.md](spec.md)
**Input**: spec.md (clarified Q1–Q4) + requirements-audit.md (PASS) + qa/preliminary-rtm.md
**Audit Reports**: `docs/reviews/code-review-antigravity.md`, `docs/reviews/security-audit-antigravity.md` (commit `cd57751`)

## Summary

Full remediation of 26 audit findings in one wave: perimeter (token-rotation verification, trusted-header rate limiter, enforcing security headers), scaffold (injection-safe substitutions + snapshot/rollback), icon route (path re-anchor, async fs, per-route SVG CSP), test contour (vitest unit + `verify-gates.mjs` per the 004 contract — closes 004 T005/T006 debt), and hygiene (dead code, runner env, schema bounds, error-map trimming).

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Next.js 15 (App Router), React 19, Zod 4
**Primary Dependencies**: + `vitest` (dev-only, NFR-002); `gitleaks` external binary (pre-commit hook, not an npm dep)
**Storage**: N/A (no DB); static assets + JSON
**Testing**: `pnpm test` (vitest, NEW), `pnpm verify` (verify-gates.mjs per 004 contract), `pnpm validate`
**Target Platform**: Vercel/static Node host + VPS Docker behind Caddy
**Performance Goals**: no regression to 003 NFR-002 (LCP ≤ 1.5s); icon route async, non-blocking
**Constraints**: additive-only brand contract; byte-identical HTML body for underundre except intentional changes (NFR-001); no new runtime deps
**Security Surface**: STRIDE in-scope = S-02 (spoofing), S-03 (misconfig), S-04 (path traversal), S-05 (SVG XSS), S-07 (bounds), S-08 (disclosure); details in `contracts/hardening.md`
**Database Migration Trigger**: N/A (no DB)
**Supply Chain & Licensing**: pin `next` exact (S-10); vitest MIT; gitleaks external tool
**Research Spikes**: none required (all decisions resolved in research.md from known prior art)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Source of Truth Discipline | PASS | No `.claude/`/generated-tree edits |
| II. Transformer, Not Fork | N/A | clai-helpers pipeline untouched |
| III. Protected Slots | N/A | No managed-file overrides |
| IV. SemVer 0.x | PASS | Landing repo, not clai CLI; no version bump |
| V. Token Economy | PASS | Artifacts lean |
| VI. Cross-AI Review Gate | PENDING | Gate at `/speckit.implement` (analyze + ≥2 external reviewers) |
| VII. Artifact Versioning | PASS | spec/clarify/requirements-audit tags present; plan/tasks tags follow (requirements-audit tagged manually — ValidateSet gap, known since 004) |
| IX. Two-Phase Review Flow | PASS | Planning on `specs/005-code-review-fixes`; implementation tasks on same branch (grandfathered pattern of this repo) |
| XII. QA & Test Contour | **PAYING DEBT** | This feature DELIVERS the missing automated half (unit contour + verify gates) required by XII Stage 2.5/5.5 for 004 and itself |

**Post-design re-check**: PASS — no principle violated by the design below.

## Project Structure

### Documentation (this feature)

```text
specs/005-code-review-fixes/
├── spec.md                    # clarified (Q1–Q4 integrated)
├── checklists/requirements.md
├── requirements-audit.md      # PASS
├── qa/preliminary-rtm.md
├── plan.md                    # this file
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── hardening.md           # env contract, headers contract, gitleaks allowlist, test contour
└── tasks.md                   # Phase 2
```

### Source Code (repository root, undrllanding/)

```text
lib/project-config.ts                       # MODIFY: throw on registry miss (FR-010)
lib/schemas/content-schema.ts               # MODIFY: metadata key caps, finite numbers (FR-008)
lib/schemas/content-loaders.ts              # MODIFY: typed errors, no process.exit (FR-009)
lib/i18n.ts                                 # MODIFY: delete dead undrlla keys (FR-011)
lib/social-links.ts                         # unchanged (allowlist logic stays)
lib/lead/rate-limit.ts                      # NEW: extracted limiter with trusted header + eviction (FR-003)
app/api/lead/route.ts                       # MODIFY: use lib/lead/rate-limit.ts, Content-Length pre-check, field-paths errors (FR-003/008/014)
app/icon.svg/route.ts                       # MODIFY: re-anchor, allowlist, fs/promises, SVG CSP (FR-005)
app/(default)/page.tsx                      # MODIFY: drop generateMetadata (FR-018)
next.config.js                              # MODIFY: security headers (FR-004)
context/lang-context.tsx                    # MODIFY: single app_lang key (FR-011)
components/header-nav.tsx                   # MODIFY: sun icon done; nothing here in 005 except no-op check
components/content/lead-form.tsx            # MODIFY: AbortController (FR-017)
projects/underundre/components/cta-underundre.tsx  # MODIFY: AbortController (FR-017)
projects/underundre/locales.ts              # MODIFY: delete .faq blocks, ForkServiceLine import cleanup (FR-011)
scripts/create-project.mjs                  # MODIFY: validation, function-form replaceAll, snapshot/restore (FR-001/002)
scripts/generate-preview.mjs                # MODIFY: slug validation + hint (FR-016)
scripts/verify-gates.mjs                    # NEW: gates V1/V2/V2a/V3 per 004 contract (FR-007)
tests/                                      # NEW: vitest unit contour (FR-006)
package.json                                # MODIFY: vitest dev-dep, test/verify scripts, pin next (FR-006/007/015)
next.config.js / .gitignore / .dockerignore # MODIFY: headers / preview.html ignore (FR-004/016)
Dockerfile                                  # MODIFY: runner-stage ARG/ENV (FR-012)
patches/README.md                           # NEW: patch rationale (FR-015)
.gitleaks.toml                              # NEW: token rules + *.example allowlist (FR-013, audit hand-off #1)
docs/reviews/                               # reference inputs (read-only)
```

**Removed**: `app/api/hello/route.ts` (FR-012).

## Phase 0 → research.md

All decisions resolved without spikes (see research.md): gitleaks over git-secrets (R-01), `LEAD_TRUSTED_IP_HEADER` env (R-02), vitest over jest (R-03), enforcing CSP (R-04), build-fail over silent fallback (R-05).

## Phase 1 Design Decisions

1. **Rate limiter extraction (FR-003)**: `lib/lead/rate-limit.ts` — fixed-window map with `LEAD_TRUSTED_IP_HEADER` (default `x-real-ip`, set by Caddy) and socket-address fallback; eviction sweep at insert when `map.size > 10_000`; in-memory (single-instance VPS is the declared deployment target; revisit with Redis only on multi-instance).
2. **Security headers (FR-004)**: enforcing, global via `next.config.js headers()`; CSP `default-src 'self'; script-src 'self' https://analytics.underundre.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'` — `unsafe-inline` styles are required by Tailwind runtime inline styles and the icon SVG; audit-handoff #2: verify-gates V3 byte-diff compares the response BODY only (headers excluded).
3. **Icon route (FR-005)**: resolve → assert prefix `public/` + extension allowlist → async read → buffer cached at module init keyed by resolved path (config immutable per build); SVG responses get `Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'` + `nosniff`; cache softened to `public, max-age=86400, stale-while-revalidate=604800` (brand assets change, immutable was wrong).
4. **Scaffold safety (FR-001/002)**: pre-write validation (name: printable, no `"`, ≤80; domain: `/^[a-z0-9.-]+$/i` ≤253); function-form `replaceAll`; registry files snapshotted in memory before rewrite, restored + project dir removed on any failure including non-zero `pnpm validate`; imports inserted after the last import line.
5. **Test contour (FR-006/007)**: vitest, `tests/unit/*.test.ts` for `pick()`, `maskEmail`, `escapeHtml`, lead schema bounds, content loaders vs `_template` fixtures; `scripts/verify-gates.mjs` implements 004 contract gates V1/V2/V2a/V3 (V3 body-only per hand-off #2); wired `pnpm test` / `pnpm verify`; CI runs `validate → test → build → verify`.
6. **Gitleaks (FR-013)**: `.gitleaks.toml` with the default ruleset + allowlist for `*.example` (audit-hand-off #1); pre-commit hook via `git config core.hooksPath` or `.git/hooks` install snippet documented in quickstart; `.history/` scanned once during implementation, cleanup committed.
7. **Dead code sweep (FR-011)**: grep-verified deletion list — undrlla marketplace keys in `lib/i18n.ts` (ru/en; uk inherits via spread), `.faq` blocks in `projects/underundre/locales.ts`, ForkServiceLine import, `undrlla_lang` key + custom-event listener. Each deletion gated by a grep=0 test.

## Deployment Readiness

- `pnpm validate && pnpm test && pnpm build && pnpm verify` green in CI (SC-002).
- Post-merge re-run of both audits must show 0 CRITICAL/HIGH (SC-003).
- S-01 token rotation verified by US1 owner checklist (quickstart §1).
- Architecture update (`specs/main/architecture.md`): N/A — no new technologies beyond a dev-only test runner; landing repo keeps no local architecture canon.
