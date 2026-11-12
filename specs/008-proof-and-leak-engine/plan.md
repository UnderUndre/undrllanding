# Implementation Plan: 008-proof-and-leak-engine

**Branch**: `feature/008-proof-and-leak-engine` | **Date**: 2026-11-12 | **Spec**: [spec.md](spec.md)  
**Input**: spec.md (Clarified Q1–Q3) + `requirements-audit.md` PASS (ISO 29148)  
**Parent Features**: 005 (Duplex Intake & Telemetry), 006 (SEO & JSON-LD), 007 (Referral Attribution)

---

## Summary

Implement the three-pillar conversion and proof engine targeting `LOST_STATUS_QUO` friction:
1. **TDABC Leak Calculator**: Standalone `/calculator` and embedded homepage section translating team size and manual hours into annual operational friction waste ($/yr), piping telemetry into `#contact` / `/api/lead`.
2. **Sanitized Teardown Vault**: Modular case studies in `projects/<brand>/data/teardowns/*.json` rendered statically at `/teardowns` and `/teardowns/[slug]` with `Article` JSON-LD and zero gated download forms.
3. **Visual Architecture Inspector**: Zero-dependency side-by-side comparison widget highlighting fragile SaaS webhook cascades vs sovereign schema-first FOSS contracts.
4. **Gate V6 & Isolation**: Automated CI verification in `scripts/verify-gates.mjs` verifying Zod schemas, Article JSON-LD, OpSec PII sanitization, and brand isolation.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Next.js 15.1.11 (App Router), React 19  
**Primary Dependencies**: Existing stack only (Tailwind CSS v4, Zod, Vitest) — zero external chart or sandbox libraries (NFR-003)  
**Storage**: Modular static JSON files (`projects/<brand>/data/teardowns/<slug>.json`) + client-side state / localStorage  
**Testing**: `pnpm validate` (`tsc --noEmit`), `pnpm test` (Vitest), `pnpm verify` (Gates V1–V6)  
**Target Platform**: Statically prerendered (`○ Static`) behind Caddy on VPS; client interaction in React 19  
**Performance Goals**: LCP ≤ 1.5s, CLS = 0, client bundle increase ≤ 15 KB gzipped (NFR-002)  
**Constraints**: Zero PII in teardowns; strict multi-brand isolation (undreading renders 404 for bureau teardowns); Gate V3 baseline refreshed once per contract protocol  
**Security Surface**: Client input bounds sanitization, zero unescaped JSON-LD (S-02 `<`-escape), OpSec negative scan for real client identities (Gate V6)  
**Database Migration Trigger**: N/A (no database)

---

## Constitution Check

*GATE: Must pass before task breakdown. Re-evaluated post-design.*

| Principle | Status | Notes |
| :--- | :--- | :--- |
| **I. Source of Truth Discipline** | PASS | `.claude/` authoritative; no generated-tree hand edits. Case data in `projects/<brand>/data/teardowns/`. |
| **II. Transformer, Not Fork** | N/A | Helpers pipeline untouched. |
| **IV. SemVer 0.x** | PASS | Landing repo, zero version bump required. |
| **V. Token Economy** | PASS | Modular teardown files prevent monolithic context bloat. |
| **VI. Cross-AI Review Gate** | PENDING | Mandatory before `/speckit.implement` (analyze PASS + ≥2 external reviews, or explicit override). |
| **VII. Artifact Versioning** | PASS | `spec/v1`, `clarify/v1`, `requirements-audit/v1` tagged; plan/tasks follow. |
| **IX. Two-Phase Review Flow** | PASS | Feature branch `feature/008-proof-and-leak-engine`. |
| **XII. QA & Test Contour** | PASS | Extends verify-gates with Gate V6 and Vitest unit suites for TDABC math and Zod loader. |
| **XV. Narrative Integrity** | PASS | First-person solo founder voice (Андрей), no agency «мы», no Валера in customer-facing artifacts. |

---

## Project Structure

### Documentation (this feature)

```text
specs/008-proof-and-leak-engine/
├── spec.md                  # Clarified specification
├── checklists/requirements.md # Quality checklist (PASS)
├── requirements-audit.md    # ISO 29148 4-pillar audit report (PASS)
├── qa/preliminary-rtm.md    # Risk-based traceability matrix
├── plan.md                  # This file
├── research.md              # Research & technical decisions
├── data-model.md            # Zod schemas & telemetry entities
├── contracts/
│   └── verify-gates-v6.md   # Gate V6 CI verification specification
├── quickstart.md            # Verification walkthrough
└── tasks.md                 # Implementation task breakdown (Phase 2)
```

