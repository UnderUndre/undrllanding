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
   - Annual Physical Waste: `15,600 hrs/yr`
   - Annual Labor Leak Projection: `$546,000/yr` (at $35/h user-supplied rate)
   - SaaS Seat Tax: `$36,900/yr`
   - Total Friction Tax: `$582,900/yr`
5. Click **"Apply to Audit Brief"** (or **"Book Audit with these Metrics"**):
   - System transfers state and smoothly navigates to `/#contact`.
   - Contact form fields reflect routine hours and team size.
   - Submitting the form transmits canonical telemetry:
     `metadata.sourceComponent = "calculator"`,
     `metadata.teamSize = "15"`,
     `metadata.routineHoursPerWeek = "20"`,
     `metadata.totalHoursPerYear = "15600"`,
     `metadata.totalLeakUsd = "582900"`.

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
pnpm build:undreading
pnpm verify --brand undreading
# -> Expect 404 / no leaks for teardowns
```
