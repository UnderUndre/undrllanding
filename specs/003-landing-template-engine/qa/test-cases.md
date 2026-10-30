# Test Case Specifications: 003-landing-template-engine

- **Standard**: ISO/IEC/IEEE 29119-3:2021 (Formal Test Case Specifications)
- **Techniques**: ISO/IEC/IEEE 29119-4:2021 (BVA, Equivalence Partitioning, Decision Table, Fault Injection, Error Guessing)
- **Feature Target**: `undrllanding/specs/003-landing-template-engine/`

---

## 1. Layout Decoupling & Inversion of Control (FR-001, FR-002)

### TC-LTE-001: Header Navigation Renders from NavigationConfig (IoC Happy Path)
- **Traceability**: FR-001, Task T-005
- **Tier**: [Smoke]
- **Priority**: P0
- **Type**: Functional
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: Project config `underundreConfig` defines `navigation.items` (`#audit`, `#stack`, `#pricing`, `#comparison`, `#faq`) and `navigation.ctaButton` (`href: "#contact"`).
- **Test Data**: `NEXT_PUBLIC_PROJECT_NAME=underundre`
- **Execution Steps**:
  1. Start dev server or render `HeaderNav`.
  2. Inspect `<nav>` element children.
  3. Inspect header action button.
- **Expected Result**: Nav links exactly match configured array. Action button links to `#contact`. Zero hardcoded checks for `"underundre"` in component source code.
- **Post-conditions**: None.

### TC-LTE-002: Undrlla Brand Navigation Parity Under IoC
- **Traceability**: FR-001, Task T-004, T-005
- **Tier**: [Sanity]
- **Priority**: P1
- **Type**: Functional / Regression
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: Project config `undrllaConfig` defines `navigation.items` (`#how`, `#pricing`, `/economics`) and `navigation.ctaButton` (`href: "#waitlist"`).
- **Test Data**: `NEXT_PUBLIC_PROJECT_NAME=undrlla`
- **Execution Steps**:
  1. Set environment variable `NEXT_PUBLIC_PROJECT_NAME=undrlla`.
  2. Render `HeaderNav`.
  3. Assert links rendered in header.
- **Expected Result**: Header displays `#how`, `#pricing`, `/economics` and action button `#waitlist`. Zero underundre links present.
- **Post-conditions**: Restore environment variable to `underundre`.

### TC-LTE-003: Footer Columns Render from FooterConfig without Slug Hardcoding
- **Traceability**: FR-002, Task T-006
- **Tier**: [Smoke]
- **Priority**: P0
- **Type**: Functional
- **Technique**: Structural Assertion
- **Pre-conditions**: Project config exports `footerConfig`.
- **Test Data**: `grep -rn "isUnderundre\|config\.slug === \"underundre\"" components/ui/footer.tsx`
- **Execution Steps**:
  1. Execute grep on `components/ui/footer.tsx`.
  2. Render footer component in browser.
- **Expected Result**: Grep returns 0 matches. Footer renders columns defined in active project config.
- **Post-conditions**: None.

### TC-LTE-004: Persistent Statutory Links Render in Footer
- **Traceability**: FR-002, FR-006, FR-007, Task T-006
- **Tier**: [Sanity]
- **Priority**: P1
- **Type**: Functional
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: Page is loaded at root `/`.
- **Test Data**: N/A
- **Execution Steps**:
  1. Scroll to the bottom of the page.
  2. Find footer bottom bar links.
  3. Assert presence and href of `Privacy Policy` (`/privacy`) and `Terms of Service` (`/terms`).
- **Expected Result**: Both links are present, clickable, have valid hrefs, and navigate to statutory routes.
- **Post-conditions**: None.

---

## 2. Theme Tokenization (FR-003)

### TC-LTE-005: Theme CSS Injects Brand Variables on Layout Root
- **Traceability**: FR-003, Task T-015
- **Tier**: [Sanity]
- **Priority**: P1
- **Type**: Functional
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: `projects/underundre/theme.css` defines `--brand-bg: #080808; --brand-primary: #b45500;`.
- **Test Data**: DOM inspection of `:root` / `<html>`.
- **Execution Steps**:
  1. Load page in browser.
  2. Inspect computed CSS custom properties on `document.documentElement`.
