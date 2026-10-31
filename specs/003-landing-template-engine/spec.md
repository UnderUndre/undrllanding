# Feature Specification: Open-Source Multi-Brand Landing Engine & White-Label Packaging

**Feature Directory**: `specs/003-landing-template-engine`  
**Repository**: `undrllanding`  
**Created**: 2026-10-30  
**Status**: Ready for Review / Executable  
**Commercial Source of Truth**:  
- `undreplans/docs/projects/undreseller/undreseller-business-plan.md` **v20.0** (Secondary ICP: White-Label Resellers $4,900–$6,800 + Care Retainers $149–$349/mo)  
- `undreplans/docs/projects/undrllanding-reusing-strategy.md` (Strategic Prior-Art Synthesis: Option A Scaffold + Option C Schema Content Layer, GNU GPL-3.0)  
**Input Directive**: Transform the internal multi-brand landing engine into a fully modular, reusable, open-source template repository (Option A + Option C). Decouple brand navigation, tokenize Tailwind v4 styles, extract pricing/FAQ into schema-validated JSON, generalize the Lead API, establish legally required Privacy Policy and Terms of Service pages, publish the 7-Principle Engineering Manifesto, and provide an interactive `pnpm project:create` scaffolding script.

---

## 1. Executive Context & Objectives

### The Core Problem:
<!-- Drift note: 2026-10-30 — scope recalibrated after external review (reviews/zcode.md): legacy `undrlla` brand implementation is DECOMMISSIONED in this feature (F3). Undrlla's replacement landing will be re-created later as a regular template consumer via `pnpm project:create`. Configs currently live in `lib/project-config.ts`, not `projects/<slug>/config.ts` — migration task added (F5). -->
<!-- Drift note: 2026-10-31 — legal requisites moved from ProjectConfig.legal (brand.ts) to projects/<slug>/data/legal.json (owner DX feedback: template users edit JSON, not TS). ProjectConfig.legal remains an optional fallback layer; {{token}} resolution: legal.json ?? config.legal. -->
<!-- Drift note: 2026-10-30 — commercial follow-up (review F11): publishing this repo as a free public GPL-3.0 template repositions the business-plan v18.6 "Foundation $4,900" fork SKU (artifact becomes freely cloneable; paid value = done-for-you setup + private modules + Care retainers). Business plan changelog entry (v20.1+) to be added by the plan owner; no Demand Gate violation — no paid-fork outreach is involved. -->

Currently, `undrllanding` functions as a specialized internal landing repo for the `underundre` brand (the legacy `undrlla` brand is decommissioned by this feature — see FR-011). Although `underundre`'s brand config currently lives in `lib/project-config.ts` rather than an isolated `projects/<slug>/` folder, several architectural couplings prevent clean reuse by third-party engineers or White-Label agency partners:
1. **Layout Contamination**: `components/header-nav.tsx` and `components/ui/footer.tsx` contain hardcoded conditions (`isUnderundre = config.slug === "underundre" || config.slug === "undreseller"`). Any newly added brand (`projects/acme`) falls into fallback branches displaying Undrlla marketplace navigation.
2. **Hardcoded Content & Commercial Data**: Pricing tiers, feature lists, and FAQ accordions live directly inside TypeScript JSX files (`projects/underundre/locales.ts` and component code). Modifying an offer or adding an FAQ requires code commits and rebuilds rather than simple data edits.
3. **Hardcoded Colors**: Tailwind v4 arbitrary values (e.g. `bg-[#080808]`, `text-[#69a700]`, `bg-[#b45500]`) are spread across multiple component files, requiring manual search-and-replace to rebrand.
4. **Lead API Specificity**: `app/api/lead/route.ts` hardcodes a domain-specific enum (`bottleneckType`) tailored strictly to the TCO audit offer, alongside a hard dependency on Telegram bot tokens.
5. **Missing Compliance & Transparency Pages**:
   - The footer displays static labels `Privacy Policy` and `Terms of Service` without operational URLs, creating legal non-compliance risks under GDPR (Art. 13) for inbound lead collection.
   - The Tagline section cites: *«— Инженерный манифест UnderUndre §18.9»*, but no `/manifest` page exists on the site.

