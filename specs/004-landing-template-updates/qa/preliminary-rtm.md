# Preliminary Requirements Traceability Matrix (Draft RTM)

**Feature**: 004-landing-template-updates
**Drafted**: 2026-11-02 (before plan.md, per requirements-audit PASS)
**Scoring**: Risk = Impact (1–5) × Probability (1–5)

| Req ID | Тип | Формулировка (кратко) | Impact | Prob | Risk Score | Обязательные техники верификации | Planned Verification Level |
|---|---|---|---|---|---|---|---|
| FR-001 | FR | Опциональные `faviconUrl`/`appleIconUrl` + фолбэк-цепочка до `iconUrl` | 3 | 2 | 6 | Equivalence Partitioning (все 4 варианта заполнения полей), базовые негативные | Unit test (config resolution) |
| FR-002 | FR | MIME по расширению (.svg/.png/.ico → типы, иное → octet-stream), 404 при отсутствии | 3 | 3 | 9 | EP + негативные тесты (несуществующий файл, неизвестное расширение) | Automated (route test) |
| FR-003 | FR | Favicon ≤ 10 KB, рендер 16–48 px, из source artwork бренда | 3 | 2 | 6 | BVA по размеру файла (границы 10 KB ± ε), визуальный smoke 16/32/48 px | Automated size check + Manual |
| FR-004 | FR | Apple touch icon 180×180 PNG | 3 | 3 | 9 | Contract test (размерность/формат), BVA (179/180/181 px) | Automated + Manual (iOS emulator) |
| FR-005 | FR | Header logo без inline background/border/padding из темы | 2 | 2 | 4 | Smoke + grep-assert по JSX/DOM (0 совпадений inline chrome) | Automated (DOM assert) |
| FR-006 | FR | Цитаты манифеста: §N ∈ 1..7, ссылки `/manifest#p-N`, якоря p-1..p-7, scroll-mt | 3 | 3 | 9 | EP (N=0,1,7,8), DOM-проверка якорей, клик-тест скролла под фикс-хедер | Automated + Manual |
| FR-007 | FR | Один публичный токен версии; 0 внутренних ревизий в публичном выводе | 4 | 3 | 12 | Grep-скан билд-артефактов (`§18`, `v18.9`, dual-токены), негативные (утечка = fail CI) | Automated CI Pipeline |
| FR-008 | FR | Source-of-truth иконок = `public/projects/<slug>/`, 0 дублей | 3 | 3 | 9 | Tree-scan (дубликаты = fail), изоляция брендов при последовательных билдах | Automated CI Pipeline |
| FR-009 | FR | Scaffold генерирует иконки по FR-003/FR-004 | 2 | 3 | 6 | Smoke scaffold + contract test ассетов | Automated (CLI test) |
| FR-010 | FR | `LocalizedText {ru,en,uk?}`, фолбэк uk→en, ru/en unchanged | 4 | 3 | 12 | BVA (0/1/все строки с uk), byte-diff baseline ru/en, фолбэк-матрица | Automated CI Pipeline |
| FR-011 | FR | Пилот-бренд `undreading` scaffold + build, 0 ссылок на underundre | 4 | 4 | 16 | BVA (7-точечный по копии), негативные (кросс-брендовые утечки grep), симуляция сбоя (build без ассетов другого бренда), UAT владельцем | Automated + Manual QA + UAT |
| NFR-001 | NFR | `tsc --noEmit` = 0 ошибок | 2 | 2 | 4 | Smoke (typecheck в CI) | Automated CI Pipeline |
| NFR-002 | NFR | Favicon ≤10 KB, apple ≤60 KB, LCP без регрессии (003 NFR-002) | 3 | 2 | 6 | Size-budget тест, Lighthouse/LCP сравнение с baseline | Automated CI Pipeline |
| NFR-003 | NFR | Additive compat: бренды без новых полей/uk не меняют поведение | 4 | 2 | 8 | Byte-diff HTML baseline для underundre (ru/en), regression suite 003 | Automated CI Pipeline |

## Комментарии к скорингу

- **High (16): FR-011** — пилот undreading: самая комплексная история (scaffold + копия из бизнес-плана v2.5 + изоляция ассетов + третья локаль). Верификация: негативные grep-сканы + build-симуляция + UAT.
- **Medium (12): FR-007, FR-010** — публичная целостность и локальный фолбэк: оба закрываются автоматическими CI-гейтами (grep + byte-diff), ручного QA сверх UAT не требуют.
- **Low (≤4): FR-005, NFR-001** — smoke-уровень достаточен.

## Покрытие → следующий шаг

RTM передаёт в `plan.md` два обязательных архитектурных решения из аудита:
1. Правка `projects/_template/` под FR-008 (иначе scaffold воспроизводит запрещённую схему ассетов).
2. CI-гейты для FR-007/FR-008/FR-010/NFR-003 (grep/byte-diff) — проектируются как единый verify-скрипт, а не четыре отдельных.
