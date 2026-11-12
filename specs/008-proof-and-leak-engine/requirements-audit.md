# Requirements Audit Report: 008-proof-and-leak-engine

- **Standard**: ISO/IEC/IEEE 29148:2018 (Clauses 5.2.5 & 5.2.6)
- **Status**: **PASS** (100% Quality Criteria Satisfied)
- **Audit Date**: 2026-11-12
- **Auditor**: Valera (Digital Plumber Standard / Antigravity Rigor)
- **Feature Target**: `undrllanding/specs/008-proof-and-leak-engine/spec.md`
- **Commercial Source of Truth**: `undreplans/docs/projects/underundre/business-plan.md` v20.3 (Product 0 $350, Sprint A $3.5k)

---

## 1. Стоп-слова и неквантованные метрики (Pillar 1: Verifiability & Quantization)

Все требования спецификации проверены автоматическим скриптом на наличие неквантованных качественных прилагательных (`fast`, `secure`, `convenient`, `user-friendly`, `scalable`, `real-time`, `быстро`, `удобно`, `безопасно`, `масштабируемо`).

- **Обнаружено нарушений**: **0**
- Все функциональные и нефункциональные требования имеют строгие численные или бинарные метрики:
  - `FR-001`: Детерминированные математические формулы TDABC для $\text{LaborWaste}$, $\text{SaaSSeatTax}$ и $\text{TotalFriction}$ с фиксированными границами инпутов (Team: 1–500, Hours: 1–80h/wk, Rate: $15–$250/h).
  - `FR-002`, `FR-008`: Точные ключи телеметрии лида (`metadata.sourceComponent`, `metadata.teamSize`, `metadata.routineHoursPerWeek`, `metadata.totalHoursPerYear`, `metadata.annualLaborLeakUsd`, `metadata.saasBloatUsd`, `metadata.totalLeakUsd`, `metadata.targetWorkflow`).
  - `FR-003`, `FR-004`, `FR-005`: Строго фиксированные маршруты (`/calculator`, `/teardowns`, `/teardowns/[slug]`) со статической предгенерацией (`generateStaticParams`).
  - `FR-006`: Build-time Zod-валидация через `lib/schemas/teardown-schema.ts` с обязательной билингвальной формой `{ ru: string; en: string }`.
  - `FR-007`: Бинарный контракт сравнения (2 режима: SaaS Webhook Cascade vs Sovereign FOSS Pipeline).
  - `FR-009`: Строгая проверка изоляции бренда (`hasTeardowns` или 404 для сторонних брендов).
  - `FR-010`: Структурированная разметка `Article` и `BreadcrumbList` JSON-LD с экранированием `<`.
  - `FR-011`: Ровно 3 канонических кейса со строгими slug-идентификаторами.
  - `NFR-001`: `tsc --noEmit` и `vitest run` = ровно 0 ошибок.
  - `NFR-002`: $\text{LCP} \le 1.5\text{с}$, $\text{CLS} = 0$, общий прирост клиентского бандла $\le 15\text{ КБ gz}$.
  - `NFR-003`: Ровно 0 внешних сторонних библиотек графиков или WASM-рантаймов (только React 19 + SVG + Tailwind v4).
  - `NFR-004`: Gate V6 в `scripts/verify-gates.mjs` проверяет Zod-схему, валидность JSON-LD и отсутствие PII.

---

## 2. Матрица конфликтов (Pillar 2: Consistency Cross-Check)

Попарный анализ требований ($FR_i \times FR_j$) на предмет логических противоречий:

| ID 1 | ID 2 | Анализ взаимодействия | Статус |
| :--- | :--- | :--- | :--- |
| **FR-001** (Калькулятор) | **FR-002 / FR-008** (Метаданные лида) | Калькулятор генерирует плоский скалярный объект, который строго укладывается в контракт `GenericLeadSubmissionSchema` (ограничение $\le 20$ ключей, ключи $\le 50$ символов, созданное в 005). Конфликта схемы нет. | **PASS** |
| **FR-002** (Экспорт в бриф) | **007 FR-002** (Реферальная атрибуция) | Переход из калькулятора в `#contact` происходит в пределах клиентского сеанса; `metadata.referral` извлекается из `localStorage` независимо от параметров калькулятора. | **PASS** |
| **FR-004 / FR-005** (Маршруты Teardowns) | **FR-009** (Изоляция брендов) | Для бренда `undreading` данные кейсов отсутствуют. `generateStaticParams` возвращает пустой массив, а страницы отдают `notFound()`. Gate V6 это валидирует. | **PASS** |
| **FR-005** (Кейсы) | **FR-010** (Article JSON-LD) | Метаданные `Article` формируются из полей `TeardownSchema` (заголовок, дата, автор, описание). Полнота полей гарантирована Zod-схемой. | **PASS** |
| **FR-007** (Архитектурный инспектор) | **NFR-002 / NFR-003** (Бюджет бандла) | Отказ от внешних библиотек (WASM, D3, Canvas) в пользу чистого SVG и Tailwind v4 гарантирует удержание прироста бандла в пределах 15 КБ. | **PASS** |

Неразрешённых логических конфликтов: **0**.

---

## 3. Анализ полноты и граничных условий (Pillar 3: Boundary & Failure Coverage)

- **Граничные условия калькулятора**: Зафиксированы минимальные и максимальные пределы ползунков (Team: 1–500, Hours: 1–80, Rate: $15–$250). Исключены отрицательные значения, деление на ноль и NaN.
- **Ошибочные состояния и 404**: Запрос несуществующего слага `/teardowns/unknown-slug` вызывает Next.js `notFound()`, отдавая каноническую страницу 404.
- **OpSec и PII защита**: Автоматический негативный регекс-скан в Gate V6 исключает публикацию реальных корпоративных доменов, номеров телефонов и персональных данных в файлах `projects/<brand>/data/teardowns/*.json`.
- **Поведение без JavaScript**: Маршрут `#contact` является нативным HTML-якорем, форма заявки функционирует стандартно при отключенном JS.

---

## 4. Однозначность формулировок (Pillar 4: Unambiguity)

- Единая терминология: «Teardown» (де-анонимизированный анатомический разбор кейса), «TDABC» (Time-Driven Activity-Based Costing), «Sovereign FOSS Pipeline» (автономная бессерверная/контейнерная архитектура без лицензионных поборов), «Friction Tax» (операционный налог на трение).
- Роли и ответственность компонентов чётко разделены: данные изолированы в JSON, схемы типизированы Zod в `lib/schemas/`, компоненты представления не содержат захардкоженных данных конкретных клиентов.

---

## 5. Итоговый статус гейта

- **GATE VERDICT: PASS**
- Число нарушений: Pillar 1: **0**, Pillar 2: **0**, Pillar 3: **0**, Pillar 4: **0**.
- **Бизнес-план**: `unchanged` (фича обслуживает воронку Product 0 / Sprint A, не меняет ценовые полы и не вводит новые SKU).
- Переход к этапу технического планирования (`speckit.full-plan`) **РАЗРЕШЁН**.
