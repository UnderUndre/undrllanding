# Implementation Plan: 006-seo-geo-foundation

**Branch**: `main` (grandfathered single-branch pattern of this repo) | **Date**: 2026-11-06 | **Spec**: [spec.md](spec.md)
**Input**: spec.md (clarified Q1–Q3) + checklists/requirements.md PASS
**Audit Basis**: SEO gap audit 2026-11-06 (spec §6 Finding Map, 8 findings → FR-001..FR-011)

## Summary

Full search + AI-engine visibility foundation for the multi-brand landing engine: brand-scoped `robots.txt` and `sitemap.xml` (MetadataRoute), `metadataBase`/canonical/OG/Twitter metadata with a dynamically generated branded OG image (`next/og`), server-rendered JSON-LD (`WebSite` + brand entity + `FAQPage`), a brand-generated `llms.txt` manifest, client-side `<html lang>` sync, env-driven webmaster verification, and an automated SEO gate V4 in the existing `verify-gates.mjs` contour.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Next.js 15.1.11 (App Router, pinned), React 19, Zod 4
**Primary Dependencies**: none new — `next/og` (`ImageResponse`) is built into Next 15 (NFR-002)
**Storage**: N/A (no DB); artifacts generated from `ProjectConfig` + `projects/<slug>/data/*.json`
**Testing**: `pnpm test` (vitest), `pnpm verify` (gate V4 added), `pnpm validate`
**Target Platform**: static prerender behind Caddy on the VPS; artifacts land in `.next/server/app/` at build time
**Performance Goals**: no LCP regression (003 NFR-002 ≤ 1.5 s) — OG route is off the critical path, JSON-LD inline ≤ 3 KB
**Constraints**: additive brand contract (NFR-003); zero brand literals in shared SEO code (FR-011); baseline V3 refreshed once (intentional `<head>` additions)
**Security Surface**: JSON-LD serialization escapes `<` (blocks `</script>` breakout); auth/API routes excluded from sitemap + disallowed in robots
**Research Spikes**: none required (all decisions resolved — Q1–Q3 clarified; `next/og` API is standard Next 15)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Source of Truth Discipline | PASS | No `.claude/`/generated-tree edits |
| II. Transformer, Not Fork | N/A | clai-helpers pipeline untouched |
| IV. SemVer 0.x | PASS | Landing repo, no version bump |
| V. Token Economy | PASS | Artifacts lean |
| VI. Cross-AI Review Gate | PENDING | Gate at `/speckit.implement` (analyze + ≥2 external reviewers) |
| VII. Artifact Versioning | PASS | `spec/006-seo-geo-foundation/v1` tagged; plan/tasks tags follow |
| IX. Two-Phase Review Flow | PASS | Single-branch grandfathered pattern of this repo |
| XII. QA & Test Contour | PASS | Extends verify-gates contour with automated gate V4 |

**Post-design re-check**: PASS — no principle violated by the design below.

## Project Structure

### Documentation (this feature)

```text
specs/006-seo-geo-foundation/
├── spec.md                    # clarified (Q1–Q3 integrated)
├── checklists/requirements.md
├── plan.md                    # this file
├── tasks.md                   # Phase 2
├── requirements-audit.md      # ISO 29148 gate
├── qa/preliminary-rtm.md
└── reviews/                   # analyze + external
```

### Source Code (repository root, undrllanding/)

```text
app/robots.ts                                # NEW: MetadataRoute robots, brand-scoped (FR-001)
app/sitemap.ts                               # NEW: MetadataRoute sitemap, brand-scoped (FR-002)
app/opengraph-image.tsx                      # NEW: ImageResponse 1200×630 from brand config (FR-005)
app/llms.txt/route.ts                        # NEW: generated markdown manifest (FR-008)
app/layout.tsx                               # MODIFY: metadataBase, canonical, OG, Twitter, verification (FR-003/004/010)
app/(default)/manifest/page.tsx              # MODIFY: page metadata + canonical (FR-003)
app/(default)/privacy/page.tsx               # MODIFY: page metadata + canonical (FR-003)
app/(default)/terms/page.tsx                 # MODIFY: page metadata + canonical (FR-003)
app/(auth)/signin/page.tsx                   # MODIFY: robots noindex (defense in depth, FR-001)
app/(auth)/signup/page.tsx                   # MODIFY: robots noindex
app/(auth)/reset-password/page.tsx           # MODIFY: robots noindex
lib/seo/json-ld.tsx                          # NEW: safe JSON-LD server component (FR-006/007)
lib/seo/build-json-ld.ts                     # NEW: brand entity + WebSite + FAQPage builders from config/data (FR-006/007)
lib/project-config.ts                        # MODIFY: optional `schemaType?: "ProfessionalService" | "Organization" | "Book"` (FR-006, additive)
context/lang-context.tsx                     # MODIFY: sync document.documentElement.lang (FR-009)
projects/underundre/config.tsx               # MODIFY: schemaType + render JsonLd blocks (FR-006/007)
projects/undreading/config.tsx               # MODIFY: schemaType + render JsonLd blocks
scripts/verify-gates.mjs                     # MODIFY: gate V4 (sitemap/robots/head/JSON-LD) (FR-007/SC-005)
specs/004-landing-template-updates/qa/baseline/index.html  # REFRESH: intentional <head> additions (NFR-001)
projects/underundre/preview.html, projects/undreading/preview.html  # regen (build side-effect)
```

