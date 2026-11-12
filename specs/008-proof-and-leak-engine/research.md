# Research: 008-proof-and-leak-engine

**Date**: 2026-11-12  
**Status**: Complete — no open NEEDS CLARIFICATION

---

## R-01: TDABC Calculation Formulas & Slider Boundaries

**Decision**: Calculate labor waste and SaaS bloat independently, summing them into a total operational friction tax.
**Formulas**:
$$\text{LaborWaste} = \text{TeamSize} \times \text{WeeklyHours} \times 52 \times \text{HourlyRate}$$
$$\text{SaaSSeatTax} = \text{TeamSize} \times \text{MonthlySeatCost} \times 12$$
$$\text{TotalFriction} = \text{LaborWaste} + \text{SaaSSeatTax}$$

**Input Boundaries**:
- `teamSize`: 1 – 500 (default: 5)
- `weeklyHours`: 1 – 80 hrs/wk per person spent on manual data transfer/coordination (default: 10)
- `hourlyRate`: $15 – $250 / hour blended rate (default: $35)
- `selectedSaaSStack`: multi-select of common seat-tax tools:
  - Salesforce ($165/seat/mo)
  - HubSpot ($90/seat/mo)
  - Zapier/Make Team Tier ($40/seat/mo blended)
  - Airtable Team ($24/seat/mo)
  - Custom Spreadsheets/WhatsApp ($0 direct seat cost, 100% labor cost)

**Rationale**: Grounded in standard Time-Driven Activity-Based Costing (TDABC, Kaplan & Anderson). Avoids hand-wavy marketing percentages; presents hard math based on user-provided inputs.

---

## R-02: Teardowns Data Architecture & Content Model

**Decision**: Store each forensic case study as an individual JSON file in `projects/<brand>/data/teardowns/<slug>.json`.
**Rationale**:
- Modularity: Adding a 4th or 5th teardown does not risk editing a monolithic 1,000-line JSON file.
- Scalability: Fits Next.js 15 `generateStaticParams` perfectly via `fs.readdirSync`.
- Schema safety: Validated with Zod on build; any malformed case fails `pnpm build` and `verify-gates.mjs` immediately.

---

## R-03: Zero-Dependency Visual Architecture Inspector

**Decision**: Render comparison sequences using pure React 19 JSX and Tailwind v4 CSS animations/transitions, with zero external charting or canvas libraries.
**Rationale**:
- NFR-002 enforces $\le 15$ KB gzipped client bundle increase. Chart libraries (Chart.js, Recharts) add 50–120 KB gz.
- Interactive SVG state nodes and comparison cards provide identical visual fidelity with near-zero bundle impact.

---

## R-04: Multi-Brand Isolation Strategy

**Decision**:
- Brand configuration in `ProjectConfig` includes `hasTeardowns?: boolean` and `hasCalculator?: boolean`.
- For brands with `hasTeardowns: false` (or missing data directory), `/teardowns` and `/calculator` routes invoke Next.js `notFound()`.
- Sitemap generation (`app/sitemap.ts`) checks `hasTeardowns` before including `/teardowns` URLs, preventing 404 indexing.

---

## R-05: SEO Structured Data (JSON-LD)

**Decision**:
- `/teardowns`: `CollectionPage` schema with `hasPart` referencing all case studies.
- `/teardowns/[slug]`: `Article` / `TechArticle` schema + `BreadcrumbList` (`Home` > `Teardowns` > `Case Title`).
- All scripts serialized with `.replace(/</g, "\\u003c")` to prevent XSS script-breakout.

---

## R-06: OpSec & PII Sanitization Protocol

**Decision**:
- All client company names in case studies are replaced with descriptive sector labels (e.g. «Nordic B2B Recruiting Agency», «Wholesale Beverage Distributor»).
- Internal systems masked (e.g. `api.internal-erp.local`).
- Automated Gate V6 in `scripts/verify-gates.mjs` scans all teardown files with regexes to prevent real email domains or phone numbers from slipping into production.
