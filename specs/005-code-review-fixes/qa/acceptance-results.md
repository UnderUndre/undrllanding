# Acceptance QA Results: 005-code-review-fixes

**Date**: 2026-11-03  
**Tester**: Valera (Digital Plumber Standard)  
**Target Commit**: aa913e0a3ca76453ed0dd57336667785bb9b7c83  
**Status**: **ALL PASS**

---

## 1. Token Rotation & Perimeter Verification (US1 & US3)
- [x] Telegram bot tokens rotated; live lead dispatches successfully received via `https://underundre.com/api/lead`.
- [x] Gitleaks configuration `.gitleaks.toml` created with `*.example` allowlist; repository scan contains zero live token leaks.
- [x] Security headers verified via curl on `https://underundre.com`:
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains` (PASS)
  - `X-Frame-Options: DENY` (PASS)
  - `X-Content-Type-Options: nosniff` (PASS)
  - `Referrer-Policy: strict-origin-when-cross-origin` (PASS)
  - `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' ...` (PASS)
- [x] Icon route path traversal protected: leading slashes sanitized, path re-anchored to `public/`, extension allowlist enforced.
- [x] `/api/hello` route removed (returns 404).

---

## 2. Test Contour (US4)
- [x] `pnpm validate` (tsc --noEmit): PASS (0 errors).
- [x] `pnpm test` (vitest): 21/21 tests passed across 6 test suites:
  - `pick.test.ts` (PASS)
  - `rate-limit.test.ts` (PASS)
  - `project-config.test.ts` (PASS)
  - `content-loaders.test.ts` (PASS)
  - `lead-schema.test.ts` (PASS)
  - `mask-escape.test.ts` (PASS)
- [x] `pnpm verify --brand underundre`: 8/8 gates passed:
  - V1-citations (PASS)
  - V1-manifest-anchors (PASS)
  - V2-assets (PASS)
  - V2-favicon-link (PASS)
  - V2-no-dup-assets (PASS)
  - V2-brand-isolation (PASS)
  - V2a-logo-chrome (PASS)
  - V3-baseline-identity (PASS)

---

## 3. Scaffold & Hygiene Verification (US2 & US5)
- [x] Input validation in `scripts/create-project.mjs` prevents injection via `"`, `$&`, and invalid domain syntax.
- [x] Snapshot & rollback protocol restores compiling registry files on validation failure.
- [x] Dead code removed: `revshare_*` and `econ_domain_*` keys purged from `lib/i18n.ts` (ru, en, uk), dead `.faq` blocks removed from `projects/underundre/locales.ts`, `components/pricing-section.tsx` deleted.
- [x] Legacy `undrlla_lang` storage keys removed from `lang-context.tsx`.
- [x] AbortController wired into lead forms to eliminate unmounted `setState` calls.
- [x] Dockerfile builder stage uses `RUN pnpm build` (respecting `ARG NEXT_PUBLIC_PROJECT_NAME`), runner receives `NEXT_PUBLIC_PROJECT_NAME`.
