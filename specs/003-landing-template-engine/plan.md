# Implementation Plan: 003-landing-template-engine

**Branch**: `003-landing-template-engine` | **Date**: 2026-10-30 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/003-landing-template-engine/spec.md`

---

## Summary

Modularize and generalize the `undrllanding` multi-brand landing engine (Option A + Option C). Decommission the legacy `undrlla` brand implementation (FR-011 — its replacement will be re-scaffolded later as a template consumer). Decouple shared `HeaderNav`, `Footer` and `Logo` layouts via Inversion of Control, moving navigation, footer and legal contracts into per-project `ProjectConfig` (single resolver in `lib/project-config.ts` importing `projects/<slug>/config.ts`); extract commercial pricing and FAQ data into bilingual Zod-validated JSON files; introduce scoped Tailwind v4 CSS theme variables (canonical 8-token set); generalize `/api/lead` into a pluggable dispatcher with bounded metadata and migrate its only existing form consumer in the same merge; deploy compliant statutory pages (`/privacy`, `/terms`, `/manifest`); establish an interactive CLI generator (`pnpm project:create`); and apply the GNU GPL-3.0 license.

---

## Technical Context

**Language/Version**: TypeScript 5.7+ / Node.js 22 LTS  
**Primary Dependencies**: Next.js 15.1 (App Router), React 19, Tailwind CSS v4, Zod 4, Headless UI, AOS  
**Storage**: File-based Zod-validated JSON/YAML (`projects/<slug>/data/`)  
**Testing**: `pnpm validate` (`tsc --noEmit`), Playwright E2E responsive emulation, cURL contract tests  
**Target Platform**: Linux VPS (Ubuntu 24.04 / Debian 12), Docker Compose, Caddy edge proxy  
**Project Type**: Next.js Multi-Brand Landing Engine & White-Label Scaffold  
**Performance Goals**: $\text{LCP} \le 1.5$s, $\text{FCP} \le 1.0$s, $\text{CLS} = 0$, all static routes pre-rendered (`○ (Static)`)  
**Constraints**: Zero regression for the existing live brand (`underundre`); legacy `undrlla` target decommissioned (FR-011), not part of the regression matrix; zero vendor lock-in on SaaS CMS; 100% legal compliance with GPL-3.0 copyleft obligations  
**Scale/Scope**: ~20 modified files, 5 new components/pages, 1 new CLI generator, 3 new JSON content models, removal of undrlla-specific surface (~8 files/routes)  
**Security Surface & STRIDE Triggers**: Inbound Lead endpoint accepts open `metadata`. Mitigations: Zod schema bounds, HTML escaping before Telegram forward, SSRF socket-level checks if webhook dispatching is invoked.  
**Database Migration Trigger**: N/A (Stateless file-based content engine).  
**Supply Chain & Licensing**: GNU GPL-3.0 with NOTICE acknowledging Cruip provenance; zero AGPL or proprietary license contamination in client bundle.

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principle I (Source of Truth)**: Aligned with `undreseller-business-plan.md` v20.0 (Secondary ICP White-Label resellers) and `undrllanding-reusing-strategy.md`.
- [x] **Principle IV (SemVer Discipline)**: Additive non-breaking modifications to multi-project engine within 0.x zone.
- [x] **Principle V (Token Economy)**: Replaces hardcoded branching with generic IoC slots, reducing duplicated code across brands.
- [x] **Principle VI (Cross-AI Review Gate)**: Full requirements-audit passed; prepared for analyze and external review gates.
- [x] **Principle VII (Artifact Versioning)**: Snapshot tags `specify/003-landing-template-engine/v1`, `requirements-audit/003-landing-template-engine/v1`, and upcoming `plan/`, `tasks/`.
- [x] **Principle VII-B (Business Plan Sync)**: Business plan v20.0 synchronized and unchanged.

---

## Project Structure

### Documentation (this feature)

```text
specs/003-landing-template-engine/
├── spec.md                   # Feature specification
├── checklists/
│   └── requirements.md       # Specification quality checklist (PASSED)
├── requirements-audit.md     # Formal ISO 29148 requirements audit (PASS)
├── qa/
│   └── preliminary-rtm.md    # Risk-Based Testing Matrix & preliminary RTM
├── research.md               # Phase 0 technical decisions & architecture
├── data-model.md             # Phase 1 data models & schemas
├── quickstart.md             # Phase 1 verification & CLI guide
├── contracts/
│   └── schemas.ts            # Phase 1 Zod schemas for pricing, FAQ, manifest, lead
├── plan.md                   # This file (Architecture & execution plan)
└── tasks.md                  # Phase 2 tasks breakdown
```

### Source Code Changes (Repository Root: `undrllanding/`)

```text
lib/
├── project-config.ts                          # [MODIFIED] Types + resolver; imports projects/<slug>/config.ts (single source of truth, review F5); undrllaConfig removed (T-023)
├── schemas/
│   └── content-schema.ts                     # [NEW] Zod validation: LocalizedText-based pricing/FAQ/manifest, bounded lead schema
└── social-links.ts                            # [MODIFIED] Reused by decoupled footer and contact blocks
components/
├── header-nav.tsx                             # [MODIFIED] Decoupled: renders config.navigation + slug-derived theme keys (0 brand literals)
├── hero-undrlla.tsx                           # [REMOVED] undrlla decommission (T-023)
├── waitlist-form.tsx                          # [REMOVED] undrlla decommission (T-023)
├── marketplace-preview-demo.tsx               # [REMOVED] undrlla decommission (T-023)
├── economics-client.tsx                       # [REMOVED] undrlla decommission (T-023)
├── shopify-style-features.tsx                 # [REMOVED] undrlla decommission (T-023)
└── ui/
    ├── footer.tsx                             # [MODIFIED] Decoupled: renders config.footer + statutory links per flags
    └── logo.tsx                               # [MODIFIED] Decoupled: renders brand icon and title from config
