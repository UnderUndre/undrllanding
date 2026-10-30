# Implementation Plan: 003-landing-template-engine

**Branch**: `003-landing-template-engine` | **Date**: 2026-10-30 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/003-landing-template-engine/spec.md`

---

## Summary

Modularize and generalize the `undrllanding` multi-brand landing engine (Option A + Option C). Decouple shared `HeaderNav` and `Footer` layouts via Inversion of Control, moving navigation contracts into `ProjectConfig`; extract commercial pricing and FAQ data into Zod-validated JSON files; introduce scoped Tailwind v4 CSS theme variables; generalize `/api/lead` into a pluggable dispatcher; deploy compliant statutory pages (`/privacy`, `/terms`, `/manifest`); establish an interactive CLI generator (`pnpm project:create`); and apply the GNU GPL-3.0 license.

---

## Technical Context

**Language/Version**: TypeScript 5.7+ / Node.js 22 LTS  
**Primary Dependencies**: Next.js 15.1 (App Router), React 19, Tailwind CSS v4, Zod 4, Headless UI, AOS  
**Storage**: File-based Zod-validated JSON/YAML (`projects/<slug>/data/`)  
**Testing**: `pnpm validate` (`tsc --noEmit`), Playwright E2E responsive emulation, cURL contract tests  
**Target Platform**: Linux VPS (Ubuntu 24.04 / Debian 12), Docker Compose, Caddy edge proxy  
**Project Type**: Next.js Multi-Brand Landing Engine & White-Label Scaffold  
**Performance Goals**: $\text{LCP} \le 1.5$s, $\text{FCP} \le 1.0$s, $\text{CLS} = 0$, all static routes pre-rendered (`○ (Static)`)  
**Constraints**: Zero regression for existing live brands (`underundre`, `undrlla`); zero vendor lock-in on SaaS CMS; 100% legal compliance with GPL-3.0 copyleft obligations  
**Scale/Scope**: ~15 modified files, 5 new components/pages, 1 new CLI generator, 3 new JSON content models  
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
├── project-config.ts                          # [MODIFIED] Add NavigationConfig & FooterConfig to ProjectConfig
├── schemas/
│   └── content-schema.ts                     # [NEW] Zod validation for pricing, FAQ, manifest, leads
└── social-links.ts                            # [MODIFIED] Reused by decoupled footer and contact blocks
components/
├── header-nav.tsx                             # [MODIFIED] Decoupled: renders config.navigation (0 slug checks)
└── ui/
    ├── footer.tsx                             # [MODIFIED] Decoupled: renders config.footer + statutory links
    └── logo.tsx                               # [MODIFIED] Decoupled: renders brand icon and title from config
app/
├── (default)/
│   ├── privacy/page.tsx                       # [NEW] Statutory Privacy Policy route
│   ├── terms/page.tsx                         # [NEW] Statutory Terms of Service route
│   └── manifest/page.tsx                      # [NEW] Statutory Engineering Manifesto route
├── api/
│   └── lead/route.ts                          # [MODIFIED] Pluggable dispatcher with open metadata
projects/
├── _template/                                 # [NEW] Canonical pristine starter template
│   ├── config.ts
│   ├── theme.css
│   ├── public/favicon.ico
│   └── data/
│       ├── pricing.json
│       └── faq.json
├── underundre/
│   ├── config.ts                              # [MODIFIED] Supplies navigationConfig and footerConfig
│   ├── theme.css                              # [NEW] Scoped CSS tokens
│   └── data/                                  # [NEW] Structured JSON data
│       ├── pricing.json
│       ├── faq.json
│       └── manifest.json
└── undrlla/
    └── config.ts                              # [MODIFIED] Supplies navigationConfig and footerConfig
scripts/
└── create-project.mjs                         # [NEW] Interactive scaffolding CLI
LICENSE                                        # [MODIFIED] GNU General Public License v3.0
NOTICE                                         # [NEW] Legal provenance & Cruip attribution
```

---

## Implementation Details

### Step 1: Core Type Contracts & Schemas (`lib/schemas/content-schema.ts`)
- Implement build-time Zod validator for JSON files.
- Export `PricingDataSchema`, `FaqDataSchema`, `ManifestDataSchema`, `GenericLeadSubmissionSchema`.
- Export typed helper functions `loadPricingData(slug: string)` and `loadFaqData(slug: string)` that parse JSON files and assert schema validity during SSR/SSG.

### Step 2: Layout Decoupling & Inversion of Control
- Update `lib/project-config.ts` interface:
  - Add `navigation: NavigationConfig`;
  - Add `footer: FooterConfig`.
- Populate `navigation` and `footer` in `underundreConfig` and `undrllaConfig`.
- Refactor `components/header-nav.tsx`:
  - Read `config.navigation.items` and map directly to links;
  - Read `config.navigation.ctaButton` and render the right-hand action button;
  - Delete all `isUnderundre` variables and hardcoded slug branches.
- Refactor `components/ui/footer.tsx`:
  - Read `config.footer.columns` and render link categories;
  - Render persistent links to `/privacy`, `/terms`, and `/manifest` at the bottom;
  - Delete all `isUnderundre` / `slug === "undreseller"` checks.
- Refactor `components/ui/logo.tsx`:
  - Eliminate slug conditions; render `config.iconUrl` and `config.name`.

### Step 3: Statutory Pages (`/privacy`, `/terms`, `/manifest`)
- **`app/(default)/privacy/page.tsx`**:
  - Dynamically reads `projectConfig.name`, `domain`, `contactEmail`.
  - Presents clear GDPR Art. 13 disclosures in both Russian and English depending on language context.
- **`app/(default)/terms/page.tsx`**:
  - Defines service terms: Fixed scope, Upwork 5% escrow protection, 100% IP code transfer, 7-day bugfix SLA.
- **`app/(default)/manifest/page.tsx`**:
  - Consumes `projects/<slug>/data/manifest.json`.
  - Renders the 7 Core Engineering Principles.
  - Updates `projects/underundre/components/tagline-reveal.tsx` so the citation links to `/manifest`.

### Step 4: Content Separation & Theme Tokenization
- Create `projects/underundre/data/pricing.json` and `faq.json`.
- Refactor `sprint-pricing.tsx` and `faq-section.tsx` to read from the JSON data layer.
- Create `projects/underundre/theme.css` with CSS variables.
- Link tokens in `app/css/style.css` via Tailwind v4 `@theme`.

### Step 5: Pluggable Lead API
- Refactor `app/api/lead/route.ts` to consume `GenericLeadSubmissionSchema`.
- Support parallel dispatch to `LEAD_WEBHOOK_URL` (if defined in env) and Telegram.

### Step 6: Scaffolding CLI & Starter Template
- Assemble `projects/_template/` with clean placeholder components, neutral colors, and valid JSON files.
- Implement `scripts/create-project.mjs` taking `--slug` and interactive prompts.
- Add npm script `"project:create": "node scripts/create-project.mjs"` to `package.json`.
- Update root `LICENSE` to GNU GPL-3.0 and add `NOTICE`.
