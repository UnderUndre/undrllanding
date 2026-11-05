# Preliminary Requirements Traceability Matrix (Draft RTM)

**Feature**: 006-seo-geo-foundation
**Drafted**: 2026-11-06 (after plan + requirements-audit PASS)
**Scoring**: Risk = Impact (1–5) × Probability (1–5)

| Req ID | Тип | Формулировка (кратко) | Impact | Prob | Risk Score | Обязательные техники верификации | Planned Verification Level |
|---|---|---|---|---|---|---|---|
| FR-001 | FR | robots.txt: brand-scoped disallow list + sitemap pointer | 4 | 3 | 12 | curl-проверка живого файла + гейт V4-robots (содержимое) | Automated (gate V4) + Manual |
| FR-002 | FR | sitemap.xml: 4 публичных маршрута, absolute URLs, без auth | 4 | 3 | 12 | Гейт V4-sitemap (urlset + домен + /manifest, 0 auth) | Automated (gate V4) |
| FR-003 | FR | metadataBase + canonical (layout default + постраничные) | 4 | 3 | 12 | Гейт V4-head + grep-проверка страниц /manifest /privacy /terms | Automated (gate V4) + Manual |
| FR-004 | FR | openGraph + twitter:card блоки | 3 | 3 | 9 | Гейт V4-head (og:image, twitter:card) | Automated (gate V4) |
| FR-005 | FR | Динамическая OG-image 1200×630 из бренд-конфига | 3 | 3 | 9 | HTTP-проверка og:image URL (размер/доступность), визуальный просмотр | Automated (curl) + Manual |
| FR-006 | FR | JSON-LD: WebSite + brand entity (schemaType), safe serialization | 4 | 3 | 12 | Гейт V4-jsonld + vitest на builders (escape, entity selection) | Automated (gate V4 + unit) |
| FR-007 | FR | FAQPage JSON-LD из data/faq.json | 3 | 3 | 9 | Гейт V4-jsonld (условный: faq.json существует → блок обязателен) | Automated (gate V4) |
| FR-008 | FR | llms.txt — генерируемый манифест бренда | 2 | 3 | 6 | curl 200 + содержимое (brand name, FAQ topics) | Automated (curl) + Manual |
| FR-009 | FR | html lang синхронизация с UI-языком | 2 | 2 | 4 | Ручной свитч языка + DOM-инспекция | Manual |
| FR-010 | FR | Env-верификация GSC/Yandex (additive) | 1 | 2 | 2 | Diff билда с/без env | Manual |
| FR-011 | FR | Брендо-агностичность всех SEO-артефактов | 4 | 2 | 8 | Полный прогон гейтов на undreading + grep бренд-литералов | Automated (both brands) |
| NFR-001 | NFR | Пайплайн зелёный; V3 baseline refresh однократный | 4 | 3 | 12 | pnpm validate/test/verify на обоих брендах | Automated CI Pipeline |
| NFR-002 | NFR | Ноль новых runtime-deps; HTML ≤ +3 KB | 2 | 2 | 4 | package.json diff + размер билда | Automated (CI) |
| NFR-003 | NFR | Additive contract (дефолты без env/socials/uk) | 3 | 2 | 6 | Билд undreading (минимальный бренд) зелёный | Automated |
| NFR-004 | NFR | LCP без регрессии; OG-image вне критического пути | 3 | 2 | 6 | Отсутствие preload og:image; Lighthouse smoke | Manual |

## Комментарии к скорингу

- **High (12): FR-001, FR-002, FR-003, FR-006, NFR-001** — магистраль индексации и структурированных данных; все закрываются автоматическим гейтом V4, риск регрессии гасится CI.
- **Medium (8–9): FR-004, FR-005, FR-007, FR-011** — соц-карточки и GEO; curl + gate.
- **Low (≤6): FR-008..FR-010, NFR-002..004** — инфраструктурные хвосты с ручной smoke-проверкой.

Risk ≥ 20 (обязательные Decision Table + State Transition + Exploratory Charter + UAT): не назначено — максимум 12, все требования верифицируются автоматическими гейтами + один ручной прогон T012.

## Покрытие → следующий шаг

RTM передаёт в `tasks.md` два обязательных архитектурных решения из аудита:
1. T004: однократная перегенерация бейзлайна V3 после metadata spine (intentional change).
2. T010: FAQPage-чек в гейте V4 — условный (обязателен только при наличии `data/faq.json`).
