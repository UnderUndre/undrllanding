# Phase 0 Research & Technical Decisions: 003-landing-template-engine

**Feature**: Open-Source Multi-Brand Landing Engine & White-Label Packaging  
**Date**: 2026-10-30  
**Status**: Completed & Approved

---

## 1. Decoupling Navigation & Footer (Inversion of Control - FR-001, FR-002)

### The Problem
`components/header-nav.tsx` and `components/ui/footer.tsx` currently inspect `config.slug === "underundre" || config.slug === "undreseller"`. If a developer creates `projects/client-alpha/`, the components fall back to hardcoded `undrlla` marketplace links. This directly violates the "Zero Cross-Contamination" rule established in `specs/001-init-separate-landings`.

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
  taglineKey?: string;
  taglineFallback: string;
  columns: FooterColumn[];
  legalNotice?: string;
}
```

#### Migration & Parity:
1. `projects/underundre/config.ts` exports its exact 5 navigation anchors (`#audit`, `#stack`, `#pricing`, `#comparison`, `#faq`), CTA button (`#contact`), and footer columns (`Product Ladder`, `Payments & Escrow`).
2. `projects/undrlla/config.ts` exports its marketplace links (`#how`, `#pricing`, `/economics`), CTA button (`#waitlist`), and marketplace footer columns (`Features`, `Payments & Escrow`).
3. `components/header-nav.tsx` and `components/ui/footer.tsx` render exclusively from `config.navigation` and `config.footer`. Zero string literals for brand slugs remain in shared components.

---

## 2. Schema-Driven Content Layer (Pricing, FAQ, Manifesto - FR-004)

### The Problem
Commercial data (package costs, deliverable checklists, FAQ questions/answers, manifesto principles) is currently embedded directly inside JSX/TSX components or inside unstructured localization objects in `locales.ts`. Non-developer editors or agency clients cannot modify a package price without git commits to component source code, risking syntax errors in JSX.

### Architectural Decision
Implement Option C from `undrllanding-reusing-strategy.md`: **Schema-Driven File-Based Data Layer using Zod**:

```
projects/<slug>/data/
  ├── pricing.json      # Structured package ladder & feature matrices
  ├── faq.json          # Categorized FAQ questions & paragraphs
  └── manifest.json     # 7 Engineering principles & manifesto body
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
  --brand-bg: #080808;
  --brand-surface: #12081f;
  --brand-surface-subtle: #180a2e;
  --brand-primary: #b45500;
  --brand-primary-hover: #c85e00;
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
   - `metadata`: open `z.record(z.unknown())` dictionary. Any project can pass custom fields (e.g., `bottleneckType`, `teamSize`, `budget`) without schema errors.
2. **Pluggable Dispatcher Pipeline**:
   - `TelegramDispatcher`: runs if `TELEGRAM_BOT_TOKEN` & `TELEGRAM_ALERT_CHAT_ID` exist.
   - `WebhookDispatcher`: runs if `LEAD_WEBHOOK_URL` is configured in environment (delivers JSON POST with 4000ms timeout for external CRM/Make/n8n automation).
   - `ConsoleDispatcher`: runs if no sinks are configured, cleanly logging the lead for local inspection.
   - Zero 500 errors thrown to user if external sinks time out; graceful fallback response returned.

---

## 5. Compliance & Statutory Pages Architecture (FR-006, FR-007, FR-008)

### The Problem
- The footer has static placeholder text for `Privacy Policy` and `Terms of Service`.
- Collecting email and contact data without a GDPR Art. 13 disclosure creates immediate regulatory exposure.
- The Tagline section cites: *«— Инженерный манифест UnderUndre §18.9»*, but the manifesto cannot be read anywhere.

### Architectural Decision
Create 3 static App Router pages:
1. **`/privacy` (`app/(default)/privacy/page.tsx`)**:
   - Reads operator details dynamically from `getActiveProjectConfig()`.
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
- Command: `pnpm project:create` or `node scripts/create-project.mjs --slug=<slug> --name="<Name>"`.
- Copies `projects/_template/` to `projects/<slug>/`.
- Substitutes variables in `config.ts`, `theme.css`, `data/*.json`.
- Appends new project entry into `lib/project-config.ts`.
- Validates that `NEXT_PUBLIC_PROJECT_NAME=<slug> pnpm validate` succeeds immediately.