### The Solution (Option A + Option C Synthesis):
1. **Inversion of Control for Navigation**: Move navigation menus, action buttons, and footer links into `ProjectConfig` (`projects/<slug>/config.ts`). Header and Footer become 100% agnostic slot renderers with zero `if (slug === ...)` checks.
2. **Zod-Validated Schema Content Layer**: Extract pricing plans, FAQ, and engineering manifesto items into structured, typed JSON files (`projects/<slug>/data/pricing.json`, `faq.json`, `manifest.json`) validated at build time.
3. **Tailwind v4 Theme Tokens**: Define scoped CSS variables (`--brand-primary`, `--brand-accent`, `--brand-bg`) so a brand palette is configured in a single `theme.css` file per project.
4. **General-Purpose Pluggable Lead API**: Update `/api/lead` with a bounded `metadata` payload (flat scalar map) and a pluggable dispatcher supporting Telegram alerts, external Webhooks, or console logging — migrating the existing contact form in the same merge.
5. **Statutory Pages (`/privacy`, `/terms`, `/manifest`)**:
   - `/privacy`: Config-driven GDPR/NACE 62.01 policy showing operator data from active `ProjectConfig`.
   - `/terms`: Service agreement terms referencing Upwork Direct Contracts escrow and 100% IP transfer.
   - `/manifest`: 7-Principle Engineering Manifesto linked directly from the Tagline section.
6. **Project Scaffolding CLI**: Add `scripts/create-project.mjs` (`pnpm project:create`) allowing instantaneous generation of new brand landers from `projects/_template/`.
7. **License Hygiene**: Standardize the repository under **GNU GPL-3.0** (honoring Cruip heritage while protecting against closed proprietary resale).
8. **Legacy Brand Decommission (FR-011)**: Remove the `undrlla` brand from the engine (config, npm scripts, brand-specific components and routes), leaving `underundre` as the single reference brand.

---

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 - Third-Party Developer Scaffolds New Brand in 5 Minutes (Priority: P1)

As a freelance developer, technical founder, or White-Label reseller agency,  
I want to clone the template repository and run `pnpm project:create --slug=acme --name="Acme Systems"`,  
So that I get an isolated, compiling landing page folder with its own config, theme tokens, pricing data, and zero code leaks from UnderUndre.

**Why this priority**: Core enabler for community reusability and secondary ICP monetization (White-Label agencies purchasing commercial custom forks).

**Independent Test**:  
Run `pnpm project:create --slug=testbrand --name="Test Brand"`. Set `NEXT_PUBLIC_PROJECT_NAME=testbrand`. Run `pnpm build`. Verify build completes cleanly without warnings and renders the test brand's identity.

**Acceptance Scenarios**:
1. **Given** clean repo state,  
   **When** executing `node scripts/create-project.mjs --slug=cyberpulse --name="CyberPulse"`,  
   **Then** a new directory `projects/cyberpulse/` is created with valid `config.ts`, `data/pricing.json`, `data/faq.json`, `theme.css`, and `favicon.ico`.
2. **Given** `NEXT_PUBLIC_PROJECT_NAME=cyberpulse`,  
   **When** running `pnpm validate && pnpm build`,  
   **Then** build completes successfully with static export for route `/`.

---

### User Story 2 - Zero Cross-Contamination in Header & Footer (Priority: P1)

As a visitor navigating any configured project lander (`underundre` or a newly scaffolded brand),  
I want the header navigation, CTA action buttons, and footer copyright/links to display strictly that brand's information,  
So that no foreign brand names, dead anchor links, or marketplace references appear on my site.

**Why this priority**: Eliminates the critical architectural smell of `isUnderundre` branching across shared components.

**Independent Test**:  
Inspect `components/header-nav.tsx` and `components/ui/footer.tsx`. Assert that neither file contains string literals `"underundre"`, `"undreseller"`, or `"undrlla"` (including theme-switcher localStorage keys and `data-theme` attributes — see FR-001). Run tests with `NEXT_PUBLIC_PROJECT_NAME=underundre` and with a freshly scaffolded brand (`NEXT_PUBLIC_PROJECT_NAME=testbrand`); assert that nav links, footer columns, theme mode keys, and footer copyright match their respective `config.ts` in both cases.

**Acceptance Scenarios**:
1. **Given** `projects/underundre/config.ts` declares nav items `[TCO Audit, FOSS Stack, Pricing, Comparison, FAQ]`,  
   **When** rendering `HeaderNav`,  
   **Then** exactly these links are displayed without hardcoded logic.
2. **Given** any project without a custom social link,  
   **When** rendering `Footer`,  
   **Then** unconfigured channels are automatically omitted.

---

### User Story 3 - Compliance & Legal Safety via /privacy and /terms (Priority: P2)

