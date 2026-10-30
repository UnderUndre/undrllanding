# Phase 0 Research & Technical Decisions: 003-landing-template-engine

**Feature**: Open-Source Multi-Brand Landing Engine & White-Label Packaging  
**Date**: 2026-10-30  
**Status**: Completed & Approved

---

## 1. Decoupling Navigation & Footer (Inversion of Control - FR-001, FR-002)

### The Problem
`components/header-nav.tsx` and `components/ui/footer.tsx` currently inspect `config.slug === "underundre" || config.slug === "undreseller"`, and the header also hardcodes the theme-mode switcher (`localStorage.getItem("undrlla_theme")`, `data-theme="undrlla"`). Any newly added brand (`projects/client-alpha/`) falls into the wrong fallback branches. This directly violates the "Zero Cross-Contamination" rule established in `specs/001-init-separate-landings`. The legacy `undrlla` brand is decommissioned in this feature (FR-011); `underundre` is the reference brand.

### Architectural Decision
Apply Inversion of Control (IoC). The shell components become pure presentation components rendering navigation arrays provided by the project's configuration:

```typescript
// lib/project-config.ts
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

export interface FooterLink {
  labelKey?: string;
  labelFallback: string;
  href?: string;
  badge?: string;
}

export interface FooterColumn {
  titleKey?: string;
  titleFallback: string;
  links: FooterLink[];
}

export interface FooterConfig {
  // Canonical definition (matches spec FR-002 and data-model.md Entity 2 — single source)
  taglineKey?: string;
  taglineFallback: string;
  columns: FooterColumn[];
  showLegalLinks?: boolean;   // default true — renders /privacy + /terms links
  showManifestLink?: boolean; // default false — renders /manifest link only for projects shipping manifest.json
}

export interface LegalConfig {
  contactEmail: string;       // GDPR Art. 13 data-protection contact
  entityName: string;         // legal/operator identity
  jurisdiction: string;       // e.g. "EU NACE 62.01"
  retentionMonths?: number;   // default 12
  escrowProvider?: string;    // default "Upwork Direct Contracts (5% fee, 0% client fee)"
  warrantyDays?: number;      // default 7
}
```

#### Migration & Parity:
1. `underundreConfig` migrates from `lib/project-config.ts` into `projects/underundre/config.ts` (single source of truth: the lib resolver imports per-project configs; the scaffold appends a delimited registry entry and immediately runs `pnpm validate`). It exports its exact 5 navigation anchors (`#audit`, `#stack`, `#pricing`, `#comparison`, `#faq`), CTA button (`#contact`), footer columns (`Product Ladder`, `Payments & Escrow`), `showManifestLink: true`, and the `legal` block.
2. `components/header-nav.tsx` and `components/ui/footer.tsx` render exclusively from `config.navigation` and `config.footer`; the theme-mode switcher derives its `localStorage` key and `data-theme` namespace from `config.slug`. Zero string literals for brand slugs remain in shared components.
3. The legacy `undrlla` brand is removed (FR-011): config, npm scripts, undrlla-only components, `/economics`, `/api/waitlist`, `data-theme="undrlla"` styling.

---

## 2. Schema-Driven Content Layer (Pricing, FAQ, Manifesto - FR-004)

### The Problem
Commercial data (package costs, deliverable checklists, FAQ questions/answers, manifesto principles) is currently embedded directly inside JSX/TSX components or inside unstructured localization objects in `locales.ts`. Non-developer editors or agency clients cannot modify a package price without git commits to component source code, risking syntax errors in JSX. **Crucially, `locales.ts` holds both RU and EN blocks** — the extraction must preserve both languages (review F2).

### Architectural Decision
Implement Option C from `undrllanding-reusing-strategy.md`: **Schema-Driven File-Based Data Layer using Zod**, bilingual by contract:

```
projects/<slug>/data/
  ├── pricing.json      # Structured package ladder — all display fields LocalizedText {ru, en}
  ├── faq.json          # Categorized FAQ questions & paragraphs — LocalizedText
  └── manifest.json     # 7 Engineering principles & manifesto body — LocalizedText
```

