# Preliminary Requirements Traceability Matrix (Draft RTM)

**Feature**: `009-static-conversion-layer` · **Drafted**: 2026-11-14 · Risk = Impact × Probability

| Req ID | Тип | Формулировка (кратко) | Impact | Prob | Risk | Верификация | Level |
|---|---|---|---|---|---|---|---|
| FR-001 | FR | `/prompts`: N карточек, Zod, копирование без сети | 3 | 2 | 6 | Unit (schema) + DOM assert | Automated |
| FR-002 | FR | Скачивание полного пака .md | 3 | 2 | 6 | Static route assertion | Automated |
| FR-003 | FR | 5 промптов с провенансом реального workflow | 4 | 2 | 8 | Content integrity + XV voice | Manual QA |
| FR-004 | FR | `hasPrompts` → 404 на чужих брендах | 3 | 3 | 9 | Cross-brand build isolation | CI Gate V7 |
| FR-005 | FR | 3 персоны, варианты героя по `?persona=` | 4 | 3 | 12 | BVA (valid/invalid/absent), both langs | Unit + Manual |
| FR-006 | FR | localStorage `undr.persona` + `metadata.persona` | 4 | 3 | 12 | Last-touch overwrite, invalid omit, композиция с referral | Unit (`tests/unit/persona.test.ts`) |
| FR-007 | FR | `/waitlist` только undreading, trilingual, /api/lead | 4 | 3 | 12 | Brand isolation + payload contract | CI Gate V7 + Unit |
| FR-008 | FR | Consent + /privacy + приватный леджер | 4 | 2 | 8 | Ledger init + grep (no emails in public repo) | CI Gate V7 |
| FR-009 | FR | ○ Static + canonical + JSON-LD (`<`-escape) | 3 | 2 | 6 | Prerender assertion | CI Gate V7 |
| FR-010 | FR | Sitemap conditional (prompts/waitlist) | 3 | 3 | 9 | Brand-scoped sitemap body | CI Gate V7 |
| FR-011 | FR | Футер-линки через brand configs | 2 | 2 | 4 | DOM assert | Manual QA |
| NFR-001 | NFR | tsc + vitest 0 ошибок | 4 | 2 | 8 | CI | Automated |
| NFR-002 | NFR | ≤10 КБ gz, LCP ≤1.5s, CLS=0 | 3 | 3 | 9 | Bundle + Lighthouse | Manual QA |
| NFR-003 | NFR | 0 рантайм-AI, 0 новых deps | 4 | 2 | 8 | Dependency scan | CI |
| NFR-004 | NFR | Дефолт-герой байт-идентичен базлайну | 4 | 3 | 12 | Gate V3 byte-diff | CI (V3) |
| NFR-005 | NFR | Gate V7 (V7.1–V7.3) | 4 | 3 | 12 | Negative fixtures | CI Pipeline |

## High-Risk Focus

1. **FR-005/006 + NFR-004 (Risk 12)**: персона-механика не должна тронуть дефолт-рендер — Gate V3 байт-дифф главный страж.
2. **FR-007 (Risk 12)**: waitlist-изоляция в обе стороны — V7.3 проверяет наличие в undreading И отсутствие в underundre.
