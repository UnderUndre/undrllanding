# Requirements & Risk Traceability Matrix (RTM): 003-landing-template-engine

- **Standard**: ISO/IEC/IEEE 29119-3:2021 (Clauses 5.4 & 6.2)
- **Status**: Complete Baseline for Implementation & Testing
- **Feature Target**: `undrllanding/specs/003-landing-template-engine/`

---

## 1. End-to-End Functional Traceability

| Req ID | Суть требования | Impact | Prob | Risk Score | Test Tier | Associated Test Cases | Task ID | Implementation File(s) | Defect IDs |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- | :--- | :--- | :--- |
| **FR-001** | Header IoC (декуплинг навигации от слагов + theme-ключи) | 5 | 3 | **15** | Sanity | `TC-LTE-001`, `TC-LTE-002` | `T-003`, `T-004`, `T-005`, `T-023` | `components/header-nav.tsx`, `lib/project-config.ts` | — |
| **FR-002** | Footer IoC (декуплинг футера от слагов) | 5 | 3 | **15** | Sanity | `TC-LTE-003`, `TC-LTE-004`, `TC-LTE-026` | `T-003`, `T-004`, `T-006` | `components/ui/footer.tsx`, `lib/project-config.ts` | — |
| **FR-003** | Tailwind v4 Theme Tokens (канонический набор из 8) | 4 | 3 | **12** | Regression | `TC-LTE-005`, `TC-LTE-006` | `T-015` | `app/css/style.css`, `projects/underundre/theme.css` | — |
| **FR-004** | Zod-Validated Data Layer (билингвальный JSON pricing/FAQ) | 5 | 4 | **20** | Smoke/Sanity | `TC-LTE-007`, `TC-LTE-008`, `TC-LTE-009` | `T-001`, `T-013`, `T-014` | `lib/schemas/content-schema.ts`, `projects/*/data/*.json` | — |
| **FR-005** | Pluggable Lead API (bounded metadata + миграция формы) | 5 | 4 | **20** | Smoke/Sanity | `TC-LTE-010`, `TC-LTE-011`, `TC-LTE-012`, `TC-LTE-013`, `TC-LTE-023`, `TC-LTE-024`, `TC-LTE-025` | `T-016`, `T-017`, `T-024` | `app/api/lead/route.ts`, `cta-underundre.tsx` | — |
| **FR-006** | Statutory Page: Privacy Policy (`/privacy`) | 4 | 2 | **8** | Regression | `TC-LTE-014`, `TC-LTE-015` | `T-008` | `app/(default)/privacy/page.tsx` | — |
| **FR-007** | Statutory Page: Terms of Service (`/terms`) | 4 | 2 | **8** | Regression | `TC-LTE-016`, `TC-LTE-017` | `T-009` | `app/(default)/terms/page.tsx` | — |
| **FR-008** | Statutory Page: Manifesto (`/manifest`) | 4 | 2 | **8** | Regression | `TC-LTE-018`, `TC-LTE-019`, `TC-LTE-026` | `T-010`, `T-011`, `T-012` | `app/(default)/manifest/page.tsx`, `tagline-reveal.tsx` | — |
| **FR-009** | Scaffolding CLI (`pnpm project:create`) | 5 | 3 | **15** | Sanity | `TC-LTE-020`, `TC-LTE-021` | `T-019`, `T-022` | `scripts/create-project.mjs`, `package.json` | — |
| **FR-010** | Canonical Starter Template (`projects/_template`) | 4 | 3 | **12** | Regression | `TC-LTE-022` | `T-018` | `projects/_template/` | — |
| **FR-011** | Legacy Decommission: undrlla brand removal | 4 | 3 | **12** | Sanity | `TC-LTE-002`, `TC-LTE-021` | `T-023` | `lib/project-config.ts`, `components/`, `app/economics/`, `app/api/waitlist/` | — |

---

## 2. NFR Traceability & Level 1 Evidence Table

| NFR ID | Категория | Требование | Метод валидации | Инструмент | Threshold | Level 1 Evidence (Файл / Команда) | Статус |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: |
| **NFR-001** | Build & Type Safety | Ноль ошибок типизации и компиляции Next.js | Статический анализ | `tsc`, Next.js build | `tsc --noEmit` exit 0, build exit 0 | `evidence/pnpm-validate.log` | [PENDING] |
| **NFR-002** | Performance | $\text{LCP} \le 1.5$с, pre-rendered static routes (`○`) | Статический анализ сгенерированных страниц | Next.js Build Trace, Lighthouse | LCP $\le 1.5$s, CLS $= 0$ | `evidence/static-export-routes.log`, `evidence/lighthouse.json` (T-025) | [PENDING] |
| **NFR-003** | Accessibility | Контрастность текста $\ge 4.5:1$ на всех новых роутах | A11y анализ | `axe-core`, Lighthouse | WCAG 2.1 AA PASS | `evidence/axe-report-statutory.json` (T-025) | [PENDING] |
| **NFR-004** | Legal Compliance | Лицензия GNU GPL-3.0 + NOTICE в корне репо | Лицензионный аудит | Grep, License scanner | Наличие GPL-3.0 и NOTICE | `LICENSE`, `NOTICE` | [PENDING] |