#### Build-Time Enforcement:
Create `lib/schemas/content-schema.ts`. During application startup or build time, a validation utility reads these files through `safeParse()`. If a required field is missing or malformed, the build halts immediately (`process.exit(1)`) with a descriptive diagnostic pointing to the exact JSON file and line, preventing broken markup from deploying to production.

---

## 3. Tailwind v4 Scoped Theme Tokenization (FR-003)

### The Problem
Brand colors are scattered across TSX components using arbitrary Tailwind values (e.g., `bg-[#080808]`, `text-[#69a700]`, `bg-[#b45500]`, `border-purple-900/30`). A white-label agency rebranding for a medical clinic (which needs clean blues/cyans) must manually edit dozens of class names.

### Architectural Decision
Leverage Tailwind v4 CSS variable integration. Map semantic design tokens to CSS variables injected at the project root:

```css
/* projects/<slug>/theme.css */
:root {
  /* Canonical 8-token set (single source of truth — spec FR-003, tasks T-015) */
  --brand-bg: #080808;
  --brand-surface: #12081f;
  --brand-surface-subtle: #180a2e;
  --brand-primary: #b45500;
  --brand-primary-hover: #c85e00;
  --brand-secondary: #4e007a;
  --brand-accent: #69a700;
  --brand-border: rgba(147, 51, 234, 0.3);
}
```

In `app/css/style.css`, map Tailwind theme extensions:
```css
@theme {
  --color-brand-bg: var(--brand-bg);
  --color-brand-surface: var(--brand-surface);
  --color-brand-surface-subtle: var(--brand-surface-subtle);
  --color-brand-primary: var(--brand-primary);
  --color-brand-primary-hover: var(--brand-primary-hover);
  --color-brand-accent: var(--brand-accent);
  --color-brand-border: var(--brand-border);
}
```
Components now write: `bg-brand-bg`, `text-brand-accent`, `border-brand-border`. To change an entire website palette, an agency edits exactly one file: `theme.css`.

---

## 4. Pluggable Lead API Architecture (FR-005)

### The Problem
`app/api/lead/route.ts` hardcodes `bottleneckType: z.enum(["whatsapp-manual", "excel-chaos", ...])`, which is strictly tied to UnderUndre's TCO audit offer. Furthermore, it assumes Telegram is the only notification sink.

### Architectural Decision
Refactor `app/api/lead/route.ts` into a general-purpose inbound lead intake handler:
1. **Schema Generalization**:
   - `email`: required RFC 5322 string;
   - `contact`: optional string (phone, messenger, social link);
   - `topic`: optional string category (defaults to `"general"`);
   - `message`: required string description (3–2000 chars);
   - `metadata`: **bounded flat scalar map** — `z.record(string|number|boolean)` with max 20 keys and string values ≤ 500 chars (no nested objects/arrays — kills payload-depth and CPU amplification on a public endpoint; review F7). Any project can pass custom fields (e.g. `bottleneckType`, `teamSize`, `budget`) without schema errors.
2. **Consumer Migration (same merge — review F1, CRITICAL)**:
   The only existing caller, `projects/underundre/components/cta-underundre.tsx`, posts `{email, messenger, bottleneckType, stackAndTeam}`. It is migrated in the same merge: `messenger → contact`, `stackAndTeam → message`, `bottleneckType` select → `metadata.bottleneckType`. No deploy window with mismatched contract halves.
3. **Pluggable Dispatcher Pipeline**:
   - `TelegramDispatcher`: runs if `TELEGRAM_BOT_TOKEN` & `TELEGRAM_ALERT_CHAT_ID` exist.
   - `WebhookDispatcher`: runs if `LEAD_WEBHOOK_URL` is configured in environment (delivers JSON POST with 4000ms timeout for external CRM/Make/n8n automation).
   - `ConsoleDispatcher`: runs if no sinks are configured, logging the lead **redacted** (email/contact masked — PII hygiene).
   - Zero 500 errors thrown to user if external sinks time out; graceful fallback response returned. `fallback` response semantics: `"direct"` (no sinks configured) / `"none"` (all delivered) / `"partial"` (some sink failed — still HTTP 200).
