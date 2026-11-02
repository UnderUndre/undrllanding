# Requirements Audit Report: 004-landing-template-updates

- **Standard**: ISO/IEC/IEEE 29148:2018 (Clauses 5.2.5 & 5.2.6)
- **Status**: **PASS** (1 non-blocking remediation, see §1)
- **Audit Date**: 2026-11-02
- **Auditor**: ZCode (Valera Digital Plumber Standard)
- **Feature Target**: `undrllanding/specs/004-landing-template-updates/spec.md`
- **Commercial Source of Truth**: `undreplans/docs/projects/undreading/undreading-business-plan.md` v2.5 (pilot brand), `undreseller-business-plan.md` v20.x (engine)

---

## 1. Стоп-слова и неквантованные метрики (Gate 1)

- **Обнаружено нарушений**: **1** (non-blocking — поведение уже квантовано дублирующим FR)

| ID | Цитата | Причина | Рекомендация |
|---|---|---|---|
| US4-AC3 | «…fall back **gracefully** for shared engine strings lacking `uk`» | Стоп-слово без метрики | Переформулировать при следующей правке spec.md: «strings lacking `uk` render the `en` value; count of rendered empty strings = 0» (детерминированный grep-критерий). Неблокирующе: идентичное поведение уже строго определено в FR-010 (`uk?: string`, fallback → `en`) и NFR-003/SC-005 (byte-identical baseline). |

Остальные требования квантованы:
- FR-001: детерминированная цепочка фолбэков `faviconUrl ?? iconUrl` / `appleIconUrl ?? faviconUrl ?? iconUrl` — бинарный тест.
- FR-002: таблица расширение→MIME (3 отображения + octet-stream), 404 (не 500) при отсутствии файла.
- FR-003: favicon ≤ 10 KB; FR-004: 180×180 px PNG; NFR-002: apple icon ≤ 60 KB.
- FR-005: отсутствие inline background/border/padding — проверяется grep по DOM/JSX, ровно 0 совпадений.
- FR-006: §N ∈ {1..7}, якоря `p-1`…`p-7`, `scroll-mt` — бинарная проверка.
- FR-007: одиночный публичный токен версии; grep билд-артефактов на `§18`/`v18.9`/двойные токены = 0.
- FR-008: ровно одна директория source-of-truth, отсутствие дублей — grep по дереву.
- FR-010: `LocalizedText {ru, en, uk?}`, fallback → en; SC-005: ru/en вывод byte-identical базовому билду.
- NFR-001: `tsc --noEmit` = 0 ошибок.

## 2. Матрица конфликтов (Gate 2)

| ID 1 | ID 2 | Анализ взаимодействия | Статус |
|---|---|---|---|
| FR-001 (fallback-цепочка) | FR-002 (MIME/404) | Фолбэк на `iconUrl` не меняет контент-тип роута: расширение резолвится по фактическому файлу. Взаимодополнение. | PASS |
| FR-003/004 (иконки ≤10 KB / 180×180) | FR-005 (лого без хрома) | Разные рендер-контексты (meta head vs header DOM). Пересечений нет. | PASS |
| FR-006 (якоря §1–7) | FR-007 (запрет внутренних ревизий) | Единая модель публичных координат манифеста; FR-007 запрещает то, что FR-006 нормализует. | PASS |
| FR-008 (source-of-truth `public/projects/<slug>/`) | **003 FR-009/FR-010** (scaffold-шаблон `_template/`) | **Кросс-документальный стык**: шаблон 003 должен генерировать иконки в `public/projects/<slug>/`, а не в `projects/<slug>/public/`. Конфликта нет, но plan.md обязан зафиксировать правку шаблона `projects/_template/` — иначе scaffold воспроизведёт запрещённую схему. | PASS (требование к plan) |
| FR-010 (uk опционален) | FR-011 (undreading трилингва) | FR-011 — потребитель FR-010; опциональность uk покрывает underundre (без uk). Дополнение, не конфликт. | PASS |
| FR-011 (новый бренд) | NFR-003 (additive compat) | Проверяется SC-005 (byte-identical ru/en baseline underundre). | PASS |

Неразрешённых логических конфликтов: **0**.

## 3. Анализ полноты (Gate 3: Boundary & Failure Coverage)

- **Edge-cases: ДА** — отсутствующий файл иконки (404, не 500), нестандартный размер apple-icon (контракт задокументирован, без рантайм-ресайза), бренд без uk-локали, бренд без новых полей конфига, изоляция ассетов между брендами.
- **Fallback-стратегии: ДА** — цепочка `appleIconUrl ?? faviconUrl ?? iconUrl`; uk → en фолбэк.
- **Таймауты/гонки: N/A** — статические ассеты и build-time копи, сетевых вызовов и конкурентных записей фича не добавляет.
- **Пустые/ошибочные состояния UI: ДА** — пустые/неполные локали (fallback), отсутствующий ассет (404-ветка роута), out-of-range цитирование §8+ зафиксировано как copy-review чеклист-статья (осознанно вне рантайма).
- Замечание: not-found поведение страниц /manifest при пустом `principles[]` (N=0) не описано — наследуется от 003 (Zod-схема бьёт билд при нарушении контракта), покрыто базовым контрактом.

## 4. Однозначность (Gate 4)

- Терминология единая: «brand», «brand icon asset set» (три рендер-дипикции одного source artwork), «favicon» vs «header icon» разведены явно.
- Спека явно помечена как дельта над 003 и не переопределяет чужие FR — исключает двойное толкование границ скоупа.

## 5. Итоговый статус гейта

- **GATE VERDICT: PASS**
- Нарушений: Gate 1 — 1 (non-blocking, дублировано строгим FR-010); Gate 2 — 0; Gate 3 — 0; Gate 4 — 0.
- Байпас не применялся.
- **Business plan**: unchanged для undreseller v20.x; дельта (онбординг бренда undreading) помечена для владельца плана (см. чеклист фичи).

### Требование к plan.md (переносится в план)

1. Зафиксировать правку `projects/_template/` под FR-008 (иконки в `public/projects/<slug>/`).
2. Заменить формулировку US4-AC3 на grep-критерий из §1 (или подтвердить FR-010 как единственный источник истины по fallback).
