# Feature Specification: 008-proof-and-leak-engine — Forensic Teardowns, TDABC Leak Calculator & Visual Architecture Proof

**Feature Branch**: `feature/008-proof-and-leak-engine`  
**Repository**: `undrllanding`  
**Created**: 2026-11-12  
**Status**: Clarified (Ready for Plan & Tasks)  
**Parent Features**: `specs/005-code-review-fixes` (Duplex Intake + Metadata Pipeline), `specs/006-seo-geo-foundation` (Canonical/Sitemap/JSON-LD), `specs/007-referral-program` (Attribution & Incentives)  
**Input Directive**: Synthesize all 3 brainstorm vectors into a single conversion-focused proof engine:
1. Public Sanitized Teardowns (`/teardowns` and `/teardowns/[slug]`) showing fully readable, ungated forensic step-by-step autopsies of real client SaaS workarounds.
2. Self-Serve TDABC Leak Calculator (`/calculator` and homepage interactive widget) that quantifies annual financial waste and pipes it into the lead intake metadata.
3. Zero-dependency Visual Architecture Inspector contrasting fragile SaaS webhook chains with sovereign schema-first FOSS systems.

---

## 1. Executive Context & The Status Quo Deadlock

Outreach telemetry (`touch-log.md`) recorded 5 touches resulting in 5 replies and 5 rejections classified as `LOST_STATUS_QUO`. Prospective clients operate under the psychological inertia of "it leaks, but it somehow works, and touching it is risky and expensive".

Currently, the landing provides philosophical arguments (Manifesto §1–§7) and service tiers, but lacks:
1. **Tangible Forensic Precedents**: No public view of actual delivered audits showing what a $350 TDABC audit inspects and discovers.
2. **Instant Self-Quantification**: Prospects cannot calculate their own operational burn before engaging in a dialogue.
3. **Concrete Architecture Contrast**: No visual, interactive demonstration of why custom code or self-hosted FOSS is more resilient than a 7-tool Zapier/Make/Airtable patchwork.


### Epistemic Invariant: Guessing Ban Reconciliation (Mandate 5 v20.2a)
UnderUndre's business plan v20.2a/v20.3 strictly bans fabricating monetary estimates without verified payroll records (*«Оценка в деньгах без подтверждённой ведомости ФОТ — галлюцинация»*).
This feature reconciles with Mandate 5 via three strict principles:
1. **Physical Hours Odometer as Primary Invariant**: The primary truth metric displayed and transmitted into telemetry is physical manual hours wasted (hours/year and hours/week), matching the Thank-You odometer.
2. **User-Supplied Rate Projection**: Monetary friction figures ($/yr) are strictly calculated from user-entered blended hourly rates, transparently framed as user-supplied cost projections rather than a site-asserted diagnosis.
3. **Audit-Verified Teardowns**: Monetary figures in case studies are derived directly from delivered historical audits with verified client payroll and subscription data.

This feature resolves all three friction points without adding backend complexity or external database dependencies, preserving the multi-brand architecture and strict performance budgets (LCP ≤ 1.5s, static prerender).

---

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 — Self-Serve TDABC Operational Leak Calculator (Priority: P1)

As an operations lead, agency founder, or technical executive,  
I want to adjust sliders for my team size, weekly manual copy-paste hours, and SaaS subscription stack,  
so that I can see an instant, deterministic dollar calculation of my annual operational friction tax and pipe it directly into a pre-filled audit request.

**Why this priority**: Directly breaks the `LOST_STATUS_QUO` barrier by quantifying the invisible burn before any sales contact. Pipes rich qualification context into the intake pipeline.

**Independent Test**: Navigate to `/calculator` (or homepage calculator widget), adjust team size to 15, manual hours to 20h/week, select 3 SaaS tools. Verify that calculated annual loss matches the TDABC formula, and clicking "Book Audit with these Metrics" scrolls to `#contact` with form state populated and payload carrying `metadata.odometer` & `metadata.leakCalculation`.

