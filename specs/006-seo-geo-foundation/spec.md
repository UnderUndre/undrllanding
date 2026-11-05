# Feature Specification: 006-seo-geo-foundation — Search & AI-Engine Visibility Foundation

**Feature Directory**: `specs/006-seo-geo-foundation`
**Repository**: `undrllanding`
**Created**: 2026-11-06
**Status**: Clarified (Q1–Q3 resolved, ready for plan)
**Parent Feature**: `specs/004-landing-template-updates` (multi-brand engine), `specs/005-code-review-fixes` (hardening + verify-gates contour)
**Input**: SEO/GEO gap audit of the live landing (2026-11-06, this spec §6 Finding Map) against `UndeRoute/.claude/commands/speckit.seo-specialist.md` standards (Technical SEO checklist, GEO checklist, Core Web Vitals, E-E-A-T).
**Scope decision (Q1)**: Full SEO+GEO foundation — technical SEO AND Generative Engine Optimization in one wave.
**Business plan**: unchanged (visibility infrastructure; no ICP/pricing/gate delta).

---

## 1. Executive Context

The landing ships production-grade content (trilingual brand copy, FAQ, pricing grid, manifesto with stable anchors, legal pages) but exposes **zero search-engine infrastructure**: no `robots.txt`, no `sitemap.xml`, no `metadataBase`/canonical URLs, no social share images, no structured data, no AI-crawler guidance. Search engines and LLM crawlers (ChatGPT, Perplexity, Claude) either guess the site structure or skip it entirely.

This feature lays the complete visibility foundation for **every brand** in the multi-brand engine (underundre, undreading, future scaffolds) — brand-agnostic, config-driven, verified by an automated gate in the existing `verify-gates.mjs` contour.

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 — Search Engines Index the Brand Correctly (Priority: P1)

As a site owner,
I want robots.txt and a sitemap generated per-brand from the brand config,
so that Google/Yandex crawl exactly the public pages and never the auth/API surface.

**Acceptance Scenarios**:

1. **Given** `https://underundre.com/robots.txt`, **When** fetched, **Then** it allows all user agents, disallows `/api/`, `/signin`, `/signup`, `/reset-password`, and references `https://underundre.com/sitemap.xml`.
2. **Given** `https://underundre.com/sitemap.xml`, **When** fetched, **Then** it lists ``, `/manifest`, `/privacy`, `/terms` with `https://<brand-domain>` absolute URLs (no auth routes, no cross-brand URLs).
3. **Given** any page, **When** its `<head>` is inspected, **Then** a canonical link `https://<brand-domain><path>` and a `<meta name="robots" content="index,follow">` are present.

### User Story 2 — Social Shares Render a Branded Card (Priority: P1)

As a visitor sharing the site link,
I want Telegram/Twitter/LinkedIn to show a branded preview card,
so that the link looks trustworthy instead of a bare URL.

**Acceptance Scenarios**:

1. **Given** the homepage `<head>`, **When** inspected, **Then** `og:title`, `og:description`, `og:url`, `og:image` (1200×630), `og:site_name`, and `twitter:card=summary_large_image` are present.
2. **Given** the OG image URL, **When** fetched, **Then** it returns a 1200×630 image rendered from the active brand config (brand colors, logo, name, tagline) — no hardcoded `underundre` artwork on other brands.

### User Story 3 — AI Engines Can Quote the Brand (Priority: P2)

As an AI assistant (ChatGPT / Perplexity / Claude),
I want machine-readable structured data and an llms.txt manifest,
so that I can cite the brand's services, pricing, and FAQ with correct attribution.

**Acceptance Scenarios**:

1. **Given** the homepage, **When** its JSON-LD blocks are parsed, **Then** valid `Organization` (or `Book`-relevant schema for undreading), `WebSite`, and `FAQPage` (mainEntity from `data/faq.json`) blocks are found with `@context: https://schema.org`.
2. **Given** `https://underundre.com/llms.txt`, **When** fetched, **Then** a markdown overview of the brand (who, key pages, FAQ topics, contact) is returned, generated from brand data — not hand-written per brand.

### User Story 4 — Language Attribute Matches the UI (Priority: P3)

As a visitor switching the UI language,
I want the document `lang` attribute to follow,
so that screen readers and search engines see consistent language.

**Acceptance Scenarios**:

1. **Given** the default render, **When** the page loads, **Then** `<html lang>` is `"en"` (UI default).
2. **Given** a visitor switches UI language to `ru` or `uk`, **When** the switch happens client-side, **Then** `document.documentElement.lang` updates to the selected locale without a page reload.

---

