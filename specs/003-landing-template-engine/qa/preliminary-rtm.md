# Preliminary Requirements Traceability Matrix (Draft RTM)

**Feature**: `003-landing-template-engine`  
**Standard**: ISO/IEC/IEEE 29148:2018 (Clauses 5.2.5 & 5.2.6)  
**Date**: 2026-10-30  
**Status**: Active Baseline for Plan & Test Stages

---

## 1. Risk-Based Testing Matrix

| Req ID | Тип | Формулировка / Скоуп | Impact (1–5) | Prob (1–5) | Risk Score | Категория Риска | Обязательные техники верификации | Planned Verification Level |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-001** | FR | Header IoC (декуплинг навигации от слагов) | 5 | 3 | **15** | High | Structural Assertions (grep `isUnderundre` == 0), Nav parity test | Automated Test + Visual Pass |
| **FR-002** | FR | Footer IoC (декуплинг футера от слагов) | 5 | 3 | **15** | High | Structural Assertions, Link integrity check, Column rendering | Automated Test + Visual Pass |
| **FR-003** | FR | Tailwind v4 Theme Tokens (CSS-переменные) | 4 | 3 | **12** | Medium | Palette switch test, Dark mode contrast verify | Visual Regression Pass |
| **FR-004** | FR | Zod-Validated Data Layer (JSON pricing/FAQ) | 5 | 4 | **20** | **Critical** | Build-time Schema Validation, Boundary Value Analysis, Negative Fault Injection | Unit / Schema Test in Build |
| **FR-005** | FR | Pluggable Lead API (открытый `metadata` payload) | 5 | 4 | **20** | **Critical** | Zod Contract Test, Webhook Mock Dispatch, Telegram Failover, Network Timeout test | Integration Test |
| **FR-006** | FR | Statutory Page: Privacy Policy (`/privacy`) | 4 | 2 | **8** | Medium | Dynamic operator interpolation check, GDPR Art. 13 review | Content Verification |
| **FR-007** | FR | Statutory Page: Terms of Service (`/terms`) | 4 | 2 | **8** | Medium | Dynamic operator interpolation check, Upwork/IP clauses | Content Verification |
| **FR-008** | FR | Statutory Page: Manifesto (`/manifest`) | 4 | 2 | **8** | Medium | 7 principles completeness check, Tagline anchor link test | Content Verification |
| **FR-009** | FR | Scaffolding CLI (`pnpm project:create`) | 5 | 3 | **15** | High | End-to-end CLI generation run, Compile verification on fresh brand | Automated E2E CLI Test |
| **FR-010** | FR | Canonical Starter Template (`projects/_template`) | 4 | 3 | **12** | Medium | Structural completeness check, Zero-error build check | Build Verification |
| **NFR-001** | NFR | Zero Compilation & Type Regressions | 5 | 3 | **15** | High | `tsc --noEmit` and `pnpm build` across all projects | CI Build Gate |
| **NFR-002** | NFR | Performance ($\text{LCP} \le 1.5$s, static pre-render) | 4 | 3 | **12** | Medium | Build static routes inspection (`○ (Static)` check) | Performance Audit |
| **NFR-003** | NFR | Accessibility (WCAG 2.1 AA $\ge 4.5:1$) | 4 | 2 | **8** | Medium | Contrast picker check on new routes | A11y Audit |
| **NFR-004** | NFR | GNU GPLv3 Licensing & NOTICE | 5 | 2 | **10** | Medium | License headers scan, Cruip copyright acknowledgment check | Legal Compliance Pass |

---

## 2. Критические требования (Risk $\ge 20$) — Протокол Верификации

1. **FR-004 (Zod-Validated Data Layer)**:
   - *Техники:* Schema Enforcement + Negative Testing.
   - *Условие приёмки:*
     - Валидный `pricing.json` / `faq.json` компилируется без задержки.
     - Битый JSON (отсутствие обязательного поля, передача числа вместо строки) немедленно прерывает выполнение `next build` с кодом выхода 1 и выводит читаемый лог ошибки с указанием проблемного пути.
2. **FR-005 (Pluggable Lead API)**:
   - *Техники:* Contract Testing + Fault Injection + Fallback Assertion.
   - *Условие приёмки:*
     - Пейлоад с произвольным объектом `metadata: { anyKey: 123 }` успешно валидируется и отдаёт 200 OK.
     - При падении или отсутствии токенов Telegram клиент не видит 500-й ошибки; активируется корректный fallback.