As a prospective B2B client considering submitting my contact details or signing an escrow agreement,  
I want to click "Privacy Policy" or "Terms of Service" in the footer and read a legally binding statement customized to the active project,  
So that I know how my personal data is processed and under what commercial terms work is performed.

**Why this priority**: Mandatory legal requirement for lead collection under GDPR Art. 13 and trust prerequisite for high-ticket B2B deals.

**Independent Test**:  
Navigate to `http://localhost:3000/privacy` and `http://localhost:3000/terms`. Verify both pages render valid legal text reflecting `projectConfig.name`, `projectConfig.domain`, and EU NACE 62.01 classification without 404 errors.

**Acceptance Scenarios**:
1. **Given** a visitor on the footer of `underundre.com`,  
   **When** clicking "Privacy Policy",  
   **Then** route `/privacy` renders the data privacy policy stating UnderUndre as the operator, purposes of `/api/lead` intake, and data retention rules.
2. **Given** a visitor clicking "Terms of Service",  
   **When** viewing `/terms`,  
   **Then** terms explicitly reference fixed-scope delivery, Upwork Direct Contracts escrow (5%), and 100% intellectual property code transfer upon milestone release.

---

### User Story 4 - Engineering Transparency via /manifest (Priority: P2)

As an engineer, CTO, or founder evaluating UnderUndre's technical authority,  
I want to click the citation link in the Tagline section (*«— Инженерный манифест UnderUndre §18.9»*) and read the full manifesto,  
So that I understand the 7 engineering principles governing the bureau's architecture.

**Why this priority**: Transforms an isolated slogan into a high-authority conversion asset that builds enterprise trust.

**Independent Test**:  
Click the manifesto citation on the landing page. Verify route `/manifest` opens and presents the 7 core engineering principles with bilingual RU/EN support.

**Acceptance Scenarios**:
1. **Given** the Tagline section on the home page,  
   **When** clicking the citation link,  
   **Then** the browser navigates smoothly to `/manifest`.
2. **Given** `/manifest` in Russian or English mode,  
   **When** reading the content,  
   **Then** all 7 principles (Via Negativa, Zero SaaS Taxes, Schema-First DDL, Async Velocity, 100% IP, Memory Fencing, Fixed Scope) are articulated cleanly.

---

### User Story 5 - Schema-Driven Pricing & FAQ Customization (Priority: P3)

As a brand owner adjusting package prices or adding an FAQ entry,  
I want to edit `data/pricing.json` and `data/faq.json`,  
So that my changes are verified for correct schema at build time and immediately reflected in the UI without editing TSX component code.

**Why this priority**: Separation of content from presentation; prevents non-developer editors from breaking JSX markup.

**Independent Test**:  
Modify the price of Product 0 in `projects/underundre/data/pricing.json` to `$390`. Run `pnpm build`. Verify the new price appears on the generated page. Break the JSON schema (e.g. supply a string instead of array for deliverables) and verify `pnpm build` fails with an explicit Zod validation message.

**Acceptance Scenarios**:
1. **Given** valid `pricing.json` and `faq.json`,  
   **When** running build,  
   **Then** components consume the validated JSON seamlessly.
2. **Given** malformed JSON data,  
   **When** running build,  
   **Then** build halts immediately with descriptive error location.

---

## 3. Technical Requirements

### Functional Requirements

- **FR-001 (Inversion of Control for Header Navigation)**:  
  `components/header-nav.tsx` MUST NOT contain conditional branching based on project slug (`slug === "underundre"`, etc.). It MUST consume a structured `NavigationConfig` provided by `getActiveProjectConfig().navigation`:
  ```typescript
  export interface NavItem {
    labelKey?: string;
    labelFallback: string;
    href: string;
  }
  export interface NavigationConfig {
    items: NavItem[];
    ctaButton?: {
      labelKey?: string;
      labelFallback: string;
      href: string;
    };
  }
  ```
  The theme-mode switcher (system/dark/light) MUST be decoupled as well: the `localStorage` persistence key and the `data-theme` attribute namespace MUST be derived from `config.slug` (e.g. `<slug>_theme`, `data-theme="<slug>-dark"`), with no brand-name string literals remaining in shared components.