4. **Abuse Resistance**:
   - In-memory per-IP rate limit (≤ 5 req/min — adequate for the single-instance VPS deployment);
   - The existing `escapeHtml` on all outbound Telegram text is preserved (T-016 acceptance criterion).

---

## 5. Compliance & Statutory Pages Architecture (FR-006, FR-007, FR-008)

### The Problem
- The footer has static placeholder text for `Privacy Policy` and `Terms of Service`.
- Collecting email and contact data without a GDPR Art. 13 disclosure creates immediate regulatory exposure.
- The Tagline section cites: *«— Инженерный манифест UnderUndre §18.9»*, but the manifesto cannot be read anywhere.

### Architectural Decision
Create 3 static App Router pages:
1. **`/privacy` (`app/(default)/privacy/page.tsx`)**:
   - Reads operator details from the `config.legal` block of `getActiveProjectConfig()` (marked placeholders when fields are missing — never silently empty legal text).
   - Discloses data controller identity, categories of collected data (email, contact, project details), lawful basis (legitimate interest for B2B contract proposals), retention period (12 months), and rights (erasure, objection via email).
2. **`/terms` (`app/(default)/terms/page.tsx`)**:
   - Fixed-scope delivery boundary;
   - Independent contractor status (EU NACE 62.01);
   - Escrow mechanics (Upwork Direct Contracts 5%);
   - 100% intellectual property and code transfer upon milestone acceptance;
   - 7-Day bugfix SLA terms and liability cap (limited to actual fees received in preceding 30 days).
3. **`/manifest` (`app/(default)/manifest/page.tsx`)**:
   - The 7 Engineering Principles of UnderUndre:
     1. *Via Negativa*: Never automate what should be deleted.
     2. *Zero SaaS Taxes*: Self-hosted open-source software over recurring seat licenses.
     3. *Strict Schema-First (DDL + Zod)*: Deterministic validation over vibe-coding slop.
     4. *Async-First Velocity*: Zero meeting fatigue; asynchronous Loom walkthroughs over daily status calls.
     5. *100% Code & Data Sovereignty*: Complete Git repo transfer and private infrastructure ownership.
     6. *Single Production Leases & Memory Fencing*: Docker resource fencing against out-of-memory cascading failures.
     7. *Fixed-Scope Knife & Escrow Protection*: Mutual protection via third-party escrow and fixed timeboxes.
   - Tagline section in `tagline-reveal.tsx` links directly to `/manifest`.

---

## 6. Project Scaffolding CLI (`scripts/create-project.mjs` - FR-009, FR-010)

### Architectural Decision
Implement an interactive Node.js CLI script using native `node:fs` and `node:readline` (zero third-party dependencies):
- Command: `pnpm project:create` or `node scripts/create-project.mjs --slug=<slug> --name="<Name>" --primary-color="#2563eb" --accent-color="#059669"` (canonical flag names).
- Validates the slug (`^[a-z][a-z0-9-]*$`, no duplicates) before touching the filesystem.
- Copies `projects/_template/` to `projects/<slug>/`.
- Substitutes variables in `config.ts`, `theme.css`, `data/*.json`.
- Registers the project by appending a clearly-delimited import + registry entry block to `lib/project-config.ts`, then immediately runs `pnpm validate` to assert the result compiles (no silent TS corruption).
- Warns when the chosen `--primary-color`/`--accent-color` compute to < 4.5:1 contrast on the dark background (NFR-003 guard for arbitrary palettes).
- Validates that `npx cross-env NEXT_PUBLIC_PROJECT_NAME=<slug> pnpm validate` succeeds immediately (cross-env — Windows compatibility).
