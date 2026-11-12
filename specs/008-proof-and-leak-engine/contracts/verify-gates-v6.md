# Contract: verify-gates-v6 (CI Verification Gate V6)

**Feature**: `008-proof-and-leak-engine`  
**Execution**: Invoked within `scripts/verify-gates.mjs` during `npm run verify`.

---

## Gate V6 — Proof Engine & Teardowns Integrity

Input: `projects/<brand>/data/teardowns/*.json` and prerendered HTML output in `.next/server/app/`.

### Check V6.1: Teardowns Zod Schema Validation
- Iterates over all `.json` files in `projects/<brand>/data/teardowns/`.
- If brand has `hasTeardowns: true` (e.g. `underundre`), asserts count $\ge 3$.
- Validates each file against `TeardownCaseSchema`.
- Assert `parseErrors === 0`.

### Check V6.2: OpSec PII & Negative Leakage Scan
- Scans all teardown JSON files for unmasked real-world identifiers:
  - Phone numbers: `\+?[1-9]\d{1,14}` (outside synthetic examples)
  - Real corporate email domains: regex matching non-`example.com`, non-`internal`, non-`underundre.com` emails.
  - Assert negative matches = 0.

### Check V6.3: Routes & Prerender Verification
- If brand has `hasTeardowns: true`:
  - Asserts `.next/server/app/teardowns.html` exists and contains teardown card links.
  - Asserts `.next/server/app/calculator.html` exists and contains calculator sliders.
  - Asserts each teardown slug in `data/teardowns/` has a corresponding prerendered `.html` file in `.next/server/app/teardowns/[slug].html`.
  - Asserts each teardown HTML contains valid `application/ld+json` with `@type: "Article"` or `"TechArticle"`.
- If brand has `hasTeardowns: false` / undefined (e.g. `undreading`):
  - Asserts `.next/server/app/teardowns` does NOT contain underundre case studies.

### Check V6.4: Gate V3 Baseline Compatibility
- Any additions to the homepage or footer (e.g. calculator section or teardowns link) that modify `index.html` normalized DOM MUST follow the 004 contract protocol (refresh `specs/004-landing-template-updates/qa/baseline/index.html` in the task sequence).
