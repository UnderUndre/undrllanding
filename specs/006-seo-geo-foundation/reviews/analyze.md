# SpecKit Analyze: 006-seo-geo-foundation

**Reviewer**: analyze (ZCode self-consistency)
**Reviewed at**: 2026-11-06T12:40:00Z
**Commit**: 440bec7 (spec) + plan/tasks/audit/rtm working tree
**Artifacts**: spec.md, plan.md, tasks.md, requirements-audit.md (PASS), checklists/requirements.md, qa/preliminary-rtm.md

## Findings

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| G1 | Agent routing | MEDIUM | tasks.md T001–T004, T006, T007, T009 | Основной объём (6 задач) помечен [FE], но затрагивает серверные метаданные, MetadataRoute и lib/seo — это смешанный [FE]/[BE] контур. Прецедент 005-G1: i18n-смежное оставлено [FE] с обоснованием. Здесь тот же случай: всё рендерится на сервере Next, UI-скилы не нужны, но и бэкенд-границ нет. | Оставить [FE] с одной строкой обоснования в dispatch plan (добавлено), либо перекрасить в [BE]. Не блокирует реализацию. |
| F1 | Consistency | LOW | plan.md Project Structure | `app/llms.txt/route.ts` — точка в имени сегмента валидна для App Router (файл-маршрут `llms.txt`), но неочевидна; у ряда линтеров/вьюеров подсветка сбоит. | Зафиксировать в T008 проверку: маршрут отвечает 200 после build (уже в T012 acceptance). |
| L1 | Ops | LOW | plan.md Deployment Readiness | analytics.underundre.com (Umami dashboard) — отдельный маршрут Caddy, вне скоупа undrllanding; его robots/noindex остаётся на стороне Umami/edge. | Out-of-scope note зафиксирована; владелец решает на уровне Caddy/Umami при необходимости. |
| I1 | Supply chain | LOW | plan.md Technical Context | `next/og` встроен, новых deps нет — проверено; пиннинг не требуется. | Действий нет. |
| M1 | Operational readiness | LOW | tasks.md T013 | Rollback-стратегия для SEO-артефактов: статика, `git revert` + redeploy (RTO минуты) — тот же профиль, что 005 M1. | Одна строка уже покрыта общим rollback-профилем репо; отдельная задача не требуется. |
| E1 | Coverage | LOW | spec FR-009 | html-lang sync не покрывается автоматическим гейтом (нужен браузер) — только ручной чек T012. Для P3-истории приемлемо. | Принять как есть. |

## Coverage Summary

| Requirement Key | Has Task? | Task IDs | Notes |
|---|---|---|---|
| FR-001 robots.txt | ✅ | T003, T002 (noindex defense-in-depth) | gate V4-robots |
| FR-002 sitemap.xml | ✅ | T003 | gate V4-sitemap |
| FR-003 metadataBase + canonical | ✅ | T001, T002 | gate V4-head |
| FR-004 OG + Twitter metadata | ✅ | T001 (+T005 image) | gate V4-head |
| FR-005 Dynamic OG image | ✅ | T005 | manual HTTP/visual (T012) |
| FR-006 JSON-LD brand entity | ✅ | T006 | gate V4-jsonld + vitest |
| FR-007 FAQPage JSON-LD | ✅ | T007 | gate V4-jsonld (conditional) |
| FR-008 llms.txt | ✅ | T008 | manual HTTP (T012) |
| FR-009 html lang sync | ✅ | T009 | manual spot-check (T012) |
| FR-010 webmaster verification | ✅ | T001 | build diff manual |
| FR-011 brand-agnostic | ✅ | T004, T010, T011, T013 | both-brand verification (SC-006) |
| NFR-001 pipeline green | ✅ | T004, T013 | CI |
| NFR-002 no new deps / ≤3KB | ✅ | T010 (verify) + package.json untouched | automated |
| NFR-003 additive contract | ✅ | T006 (schemaType optional), T010 | undreading build |
| NFR-004 LCP guard | ✅ | T005 design (no preload), T012 manual | manual |
| US1/US2/US3/US4 | ✅ | covered through FRs | — |
| SC-001..SC-006 | ✅ | T010, T012, T013 | — |

## Constitution Alignment Issues

- None. Principle VII: полный тег-контур — `spec/006-seo-geo-foundation/v1` присутствует; plan/tasks теги следуют. Principle VI: pending by design — analyze этот, внешние ревьюеры до implement. Principle XII: гейт V4 расширяет автоматический контур. Coverage % (requirements with ≥1 task): **100%**.

## Commercial / Business Plan Alignment

- Business plan: `undreplans/docs/projects/underundre/business-plan.md` v20.2b — visibility infrastructure не трогает ICP/цены/гейты. E-E-A-T gain: Trustworthiness (HTTPS, canonical, verification), FAQ structured data усиливает цитируемость Product 0 SpecKit Discovery ($350–$490) в AI-движках — прямая поддержка GTM без drift.
- Findings: **No commercial drift detected.**

## Unmapped Tasks

- None. T004 (baseline) мапится на NFR-001; T011 (CI) — на SC-005; T013 — на Deployment Readiness.

## Metrics

- Total Requirements: 11 FR + 4 NFR + 4 US
- Total Tasks: 13
- Coverage % (requirements with ≥1 task): 100%
- Ambiguity count: 0
- Duplication count: 0
- CRITICAL count: 0
- HIGH count: 0
- MEDIUM count: 1 (G1)
- LOW count: 5 (F1, L1, I1, M1, E1)

## VERDICT

```yaml
verdict: PASS
reviewer: analyze
reviewed_at: 2026-11-06T12:40:00Z
commit: 440bec7
critical_count: 0
high_count: 0
medium_count: 1
low_count: 5
```

**Примечание**: PASS с 1 MEDIUM (G1 — тег-раскраска [FE] с обоснованием в dispatch plan) и 5 LOW. Все точки — косметика артефактов; ни одна не блокирует реализацию.
