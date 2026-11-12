# Tasks: 008-proof-and-leak-engine

**Input**: Design documents from `specs/008-proof-and-leak-engine/`  
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/verify-gates-v6.md ✅, requirements-audit.md PASS ✅

## Format: `[ID] [AGENT] [Story?] Description`

## Task Statuses

`- [ ]` pending · `- [→]` in progress · `- [X]` done · `- [!]` failed · `- [~]` blocked

---

## Phase 1: Core Foundation & Data Schemas (US1, US2, US4)

- [ ] **T001 [SETUP] [US2] Teardown Zod Schema & File Loaders**: Create `lib/schemas/teardown-schema.ts` defining `TeardownCaseSchema` (bilingual localized text, metrics, steps, architecture comparison, DDL snippet) and `lib/schemas/teardown-loaders.ts` (`loadAllTeardowns`, `loadTeardownBySlug`). Update `ProjectConfig` in `lib/project-config.ts` with optional `hasTeardowns?: boolean; hasCalculator?: boolean`.
- [ ] **T002 [TEST] [US2] Unit Tests for Teardown Schemas & Loaders**: Create `tests/unit/teardown-schema.test.ts` validating valid schemas, invalid missing fields, negative number rejections, and missing-directory graceful fallback (`[]`).
- [ ] **T003 [FE] [US1] TDABC Math Engine & Boundary Unit Tests**: Create `lib/calculator-math.ts` with pure function `calculateTdabcLeak(inputs)` evaluating Labor Waste, SaaS Bloat, and Total Friction Tax. Create `tests/unit/calculator.test.ts` validating BVA boundaries (Team: 1–500, Hours: 1–80, Rate: $15–$250).

---

## Phase 2: User Story 1 — TDABC Operational Leak Calculator (Priority: P1)

- [ ] **T004 [FE] [US1] Interactive Calculator Component & Lead Bridge**: Create `components/calculator/tdabc-calculator.tsx` (sliders, tool toggles, real-time math, responsive mobile layout). Implement client bridge to smoothly scroll to `#contact` and populate form state in `projects/underundre/components/cta-underundre.tsx` with `{ teamSize, routineHoursPerWeek, annualLaborLeakUsd, saasBloatUsd, totalLeakUsd }`.
- [ ] **T005 [FE] [US1] Standalone `/calculator` Route & Homepage Section**: Create `app/(default)/calculator/page.tsx` (static route with metadata and canonical) and embed the calculator section into `projects/underundre/config.tsx` between the Loom demo and Pricing sections.

---

## Phase 3: User Story 2 — Public Forensic Teardown Vault (Priority: P1)

- [ ] **T006 [SETUP] [US2] Three Canonical Sanitized Case Studies (Audit Provenance & Voice Rules)**: Create 3 modular JSON case studies in `projects/underundre/data/teardowns/` bound to the delivered audit corpus (`undreplans/docs/projects/underundre/clients/` and `content/2026-11-12-ready-to-publish-content-pack.md`):
  1. `ats-recruiting-sync-leak.json` (Source: Employcity audit; B2B Recruiting / ATS manual sync leak: $32k/yr, 18h/wk; basis: "audit").
  2. `whatsapp-retail-order-desk.json` (Source: GortsUp/SANDS audit; Wholesale WhatsApp-to-Excel order desk leak: $41k/yr, 22h/wk; basis: "composite").
  3. `field-service-dispatch-lockin.json` (Source: Ermak / Smart IT Power; Field Service dispatch SaaS seat tax lock-in: $27k/yr; basis: "audit").
  Enforce Principle XV voice rules (first-person Андрей, no agency «мы», no Валера in customer-facing text).
- [ ] **T007 [FE] [US2] Teardown Cards & Vault Index `/teardowns`**: Create `components/teardowns/teardown-card.tsx` and `app/(default)/teardowns/page.tsx` rendering case study grid, metrics chips, and `CollectionPage` JSON-LD.
- [ ] **T008 [FE] [US2] Dynamic Autopsy Route `/teardowns/[slug]`**: Create `app/(default)/teardowns/[slug]/page.tsx` with `generateStaticParams()`, `generateMetadata()`, `Article` and `BreadcrumbList` JSON-LD, DDL snippet syntax presentation, and prominent "Book Audit with these Metrics" CTA.

---

## Phase 4: User Story 3 — Visual Architecture Inspector (Priority: P2)