- **Expected Result**: `--brand-bg` resolves to `#080808` and `--brand-primary` resolves to `#b45500`.
- **Post-conditions**: None.

### TC-LTE-006: Rebranding Palette Swaps Without Touching Component JSX
- **Traceability**: FR-003, Task T-015
- **Tier**: [Regression]
- **Priority**: P2
- **Type**: Visual / Regression
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: Change `--brand-primary` in `theme.css` to `#2563eb` (blue).
- **Test Data**: Modified `theme.css`.
- **Execution Steps**:
  1. Edit `projects/underundre/theme.css`: set `--brand-primary: #2563eb`.
  2. Build and view hero CTA button.
- **Expected Result**: Button background automatically reflects blue color via `bg-brand-primary`. Zero TSX files modified.
- **Post-conditions**: Revert `theme.css` to original `#b45500`.

---

## 3. Schema-Driven Content Layer (FR-004) — Risk Score: 20

### TC-LTE-007: Pricing Component Renders Validated pricing.json Data
- **Traceability**: FR-004, Task T-013
- **Tier**: [Smoke]
- **Priority**: P0
- **Type**: Functional
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: `projects/underundre/data/pricing.json` contains valid `PricingData` structure with Product 0 ($350) and Sprint A ($3,500).
- **Test Data**: Valid `pricing.json`.
- **Execution Steps**:
  1. Build page via `pnpm build`.
  2. Inspect `#pricing` section in rendered DOM.
- **Expected Result**: All pricing cards, deliverables, and prices match `pricing.json` values.
- **Post-conditions**: None.

### TC-LTE-008: Build-Time Failure on Malformed Pricing JSON (Negative Injection)
- **Traceability**: FR-004, Task T-001, T-013
- **Tier**: [Sanity]
- **Priority**: P0
- **Type**: Negative / Fault Injection
- **Technique**: Error Guessing
- **Pre-conditions**: Temporarily corrupt `projects/underundre/data/pricing.json` (e.g. set `"price": 350` as a number instead of string, or delete required `"plans"` array).
- **Test Data**: Malformed `pricing.json`.
- **Execution Steps**:
  1. Run `pnpm build`.
  2. Inspect command exit code and stderr.
- **Expected Result**: Build terminates with non-zero exit code (`exit 1`). Output displays explicit Zod validation diagnostic indicating field error path.
- **Post-conditions**: Revert `pricing.json` to valid state.

### TC-LTE-009: FAQ Section Renders from Validated faq.json
- **Traceability**: FR-004, Task T-014
- **Tier**: [Smoke]
- **Priority**: P1
- **Type**: Functional
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: `projects/underundre/data/faq.json` contains valid `FaqData` entries.
- **Test Data**: Valid `faq.json`.
- **Execution Steps**:
  1. Render `#faq` section.
  2. Open each `<details>` accordion item.
- **Expected Result**: Question headers and answers match `faq.json` records byte-for-byte.
- **Post-conditions**: None.

---

## 4. Pluggable Lead API (FR-005) — Risk Score: 20

### TC-LTE-010: Valid Inbound Lead with Custom Metadata (Decision Table: Case 1)
- **Traceability**: FR-005, Task T-016
- **Tier**: [Smoke]
- **Priority**: P0
- **Type**: Functional
- **Technique**: Decision Table
- **Pre-conditions**: Local server running on port 3000.
- **Test Data**:
  ```json
  {
    "email": "cto@fintech.io",
    "contact": "@alex_cto",
    "topic": "tco-audit",
    "message": "We have 15 staff manually processing KYC documents.",
    "metadata": {
      "teamSize": 15,
      "currentSaaS": ["Zendesk", "Salesforce"],
      "monthlyBudget": "$4,000"
    }
  }
  ```
- **Execution Steps**:
  1. `curl -X POST http://localhost:3000/api/lead -H "Content-Type: application/json" -d '<Test Data>'`
  2. Inspect HTTP status and response JSON.
- **Expected Result**: HTTP 200 OK. Response: `{"success": true, "message": "Audit request received."}`.
- **Post-conditions**: None.