## Phase 0 → research.md

No separate research file — all decisions resolved in the clarification log and standard Next.js 15 platform APIs (MetadataRoute, `next/og`). Alternatives rejected: `[lang]` segment routing (rejected in 004 review — client-side context model retained), static hand-made OG banners (Q2 — dynamic generation chosen), manual llms.txt per brand (violates FR-011 brand-agnosticism).

## Phase 1 Design Decisions

1. **Robots + sitemap (FR-001/002)**: `app/robots.ts` and `app/sitemap.ts` are prerendered by Next at build time with `NEXT_PUBLIC_PROJECT_NAME` already set — brand-scoped output without any runtime cost. Sitemap entries: `/`, `/manifest`, `/privacy`, `/terms`. Auth routes additionally carry `robots: { index: false }` page metadata (defense in depth on top of robots.txt).
2. **Metadata spine (FR-003/004/010)**: `layout.tsx generateMetadata` gains `metadataBase: new URL(\`https://${config.domain}\`)`, default canonical `/`, full `openGraph` + `twitter` blocks, and `metadata.verification` from optional `NEXT_PUBLIC_GSC_VERIFICATION` / `NEXT_PUBLIC_YANDEX_VERIFICATION` envs (empty → absent, additive). `/manifest`, `/privacy`, `/terms` get their own static `metadata` exports with page-specific canonical paths (today they inherit the layout's — a canonical leak this plan fixes).
3. **OG image (FR-005)**: `app/opengraph-image.tsx` with `export const size = { width: 1200, height: 630 }`, `runtime = "nodejs"`. Renders a gradient from `config.theme` colors, brand name, domain, tagline; logo embedded as base64 data URI read from `public/projects/<slug>/icon.svg` via `fs` (build-time, no fetch). One file serves every brand and page (Next applies it per-segment; homepage + default layout covered).
4. **JSON-LD (FR-006/007)**: `lib/seo/build-json-ld.ts` builds typed objects from `ProjectConfig` + data files; `lib/seo/json-ld.tsx` is a server component serializing with `.replace(/</g, "\\u003c")` (script-breakout guard). Blocks: `WebSite` (name, url, inLanguage from supportedLocales), brand entity — `ProfessionalService` (default) / `Organization` / `Book`+`Author` selected by the new optional `config.schemaType` field (additive, default preserves old behavior), `FAQPage` built from `loadFaqData(slug)`. Blocks are rendered from each project's `config.tsx` (server context) — brand-agnostic by construction.
5. **llms.txt (FR-008)**: `app/llms.txt/route.ts` returns `text/markdown; charset=utf-8`: brand overview (name, title, description), key pages (home, manifest, pricing anchor, legal), FAQ questions list, contact email from `data/legal.json`. Generated per active brand at build time.
6. **Lang sync (FR-009)**: `LangProvider` useEffect sets `document.documentElement.lang = lang` on mount and every `setLang` — no `[lang]` routing (rejected in 004 review, Via Negativa).
7. **Gate V4 (Q3/SC-005)**: `verify-gates.mjs` gains four checks: `V4-robots` (`.next/server/app/robots.txt.body` contains Sitemap pointer + /api disallow), `V4-sitemap` (body contains `<urlset` + brand domain + `/manifest`, and does NOT contain auth routes), `V4-head` (index.html has canonical with brand domain, `og:image`, `twitter:card` summary_large_image), `V4-jsonld` (all `application/ld+json` blocks JSON-parse, carry `@context: https://schema.org`, include `WebSite` + brand entity + `FAQPage` when `data/faq.json` exists; zero parsed = FAIL).
8. **Baseline (NFR-001)**: `<head>` additions intentionally change normalized DOM → gate V3 baselines for `underundre` refreshed once in the tasks (undreading has no baseline — its V3 is brand-isolation, unaffected head-wise except re-verify).

## Deployment Readiness

- `pnpm validate && pnpm test && pnpm build:underundre && pnpm verify` and the same for `undreading` green in CI (SC-005).
- Post-merge live checks: `/robots.txt`, `/sitemap.xml`, `/llms.txt` return 200 on `https://underundre.com`; Rich Results Test on the homepage passes (SC-003, manual — external service).
- Google Search Console / Yandex Webmaster: owner submits sitemap after deploy (owner action, env-driven verification tags ready — FR-010).
- Architecture update (`specs/main/architecture.md`): N/A — no new technologies beyond built-in Next metadata APIs; landing repo keeps no local architecture canon.