**Acceptance Scenarios**:
1. **Given** default parameters (Team: 5, Routine: 10h/wk per person, Hourly blended rate: $35/h, Default SaaS tools: Salesforce + Zapier + Airtable at $229/seat/mo), **When** rendered, **Then** annual physical labor leak displays 2,600 hrs/yr ($91,000/yr labor waste projection), SaaS seat bloat displays $13,740/yr, and total friction tax displays $104,740/yr (with compact formatting for large numbers).
2. **Given** any combination of slider inputs on `/calculator` or the homepage, **When** the user clicks "Export to Audit Brief", **Then** the system transfers state (via sessionStorage + smooth navigation to `/#contact`), pre-selects corresponding routine hour bands in the form, and sets canonical form metadata `{ sourceComponent: "calculator", teamSize, routineHoursPerWeek, totalHoursPerYear, annualLaborLeakUsd, saasBloatUsd, totalLeakUsd }`.
3. **Given** a visitor with an active referral code (`?ref=partner`), **When** submitting a brief from the calculator, **Then** `metadata.referral` is preserved alongside calculator telemetry.

---

### User Story 2 — Public Forensic Teardown Vault (Priority: P1)

As a B2B buyer or cold outreach recipient,  
I want to read deep, fully readable, ungated sanitized step-by-step case teardowns of real operational failures,  
so that I can verify the auditor's diagnostic rigor and recognize my company's exact failure modes.

**Why this priority**: Serves as the Level 1/Level 2 proof artifact cited in cold outreach emails and social posts. Eliminates "who are you and why should I pay $350" skepticism.

**Independent Test**: Open `/teardowns`, verify list of 3 canonical case studies (e.g. ATS Sync Breakdown, Multi-channel WhatsApp Retail Order Desk, Field Service dispatch lock-in). Click one to open `/teardowns/[slug]`. Verify complete technical autopsy (Symptom, Measured Leak, Fragile Patchwork vs Sovereign Architecture, DDL Schema snippet, Final Verdict).

**Acceptance Scenarios**:
1. **Given** `https://underundre.com/teardowns`, **When** requested, **Then** it renders a static index of teardowns with metrics chips (e.g. "Saved $34k/yr", "Eliminated 18h/wk manual sync", "Replaced 4 subscriptions").
2. **Given** `https://underundre.com/teardowns/whatsapp-order-desk`, **When** requested, **Then** it renders the full forensic report with zero gated download walls, structured headers, and a prominent CTA "Order similar audit for your workflow ($350)".
3. **Given** non-underundre brands (e.g. `undreading`), **When** `/teardowns` is requested, **Then** it renders brand-isolated content (or 404 if the brand has no `teardowns.json` data).

---

### User Story 3 — Visual Architecture Inspector (Priority: P2)

As a technical decision-maker (CTO, VP Eng, Tech Lead),  
I want an interactive visual widget contrasting a multi-SaaS webhook cascade with a sovereign schema-first FOSS pipeline,  
so that I can see the latency, failure points, and dollar costs of both approaches side-by-side.

**Why this priority**: Delivers the high-credibility engineering proof point that separates UnderUndre from no-code agencies, without requiring heavy WebAssembly runtimes or live sandboxes.

**Independent Test**: Interact with the Visual Architecture Inspector widget on homepage or teardown pages. Toggle between "SaaS Webhook Patchwork" and "Sovereign FOSS Pipeline". Verify step-by-step sequence inspection, failure probability indicators, latency metrics, and monthly running cost comparison.

**Acceptance Scenarios**:
1. **Given** "SaaS Patchwork" view, **When** step 3 (Zapier webhook to Airtable) is clicked, **Then** it highlights retry delay (5-15 min polling), failure point (rate limit 429), and cumulative cost ($280/mo).
2. **Given** "Sovereign FOSS" view, **When** selected, **Then** it highlights direct transactional schema contract (PostgreSQL ACID, <15ms latency, self-hosted $10/mo VPS, 0 external seat licenses).
3. **Given** mobile viewport (<640px), **When** viewed, **Then** the widget adapts into a clean vertical comparison stack without horizontal overflow or clipped text.

---

### User Story 4 — Multi-Brand Isolation & Gate V6 Integration (Priority: P3)

As the platform maintainer,  
I want all teardowns, calculator constants, and architecture comparisons to be driven by `ProjectConfig` and data JSON files,  
so that existing brands remain isolated and an automated gate in `verify-gates.mjs` verifies asset and schema integrity.