- **FR-002 (Inversion of Control for Footer)**:  
  `components/ui/footer.tsx` MUST NOT contain conditional branching based on project slug. It MUST consume a structured `FooterConfig` from `getActiveProjectConfig().footer` (canonical definition — matches data-model.md Entity 2):
  ```typescript
  export interface FooterColumn {
    titleKey?: string;
    titleFallback: string;
    links: Array<{ labelKey?: string; labelFallback: string; href?: string; badge?: string }>;
  }
  export interface FooterConfig {
    taglineKey?: string;
    taglineFallback: string;
    columns: FooterColumn[];
    showLegalLinks?: boolean; // default true
    showManifestLink?: boolean; // default false; renders /manifest link only for projects that ship manifest.json
  }
  ```
  When `showLegalLinks` is not `false`, the footer MUST render links to `/privacy` and `/terms`. The `/manifest` link MUST be rendered only when `showManifestLink` is `true`.

- **FR-003 (Tailwind v4 Scoped Theme Tokenization)**:  
  All hardcoded arbitrary color values in `projects/underundre/components/*` (`bg-[#080808]`, `text-[#69a700]`, `bg-[#b45500]`, `border-purple-900/30`, etc.) MUST be mapped to semantic CSS variable tokens (canonical set of 8 — single source of truth for spec, tasks and research):
  - `--brand-bg` (default `#080808`)
  - `--brand-surface` (default `#12081f`)
  - `--brand-surface-subtle` (default `#180a2e`)
  - `--brand-primary` (default `#b45500` / orange)
  - `--brand-primary-hover` (default `#c85e00`)
  - `--brand-secondary` (default `#4e007a` / purple)
  - `--brand-accent` (default `#69a700` / green)
  - `--brand-border` (default `rgba(147, 51, 234, 0.3)`)
  Each project MUST define its palette in `projects/<slug>/theme.css`.

- **FR-004 (Zod-Validated Schema Data Layer for Pricing & FAQ)**:  
  Create shared schemas in `lib/schemas/content-schema.ts`. Because the whole site is bilingual (RU/EN via `lang-context`), every user-visible content field MUST use the `LocalizedText` shape `{ ru: string; en: string }` — the current bilingual copy in `projects/underundre/locales.ts` (both language blocks) MUST be extracted without dropping either language:
  - `PricingDataSchema`: validates pricing section (sectionBadge, sectionTitle, sectionSubtitle, array of pricing cards with id, tierName, title, description, price, originalPrice, priceNote, turnaround, deliverables, ctaText, ctaHref, isHero — all display strings localized).
  - `FaqDataSchema`: validates FAQ section (sectionBadge, sectionTitle, sectionSubtitle, array of entries with question and answers array — localized).
  - `ManifestDataSchema`: validates array of principles (number, title, quote, summary, body — localized).
  Components `sprint-pricing.tsx`, `faq-section.tsx`, and the new `/manifest` page MUST import and consume these validated files from `projects/<slug>/data/`, rendering the variant selected by the active language context.

- **FR-005 (General-Purpose Pluggable Lead API)**:  
  `app/api/lead/route.ts` MUST be refactored to remove hardcoded product-specific enums (`bottleneckType`). The schema MUST support:
  ```typescript
  export const GenericLeadSchema = z.object({
    email: z.string().trim().email(),
    contact: z.string().trim().max(150).optional().default(""),
    topic: z.string().trim().max(100).optional().default("general"),
    message: z.string().trim().min(3).max(2000),
    // Flat scalar map: bounded key count and value types/sizes (no nested objects/arrays).
    metadata: z.record(z.union([z.string().max(500), z.number(), z.boolean()])).max(20).optional().default({}),
  });
  ```
  **Consumer migration (same phase, same merge)**: the only existing caller — `projects/underundre/components/cta-underundre.tsx` — currently posts `{email, messenger, bottleneckType, stackAndTeam}`. It MUST be migrated in the same change to post `{email, contact, message, metadata: { bottleneckType, ... }}`; the `bottleneckType` select survives as a UI control writing into `metadata`. Deployment MUST NOT contain a window where the route is generalized but the form is not migrated.
  **Dispatch behavior**: the route MUST dispatch to Telegram if `TELEGRAM_BOT_TOKEN` + `TELEGRAM_ALERT_CHAT_ID` are set. If `LEAD_WEBHOOK_URL` is set, it MUST simultaneously post the JSON payload to the webhook with a 4-second timeout. If neither is set, it logs the lead redacted (email/contact masked) and returns `fallback: "direct"`. If a configured sink fails or times out, the route MUST still return success to the user with `fallback: "partial"` (never a 500). All outbound text MUST keep HTML escaping (the existing `escapeHtml` in the route) before Telegram forwarding.
  **Abuse resistance**: the endpoint MUST apply a lightweight per-IP rate limit (in-memory, e.g. ≤ 5 requests/min per IP, single-instance VPS deployment) and reject oversized bodies with 4xx, not 500.

