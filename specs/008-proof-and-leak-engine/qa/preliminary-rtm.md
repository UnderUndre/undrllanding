# Preliminary Requirements Traceability Matrix (Draft RTM)

**Feature**: `008-proof-and-leak-engine`  
**Drafted**: 2026-11-12 (Stage: Gate 2.5 Requirements Audit PASS)  
**Scoring**: $\text{Risk Score} = \text{Impact (1–5)} \times \text{Probability (1–5)}$

| Req ID | Тип | Формулировка (кратко) | Impact | Prob | Risk Score | Обязательные техники верификации | Planned Verification Level |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-001** | FR | Формулы TDABC калькулятора (Labor + SaaS + Total) | 4 | 3 | 12 | Boundary Value Analysis (1/500 team, 1/80 hrs, $15/$250 rate), Equivalence Partitioning | Unit Test (`tests/unit/calculator.test.ts`) |
| **FR-002** | FR | Экспорт параметров калькулятора в форму `#contact` | 4 | 3 | 12 | State Transition, Component Integration | Automated Component / E2E Test |
| **FR-003** | FR | Маршрут `/calculator` + блок на главной странице | 3 | 2 | 6 | Smoke Happy-Path, Prerender Assertion | Build Prerender Inspection |
| **FR-004** | FR | Маршрут каталога кейсов `/teardowns` | 3 | 2 | 6 | Smoke Happy-Path, Grid Layout Check | Automated Route Check |
| **FR-005** | FR | Статические страницы кейсов `/teardowns/[slug]` | 4 | 3 | 12 | Dynamic Route `generateStaticParams`, 404 Error State | Automated Route & 404 Test |
| **FR-006** | FR | Zod-схема кейса (`TeardownSchema`) с билингвальностью | 5 | 3 | 15 | Negative Contract Testing, Schema Fuzzing | Unit Test (`tests/unit/teardown-schema.test.ts`) |
| **FR-007** | FR | Интерактивный инспектор архитектуры (SaaS vs FOSS) | 3 | 2 | 6 | Visual Interaction Smoke, Mobile Responsive Test | Manual QA + Component Test |
| **FR-008** | FR | Расширенная телеметрия лида (`sourceComponent`, `leak`) | 4 | 2 | 8 | Payload Contract Validation with `GenericLeadSubmissionSchema` | Unit Test (`tests/unit/lead-metadata.test.ts`) |
| **FR-009** | FR | Изоляция брендов (404/пропуск для брендов без кейсов) | 4 | 3 | 12 | Cross-Brand Build Isolation, Boundary Verification | Automated CI Gate (`verify-gates.mjs`) |
| **FR-010** | FR | `Article` + `BreadcrumbList` JSON-LD и каноникалы | 4 | 2 | 8 | Schema.org Syntax Validation, `<`-escape Assertion | Unit Test + Gate V6 |
| **FR-011** | FR | 3 канонических де-анонимизированных кейса | 4 | 2 | 8 | Content Integrity Check, OpSec Leakage Scan | Automated CI Gate V6 |
| **NFR-001**| NFR | Компиляция `tsc --noEmit` и `vitest run` = 0 ошибок | 4 | 2 | 8 | Strict Typecheck & Test Suite | Automated CI Pipeline |
| **NFR-002**| NFR | $\text{LCP} \le 1.5\text{с}$, $\text{CLS} = 0$, бандл $\le 15\text{ КБ gz}$ | 4 | 3 | 12 | Bundle Analyzer, Lighthouse / Web Vitals Audit | Manual QA + Build Output Inspection |
| **NFR-003**| NFR | 0 внешних сторонних библиотек (WASM/графики) | 3 | 2 | 6 | Dependency Scan (`package.json` diff verification) | CI Dependency Check |
| **NFR-004**| NFR | Автоматический Gate V6 в `verify-gates.mjs` | 5 | 3 | 15 | Negative Test Simulation (corrupted case, real PII domain) | Automated CI Pipeline (`npm run verify`) |

---

## High-Risk Focus Areas

1. **FR-006 & NFR-004 (Risk 15 — High): Zod-схема и Gate V6.**  
   *Риск*: Опечатка в структуре кейса ломает билд или пропускает некорректный markdown/HTML.  
   *Верификация*: Строгие юнит-тесты на Zod-валидатор с негативными тест-кейсами (пропущенный язык, отрицательная экономика, битый slug).
2. **FR-001 & FR-002 (Risk 12 — Medium): Математика TDABC и связка с формой.**  
   *Риск*: Некорректный пересчёт при вводе экстремальных чисел или потеря телеметрии при скролле к форме.  
   *Верификация*: Unit-тесты математических функций с проверкой граничных значений (BVA) и проверка контракта передачи метаданных.
3. **FR-009 (Risk 12 — Medium): Мультибрендовая чистота.**  
   *Риск*: Попадание слагов `underundre` в билд `undreading`.  
   *Верификация*: Автоматический запуск `verify-gates.mjs` для обоих брендов в CI.