app/
├── (default)/
│   ├── privacy/page.tsx                       # [NEW] Statutory Privacy Policy route (config.legal interpolation)
│   ├── terms/page.tsx                         # [NEW] Statutory Terms of Service route (overridable clauses)
│   └── manifest/page.tsx                      # [NEW] Manifesto route (projects with manifest.json; notFound() otherwise)
├── economics/                                 # [REMOVED] undrlla decommission (T-023)
├── api/
│   ├── lead/route.ts                          # [MODIFIED] Pluggable dispatcher, bounded metadata, rate limit
│   └── waitlist/                              # [REMOVED] undrlla decommission (T-023)
projects/
├── _template/                                 # [NEW] Canonical pristine starter template
│   ├── config.ts                              #   incl. `legal` block placeholders
│   ├── theme.css
│   ├── public/favicon.ico
│   └── data/
│       ├── pricing.json
│       └── faq.json
└── underundre/
    ├── config.ts                              # [NEW] Migrated from lib/project-config.ts; supplies navigation, footer, legal
    ├── theme.css                              # [NEW] Scoped CSS tokens (canonical 8)
    ├── data/                                  # [NEW] Structured bilingual JSON data
    │   ├── pricing.json
    │   ├── faq.json
    │   └── manifest.json
    └── components/
        ├── sprint-pricing.tsx                 # [MODIFIED] Consumes pricing.json (RU+EN)
        ├── faq-section.tsx                    # [MODIFIED] Consumes faq.json (RU+EN)
        ├── tagline-reveal.tsx                 # [MODIFIED] Citation links to /manifest
        └── cta-underundre.tsx                 # [MODIFIED] Migrated to GenericLeadSubmissionSchema payload (T-024, same merge as T-016)
