---
description: "Task list for 003-landing-template-engine with agent routing, dependency graph and parallel lanes"
---

# Tasks: Open-Source Multi-Brand Landing Engine & White-Label Packaging

**Input**: Design documents from `specs/003-landing-template-engine/`  
**Prerequisites**: `spec.md`, `requirements-audit.md`, `research.md`, `data-model.md`, `contracts/schemas.ts`, `plan.md`  
**Target Repository**: `undrllanding`  
**Branch**: `003-landing-template-engine`

---

## Agent Tags Summary

| Tag | Specialist Agent | Domain & Scope |
| :--- | :--- | :--- |
| `[SETUP]` | orchestrator | Contracts, schemas, build gates, licensing |
| `[FE]` | `frontend-specialist` | UI components, layouts, theme CSS, statutory pages |
| `[BE]` | `backend-specialist` | Pluggable API route handlers, Webhook dispatchers, Zod |
| `[OPS]` | `devops-engineer` | Scaffolding script, Dockerfile, build verification |
| `[QA]` | `test-engineer` | Integration tests, schema fault injection, visual verification |

---

## Task List

### Phase 1: Foundation, Decommissioning & Shared Schemas (Sync Barrier)

- [X] **T-001** `[SETUP]` Implement `lib/schemas/content-schema.ts` with Zod schemas (`LocalizedTextSchema`, `PricingDataSchema`, `FaqDataSchema`, `ManifestDataSchema`, `GenericLeadSubmissionSchema` — bilingual `LocalizedText` fields per contracts/schemas.ts rev. 2, bounded flat-scalar `metadata` max 20 keys) and runtime file-loaders with error diagnostics.
- [X] **T-002** `[SETUP]` Create repository root `LICENSE` (GNU General Public License v3.0 — no LICENSE file exists today) and `NOTICE` file detailing Cruip Simple Light provenance and UnderUndre custom architecture attribution. Delete stray `package-lock.json` (pnpm-managed repo).
- [X] **T-023** `[FE]` `[US2]` Decommission the legacy `undrlla` brand (FR-011): remove `undrllaConfig` + resolver branch from `lib/project-config.ts`, remove `dev:undrlla` / `build:undrlla` npm scripts, remove undrlla-specific components (`hero-undrlla.tsx`, `waitlist-form.tsx`, `marketplace-preview-demo.tsx`, `economics-client.tsx`, `shopify-style-features.tsx`), the `/economics` route and `/api/waitlist` endpoint, and `data-theme="undrlla"` styling. Assert `pnpm validate` + `pnpm build:underundre` stay green after removal. *(Undrlla's replacement landing will be re-scaffolded later as a regular template consumer.)*

---

### Phase 2: Layout Decoupling & Inversion of Control (User Story 2 — Priority: P1)

- [X] **T-003** `[FE]` `[US2]` Update `lib/project-config.ts`: add `NavigationConfig`, `FooterConfig` (canonical: `showLegalLinks`, `showManifestLink`) and `legal` (`contactEmail`, `entityName`, `jurisdiction`, `retentionMonths?`, `escrowProvider?`, `warrantyDays?`) to `ProjectConfig`; migrate `underundreConfig` into `projects/underundre/config.ts` (imported by the lib resolver — single source of truth, review F5).
- [X] **T-004** `[FE]` `[US2]` Configure `navigation`, `footer` (incl. `showManifestLink: true`) and `legal` in `projects/underundre/config.ts`, porting the exact current header/footer copy from the hardcoded branches (both RU/EN variants).
- [X] **T-005** `[FE]` `[US2]` Refactor `components/header-nav.tsx` to render dynamically from `config.navigation`, removing all `isUnderundre` conditions and slug checks; ALSO decouple the theme-mode switcher — derive the `localStorage` key and `data-theme` namespace from `config.slug` (no `"undrlla_theme"` / `"undrlla"` literals may remain).
- [X] **T-006** `[FE]` `[US2]` Refactor `components/ui/footer.tsx` to render dynamically from `config.footer`, removing all `isUnderundre` conditions and slug checks; render `/privacy` + `/terms` links per `showLegalLinks` and `/manifest` per `showManifestLink`.
- [X] **T-007** `[FE]` `[US2]` Refactor `components/ui/logo.tsx` to dynamically render `config.iconUrl` and `config.name` without slug-specific hardcoding.

---

### Phase 3: Statutory Compliance Pages & Transparency (User Stories 3 & 4 — Priority: P2)

- [X] **T-008** `[FE]` `[US3]` Implement `app/(default)/privacy/page.tsx` rendering a GDPR Art. 13 compliant Privacy Policy dynamically interpolated from active `ProjectConfig` (`config.legal` block per FR-006; marked placeholders when fields missing — bilingual RU/EN).
- [X] **T-009** `[FE]` `[US3]` Implement `app/(default)/terms/page.tsx` rendering Terms of Service covering Upwork Escrow (5%), 100% IP code transfer, and 7-day bugfix SLA — escrow/warranty clauses interpolated from overridable `config.legal` fields per FR-007 (bilingual RU/EN).
- [X] **T-010** `[FE]` `[US4]` Create `projects/underundre/data/manifest.json` containing the 7 Core Engineering Principles (Via Negativa, Zero SaaS Taxes, Schema-First DDL, Async Velocity, 100% IP, Memory Fencing, Fixed Scope).
- [X] **T-011** `[FE]` `[US4]` Implement `app/(default)/manifest/page.tsx` consuming `manifest.json` and presenting the engineering manifesto with bilingual RU/EN support.
- [X] **T-012** `[FE]` `[US4]` Update `projects/underundre/components/tagline-reveal.tsx` to turn the citation (*«— Инженерный манифест UnderUndre §18.9»*) into a clickable link to `/manifest`.

---

### Phase 4: Schema-Driven Content Layer & Theme Tokens (User Story 5 — Priority: P3)

- [X] **T-013** `[FE]` `[US5]` Extract pricing tiers into `projects/underundre/data/pricing.json` **in both languages** (RU block from `locales.ts` pricing + EN block — neither language may be dropped) and refactor `projects/underundre/components/sprint-pricing.tsx` to consume it through `loadPricingData()`, rendering the variant selected by the language context.
- [X] **T-014** `[FE]` `[US5]` Extract FAQ entries into `projects/underundre/data/faq.json` (bilingual, both language blocks) and refactor `projects/underundre/components/faq-section.tsx` to consume it through `loadFaqData()`.
- [X] **T-015** `[FE]` `[US5]` Create `projects/underundre/theme.css` with the canonical 8-token set (`--brand-bg`, `--brand-surface`, `--brand-surface-subtle`, `--brand-primary`, `--brand-primary-hover`, `--brand-secondary`, `--brand-accent`, `--brand-border`) and map semantic tokens in `app/css/style.css` via Tailwind v4 `@theme`.

---

### Phase 5: Pluggable Lead API Generalization

- [X] **T-016** `[BE]` Refactor `app/api/lead/route.ts` to validate using `GenericLeadSubmissionSchema` (bounded flat-scalar `metadata`: max 20 keys, string ≤ 500 / number / boolean). Acceptance criteria: (a) existing `escapeHtml` is preserved on all outbound Telegram text; (b) in-memory per-IP rate limit (≤ 5 req/min) returns 429; (c) oversized/deeply-nested payloads get 4xx, never a hang or 500; (d) console logging redacts email/contact; (e) `fallback` semantics: `"direct"` (no sinks) / `"none"` (all delivered) / `"partial"` (some sink failed, still HTTP 200).
- [X] **T-017** `[BE]` Add support for optional `LEAD_WEBHOOK_URL` in `app/api/lead/route.ts` (JSON POST dispatch with 4000ms timeout) alongside Telegram bot alerts.
- [X] **T-024** `[FE]` **Migrate the existing lead form (review F1 — CRITICAL, same merge as T-016, deploy-blocking):** refactor `projects/underundre/components/cta-underundre.tsx` to post `{email, contact, message, metadata: { bottleneckType, ... }}` (mapping: `messenger → contact`, `stackAndTeam → message`, `bottleneckType` select → `metadata.bottleneckType`); update the success/error UI to handle `fallback: "direct" | "partial" | "none"`.

---

### Phase 6: Scaffolding Automation & Starter Template (User Story 1 — Priority: P1)

- [X] **T-018** `[OPS]` `[US1]` Assemble `projects/_template/` canonical directory containing neutral dark palette `theme.css`, placeholder `config.ts` (incl. `legal` block with marked placeholders + "replace before production" warning), `data/pricing.json`, `data/faq.json`, and favicon.
- [X] **T-019** `[OPS]` `[US1]` Implement `scripts/create-project.mjs` supporting interactive and flagged (`--slug`, `--name`, `--domain`, `--primary-color`, `--accent-color`) project generation; register `"project:create"` script in `package.json`; append a delimited import + registry entry block to `lib/project-config.ts` and immediately run `pnpm validate`; reject duplicate/malformed slugs; warn when the chosen palette computes to < 4.5:1 contrast on the dark background.

---

### Phase 7: Verification & Build Gates

- [X] **T-020** `[QA]` Execute `pnpm validate` (`tsc --noEmit`) asserting 0 type errors across all projects.
- [X] **T-021** `[QA]` Execute production builds (`pnpm build:underundre`, plus a freshly scaffolded test brand) asserting that all applicable routes (`/`, `/privacy`, `/terms`, and `/manifest` where `showManifestLink`) pre-render as static pages (`○ (Static)`). *(Legacy `undrlla` build target is removed per FR-011.)*
- [X] **T-022** `[QA]` Execute test scaffold `node scripts/create-project.mjs --slug=autotest --name="Auto Test"` and assert that `npx cross-env NEXT_PUBLIC_PROJECT_NAME=autotest pnpm build` completes with 0 errors (cross-env for Windows compatibility).
- [~] **T-025** `[QA]` Run Lighthouse + axe-core on `/`, `/privacy`, `/terms`, `/manifest` for `underundre` and the test brand: LCP ≤ 1.5s, CLS = 0, contrast ≥ 4.5:1, WCAG 2.1 AA pass (NFR-002/003 evidence for the RTM).
- [~] **T-026** `[QA]` E2E: submit the REAL lead form (`cta-underundre.tsx`) via Playwright/browser automation against a dev server and assert HTTP 200 + success state (guards the T-016/T-024 contract pairing — curl-only tests do not cover this).

---

## Dependency Graph & Parallel Execution Lanes

```
                    ┌─────────────────────────────┐
                    │  T-001 / T-002 / T-023      │ (Schemas, Licensing, undrlla Decommission)
                    └──────────────┬──────────────┘
                                   │
     ┌─────────────────────────────┼───────────────────────────┐
     ▼                             ▼                           ▼
  [ LANE A: LAYOUT IoC ]      [ LANE B: STATUTORY ]     [ LANE C: CONTENT & THEME ]
     T-003 (Config Types+legal)  T-008 (Privacy Page)      T-013 (Pricing JSON, RU+EN)
     T-004 (Brand Config)        T-009 (Terms Page)        T-014 (FAQ JSON, RU+EN)
     T-005 (Header Nav+Theme)    T-010 (Manifest JSON)     T-015 (Theme Tokens ×8)
     T-006 (Footer Decouple)     T-011 (Manifest Page)
     T-007 (Logo Decouple)       T-012 (Tagline Link)
     │                           │                           │
     └───────────────────────────┼───────────────────────────┘
                                 │
     ┌───────────────────────────┴────────────────────┐
     ▼                                                ▼
  [ LANE D: PLUGGABLE LEAD API ]              [ LANE E: SCAFFOLD CLI ]
     T-016 (Generic Lead Schema+security)        T-018 (Canonical Template)
     T-017 (Webhook Dispatcher)                  T-019 (create-project.mjs)
     T-024 (Form Migration — SAME MERGE as T-016)
     │                                                │
     └───────────────────────┬────────────────────────┘
                             ▼
                  [ LANE F: VERIFICATION GATE ]
                     T-020 (Type Safety tsc)
                     T-021 (Build Static Routes)
                     T-022 (Scaffold E2E Test)
                     T-025 (Lighthouse/axe NFR-002/003)
                     T-026 (Real-Form Lead E2E)
```

---

## Agent Dispatch Plan

| Agent | Tasks | Skills | Input Context | Files |
| :--- | :--- | :--- | :--- | :--- |
| `[SETUP]` | T-001, T-002 | clean-code, architecture | `contracts/schemas.ts`, research §2, §7 | `lib/schemas/`, `LICENSE`, `NOTICE` |
| `[FE]` | T-023, T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-024 | react-patterns, tailwind-patterns, nextjs-best-practices | `spec.md` §3, `data-model.md`, research §1, §3, §5 | `components/*`, `app/(default)/*`, `app/api/waitlist` (removal), `app/economics` (removal), `projects/underundre/*` |
| `[BE]` | T-016, T-017 | api-patterns, nodejs-best-practices | `contracts/schemas.ts`, research §4 | `app/api/lead/route.ts` |
| `[OPS]` | T-018, T-019 | deployment-procedures, bash-linux | `quickstart.md`, research §6 | `projects/_template/`, `scripts/create-project.mjs`, `package.json` |
| `[QA]` | T-020, T-021, T-022, T-025, T-026 | testing-patterns, webapp-testing | `qa/preliminary-rtm.md`, NFR-001–003 | Test commands, build logs, Lighthouse/axe reports |

---

## Critical Path & Suggested MVP Scope

- **Critical Path**: `T-023` $\to$ `T-001` $\to$ `T-003` $\to$ `T-005` $\to$ `T-006` $\to$ `T-008` $\to$ `T-009` $\to$ `T-010` $\to$ `T-011` $\to$ `T-020` $\to$ `T-021` (+ `T-016` $\to$ `T-024` pair must land in one merge).
- **MVP Cut (Immediate Polish)**:
  - Phase 1 decommission (T-023) + Phase 2 (Layout IoC: `T-003`–`T-007`) + Phase 3 (Statutory Pages: `T-008`–`T-012`) + the T-016/T-024 lead-contract pair.

---

## Execution Log (2026-10-30)

- T-001..T-024 completed with atomic commits (`92e814d`..`537c284`); `pnpm validate` and `pnpm build` green after every phase.
- Verified live: lead API smoke (200/400/413-class, nested-metadata 400, per-IP 429 after 5 req), scaffold E2E (`autotest` brand generated → registry append → `pnpm validate` → full static build → removed), statutory routes static with config interpolation, footer legal/manifest links present, zero brand literals in shared components.
- T-025 (Lighthouse/axe evidence) and T-026 (real-form Playwright E2E) marked `[~]` — require browser tooling pass on staging; see qa/test-cases.md TC-LTE-023..026.
- Note: brand config lives at `projects/<slug>/brand.ts` (not `config.ts` as in plan tree) to keep the component registry (`config.tsx`) separate from server-safe brand data — documented deviation.