- **FR-006 (Statutory Page: Privacy Policy `/privacy`)**:  
  Implement `app/(default)/privacy/page.tsx` rendering a clean, accessible privacy policy adhering to GDPR Art. 13 and NACE 62.01 standards. The page MUST dynamically interpolate a new `legal` block of `ProjectConfig` (added together with `navigation`/`footer` in the config-interface task):
  ```typescript
  legal: {
    contactEmail: string;      // data-protection contact
    entityName: string;        // legal/operator identity
    jurisdiction: string;      // e.g. "EU NACE 62.01"
    retentionMonths?: number;  // default 12
  };
  ```
  When `legal` fields are missing (e.g. in `_template`), the page MUST render clearly marked placeholders instead of silently shipping empty legal text. Bilingual RU/EN support MUST be provided.

- **FR-007 (Statutory Page: Terms of Service `/terms`)**:  
  Implement `app/(default)/terms/page.tsx` rendering the standard terms of service for productized engineering services, including:
  - Fixed-scope delivery boundary;
  - Upwork Direct Contracts escrow protection (5% fee, 0% client fee);
  - 100% intellectual property and code transfer upon milestone release;
  - 7-Day bugfix warranty terms (P1/P2 SLA);
  - Dynamic interpolation of brand details (`config.legal` block) and bilingual RU/EN support.
  Because this template is consumed by White-Label resellers whose commercial terms may differ, escrow/warranty clauses MUST be interpolated from config overridable fields (defaults preserved for `underundre`); `_template` MUST ship placeholder values with a "replace before production" warning.

- **FR-008 (Statutory Page: Engineering Manifesto `/manifest`)**:  
  Implement `app/(default)/manifest/page.tsx` presenting the 7 Core Engineering Principles of UnderUndre (v18.9 / v20.0). The citation in `tagline-reveal.tsx` MUST link to `/manifest`.

- **FR-009 (Interactive Scaffolding CLI `pnpm project:create`)**:  
  Implement `scripts/create-project.mjs` callable via `pnpm project:create`:
  - Interactively (or via CLI flags `--slug`, `--name`, `--domain`, `--primary-color`, `--accent-color` — canonical flag names) prompts for project details;
  - Clones `projects/_template/` to `projects/<slug>/`;
  - Replaces placeholders in `config.ts`, `data/pricing.json`, `data/faq.json`, `theme.css`;
  - Registers the new project by appending a clearly-delimited import + registry entry block to `lib/project-config.ts` (the single resolver), then immediately runs `pnpm validate` to assert the appended block compiles;
  - Rejects duplicate or malformed slugs (`^[a-z][a-z0-9-]*$`) before touching the filesystem.

- **FR-010 (Canonical Starter Template `projects/_template`)**:  
  Create `projects/_template/` containing a pristine, working baseline brand with placeholder copy, neutral dark theme (`#030712`, `#2563eb`), valid JSON data files, standard favicon, and clean TSX component wrappers.

- **FR-011 (Legacy Brand Decommission — undrlla)**:  
  The legacy `undrlla` brand implementation MUST be removed from the engine: `undrllaConfig` and its resolver branch in `lib/project-config.ts`, the `dev:undrlla` / `build:undrlla` npm scripts, undrlla-specific brand components in `components/` (e.g. `hero-undrlla.tsx`, `waitlist-form.tsx`, `marketplace-preview-demo.tsx`, `economics-client.tsx`, `shopify-style-features.tsx`), the `/economics` route, the `/api/waitlist` endpoint, and undrlla-specific `data-theme="undrlla"` styling. The repository MUST build cleanly with only `underundre` (+ scaffolded test brands) after decommission. Undrlla's replacement landing will be re-created later as a regular template consumer via `pnpm project:create` — its current implementation is not migrated.

---

### Non-Functional Requirements & Governance

- **NFR-001 (Zero Bundle & Compilation Regressions)**:
  - `pnpm validate` (`tsc --noEmit`) MUST succeed with 0 errors across all projects.
  - `pnpm build` with `NEXT_PUBLIC_PROJECT_NAME=underundre` and with a freshly scaffolded test brand MUST produce identical HTML output for existing sections (baseline = pre-refactor `underundre` build). The legacy `undrlla` build target is removed (FR-011) and is out of the regression matrix.
