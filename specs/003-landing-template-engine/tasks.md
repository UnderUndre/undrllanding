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

### Phase 1: Foundation & Shared Schemas (Sync Barrier)

- [ ] **T-001** `[SETUP]` Implement `lib/schemas/content-schema.ts` with Zod schemas (`PricingDataSchema`, `FaqDataSchema`, `ManifestDataSchema`, `GenericLeadSubmissionSchema`) and runtime file-loaders with error diagnostics.
- [ ] **T-002** `[SETUP]` Update repository root `LICENSE` to GNU General Public License v3.0 and create `NOTICE` file detailing Cruip Simple Light provenance and UnderUndre custom architecture attribution.

---

### Phase 2: Layout Decoupling & Inversion of Control (User Story 2 — Priority: P1)

- [ ] **T-003** `[FE]` `[US2]` Update `lib/project-config.ts` to include `NavigationConfig` and `FooterConfig` interfaces in `ProjectConfig`.
- [ ] **T-004** `[FE]` `[US2]` Configure `navigation` and `footer` objects in `underundreConfig` and `undrllaConfig` in `lib/project-config.ts`.
- [ ] **T-005** `[FE]` `[US2]` Refactor `components/header-nav.tsx` to render dynamically from `config.navigation`, removing all `isUnderundre` conditions and slug checks.
- [ ] **T-006** `[FE]` `[US2]` Refactor `components/ui/footer.tsx` to render dynamically from `config.footer`, removing all `isUnderundre` conditions and slug checks.
- [ ] **T-007** `[FE]` `[US2]` Refactor `components/ui/logo.tsx` to dynamically render `config.iconUrl` and `config.name` without slug-specific hardcoding.

---

### Phase 3: Statutory Compliance Pages & Transparency (User Stories 3 & 4 — Priority: P2)

- [ ] **T-008** `[FE]` `[US3]` Implement `app/(default)/privacy/page.tsx` rendering a GDPR Art. 13 compliant Privacy Policy dynamically interpolated from active `ProjectConfig` (bilingual RU/EN).
- [ ] **T-009** `[FE]` `[US3]` Implement `app/(default)/terms/page.tsx` rendering Terms of Service covering Upwork Escrow (5%), 100% IP code transfer, and 7-day bugfix SLA (bilingual RU/EN).
- [ ] **T-010** `[FE]` `[US4]` Create `projects/underundre/data/manifest.json` containing the 7 Core Engineering Principles (Via Negativa, Zero SaaS Taxes, Schema-First DDL, Async Velocity, 100% IP, Memory Fencing, Fixed Scope).
- [ ] **T-011** `[FE]` `[US4]` Implement `app/(default)/manifest/page.tsx` consuming `manifest.json` and presenting the engineering manifesto with bilingual RU/EN support.
- [ ] **T-012** `[FE]` `[US4]` Update `projects/underundre/components/tagline-reveal.tsx` to turn the citation (*«— Инженерный манифест UnderUndre §18.9»*) into a clickable link to `/manifest`.

---

### Phase 4: Schema-Driven Content Layer & Theme Tokens (User Story 5 — Priority: P3)

- [ ] **T-013** `[FE]` `[US5]` Extract pricing tiers into `projects/underundre/data/pricing.json` and refactor `projects/underundre/components/sprint-pricing.tsx` to consume it through `loadPricingData()`.
- [ ] **T-014** `[FE]` `[US5]` Extract FAQ entries into `projects/underundre/data/faq.json` and refactor `projects/underundre/components/faq-section.tsx` to consume it through `loadFaqData()`.
- [ ] **T-015** `[FE]` `[US5]` Create `projects/underundre/theme.css` with CSS variables (`--brand-primary`, `--brand-accent`, `--brand-bg`, `--brand-surface`, `--brand-border`) and map semantic tokens in `app/css/style.css` via Tailwind v4 `@theme`.

---

### Phase 5: Pluggable Lead API Generalization

- [ ] **T-016** `[BE]` Refactor `app/api/lead/route.ts` to validate using `GenericLeadSubmissionSchema` with open `metadata: z.record(z.unknown())`.
- [ ] **T-017** `[BE]` Add support for optional `LEAD_WEBHOOK_URL` in `app/api/lead/route.ts` (JSON POST dispatch with 4000ms timeout) alongside Telegram bot alerts.

---