**Why this priority**: Prevents engine regressions, maintains GNU GPL-3.0 template reusability, and automates compliance checking in CI.

**Acceptance Scenarios**:
1. **Given** `pnpm verify`, **When** executed, **Then** new Gate V6 validates teardown JSON schema integrity, calculator formula bounds, and absence of cross-brand leakage.
2. **Given** `NEXT_PUBLIC_PROJECT_NAME=undreading`, **When** built, **Then** bureau-specific teardowns do not leak into undreading artifacts.

---

## 3. Edge Cases & Boundary Conditions

- **Negative or extreme calculator inputs**: Handled via strict slider/input boundaries (Team: 1–500, Hours: 1–80h/wk, Hourly rate: $15–$250/h). Formulas clip values deterministically to avoid negative or NaN displays.
- **Cross-route `/calculator` to `/#contact` handoff**: Navigating from standalone `/calculator` to `#contact` writes parameters to `sessionStorage` (`undr.calculator_bridge`) and performs `router.push('/#contact')`. On mount, `cta-underundre` hydrates these fields. Fallback without JS uses standard `<a href="/#contact">`.
- **Teardown slug not found**: `/teardowns/[invalid-slug]` invokes Next.js `notFound()` rendering clean 404.
- **Calculated leak exported to form while JS disabled**: Handled gracefully via HTML hash anchor `#contact` and default select options.
- **OpSec PII leakage in teardowns**: Teardowns use fictionalized company names, masked domains (`client-corp.internal`), and normalized monetary figures (verified by automated regex checks in Gate V6).

---

## 4. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide an interactive TDABC Leak Calculator component (`components/calculator/tdabc-calculator.tsx`) evaluating physical hours and user-projected financial waste:
  $$\text{LaborHoursYear} = \text{TeamSize} \times \text{WeeklyHoursPerPerson} \times 52$$
  $$\text{LaborWaste} = \text{LaborHoursYear} \times \text{HourlyRate}$$
  $$\text{SaaSSeatTax} = \text{TeamSize} \times \left(\sum \text{ToolMonthlySeatCosts}\right) \times 12$$
  $$\text{TotalFriction} = \text{LaborWaste} + \text{SaaSSeatTax}$$
  Values $\ge \$1,000,000$ MUST use compact number formatting ($1.2M).
- **FR-002**: Calculator MUST provide an "Apply to Audit Brief" action that navigates/scrolls to `#contact` and populates the lead intake state with canonical keys: `{ sourceComponent: "calculator", teamSize, routineHoursPerWeek, totalHoursPerYear, annualLaborLeakUsd, saasBloatUsd, totalLeakUsd }`.
- **FR-003**: System MUST provide both an embedded interactive section on the bureau homepage (`projects/underundre/config.tsx` placed between Loom demo and Pricing) and a dedicated standalone route `/calculator` sharing `components/calculator/tdabc-calculator.tsx`.
- **FR-004**: System MUST provide a Teardown Vault index route `/teardowns` listing all published forensic case studies loaded dynamically from `projects/<brand>/data/teardowns/*.json` via a typed loader.
- **FR-005**: System MUST provide statically pre-rendered dynamic routes `/teardowns/[slug]` loaded from individual `projects/<brand>/data/teardowns/[slug].json` files, rendering:
  - Client background (sanitized sector, team scale)
  - Pre-audit symptom & operational bottleneck
  - Measured quantitative leak (hours/week + $/year)
  - Architectural diagnosis & failure autopsy
  - Sovereign solution architecture (with DDL/API schema highlights)
  - Delivered ROI & outcome metrics
