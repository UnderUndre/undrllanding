# Tasks: 005-code-review-fixes

**Input**: Design documents from `specs/005-code-review-fixes/`
**Prerequisites**: plan.md ✅, spec.md ✅ (clarified), research.md ✅, data-model.md ✅, contracts/hardening.md ✅, requirements-audit.md PASS ✅

**Tests**: Included — vitest unit contour (FR-006) + verify-gates (FR-007) are the feature's own deliverables.

## Format: `[ID] [AGENT] [Story?] Description`

## Task Statuses

`- [ ]` pending · `- [→]` in progress · `- [X]` done · `- [!]` failed · `- [~]` blocked

---

## Phase 0: Setup & Perimeter (P1)

- [ ] **T001 [OPS] US1 Gitleaks config + hook + `.history/` scan**: `.gitleaks.toml` (default ruleset + allowlist `*.env.example` / `docs/` per contracts/hardening.md §3), pre-commit activation documented in quickstart §3, one-time scan-and-clean of `.history/` (token-shaped strings), commit removals. Depends: none.
- [ ] **T002 [OPS] US3 Security headers**: `next.config.js headers()` per contracts/hardening.md §2 (enforcing CSP with `connect-src 'self' https://analytics.underundre.com;`, HSTS, XFO, nosniff, Referrer-Policy). Acceptance: curl матрица quickstart §2. Parallel with T001/T003. Depends: none.
- [ ] **T003 [BE] US3 Rate limiter hardening**: extract `lib/lead/rate-limit.ts` (trusted header `LEAD_TRUSTED_IP_HEADER` → fallback `x-forwarded-for` first hop / `127.0.0.1` dev; throttled sweep + FIFO drop-oldest cap at 10k), wire into `app/api/lead/route.ts`. Acceptance: 6th request → 429; spoofed-XFF flood bounded (RTM High: BVA + негативные). Depends: none.

## Phase 1: Icon Route & API Bounds (P1)

- [ ] **T004 [BE] US3 Icon route hardening**: `app/icon.svg/route.ts` — sanitize leading slash from `config.iconUrl`, path re-anchor inside `public/`, extension allowlist (`.svg/.png/.ico`), `fs/promises` + lazy request-time buffer cache, cache `max-age=86400, stale-while-revalidate=604800`, SVG-only per-response CSP `default-src 'none'; style-src 'unsafe-inline'` + nosniff (FR-005). Depends: T002 (header interplay review).
- [ ] **T005 [BE] US3 Lead API bounds & errors**: `lib/schemas/content-schema.ts` metadata key caps (≤50) + `.finite()` numbers; `app/api/lead/route.ts` Content-Length pre-check (413) + production error responses field-paths-only (FR-008/014). Depends: none.

## Phase 2: Test Contour (P2)

