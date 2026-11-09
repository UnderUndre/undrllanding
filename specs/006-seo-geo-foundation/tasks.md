# Tasks: 006-seo-geo-foundation

**Input**: Design documents from `specs/006-seo-geo-foundation/`
**Prerequisites**: spec.md ✅ (clarified Q1–Q3), plan.md ✅, checklists/requirements.md PASS ✅

**Tests**: Included — gate V4 (SEO) is the feature's own deliverable; vitest additions for JSON-LD builders.

## Format: `[ID] [AGENT] [Story?] Description`

## Task Statuses

`- [ ]` pending · `- [→]` in progress · `- [X]` done · `- [!]` failed · `- [~]` blocked

---

## Phase 1: Metadata Spine (P1)

- [x] **T001 [FE] US1/US2 Metadata spine**: `app/layout.tsx generateMetadata` — `metadataBase: new URL("https://<config.domain>")`, default canonical `/`, `openGraph` (title, description, url, siteName, locale, images), `twitter: card=summary_large_image`, `metadata.verification` from optional `NEXT_PUBLIC_GSC_VERIFICATION` / `NEXT_PUBLIC_YANDEX_VERIFICATION` (FR-003/004/010). Depends: none.
- [x] **T002 [FE] US1 Page-level canonical + auth noindex**: static `metadata` exports with page-specific canonical for `/manifest`, `/privacy`, `/terms`; `robots: { index: false }` on `/signin`, `/signup`, `/reset-password` (FR-003, FR-001 defense-in-depth). Depends: T001.
- [x] **T003 [FE] US1 Brand-scoped robots + sitemap**: `app/robots.ts` (allow all, disallow `/api/`, `/signin`, `/signup`, `/reset-password`, sitemap pointer) and `app/sitemap.ts` (``, `/manifest`, `/privacy`, `/terms` on `https://<config.domain>`; auth/API excluded) (FR-001/002). Parallel with T001. Depends: none.
- [x] **T004 [OPS] US1 Baseline refresh**: regenerate gate V3 baseline for `underundre` (intentional `<head>` additions); re-verify both brands. Depends: T001, T002, T003.

## Phase 2: Share Cards & Structured Data (P1)

- [x] **T005 [BE] US2 Dynamic OG image**: `app/opengraph-image.tsx` — `ImageResponse` 1200×630, nodejs runtime, gradient from `config.theme`, brand name + domain + tagline, logo as base64 data URI from `public/projects/<slug>/icon.svg` via `fs` (FR-005). Depends: T001 (metadata spine).
- [x] **T006 [FE] US3 JSON-LD core**: `lib/seo/build-json-ld.ts` (WebSite + brand entity via new optional `config.schemaType`: ProfessionalService default / Organization / Book+Author; `sameAs` from brand socials; `contactEmail` from `data/legal.json`) + `lib/seo/json-ld.tsx` server component with `<` escape; `ProjectConfig.schemaType` field (additive); render from both projects' `config.tsx` (FR-006). Depends: none.
- [x] **T007 [FE] US3 FAQPage JSON-LD**: build `FAQPage` block from `loadFaqData(slug)` (`mainEntity` ← items), rendered alongside the FAQ section in both projects' `config.tsx` (FR-007). Depends: T006.
- [x] **T008 [SETUP] US3 llms.txt manifest**: `app/llms.txt/route.ts` — generated markdown (brand overview, key pages, FAQ questions, contact email), `text/markdown; charset=utf-8` (FR-008). Depends: none.

## Phase 3: UX-Language & Verification Contour (P2/P3)