### Phase 6: Scaffolding Automation & Starter Template (User Story 1 — Priority: P1)

- [ ] **T-018** `[OPS]` `[US1]` Assemble `projects/_template/` canonical directory containing neutral dark palette `theme.css`, placeholder `config.ts`, `data/pricing.json`, `data/faq.json`, and favicon.
- [ ] **T-019** `[OPS]` `[US1]` Implement `scripts/create-project.mjs` supporting interactive and flagged (`--slug`, `--name`, `--domain`) project generation, and register `"project:create"` script in `package.json`.

---

### Phase 7: Verification & Build Gates

- [ ] **T-020** `[QA]` Execute `pnpm validate` (`tsc --noEmit`) asserting 0 type errors across all projects.
- [ ] **T-021** `[QA]` Execute production builds (`pnpm build:underundre` and `pnpm build:undrlla`) asserting that all routes (`/`, `/privacy`, `/terms`, `/manifest`) pre-render as static pages (`○ (Static)`).
- [ ] **T-022** `[QA]` Execute test scaffold `pnpm project:create --slug=autotest --name="Auto Test"` and assert that `NEXT_PUBLIC_PROJECT_NAME=autotest pnpm build` completes with 0 errors.

---

## Dependency Graph & Parallel Execution Lanes

```
                    ┌─────────────────┐
                    │  T-001 / T-002  │ (Schemas & Licensing)
                    └────────┬────────┘
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
  [ LANE A: LAYOUT IoC ]  [ LANE B: STATUTORY ]   [ LANE C: CONTENT & THEME ]
     T-003 (Config Types)    T-008 (Privacy Page)    T-013 (Pricing JSON)
     T-004 (Brand Configs)   T-009 (Terms Page)      T-014 (FAQ JSON)
     T-005 (Header Nav)      T-010 (Manifest JSON)   T-015 (Theme Tokens)
     T-006 (Footer Decouple) T-011 (Manifest Page)
     T-007 (Logo Decouple)   T-012 (Tagline Link)
     │                       │                       │
     └───────────────────────┼───────────────────────┘
                             │
     ┌───────────────────────┴───────────────────────┐
     ▼                                               ▼
  [ LANE D: PLUGGABLE LEAD API ]          [ LANE E: SCAFFOLD CLI ]
     T-016 (Generic Lead Schema)             T-018 (Canonical Template)
     T-017 (Webhook Dispatcher)              T-019 (create-project.mjs)
     │                                               │
     └───────────────────────┬───────────────────────┘
                             │
                             ▼
                  [ LANE F: VERIFICATION GATE ]
                     T-020 (Type Safety tsc)
                     T-021 (Build Static Routes)
                     T-022 (Scaffold E2E Test)
```

---

## Agent Dispatch Plan

| Agent | Tasks | Skills | Input Context | Files |
| :--- | :--- | :--- | :--- | :--- |
| `[SETUP]` | T-001, T-002 | clean-code, architecture | `contracts/schemas.ts`, research §2, §7 | `lib/schemas/`, `LICENSE`, `NOTICE` |
| `[FE]` | T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015 | react-patterns, tailwind-patterns, nextjs-best-practices | `spec.md` §3, `data-model.md`, research §1, §3, §5 | `components/*`, `app/(default)/*`, `projects/underundre/*` |
| `[BE]` | T-016, T-017 | api-patterns, nodejs-best-practices | `contracts/schemas.ts`, research §4 | `app/api/lead/route.ts` |
| `[OPS]` | T-018, T-019 | deployment-procedures, bash-linux | `quickstart.md`, research §6 | `projects/_template/`, `scripts/create-project.mjs`, `package.json` |
| `[QA]` | T-020, T-021, T-022 | testing-patterns, webapp-testing | `qa/preliminary-rtm.md`, NFR-001–003 | Test commands, build logs |

---

## Critical Path & Suggested MVP Scope

- **Critical Path**: `T-001` $\to$ `T-003` $\to$ `T-005` $\to$ `T-006` $\to$ `T-008` $\to$ `T-009` $\to$ `T-010` $\to$ `T-011` $\to$ `T-020` $\to$ `T-021`.
- **MVP Cut (Immediate Polish)**:
  - Phase 2 (Layout IoC: `T-003`–`T-007`) + Phase 3 (Statutory Pages: `T-008`–`T-012`).