### TC-LTE-011: Invalid Email Rejection (BVA / Boundary)
- **Traceability**: FR-005, Task T-016
- **Tier**: [Sanity]
- **Priority**: P1
- **Type**: Negative / Boundary
- **Technique**: BVA
- **Pre-conditions**: Local server running.
- **Test Data**: `{"email": "not-an-email", "message": "Valid brief description here."}`
- **Execution Steps**:
  1. Post payload with malformed email.
- **Expected Result**: HTTP 400 Bad Request. JSON contains validation error on `email`.
- **Post-conditions**: None.

### TC-LTE-012: Short Message Boundary Rejection (BVA 3-char boundary)
- **Traceability**: FR-005, Task T-016
- **Tier**: [Sanity]
- **Priority**: P1
- **Type**: Negative / Boundary
- **Technique**: BVA (Points: 0, 1, 2, 3 chars)
- **Pre-conditions**: Local server running.
- **Test Data**:
  - Test 12a: `"message": "ab"` (2 chars - MIN-1)
  - Test 12b: `"message": "abc"` (3 chars - MIN / Nominal)
- **Execution Steps**:
  1. Post payload with `"ab"`. Verify HTTP 400.
  2. Post payload with `"abc"`. Verify HTTP 200.
- **Expected Result**: 2 chars rejected; 3 chars accepted.
- **Post-conditions**: None.

### TC-LTE-013: Fail-Open Dispatcher with Missing Sinks
- **Traceability**: FR-005, Task T-016, T-017
- **Tier**: [Sanity]
- **Priority**: P0
- **Type**: Functional / Fault Injection
- **Technique**: Error Guessing
- **Pre-conditions**: Unset `TELEGRAM_BOT_TOKEN`, `TELEGRAM_ALERT_CHAT_ID`, and `LEAD_WEBHOOK_URL`.
- **Test Data**: Valid lead payload.
- **Execution Steps**:
  1. Post valid lead payload.
- **Expected Result**: HTTP 200 OK. Response contains `fallback: "direct"`. Server logs lead cleanly without throwing an unhandled exception.
- **Post-conditions**: None.

---

## 5. Statutory Compliance Pages (FR-006, FR-007, FR-008)

### TC-LTE-014: Privacy Policy Interpolates Active Project Config
- **Traceability**: FR-006, Task T-008
- **Tier**: [Smoke]
- **Priority**: P1
- **Type**: Functional
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: Server running.
- **Test Data**: `NEXT_PUBLIC_PROJECT_NAME=underundre`
- **Execution Steps**:
  1. Navigate to `/privacy`.
  2. Inspect controller name, domain, and email in text.
- **Expected Result**: Page displays `UnderUndre`, `underundre.com`, EU NACE 62.01 classification, data retention period (12 months), and rights under GDPR Art. 13.
- **Post-conditions**: None.

### TC-LTE-015: Privacy Policy Renders in Russian and English
- **Traceability**: FR-006, Task T-008
- **Tier**: [Regression]
- **Priority**: P2
- **Type**: Functional / i18n
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: Page `/privacy` is loaded.
- **Test Data**: Toggle language switch in header (`RU` / `EN`).
- **Execution Steps**:
  1. Switch language to `RU`. Assert Russian legal headings.
  2. Switch language to `EN`. Assert English legal headings.
- **Expected Result**: Clean translation without mixed language fragments.
- **Post-conditions**: None.

### TC-LTE-016: Terms of Service Contains Escrow and 100% IP Clauses
- **Traceability**: FR-007, Task T-009
- **Tier**: [Smoke]
- **Priority**: P1
- **Type**: Functional
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: Server running.
- **Test Data**: Route `/terms`.
- **Execution Steps**:
  1. Open `/terms` in browser.
  2. Assert presence of: (a) Upwork Direct Contracts 5% escrow clause; (b) 100% exclusive intellectual property code transfer upon milestone release; (c) 7-day bugfix SLA terms; (d) Liability cap (30 days fee maximum).
- **Expected Result**: All 4 clauses present in legally clear language.
- **Post-conditions**: None.