- [x] **T009 [FE] US4 html lang sync**: `LangProvider` sets `document.documentElement.lang` on mount and on every language change (FR-009). Depends: none.
- [x] **T010 [TEST] SC-005 SEO gate V4**: `scripts/verify-gates.mjs` — `V4-robots` (body: Sitemap pointer + `/api` disallow), `V4-sitemap` (urlset + brand domain + `/manifest`, zero auth routes), `V4-head` (canonical + `og:image` + `twitter:card`), `V4-jsonld` (all blocks parse, `@context` schema.org, `WebSite` + brand entity required, `FAQPage` required when `data/faq.json` exists); vitest unit tests for `build-json-ld` builders (escape guard, entity selection) (Q3). Depends: T003, T005, T006, T007, T008.
- [x] **T011 [OPS] SC-005 CI wiring**: verify `.github/workflows/ci.yml` runs gate V4 for both brands (extend pipeline with a `undreading` verify step if needed). Depends: T010.

## Phase 4: Acceptance & Gates

- [ ] **T012 [QA] US1–US4 Manual acceptance**: live checks on `https://underundre.com` (robots/sitemap/llms.txt 200, head matrix, OG image fetch, Rich-Results-style JSON-LD parse), lang-switch spot check, `undreading` build verification; results recorded in `specs/006-seo-geo-foundation/qa/`. Depends: T004, T009, T011.
- [ ] **T013 [OPS] US1–US4 Final pipeline + deploy**: full pipeline green on both brands; deploy to VPS; live smoke of sitemap/robots/llms.txt; PR prep. Depends: T012.

---

## Dependency Graph

```text
T001 ─→ T002 ─┐
T003 ─────────┼─→ T004 ─────────────────────┐
T005 ─────────┼─→ T010 ─→ T011 ─→ T012 ─→ T013
T006 ─→ T007 ─┤
T008 ─────────┘
T009 ──→ T012
```

**Parallel lanes**:
- Lane A (metadata spine): T001 → T002 → T004
- Lane B (robots/sitemap): T003 (parallel with T001)
- Lane C (structured data): T006 → T007
- Lane D (share cards): T005; Lane E (llms.txt): T008; Lane F (lang): T009
- Merge: T010 (gate V4 needs T003+T005+T006+T007+T008) → T011 → T012 → T013

**Critical path**: T006 → T007 → T010 → T011 → T012 → T013.

**MVP scope**: T001–T004, T006–T007, T010 (indexation + structured data + gate); T005/T008/T009 complete the foundation per Q1 full-scope decision.

## Agent Dispatch Plan

| Agent | Tasks | Input context | Files |
|---|---|---|---|
| [FE] frontend-specialist | T001, T002, T003, T006, T007, T009 | plan.md DD-2/4/6, spec FR-003/004/006/007/009/010 | app/layout.tsx, app/(default)/*, app/(auth)/*, lib/seo/*, lib/project-config.ts, context/lang-context.tsx, projects/*/config.tsx |
| [BE] backend-specialist | T005 | plan.md DD-3, spec FR-005 | app/opengraph-image.tsx |
| [SETUP] orchestrator | T008 | plan.md DD-5, spec FR-008, contracts/hardening.md §1 | app/llms.txt/route.ts |
| [TEST] test-engineer | T010 | plan.md DD-7, verify-gates.mjs, preliminary-rtm.md | scripts/verify-gates.mjs, tests/unit/ |
| [OPS] devops-engineer | T004, T011, T013 | baseline maintenance contract, ci.yml | qa/baseline, .github/workflows/ci.yml |
| [QA] human-qa-tester | T012 | quickstart checklist in plan Deployment Readiness | qa/ results |

> Тег-раскраска (analyze G1): T001–T004/T006–T007/T009 помечены [FE], хотя затрагивают серверные метаданные и `lib/seo` — это серверный рендер Next без UI-скиллов и без бэкенд-границ (stateless metadata, ноль интеграций). Прецедент 005-G1: смежное оставлено [FE] с обоснованием. Оставляем [FE]; при желании перекраска — однострочная правка до implement.

## Constitution gate reminder

`/speckit.implement` requires `analyze.md` PASS + ≥2 external reviewers PASS (`specs/006-seo-geo-foundation/reviews/`) — Principle VI, NON-NEGOTIABLE.
