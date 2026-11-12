# Contract: verify-gates-v6 (CI Verification Gate V6)

**Feature**: `008-proof-and-leak-engine`  
**Execution**: Invoked within `scripts/verify-gates.mjs` during `npm run verify`.

---

## Gate V6 — Proof Engine & Teardowns Integrity

Input: `projects/<brand>/data/teardowns/*.json` and prerendered HTML output in `.next/server/app/`.

### Check V6.1: Teardowns Zod Schema & Slug Uniqueness
- Iterates over all `.json` files in `projects/<brand>/data/teardowns/`.
- If brand has `hasTeardowns: true` (e.g. `underundre`), asserts count >= 1 (initial launch count = 3).
- Validates each file against `TeardownCaseSchema`.
- Asserts that all case study `slug` values are globally unique across the directory.
- Assert `parseErrors === 0`.

### Check V6.2: OpSec PII & Negative Leakage Scan
- Scans localized human-readable text fields (`title`, `summary`, `symptom`, `diagnosis`, `sovereignSolution`, `outcome`) in all teardown JSON files (explicitly excluding code snippets `ddlSnippet`, numeric fields, dates, and ports):
  - Phone numbers: regex `\+[1-9]\d{8,14}` (international format numbers).
  - Real corporate email domains: regex matching non-`example.com`, non-`*.internal`, non-`*.local`, non-`underundre.com` emails.
  - Assert negative matches === 0.

### Check V6.3: Routes & Prerender Verification
- If brand has `hasTeardowns: true`:
  - Asserts `.next/server/app/teardowns.html` exists and contains `data-testid="teardown-card"` links.
  - Asserts `.next/server/app/calculator.html` exists and contains `data-testid="tdabc-calculator"`.
  - Asserts each teardown slug in `data/teardowns/` has a corresponding prerendered `.html` file in `.next/server/app/teardowns/[slug].html`.
  - Asserts each teardown HTML contains valid `application/ld+json` with `@type: "Article"`.
- If brand has `hasTeardowns: false` / undefined (e.g. `undreading`):
  - Asserts `.next/server/app/teardowns` does NOT contain underundre case studies (brand isolation).

### Check V6.4: Gate V3 Baseline Compatibility
- Any additions to the homepage or footer (e.g. calculator section or teardowns link) that modify `index.html` normalized DOM MUST follow the 004 contract protocol (refresh `specs/004-landing-template-updates/qa/baseline/index.html` in the task sequence).


### Check V6.5: Calculator Bounds & Math Safety (Review F8)
- Asserts that `lib/calculator-math.ts` enforces deterministic input clamping:
  - Team size clamped between 1 and 500.
  - Weekly hours per person clamped between 1 and 80.
  - Hourly rate clamped between $15 and $250.
- Asserts that extreme boundary inputs (e.g. 500 team * 80h * $250) produce positive, finite, formatted outputs without throwing or emitting NaN.
