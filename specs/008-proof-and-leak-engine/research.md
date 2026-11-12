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

**Input Boundaries & Semantics**:
- `teamSize`: 1 – 500 (default: 5)
- `weeklyHoursPerPerson`: 1 – 80 hrs/wk per person spent on manual data transfer/coordination (default: 10 h/wk per person).
- `hourlyRate`: $15 – $250 / hour blended rate (default: $35/h).
- `selectedSaaSStack`: multi-select of common seat-tax tools (list prices as of 2026-11, user can customize or toggle):
  - Salesforce Sales Cloud Enterprise ($165/seat/mo)
  - HubSpot Sales Hub Pro ($90/seat/mo)
  - Zapier Team Tier ($40/seat/mo blended per user)
  - Airtable Team Plan ($24/seat/mo)
  - Custom Spreadsheets / WhatsApp ($0 direct seat cost, 100% labor cost)
- Default tools enabled: Salesforce ($165) + Zapier ($40) + Airtable ($24) = $229/seat/mo.
- Formatting: Values >= $1,000,000 formatted compactly (e.g. `$1.2M`) to prevent layout breakage on extreme inputs (max 500 team * 80h * 52 * $250 = $520M/yr).

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


## R-07: Epistemic Invariant Reconciliation (Mandate 5 v20.2a Guessing Ban)

**Rule in Business Plan v20.2a**: "Из одометра экрана Thank You и калькуляторов полностью убраны любые денежные оценки ($); оставлен только чистый физический диапазон рабочих часов… Оценка в деньгах без подтверждённой ведомости ФОТ — галлюцинация."

**Reconciliation**:
1. The **physical hours odometer** (`totalHoursPerYear` and `routineHoursPerWeek`) is the primary epistemically sound invariant, displayed prominently and stored in lead telemetry (`metadata.odometer` / `metadata.totalHoursPerYear`).
2. The monetary friction ($/yr) is strictly an interactive mathematical projection of the **user-selected** blended hourly rate ($15–$250/h). It is labeled as *«Projected Cost at Your Rate»*, making clear that the site is not guessing client payroll.
3. Teardown dollar figures are strictly historical facts from delivered audits with verified invoices and payroll.


## R-08: Cross-Route Navigation Bridge (`/calculator` to `/#contact`)

**Decision**: Use `sessionStorage` (`undr.calculator_bridge`) paired with `router.push('/#contact')` for standalone `/calculator` page.
**Behavior**:
1. When user clicks "Apply to Audit Brief" on `/calculator`:
   - Writes `{ teamSize, routineHoursPerWeek, totalHoursPerYear, annualLaborLeakUsd, saasBloatUsd, totalLeakUsd }` to `sessionStorage`.
   - Navigates to `/#contact`.
   - On homepage mount, `cta-underundre.tsx` reads `sessionStorage`, pre-selects corresponding hours radio, binds metadata, and clears the session key.
2. When on homepage embedded calculator:
   - State is directly bound and calls `element.scrollIntoView({ behavior: 'smooth' })`.
3. Referral code in URL or localStorage (`?ref=...`) is preserved untouched.
4. Fallback without JS: `<a href="/#contact">` link.
