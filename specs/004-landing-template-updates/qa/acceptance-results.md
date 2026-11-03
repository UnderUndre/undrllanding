# Acceptance QA Results: 004-landing-template-updates

**Date**: 2026-11-04  
**Tester**: Valera (Digital Plumber Standard)  
**Target Commit**: aa913e0a3ca76453ed0dd57336667785bb9b7c83  
**Status**: **ALL PASS**

---

## 1. Icon Assets & Size Budgets (US1, SC-001)
- [x] `underundre`: `icon-48.png` (5.5 KB ≤ 10 KB), `apple-icon-180.png` (48.3 KB ≤ 60 KB), `icon.svg` present.
- [x] `_template`: `icon-48.png` (296 B ≤ 10 KB), `apple-icon-180.png` (831 B ≤ 60 KB), `icon.svg` present in `public/projects/_template/`.
- [x] `undreading`: `icon-48.png` (269 B ≤ 10 KB), `apple-icon-180.png` (786 B ≤ 60 KB), `icon.svg` present in `public/projects/undreading/`.
- [x] Rendered `<head>` references small `icon-48.png` (not heavy SVG) across all brands.
- [x] Single source-of-truth location: `projects/<slug>/public/` duplicate directories eliminated (FR-008).

---

## 2. Trilingual & Content Extension (US4, FR-010)
- [x] `LocalizedText` primitive supports optional `uk?: string` with single-choke-point fallback `uk → en → ru → ""`.
- [x] `pick()` resolver verified across unit test suite (`tests/unit/pick.test.ts` PASS).
- [x] `underundre` ru/en output identical to baseline.
- [x] `undreading` pilot brand configured with trilingual locales (`["ru", "en", "uk"]`).

---

## 3. Pilot Brand undreading Verification (US4, FR-011)
- [x] `pnpm project:create --slug=undreading --name=Undreading --domain=undreading.com` executed cleanly.
- [x] Brand config, pricing grid (Web Reader free, Supporter ZTA Kit PWYW $5–$12.99, Paperback $24.99), FAQ and legal requisites sourced from `undreading-business-plan.md` v2.5.
- [x] Brand isolation verified: Gate V3 confirms **0 references to `underundre`** in `undreading` build output.
- [x] Multi-brand asset isolation: 0 references to other-brand assets.

---

## 4. Verification Gates (V1–V4, contracts/verify-gates.md)
- [x] `pnpm validate` (tsc --noEmit): PASS (0 errors).
- [x] `pnpm verify --brand underundre`: 8/8 gates PASS.
- [x] `pnpm verify --brand undreading`: 8/8 gates PASS.
- [x] GitHub Actions CI workflow configured to enforce `validate → test → build → verify`.