- **FR-006**: Teardown data schema (`lib/schemas/teardown-schema.ts`) MUST be validated with Zod at build time, ensuring bilingual support (`{ ru: string; en: string }`) for all titles, executive summaries, and body sections.
- **FR-007**: System MUST provide a zero-runtime Visual Architecture Inspector component (`components/architecture/visual-contract-inspector.tsx`) providing side-by-side comparative inspection between SaaS patchwork and Sovereign FOSS architecture.
- **FR-008**: Lead form submissions originating from the calculator or teardowns MUST pass canonical telemetry conforming to the unified metadata contract: `metadata.sourceComponent`, `metadata.teamSize`, `metadata.routineHoursPerWeek`, `metadata.totalHoursPerYear`, `metadata.annualLaborLeakUsd`, `metadata.saasBloatUsd`, `metadata.totalLeakUsd`, and optional `metadata.targetWorkflow`.
- **FR-009**: Brand isolation MUST be enforced: `/teardowns` and `/calculator` MUST check `getActiveProjectConfig().hasTeardowns` / `hasCalculator` (or render 404 if data file is absent for the brand).
- **FR-010**: All teardown pages MUST generate valid `Article` and `BreadcrumbList` JSON-LD structured data and declare canonical URLs under `https://<domain>/teardowns/<slug>`.
- **FR-011**: System MUST include 3 initial sanitized case studies in `projects/underundre/data/teardowns/` directory:
  1. `ats-recruiting-sync-leak`: B2B Recruiting/ATS manual copy-paste bottleneck ($32k/yr leak).
  2. `whatsapp-retail-order-desk`: E-commerce wholesale WhatsApp-to-Excel order capture ($41k/yr leak).
  3. `field-service-dispatch-lockin`: Field service dispatch & invoicing SaaS seat tax trap ($27k/yr leak).

### Non-Functional Requirements

- **NFR-001 (Compilation & Type Safety)**: `npm run validate` (`tsc --noEmit`) and `npm test` MUST pass with 0 errors.
- **NFR-002 (Performance & Core Web Vitals)**: Prerendered `/teardowns` and `/calculator` pages MUST maintain LCP ≤ 1.5s, CLS = 0, and total client bundle increase MUST be ≤ 15 KB gzipped.
- **NFR-003 (Zero External Dependencies)**: Visual Architecture Inspector and TDABC Calculator MUST be implemented using native React 19, CSS/Tailwind v4, and SVG, with zero third-party chart or sandbox libraries.
- **NFR-004 (Automated Gate V6)**: `scripts/verify-gates.mjs` MUST implement Gate V6 asserting teardown Zod schema validity, JSON-LD validity on teardown routes, and zero PII leaks in teardown data.

---

## 5. Clarification Log (Phase 2)

| # | Question | Decision / Best Judgment |
|---|---|---|
| Q1 | Placement of TDABC Calculator | **Both**: Embedded interactive section on homepage (`projects/underundre/config.tsx` before Pricing) AND dedicated standalone route `/calculator` sharing the same core component. |
| Q2 | Storage format for Teardowns | **Individual JSON files**: `projects/<slug>/data/teardowns/<case-slug>.json` to ensure modularity, easy addition of new audits, and clean schema validation without monolithic file drift. |
| Q3 | Visual Architecture Inspector placement | **Both in teardowns and homepage**: Reusable component `VisualContractInspector` renders canonical SaaS vs FOSS comparison on homepage, and case-specific contract/latency diffs in `/teardowns/[slug]`. |

---
## 6. Security & Threat Mitigation (STRIDE)

- **Spoofing**: N/A (Client calculation & static content only).
- **Tampering**: All calculator parameters passed to `metadata` are sanitized and constrained as scalar values within `GenericLeadSubmissionSchema` bounds.
- **Repudiation**: N/A (Standard append-only logging of leads).
- **Information Disclosure (CRITICAL)**: Real client data sanitized. Gate V6 enforces negative checks for real corporate email domains, personal names, and unmasked internal endpoints.
- **Denial of Service**: All teardown and calculator pages are statically prerendered (`○ Static`). Zero server compute per view.
- **Elevation of Privilege**: N/A.

---

## 7. Success Criteria *(mandatory)*

- **SC-001**: A user can calculate their operational friction tax on `/calculator` in under 30 seconds and transfer parameters into the lead form in 1 click.
- **SC-002**: `/teardowns` and 3 canonical case studies render as statically prerendered pages with valid canonicals, OG tags, and Article JSON-LD.
- **SC-003**: 100% of lead submissions originating from the calculator carry structured `metadata.totalLeakUsd` and `metadata.totalHoursPerYear`.
- **SC-004**: CI verification pipeline passes with Gate V6 active across both brands (`underundre` and `undreading`).
- **SC-005**: Zero bundle size regression beyond the 15 KB budget.