scripts/
└── create-project.mjs                         # [NEW] Interactive scaffolding CLI (delimited registry append + pnpm validate)
LICENSE                                        # [NEW] GNU General Public License v3.0 (no LICENSE exists today)
NOTICE                                         # [NEW] Legal provenance & Cruip attribution
package-lock.json                              # [REMOVED] stray npm lockfile in pnpm repo
```

---

## Implementation Details

### Step 1: Core Type Contracts & Schemas (`lib/schemas/content-schema.ts`)
- Implement build-time Zod validator for JSON files.
- Export `PricingDataSchema`, `FaqDataSchema`, `ManifestDataSchema`, `GenericLeadSubmissionSchema`.
- Export typed helper functions `loadPricingData(slug: string)` and `loadFaqData(slug: string)` that parse JSON files and assert schema validity during SSR/SSG.

### Step 2: Legacy Decommission & Layout Decoupling & Inversion of Control
- **Decommission `undrlla` (FR-011, T-023)**: remove `undrllaConfig` + resolver branch, `dev:undrlla`/`build:undrlla` scripts, undrlla-only components, `/economics`, `/api/waitlist`, `data-theme="undrlla"` styling.
- Update `lib/project-config.ts`:
  - Keep types + `getActiveProjectConfig()` resolver; import per-project configs from `projects/<slug>/config.ts` (single source of truth — no dual registration);
  - Add `navigation: NavigationConfig`, `footer: FooterConfig`, `legal: LegalConfig` to the `ProjectConfig` interface.
- Create `projects/underundre/config.ts` with the migrated `underundreConfig` (navigation, footer incl. `showManifestLink: true`, legal block).
- Refactor `components/header-nav.tsx`:
  - Read `config.navigation.items` and map directly to links;
  - Read `config.navigation.ctaButton` and render the right-hand action button;
  - Derive the theme-switcher `localStorage` key and `data-theme` namespace from `config.slug`;
  - Delete all `isUnderundre` variables and hardcoded slug branches.
- Refactor `components/ui/footer.tsx`:
  - Read `config.footer.columns` and render link categories;
  - Render `/privacy` + `/terms` links per `showLegalLinks`, `/manifest` per `showManifestLink`;
  - Delete all `isUnderundre` / slug checks.
- Refactor `components/ui/logo.tsx`:
  - Eliminate slug conditions; render `config.iconUrl` and `config.name`.

### Step 3: Statutory Pages (`/privacy`, `/terms`, `/manifest`)
- **`app/(default)/privacy/page.tsx`**:
  - Dynamically reads `config.legal.contactEmail`, `entityName`, `jurisdiction`, `retentionMonths` (marked placeholders when missing).
  - Presents clear GDPR Art. 13 disclosures in both Russian and English depending on language context.
- **`app/(default)/terms/page.tsx`**:
  - Defines service terms: Fixed scope, escrow mechanics (overridable `legal.escrowProvider`, default Upwork Direct Contracts 5%), 100% IP code transfer, bugfix SLA (`legal.warrantyDays`, default 7), liability cap.
- **`app/(default)/manifest/page.tsx`**:
  - Consumes `projects/<slug>/data/manifest.json`; when the active project has none, calls `notFound()` (build stays green for projects without a manifesto).
  - Renders the 7 Core Engineering Principles (bilingual).
  - Updates `projects/underundre/components/tagline-reveal.tsx` so the citation links to `/manifest`.

### Step 4: Content Separation & Theme Tokenization
- Create `projects/underundre/data/pricing.json` and `faq.json` — **bilingual** (`LocalizedText {ru, en}` in every display field; both language blocks extracted from `locales.ts`).
- Refactor `sprint-pricing.tsx` and `faq-section.tsx` to read from the JSON data layer, rendering the variant selected by the language context.
- Create `projects/underundre/theme.css` with the canonical 8-token set.
- Link tokens in `app/css/style.css` via Tailwind v4 `@theme`.

### Step 5: Pluggable Lead API
- Refactor `app/api/lead/route.ts` to consume `GenericLeadSubmissionSchema` (bounded flat-scalar `metadata`).
- **Same merge**: migrate `projects/underundre/components/cta-underundre.tsx` to the new payload (`messenger → contact`, `stackAndTeam → message`, `bottleneckType → metadata.bottleneckType`) — no deploy window with mismatched halves (FR-005, review F1).
- Support parallel dispatch to `LEAD_WEBHOOK_URL` (if defined in env) and Telegram; `escapeHtml` preserved on all outbound text; per-IP rate limit; redacted console logging; `fallback` ∈ {direct, none, partial}.

### Step 6: Scaffolding CLI & Starter Template
- Assemble `projects/_template/` with clean placeholder components, neutral colors, valid JSON files, and a `legal` config block with marked placeholders.
- Implement `scripts/create-project.mjs` taking `--slug`, `--name`, `--domain`, `--primary-color`, `--accent-color` and interactive prompts; register the project by appending a delimited import + registry entry to `lib/project-config.ts` and immediately run `pnpm validate`; reject duplicate/malformed slugs; warn on sub-AA palette contrast.
- Add npm script `"project:create": "node scripts/create-project.mjs"` to `package.json`.
- Create root `LICENSE` (GNU GPL-3.0 — none exists today) and add `NOTICE`; delete stray `package-lock.json`.