### Source Code (repository root, undrllanding/)

```text
lib/schemas/teardown-schema.ts               # NEW: Zod schema for teardown cases
lib/schemas/teardown-loaders.ts              # NEW: Typed loader for modular teardown JSON files
lib/schemas/content-schema.ts                # MODIFY: Lead metadata typing for calculator telemetry
lib/project-config.ts                        # MODIFY: hasTeardowns & hasCalculator flags in ProjectConfig
components/calculator/tdabc-calculator.tsx   # NEW: Pure React 19 interactive TDABC calculator
components/architecture/visual-contract-inspector.tsx # NEW: Zero-dependency SVG/CSS comparison widget
components/teardowns/teardown-card.tsx       # NEW: Teardown card for index and homepage
app/(default)/calculator/page.tsx            # NEW: Standalone /calculator route
app/(default)/teardowns/page.tsx             # NEW: /teardowns index route
app/(default)/teardowns/[slug]/page.tsx      # NEW: Statically pre-rendered teardown autopsy page
projects/underundre/data/teardowns/          # NEW: 3 modular case studies
  ├── ats-recruiting-sync-leak.json
  ├── whatsapp-retail-order-desk.json
  └── field-service-dispatch-lockin.json
projects/underundre/config.tsx               # MODIFY: Embed Calculator & Featured Teardowns sections
projects/underundre/brand.ts                 # MODIFY: Enable flags + footer links to Teardowns/Calculator
app/sitemap.ts                               # MODIFY: Conditionally include /teardowns & /calculator
scripts/verify-gates.mjs                     # MODIFY: Implement Gate V6 (Zod, JSON-LD, OpSec PII scan)
specs/004-landing-template-updates/qa/baseline/index.html # REFRESH: Updated DOM baseline for Gate V3
```

---

## Phase 1 Design Decisions

1. **DD-1: TDABC Calculator Math Engine**: Implemented as pure TypeScript function `calculateTdabcLeak(inputs)` in `lib/calculator-math.ts` to allow 100% unit-test isolation in Vitest without React DOM mounting overhead.
2. **DD-2: Seamless Form Scroll & State Transfer**: The calculator's "Apply to Audit Brief" button updates a client context / state store (`useCalculatorBridge`), which pre-selects the routine hours radio and injects `metadata` into `projects/underundre/components/cta-underundre.tsx` before triggering `element.scrollIntoView({ behavior: 'smooth' })`.
3. **DD-3: Modular Case Study File System**: Case studies reside in `projects/<brand>/data/teardowns/*.json`. `loadAllTeardowns(slug)` reads and validates all JSON files in the folder. If directory is missing, returns `[]` without error (safe for `undreading`).
4. **DD-4: Next.js 15 Static Prerendering (`generateStaticParams`)**: `app/(default)/teardowns/[slug]/page.tsx` declares `generateStaticParams()` reading all slugs from the active brand's teardowns directory at build time. Missing or unconfigured brands return `[]`, ensuring `○ Static` build behavior.
5. **DD-5: Zero-Dependency Visual Comparison Widget**: The `VisualContractInspector` accepts `comparison: TeardownArchitectureComparison` prop. It renders a clean interactive tab/toggle with step cards, latency counters, failure probability badges, and cost counters using Tailwind v4 arbitrary values and CSS transitions.
6. **DD-6: SEO Article Schema with Injection Protection**: Dynamic `generateMetadata` on `/teardowns/[slug]` produces unique `title`, `description`, canonical URL, and renders an `<ArticleJsonLd>` component with `.replace(/</g, "\\u003c")`.
7. **DD-7: CI Gate V6**: Added to `scripts/verify-gates.mjs`. Tests schema validity across all teardown files, checks presence of Article JSON-LD on generated routes, and runs negative regex checks for unmasked PII.

---

## Deployment Readiness

- `pnpm validate && pnpm test && pnpm build:underundre && pnpm verify --brand underundre` green.
- `pnpm exec cross-env NEXT_PUBLIC_PROJECT_NAME=undreading next build && pnpm verify --brand undreading` green (no 404 leaks, no cross-contamination).
- Gate V3 baseline updated and committed.
