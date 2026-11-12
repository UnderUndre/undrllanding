# Quickstart: 008-proof-and-leak-engine

Verify the feature in under 10 minutes.

---

## 1. Prerequisites

```bash
cd undrllanding
pnpm install
```

---

## 2. TDABC Leak Calculator (US1)

1. Run dev server or build:
   ```bash
   pnpm dev
   ```
2. Navigate to `http://localhost:3000/calculator` (or scroll to the calculator section on the homepage).
3. Adjust sliders:
   - Team Size: `15`
   - Manual Hours: `20 hrs/week`
   - Select tools: `Salesforce` + `Zapier`
4. Verify dynamic recalculation:
   - Annual Labor Leak: `$18,200/yr`
   - SaaS Seat Tax: `$36,900/yr`
   - Total Friction Tax: `$55,100/yr`
5. Click **"Apply to Audit Brief"** (or **"Book Audit with these Metrics"**):
   - Page smoothly scrolls to `#contact`.
   - Contact form fields reflect routine hours and team size.
   - Submitting the form transmits `metadata.sourceComponent = "calculator"` and `metadata.totalLeakUsd = "55100"`.

---

## 3. Teardown Vault (US2 & US3)

1. Navigate to `http://localhost:3000/teardowns`:
   - Verify 3 case study cards rendered with tags and dollar savings.
2. Click `ATS Recruiting Sync Leak` (`/teardowns/ats-recruiting-sync-leak`):
   - Verify forensic autopsy: Symptom, Measured Leak, Architecture Comparison.
   - Inspect the **Visual Architecture Inspector**: toggle between Fragile Stack and Sovereign Stack.
   - Verify DDL schema code block.
   - View Source (`Ctrl+U`): confirm `<script type="application/ld+json">` contains `Article` and `BreadcrumbList`.

---

## 4. Multi-Brand Isolation & Verification Gates

```bash
pnpm validate
pnpm test
pnpm build:underundre
pnpm verify --brand underundre
# -> Expect all gates passed (V1..V6)

# Test undreading brand isolation
pnpm exec cross-env NEXT_PUBLIC_PROJECT_NAME=undreading next build
pnpm verify --brand undreading
# -> Expect 404 / no leaks for teardowns
```