### TC-LTE-017: Terms of Service Renders in Russian and English
- **Traceability**: FR-007, Task T-009
- **Tier**: [Regression]
- **Priority**: P2
- **Type**: Functional / i18n
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: Open `/terms`.
- **Test Data**: Toggle language switch in header (`RU` / `EN`).
- **Execution Steps**:
  1. Toggle to RU. Verify Russian terms.
  2. Toggle to EN. Verify English terms.
- **Expected Result**: Content updates dynamically without page reload.
- **Post-conditions**: None.

### TC-LTE-018: Manifesto Page Renders All 7 Principles
- **Traceability**: FR-008, Task T-010, T-011
- **Tier**: [Smoke]
- **Priority**: P1
- **Type**: Functional
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: `projects/underundre/data/manifest.json` contains 7 principles.
- **Test Data**: Route `/manifest`.
- **Execution Steps**:
  1. Open `/manifest` in browser.
  2. Count principle cards.
  3. Verify presence of Principle 1 (Via Negativa), 2 (Zero SaaS Taxes), 3 (Schema-First DDL), 4 (Async Velocity), 5 (100% IP), 6 (Memory Fencing), 7 (Fixed Scope).
- **Expected Result**: Exactly 7 principles rendered with numbers, titles, and explanations.
- **Post-conditions**: None.

### TC-LTE-019: Tagline Reveal Citation Links Directly to /manifest
- **Traceability**: FR-008, Task T-012
- **Tier**: [Smoke]
- **Priority**: P1
- **Type**: Functional
- **Technique**: Equivalence Partitioning
- **Pre-conditions**: Home page `/` loaded.
- **Test Data**: N/A
- **Execution Steps**:
  1. Scroll to the Tagline Reveal section.
  2. Click the citation link: *«— Инженерный манифест UnderUndre §18.9»*.
- **Expected Result**: Browser navigates to `/manifest` without full page refresh.
- **Post-conditions**: None.

---

## 6. Scaffolding Automation & Starter Template (FR-009, FR-010)

### TC-LTE-020: pnpm project:create Generates Compiling Brand
- **Traceability**: FR-009, FR-010, Task T-018, T-019
- **Tier**: [Smoke]
- **Priority**: P0
- **Type**: Functional / CLI
- **Technique**: E2E CLI Run
- **Pre-conditions**: Working directory is repository root.
- **Test Data**: `pnpm project:create --slug="qa-test-brand" --name="QA Brand" --domain="qabrand.test"`
- **Execution Steps**:
  1. Run generation command.
  2. Verify directory `projects/qa-test-brand/` exists.
  3. Run `NEXT_PUBLIC_PROJECT_NAME=qa-test-brand pnpm build`.
- **Expected Result**: Command succeeds in $< 5$s. Build compiles successfully with static route generation.
- **Post-conditions**: Remove `projects/qa-test-brand/` from disk and git status.

### TC-LTE-021: pnpm project:create Rejects Duplicate or Invalid Slugs
- **Traceability**: FR-009, Task T-019
- **Tier**: [Sanity]
- **Priority**: P2
- **Type**: Negative / Boundary
- **Technique**: Error Guessing
- **Pre-conditions**: Project `underundre` already exists.
- **Test Data**:
  - Test 21a: `--slug="underundre"` (duplicate)
  - Test 21b: `--slug="invalid slug with spaces!"` (invalid format)
- **Execution Steps**:
  1. Run `pnpm project:create --slug="underundre"`.
  2. Run `pnpm project:create --slug="invalid slug with spaces!"`.
- **Expected Result**: Both commands fail with exit code 1 and display descriptive validation errors without creating files.
- **Post-conditions**: None.

### TC-LTE-022: Starter Template _template Contains Clean Zero-Warning Baseline
- **Traceability**: FR-010, Task T-018
- **Tier**: [Sanity]
- **Priority**: P1
- **Type**: Structural / Code Quality
- **Technique**: Structural Assertion
- **Pre-conditions**: `projects/_template/` assembled.
- **Test Data**: `NEXT_PUBLIC_PROJECT_NAME=_template`
- **Execution Steps**:
  1. Run `NEXT_PUBLIC_PROJECT_NAME=_template pnpm validate`.
- **Expected Result**: `tsc --noEmit` exits with 0 errors.
- **Post-conditions**: None.
