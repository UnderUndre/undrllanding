# Requirements Audit Report: 006-seo-geo-foundation

- **Standard**: ISO/IEC/IEEE 29148:2018 (Clauses 5.2.5 & 5.2.6)
- **Status**: **PASS** (1 non-blocking remediation note, see §2)
- **Audit Date**: 2026-11-06
- **Auditor**: ZCode (Valera Digital Plumber Standard)
- **Feature Target**: `undrllanding/specs/006-seo-geo-foundation/spec.md`
- **Input artifacts**: spec.md (clarified Q1–Q3), plan.md, tasks.md, checklists/requirements.md

---

## 1. Стоп-слова и неквантованные метрики (Gate 1)

- **Обнаружено нарушений**: **0**

Ключевые формулировки проверены на квантованность:

- FR-001: robots disallow list фиксирован (`/api/`, `/signin`, `/signup`, `/reset-password`) + sitemap pointer — бинарная curl-проверка.
- FR-002: sitemap маршруты перечислены исчерпывающе (4 публичных), auth/API исключены — бинарная проверка.
- FR-005: OG image 1200×630, рендер из бренд-конфига, ноль хардкодов — размерная проверка + grep.
- FR-006: JSON-LD с `@context: https://schema.org`, эскейп `<` — JSON.parse-проверка в гейте.
- FR-009: `document.documentElement.lang` синхронизируется на mount и на каждый setLang — бинарный DOM-тест.
- FR-010: env пуст → тег отсутствует; env задан → тег есть — бинарная проверка.
- NFR-002: рост HTML ≤ 3 KB — измеримо diff'ом билда.
- SC-005: гейт V4 зелёный на обоих брендах — прогон `pnpm verify`.

Стоп-слов из списка гейта (`fast`, `secure`, `удобно`, `scalable`, `периодически`…) в тексте требований не обнаружено.

## 2. Матрица конфликтов (Gate 2: Consistency Cross-Check)

| ID 1 | ID 2 | Суть взаимодействия | Статус |
|---|---|---|---|
| FR-003/004 (новые head-теги) | NFR-001 / гейт V3 (baseline byte-identity) | Новые head-теги меняют normalized DOM → V3 упадёт. Разрешение: однократная перегенерация бейзлайна зафиксирована задачей T004 (intentional change по контракту Maintenance). | RESOLVED (требование к tasks) |
| FR-006 (JSON-LD inline script) | CSP `script-src 'self' 'unsafe-inline'` (005, enforcing) | JSON-LD — inline `<script type="application/ld+json">` без исполняемого кода; CSP блокирует только исполняемые inline-скрипты; тип `application/ld+json` не исполняется. Плюс эскейп `<` против breakout. | PASS |
| FR-005 (og:image route) | NFR-004 (LCP guard) | OG-image рендерится на билде в отдельный маршрут, в критический путь главной не входит; `preload` отсутствует. | PASS |
| FR-002 (sitemap включает /manifest) | FR-001 (robots disallow /api) | Пересечений нет: /manifest — публичный контент; /api исключён из обоих. | PASS |
| FR-010 (verification envs) | NFR-003 (additive contract) | Env пустые → теги отсутствуют — поведение по умолчанию не меняется. | PASS |
| FR-009 (client lang sync) | 004 antigravity F3 (клиентская контекст-модель) | Решение согласовано: без [lang]-роутинга, только DOM-атрибут. | PASS |
| FR-011 (brand-agnostic) | 004 FR-011 (undreading pilot) | Гейт V4 и SEO-артефакты проверяются на обоих брендах — изоляция подтверждается SC-006. | PASS |

Неразрешённых логических конфликтов: **0**.

## 3. Анализ полноты (Gate 3: Boundary & Failure Coverage)

- **Edge-cases: ДА** — env-верификация пустая/заданная; бренд без socials (sameAs опционален); бренд без faq.json (FAQPage не требуется — условный чек в гейте); `schemaType` не задан → дефолт ProfessionalService; OG-image при отсутствии icon.svg → build fail-fast (fs.readFile бросает — санитизация контрактна, ассет обязателен по 004 FR-003).
- **Fallback-стратегии: ДА** — metadataBase всегда из config.domain (нет env-развилок); canonical по умолчанию "/" в layout, переопределяется постранично; llms.txt генерируется даже для минимального бренда (placeholder-данные скаффолда).
- **Таймауты/гонки: ДА** — все SEO-артефакты статически пререндерятся на билде; runtime-маршрутов с внешними вызовами нет; клиентский lang-sync идемпотентен.
- **Ошибочные состояния: ДА** — битый JSON в data-файлах ловится ContentValidationError раньше (005); гейт V4 валит CI при любом невалидном JSON-LD.
- Замечание: sitemap `lastModified` = build time (конвенция Next) — приемлемо, зафиксировано.

## 4. Однозначность (Gate 4)

- Терминология единая: «OG image», «JSON-LD», «brand entity», «gate V4», «llms.txt» — без синонимических скачков.
- Все 8 находок SEO-аудита (S-01..S-08) сведены в Disposition Map — двойного толкования границ скоупа нет.
- «Public routes» перечислены исчерпывающе (/, /manifest, /privacy, /terms) — множественного чтения нет.

## 5. Итоговый статус гейта

- **GATE VERDICT: PASS**
- Нарушений: Gate 1 — 0; Gate 2 — 0 (1 требование к tasks зафиксировано: T004 baseline refresh); Gate 3 — 0; Gate 4 — 0.
- Байпас не применялся.
- **Business plan**: unchanged (visibility infrastructure; ICP/цены/гейты не затронуты).

### Требования к tasks.md (перенесены в tasks)

1. T004: однократная перегенерация бейзлайна V3 после metadata spine (intentional `<head>` change).
2. T010: FAQPage-чек в гейте V4 условный — обязателен только при существовании `data/faq.json` у бренда.
