# Tasks: 004-landing-template-updates

**Input**: Design documents from `specs/004-landing-template-updates/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/verify-gates.md ✅, requirements-audit.md PASS ✅

**Tests**: Included — spec defines measurable gates (V1–V4) and byte-diff baselines.

## Format: `[ID] [AGENT] [Story?] Description`

## Task Statuses

`- [ ]` pending · `- [→]` in progress · `- [X]` done · `- [!]` failed · `- [~]` blocked

---

## Phase 0: Setup & Baseline

- [x] **T001 [SETUP] US1–US3 baseline already in tree**: `lib/project-config.ts` (faviconUrl/appleIconUrl), `projects/underundre/brand.ts`, `app/layout.tsx` metadata, `app/icon.svg/route.ts` MIME map, `components/ui/logo.tsx` chrome-free, citation «§ 1 (Via Negativa)» + anchors, PNG assets generated. (Session 2026-11-02; commit fcd5ef9 + working tree.) Verify each against FR-001..FR-007 acceptance scenarios — re-implementation forbidden.
- [ ] **T002 [SETUP] US1 Capture ru/en baseline (SC-005, Gate V3)**: build `NEXT_PUBLIC_PROJECT_NAME=underundre npm run build` pre-FR-010; copy `.next` HTML output for all routes into `specs/004-landing-template-updates/qa/baseline/`; commit. **Blocks T007.**

## Phase 1: Locale Extension (FR-010)

- [ ] **T003 [FE] US4 Extend `LocalizedText` to `{ ru: string; en: string; uk?: string }`**: `lib/project-config.ts` type + `lib/i18n.ts` resolver — single choke point `pick(t, lang)` with fallback `uk→en→ru→""`. No per-component fallbacks. Files: `lib/project-config.ts`, `lib/i18n.ts`, type consumers (tsc-guided). Parallel with T002.
- [ ] **T004 [FE] US4 Wire shared shared-section components through the new resolver**: replace direct `t.ru/t.en` indexing with `pick()` wherever `uk` may appear (grep `\.ru\b|\.en\b` in components rendering brand copy). Acceptance: underundre ru/en output unchanged (T007 gate).

## Phase 2: Verify Gates (contracts/verify-gates.md)

- [ ] **T005 [E2E] US1–US3 Implement `scripts/verify-gates.mjs`**: gates V1 (citation grep + anchor resolution), V2 (asset existence/size/dimensions via PNG header parse, duplicate + cross-brand scans), V2a (logo chrome-free: no inline theme-derived backgroundColor/borderColor/padding in logo wrapper — grep JSX + rendered HTML = 0), V3 (uk fallback + byte-diff vs T002 baseline), CLI `--brand`. Add `"verify": "node scripts/verify-gates.mjs"` to package.json. Depends: T002.
- [ ] **T006 [OPS] US1 Wire `npm run verify` into CI before deploy**: extend existing workflow; verify runs after `validate` + `build`. Depends: T005.

## Phase 3: Pilot Brand undreading (FR-011)

- [ ] **T007 [SETUP] US4 Fix template + scaffold emission (audit §2)**: `projects/_template/` icon assets move to `public/projects/<slug>/`; `scripts/create-project.mjs` emits `icon.svg` + `icon-48.png` + `apple-icon-180.png` per FR-003/FR-004 (48/180 px PNG templates from neutral placeholder art). Depends: T005 (gates validate emission).
- [ ] **T008 [SETUP] US4 Scaffold `projects/undreading/`**: `pnpm project:create --slug=undreading --name=Undreading`; brand.ts (domain undreading.com), theme.css = `_template` palette (`#030712` / `#2563eb`) until a dedicated brand kit lands (token swap = separate task outside 004), copy/pricing/faq/manifest from `undreplans/docs/projects/undreading/undreading-business-plan.md` v2.5 (§1 positioning, §2 pricing grid: PWYW $5/$12.99, KDP $24.99 EN/UK, Lulu DTC RU, GitHub Sponsors), legal.json (Paddle MoR, NACE 62.01, retention 12mo). Includes `uk` locale — pilot of FR-010. Depends: T003, T004, T007.
- [ ] **T009 [FE] US4 Generate undreading icon set**: source artwork from undreading assets (repos/undreading cover-art or placeholder until brand kit); produce `public/projects/undreading/{icon.svg,icon-48.png,apple-icon-180.png}` meeting size budgets. Depends: T007.
- [ ] **T010 [E2E] US4 Full-gate pass for undreading**: `NEXT_PUBLIC_PROJECT_NAME=undreading npm run build && npm run verify -- --brand undreading`; grep output for `underundre` = 0; gate V2a pass for both brands. Depends: T005, T008, T009.

## Phase 4: Acceptance & Gates

- [ ] **T011 [QA] US1–US4 Manual acceptance**: quickstart.md walkthrough (icons MIME probes, logo hover, citation scroll under fixed header, iOS emulator apple icon, uk locale spot-check, LCP spot-check both brands via Lighthouse — NFR-002, target ≤ 1.5 s, no regression vs pre-004 build). Records results in `specs/004-landing-template-updates/qa/`.
- [ ] **T012 [OPS] US1 Final pipeline**: `npm run validate && npm run build && npm run verify` green on both brands; PR prep. Depends: T006, T010, T011.

---

## Dependency Graph

```text
T001 (done) ─┐
T002 ────────┼─→ T005 ─→ T006 ─┐
T003 ─→ T004 ┘                 ├─→ T012
T007 ─→ T008 ──────────────┐   │
T009 ──────────────────────┴─→ T010 ┘
T010 ─→ T011 (manual, parallel w/ T006)
```

**Parallel lanes**:
- Lane A: T002 → T005 → T006
- Lane B: T003 → T004 (locale)
- Lane C: T007 → T008, T009 → T010
- Lane A/B/C merge at T010/T012.

**Critical path**: T002 → T005 → T008 → T010 → T012.

**MVP scope**: T001–T005 (engine hardening verifiable without pilot); T007+ extends to template validation.

## Agent Dispatch Plan

| Agent | Tasks | Input context | Files |
|---|---|---|---|
| [SETUP] orchestrator | T002, T007, T008 | plan.md, data-model.md, research.md R-02/R-04, business plan v2.5 | projects/_template/, scripts/create-project.mjs, projects/undreading/ |
| [FE] frontend-specialist | T003, T004, T009 | data-model.md (LocalizedText contract), FR-010 | lib/project-config.ts, lib/i18n.ts, components/, public/projects/undreading/ |
| [E2E] test-engineer | T005, T010 | contracts/verify-gates.md (authoritative), RTM | scripts/verify-gates.mjs, package.json |
| [OPS] devops-engineer | T006, T012 | contracts/verify-gates.md §CI | CI workflow, package.json |
| [QA] human-qa-tester | T011 | quickstart.md, spec acceptance scenarios | qa/ results |

## Constitution gate reminder

`/speckit.implement` requires `analyze.md` PASS + ≥2 external reviewers PASS (`specs/004-landing-template-updates/reviews/`) — Principle VI, NON-NEGOTIABLE.