## 3. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `app/robots.ts` MUST emit a brand-scoped `robots.txt` (MetadataRoute): allow all, disallow `/api/`, `/signin`, `/signup`, `/reset-password`, sitemap pointer to `https://<config.domain>/sitemap.xml`.
- **FR-002**: `app/sitemap.ts` MUST emit a brand-scoped sitemap listing public routes (`` `/manifest`, `/privacy`, `/terms`) as absolute URLs on `https://<config.domain>`; auth/API routes MUST NOT appear.
- **FR-003**: `generateMetadata` MUST set `metadataBase: new URL("https://<config.domain>")` so all relative URLs absolutize; every page MUST carry a canonical URL via `alternates.canonical`.
- **FR-004**: Metadata MUST include `openGraph` (title, description, url, siteName, locale, images) and `twitter` (`card: "summary_large_image"`) blocks for every public page.
- **FR-005**: An `opengraph-image` route (built-in `next/og` `ImageResponse`, 1200×630) MUST render the share card from active brand config (theme colors, logo, name, tagline) with zero hardcoded brand literals — `next/og` is built into Next 15, no new dependency.
- **FR-006**: A server-rendered JSON-LD block MUST be emitted on the homepage: `WebSite` + brand entity (`ProfessionalService` for service brands, `Book`+`Author` data for publishing brands — selected by brand config type) with `name`, `url`, `logo`, `sameAs` (from brand socials), `contactEmail` (from `data/legal.json`). Serialization MUST escape `<` to prevent `</script>` injection.
- **FR-007**: A `FAQPage` JSON-LD block MUST be generated from `data/faq.json` (`mainEntity` ← items) on pages rendering the FAQ section.
- **FR-008**: `app/llms.txt/route.ts` MUST return a brand-generated markdown manifest (who the brand is, key pages, FAQ topics, contact) built from `brand.ts` + `data/*.json` — no per-brand hand-maintained copy.
- **FR-009**: `LangProvider` MUST sync `document.documentElement.lang` to the active locale on mount and on every language change (client-side; no `[lang]` routing in scope).
- **FR-010**: Optional env-driven webmaster verification MUST be supported: `NEXT_PUBLIC_GSC_VERIFICATION` and `NEXT_PUBLIC_YANDEX_VERIFICATION` rendered as `metadata.verification` meta tags (empty = absent, additive contract).
- **FR-011**: All SEO artifacts (robots, sitemap, OG image, llms.txt, JSON-LD) MUST be brand-agnostic — sourced exclusively from `ProjectConfig` and `projects/<slug>/data/*.json`; scaffolding a new brand MUST produce correct SEO artifacts with zero code changes.

### Non-Functional Requirements

- **NFR-001**: `pnpm validate`, `pnpm test`, and `pnpm verify` stay green for **both** brands (underundre, undreading); gate V3 baselines refreshed once for the intentional `<head>` additions.
- **NFR-002**: No new runtime dependencies (`next/og` is built-in); homepage HTML weight growth from JSON-LD + meta tags ≤ 3 KB.
- **NFR-003**: Additive brand contract preserved — brands without social links, verification envs, or `uk` locale render correct SEO artifacts with sensible defaults.
- **NFR-004**: LCP must not regress (OG image route does not enter the critical path; JSON-LD is inline server-rendered, no client fetch).

### Security & Threat Mitigation (STRIDE)

> In-scope: S-01 (info disclosure — auth/API routes excluded from sitemap and disallowed in robots), S-02 (injection — JSON-LD serialization escapes `<` to block `</script>` breakouts; all values from trusted brand config/data files, never user input). OG image route is config-driven with no user input; llms.txt is static generated content. No new auth surface.

## 5. Clarification Log

| # | Question | Resolution |
|---|----------|------------|
| Q1 | Scope: technical SEO only or full SEO+GEO foundation? | **Full SEO+GEO foundation** — robots, sitemap, canonical, social cards, JSON-LD, llms.txt, webmaster verification in one wave. |
| Q2 | OG-image approach? | **Dynamic generation** via built-in `next/og` `ImageResponse` from brand config — zero new deps, brand-agnostic. |
| Q3 | Automated SEO gate? | **Yes** — new gate V4 in `scripts/verify-gates.mjs` (sitemap/robots presence + canonical + OG + JSON-LD validity) wired into CI. |

## 6. Finding Disposition Map (SEO Gap Audit → FR)

| Finding (source: 2026-11-06 gap audit) | Disposition | FR |
|---|---|---|
| S-01: no `robots.txt` | Brand-scoped MetadataRoute robots | FR-001 |
| S-02: no `sitemap.xml` | Brand-scoped MetadataRoute sitemap | FR-002 |
| S-03: no `metadataBase` / canonical | metadataBase from config.domain + alternates.canonical | FR-003 |
| S-04: no OG/Twitter cards, no share image | openGraph + twitter metadata + dynamic OG image | FR-004, FR-005 |
| S-05: no structured data (JSON-LD) | Organization/Book + WebSite + FAQPage blocks from brand data | FR-006, FR-007 |
| S-06: no AI-crawler guidance (llms.txt) | Brand-generated llms.txt route | FR-008 |
| S-07: hardcoded `<html lang="en">` | LangProvider syncs `document.documentElement.lang` | FR-009 |
| S-08: no webmaster verification path | Env-driven verification meta tags | FR-010 |

## 4. Success Criteria *(mandatory)*

- **SC-001**: `https://underundre.com/robots.txt` and `/sitemap.xml` return 200 with brand-domain content (US1 scenarios).
- **SC-002**: Homepage `<head>` contains canonical + `og:image` + `twitter:card=summary_large_image`; the OG image URL returns a 1200×630 branded image.
- **SC-003**: Homepage JSON-LD parses as valid JSON with `@context: https://schema.org` and ≥3 blocks (`WebSite`, brand entity, `FAQPage`); FAQPage passes Google Rich Results Test with zero errors.
- **SC-004**: `https://underundre.com/llms.txt` returns the brand-generated markdown manifest.
- **SC-005**: Gate V4 (SEO) passes 8/8+1 for both brands in CI; switching UI language updates `<html lang>`.
- **SC-006**: All checks above also pass for `undreading` build (brand-agnosticism proven on the second brand).
