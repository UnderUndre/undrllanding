# Regression Test Suites: 003-landing-template-engine

- **Standard**: ISO/IEC/IEEE 29119-3:2021 (Test Plan & Suite Allocation)
- **Feature Target**: `undrllanding/specs/003-landing-template-engine/`

---

## 1. Smoke Suite (P0 — Blocking CI / Pre-Deploy Gate)

*Execution Window: $\le 5$ minutes. Any failure halts deployment immediately.*

| Case ID | Title | Target Subsystem | Primary Verification |
| :--- | :--- | :--- | :--- |
| `TC-LTE-001` | Header Navigation Renders from NavigationConfig | HeaderNav IoC | Dynamic nav mapping without slug checks |
| `TC-LTE-003` | Footer Columns Render from FooterConfig | Footer IoC | Zero `isUnderundre` strings in footer |
| `TC-LTE-007` | Pricing Component Renders Validated pricing.json | Content Layer | Price values match JSON records |
| `TC-LTE-008` | Build-Time Failure on Malformed Pricing JSON | Zod Validator | `next build` fails with code 1 on bad data |
| `TC-LTE-010` | Valid Inbound Lead with Custom Metadata | Lead API | HTTP 200 OK + metadata accepted |
| `TC-LTE-014` | Privacy Policy Interpolates Active Project Config | Legal Route | `/privacy` renders operator name & domain |
| `TC-LTE-016` | Terms of Service Contains Escrow and 100% IP | Legal Route | `/terms` contains mandatory clauses |
| `TC-LTE-018` | Manifesto Page Renders All 7 Principles | Content Route | `/manifest` renders 7 principle cards |
| `TC-LTE-019` | Tagline Reveal Citation Links to /manifest | Navigation | Anchor click navigates to `/manifest` |
| `TC-LTE-020` | pnpm project:create Generates Compiling Brand | CLI Generator | Fresh project builds with 0 errors |

---

## 2. Sanity Suite (P1 — Pre-Merge Staging Gate)

*Execution Window: $\le 15$ minutes. Verifies integrated cross-boundary behaviors.*

| Case ID | Title | Target Subsystem | Primary Verification |
| :--- | :--- | :--- | :--- |
| `TC-LTE-002` | Undrlla Brand Navigation Parity Under IoC | HeaderNav IoC | Undrlla marketplace navigation preserved |
| `TC-LTE-004` | Persistent Statutory Links Render in Footer | Footer IoC | `/privacy` and `/terms` visible and linked |
| `TC-LTE-005` | Theme CSS Injects Brand Variables on Layout Root | Tailwind Tokens | CSS custom properties on `:root` |
| `TC-LTE-009` | FAQ Section Renders from Validated faq.json | Content Layer | Accordions match `faq.json` records |
| `TC-LTE-011` | Invalid Email Rejection (BVA) | Lead API | HTTP 400 Bad Request on bad email |
| `TC-LTE-012` | Short Message Boundary Rejection | Lead API | 2 chars rejected, 3 chars accepted |
| `TC-LTE-013` | Fail-Open Dispatcher with Missing Sinks | Lead API | HTTP 200 fallback when no tokens set |
| `TC-LTE-021` | pnpm project:create Rejects Duplicate Slugs | CLI Generator | Error on duplicate or invalid slug |
| `TC-LTE-022` | Starter Template _template Contains Zero-Warning Baseline | Template Baseline | `tsc --noEmit` exits with code 0 |

---

## 3. Full Regression Suite (P2/P3 — Pre-Release Gate)

*Execution Window: $\le 45$ minutes. Verifies visual fidelity, responsiveness, and multi-language parity.*

| Case ID | Title | Target Subsystem | Primary Verification |
| :--- | :--- | :--- | :--- |
| `TC-LTE-006` | Rebranding Palette Swaps Without Touching Component JSX | Theming | Palette changes via `theme.css` alone |
| `TC-LTE-015` | Privacy Policy Renders in Russian and English | i18n Legal | Full text changes dynamically on toggle |
| `TC-LTE-017` | Terms of Service Renders in Russian and English | i18n Legal | Full text changes dynamically on toggle |
| `NFR-001` | Full Project Type Safety (`pnpm validate`) | Build Gate | `tsc --noEmit` across entire monorepo |
| `NFR-002` | Pre-rendered Static Pages Audit | Performance | All routes generated as static `○` |
| `NFR-003` | WCAG 2.1 AA Contrast Ratio Verification | A11y | Text contrast $\ge 4.5:1$ across all pages |
| `NFR-004` | GNU GPLv3 Licensing & NOTICE Inspection | Legal | Full header & NOTICE review |