- **NFR-002 (Performance & Core Web Vitals)**:
  - Static generation for `/privacy`, `/terms`, `/manifest` MUST be pre-rendered at build time (`○ (Static)`).
  - LCP $\le 1.5$s on all new pages; CLS $= 0$.
- **NFR-003 (Accessibility - WCAG 2.1 AA)**:
  - All legal and manifesto text MUST maintain contrast ratio $\ge 4.5:1$ against the dark background.
  - Semantic HTML (`<main>`, `<article>`, `<header>`, `<footer>`, `<nav>`) throughout all new routes.
- **NFR-004 (Licensing Compliance - GNU GPLv3)**:
  - The repository root `LICENSE` file MUST declare **GNU General Public License v3.0**.
  - A clear `NOTICE` file MUST acknowledge the historical Cruip Simple Light foundation while asserting copyright on custom architecture and components.

---

## 4. System Architecture & Entity Relationships

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    NEXT.JS 15 MULTI-BRAND ENGINE                            │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                       Resolver: NEXT_PUBLIC_PROJECT_NAME
              (lib/project-config.ts imports projects/<slug>/config.ts)
                                       │
            ┌──────────────────────────┼──────────────────────────┐
            ▼                          ▼                          ▼
   [ projects/underundre ]      [ projects/_template ]    [ projects/<scaffolded> ]
   ├── config.ts                ├── config.ts             ├── config.ts
   │   ├── navigationConfig     │   ├── navigationConfig  │   (generated by
   │   ├── footerConfig         │   └── footerConfig      │    pnpm project:create)
   │   └── legal (FR-006)       │                         │
   ├── theme.css                ├── theme.css             ├── theme.css
   ├── data/                    ├── data/                 ├── data/
   │   ├── pricing.json         │   ├── pricing.json      │   ├── pricing.json
   │   ├── faq.json             │   └── faq.json          │   └── faq.json
   │   └── manifest.json        │                         │
   └── components/              └── components/           └── components/
            │                          │                          │
            └──────────────────────────┼──────────────────────────┘
                                       │
                    ┌──────────────────┴──────────────────┐
                    ▼                                     ▼
        [ A Generic Layout Shell ]               [ Static Routes ]
        • components/header-nav.tsx              • / (Active Project Home)
        • components/ui/footer.tsx               • /privacy (Project Legal)
        • components/ui/logo.tsx                 • /terms (Project Legal)
        (Zero slug-specific conditions)          • /manifest (projects with manifest.json)
```

*Legacy `undrlla` brand removed per FR-011; its replacement will re-enter as a scaffolded project.*

---

## 5. Pre-Mortem & Forensic Risk Mitigation

| Risk Code | Failure Mode | Severity | Mitigation Mechanism |
| :--- | :--- | :--- | :--- |
| **FM-01** | Refactoring Header/Footer breaks the existing `underundre` layout | **HIGH** | Strict characterization verification: compile `underundre` before and after refactoring, verifying visual parity; scaffolded test brand must render its own config cleanly. |
| **FM-02** | Invalid JSON syntax in `pricing.json` crashes production server | **HIGH** | Build-time validation: `lib/schemas/content-schema.ts` parses all JSON files during `next build`. Malformed data halts the build in CI with explicit line error. |
| **FM-03** | Lead submission fails because secondary brand does not configure Telegram | **MEDIUM** | Fail-open dispatcher: if `TELEGRAM_*` tokens are absent, lead is logged (redacted) to console and returned with `{ fallback: "direct" }`. No 500 error thrown to user. |
| **FM-04** | Commercial client claims copyright violation on derived Cruip code | **CRITICAL** | Clear GNU GPL-3.0 licensing in root + explicit NOTICE documentation. Open-Core monetization model sells custom implementation services and private modules, not base CSS. |
| **FM-05** | Legal text on `/privacy` leaks UnderUndre personal data on client's site | **HIGH** | All legal entities, emails, and jurisdictions are dynamically interpolated from `projectConfig.legal` and placeholders are rendered in `_template` when fields are missing. |
| **FM-06** | Lead API refactor ships without migrating the existing contact form — live lead capture returns 400 | **CRITICAL** | Form migration is a same-phase, same-merge requirement of FR-005 (consumer and contract change together); E2E test drives the real form, not just curl. |
| **FM-07** | Reseller deploys `/terms` with UnderUndre's escrow/warranty clauses under their own brand | **HIGH** | Terms clauses are config-overridable via `projectConfig.legal`; `_template` ships placeholders with a "replace before production" warning. |