- [ ] **T006 [TEST] US4 Vitest setup + unit contour**: dev-dep vitest (pinned exact), `vitest.config.ts` mapping `@/*` path alias, `pnpm test` script, `tests/unit/{pick,mask-escape,lead-schema,content-loaders,rate-limit,project-config}.test.ts` per contracts/hardening.md §4 (fallback matrix, BVA bounds, fixture loaders). Acceptance: `pnpm test` green; grep=0 for `process.exit` in loaders after FR-009 edit. Depends: T003 (rate-limit exists), T005 (bounds exist).
- [ ] **T007 [TEST] US4 verify-gates.mjs**: implement gates V1/V2/V2a/V3 per `specs/004-landing-template-updates/contracts/verify-gates.md` with V3 normalized DOM body-diff stripping `<script>` and RSC hydration payloads (audit hand-off #2); `pnpm verify` script entry; CLI `--brand`. Acceptance: quickstart §4 PASS. Depends: T006 (test runner present).
- [ ] **T008 [OPS] US4 CI pipeline**: `.github/workflows/ci.yml` order `validate → test → build → verify` (SC-002). Depends: T007.

## Phase 3: Scaffold Safety (P1)

- [ ] **T009 [SETUP] US2 Scaffold validation + safe substitution**: `scripts/create-project.mjs` — name (printable, no `"`, ≤80) and domain (`/^[a-z0-9.-]+$/i` ≤253) validation before writes; function-form `replaceAll(token, () => value)` (FR-001). Depends: none.
- [ ] **T010 [SETUP] US2 Scaffold snapshot/rollback**: registry files snapshotted before rewrite; restore + `projects/<slug>/` removal on any failure including non-zero `pnpm validate`; imports inserted after last import line (FR-002). Acceptance: quickstart §5 failure simulation leaves repo compiling. Depends: T009.

## Phase 4: Hygiene Sweep (P3)

- [ ] **T011 [BE] US5 Fail-fast config & loaders**: `lib/project-config.ts` and `lib/project-pages.ts` throw on registry/page miss (FR-010); `lib/schemas/content-loaders.ts` typed errors instead of `process.exit` (FR-009). Depends: none.
- [ ] **T012 [BE] US5 Dead code removal**: undrlla marketplace keys from `lib/i18n.ts` in ru/en and lines 579–590 in uk, `.faq` blocks from `projects/underundre/locales.ts`, ForkServiceLine import, `undrlla_lang` key + custom-event listener from `lang-context.tsx`; grep=0 gate per deletion (FR-011). Depends: none.
- [ ] **T013 [FE] US5 Form abort handling**: AbortController (or mounted-ref) in `components/content/lead-form.tsx` + `projects/underundre/components/cta-underundre.tsx` (FR-017). Depends: none.
- [ ] **T014 [OPS] US5 Docker + misc**: builder stage `RUN pnpm build` (respecting `ARG NEXT_PUBLIC_PROJECT_NAME`), runner-stage `NEXT_PUBLIC_PROJECT_NAME` ARG/ENV (FR-012); remove `app/api/hello/route.ts`; `next` pinned exact + `patches/README.md` (FR-015); delete page-level `generateMetadata` in `app/(default)/page.tsx` (FR-018); `generate-preview.mjs` slug validation + hint fix + `projects/*/preview.html` into `.gitignore`/`.dockerignore` (FR-016). Depends: none.

## Phase 5: Acceptance & Gates

- [ ] **T015 [QA] US1–US5 Manual acceptance**: quickstart.md walkthrough §1–§6 (token rotation checklist, header curl matrix, hook sanity, scaffold failure simulation, hygiene greps). Records results in `specs/005-code-review-fixes/qa/`. Depends: T008, T010, T014.
- [ ] **T016 [OPS] US1–US5 Final pipeline + re-audit**: `pnpm validate && pnpm test && pnpm build && pnpm verify` green; rollback strategy documented (`git revert` + redeploy); re-run both audit lenses → 0 CRITICAL/HIGH (SC-003); PR prep. Depends: T015.

---

## Dependency Graph

```text
T001 ─────────────────────────┐
T002 ─┬─→ T004 ───────────────┤
T003 ─┼─→ T006 ─→ T007 ─→ T008┼─→ T015 ─→ T016
T005 ─┘                       │
T009 ─→ T010 ─────────────────┤
T011/T012/T013/T014 ──────────┘
```

**Parallel lanes**:
- Lane A (perimeter): T001 ∥ T002 → T004
- Lane B (API): T003 ∥ T005 → T006 → T007 → T008
- Lane C (scaffold): T009 → T010
- Lane D (hygiene): T011 ∥ T012 ∥ T013 ∥ T014
- Merge at T015 (manual QA) → T016.

**Critical path**: T003 → T006 → T007 → T008 → T015 → T016.

**MVP scope**: T002–T008 (perimeter + test contour — закрывает все CRITICAL/HIGH секьюрити и долг Principle XII); T009–T014 продлевают до полной диспозиции 26 находок.

## Agent Dispatch Plan

| Agent | Tasks | Input context | Files |
|---|---|---|---|
| [OPS] devops-engineer | T001, T002, T008, T014 | contracts/hardening.md, quickstart §2–3, audit S-03/S-10/S-11 | next.config.js, .gitleaks.toml, .github/workflows/ci.yml, Dockerfile, patches/, .gitignore |
| [BE] backend-specialist | T003, T004, T005, T011, T012 | contracts/hardening.md §1–2/5, data-model.md, audit S-02/S-04/05/07, F-05/F-06/F-11 | lib/lead/rate-limit.ts (NEW), app/api/lead/route.ts, app/icon.svg/route.ts, lib/schemas/*, lib/project-config.ts, lib/project-pages.ts, lib/i18n.ts, context/lang-context.tsx, projects/underundre/locales.ts |
| [TEST] test-engineer | T006, T007 | contracts/hardening.md §4, 004 verify-gates contract, preliminary-rtm.md | tests/unit/*, vitest.config.ts, scripts/verify-gates.mjs, package.json |
| [SETUP] orchestrator | T009, T010 | plan.md Decision #4, audit F-01/F-02, contracts/hardening.md | scripts/create-project.mjs |
| [FE] frontend-specialist | T013 | audit F-09 | components/content/lead-form.tsx, projects/underundre/components/cta-underundre.tsx |
| [QA] human-qa-tester | T015 | quickstart.md, spec acceptance scenarios | qa/ results |

## Constitution gate reminder

`/speckit.implement` requires `analyze.md` PASS + ≥2 external reviewers PASS (`specs/005-code-review-fixes/reviews/`) — Principle VI, NON-NEGOTIABLE.