- [ ] **T009 [FE] [US3] Zero-Dependency Visual Architecture Inspector & i18n Copy**:
  - Add bilingual `inspector` copy block to `projects/underundre/locales.ts` (RU + EN).
  - Create `components/architecture/visual-contract-inspector.tsx` using pure React 19 + SVG/Tailwind v4 (NFR-003). Contrasts Fragile SaaS Webhook Cascade with Sovereign FOSS Pipeline (step inspection, latency counters, failure probability badges, running costs). Embed in `/teardowns/[slug]` and bureau homepage.

---

## Phase 5: User Story 4 — Multi-Brand Isolation & Gate V6 (Priority: P3)

- [ ] **T010 [TEST] [US4] Implement Gate V6 in `scripts/verify-gates.mjs`**: Extend `verify-gates.mjs` with:
  - `V6.1-teardowns-schema`: Zod validation across all JSON cases + slug uniqueness assertion.
  - `V6.2-opsec-pii`: Negative regex scan on localized text fields for unmasked international phones (`\+[1-9]\d{8,14}`) and real email domains.
  - `V6.3-routes`: Prerender assertion via `data-testid` contracts and Article JSON-LD validation.
  - `V6.4-brand-isolation`: Asserts non-participating brands (e.g. `undreading`) omit or 404 on bureau teardowns.
  - `V6.5-calculator-bounds`: Asserts `lib/calculator-math.ts` exports clamping for team (1-500), hours (1-80), and rate ($15-$250).
- [ ] **T011 [OPS] [US4] Brand Config, Sitemap & Gate V3 Baseline Refresh**: Update `projects/underundre/brand.ts` (`hasTeardowns: true`, `hasCalculator: true`, footer navigation links); update `app/sitemap.ts` to conditionally include `/teardowns` and `/calculator`; refresh Gate V3 baseline `specs/004-landing-template-updates/qa/baseline/index.html`.

---

## Phase 6: Acceptance & Pipeline Verification

- [ ] **T012 [QA] Verification Walkthrough & Gate Clearance**: Execute `pnpm validate && pnpm test && pnpm build:underundre && pnpm verify --brand underundre` and `pnpm build:undreading && pnpm verify --brand undreading`. Verify all 20 gate checks (V1–V6) pass without warnings. Complete manual walkthrough per `quickstart.md` and record results in `specs/008-proof-and-leak-engine/qa/manual-qa.md`.

---

## Dependency Graph

```text
T001 ──→ T002 ──┐
T003 ──→ T004 ──┼─→ T005 ──┐
T006 ──→ T007 ──┼─→ T008 ──┼─→ T010 ──→ T011 ──→ T012
        T009 ──┘          │
                          │
```

**Parallel Lanes**:
- **Lane A (Calculator Core & UI)**: T003 → T004 → T005
- **Lane B (Teardowns Data & Vault)**: T001 → T002 + T006 → T007 → T008
- **Lane C (Visual Architecture)**: T009 (independent component)
- **Merge Point**: T010 (Gate V6 requires T005, T008, T009) → T011 → T012

**Critical Path**: T001 → T006 → T008 → T010 → T011 → T012.  
**MVP Scope**: Phase 1 + Phase 2 (T001–T005: TDABC Calculator functional on homepage and `/calculator`).

---

## Agent Dispatch Plan

| Agent | Tasks | Input Context | Target Files |
| :--- | :--- | :--- | :--- |
| **[SETUP]** orchestrator | T001, T006 | `data-model.md`, `research.md` R-02 | `lib/schemas/teardown-schema.ts`, `lib/schemas/teardown-loaders.ts`, `projects/underundre/data/teardowns/*.json` |
| **[FE]** frontend-specialist | T004, T005, T007, T008, T009 | `plan.md` DD-1..DD-6, `spec.md` FR-001..FR-011 | `components/calculator/*`, `components/teardowns/*`, `components/architecture/*`, `app/(default)/*` |
| **[TEST]** test-engineer | T002, T003, T010 | `contracts/verify-gates-v6.md`, `qa/preliminary-rtm.md` | `tests/unit/*`, `scripts/verify-gates.mjs` |
| **[OPS]** devops-engineer | T011 | `plan.md` DD-7, contract maintenance protocol | `projects/underundre/brand.ts`, `app/sitemap.ts`, `qa/baseline/index.html` |
| **[QA]** human-qa-tester | T012 | `quickstart.md`, `spec.md` Acceptance Scenarios | `specs/008-proof-and-leak-engine/qa/manual-qa.md` |

---

## Constitution Gate Reminder

Per Constitution Principle VI: Before `/speckit.implement` can be invoked, `specs/008-proof-and-leak-engine/reviews/analyze.md` MUST pass, accompanied by $\ge 2$ external AI reviews or an explicit owner `--override-gate`.
