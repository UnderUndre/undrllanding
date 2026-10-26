# Implementation Plan: UnderUndre Landing Realignment v1

**Branch**: `002-underundre-landing-v1` | **Date**: 2026-10-26 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/002-underundre-landing-v1/spec.md`

---

## Summary

Realignment of the `underundre.com` landing page in repository `undrllanding` to match immediate operational capabilities (Version 1: Workaround TCO Audit $490 + Grand Slam FOSS Office Stack $3,500). Eliminates silent lead data loss by deploying a robust `/api/lead` route with Zod validation and failover mechanisms; replaces the 2.8 MB SVG icon with a lightweight `favicon.ico`; cleanses stale Medusa 2.0 / Undrlla brand leakage; repairs dead navigation anchors; integrates Umami self-hosted analytics; and establishes a deterministic `preview.html` mirror.

---

## Technical Context

**Language/Version**: TypeScript 5.7+ / Node.js 22  
**Primary Dependencies**: Next.js 15 (App Router), React 19, Tailwind CSS v4, Zod 3/4, Headless UI, AOS  
**Storage**: N/A (Stateless lead forwarder to Telegram Webhook / client fallback)  
**Testing**: Manual / Playwright E2E visual verification (375px @3x, 1440px @2x), cURL contract tests  
**Target Platform**: Web (V8 / Chromium, WebKit, Gecko; responsive 320px–4K)  
**Project Type**: Next.js Web Application / Multi-Project Landing Engine  
**Performance Goals**: $\text{LCP} \le 1.5$s, $\text{FCP} \le 1.0$s, $\text{CLS} = 0$, icon payload $< 15$ KB (99.5% reduction)  
**Constraints**: Zero silent lead loss; zero unready service promises (`sign.underundre.com` and `shop.underundre.com` isolated from active Version 1 sales claims)  
**Scale/Scope**: 1 Next.js application, 9 modified components/configs, 1 new API route handler, ~400 lines of modified TypeScript/TSX  
**Security Surface & STRIDE Triggers**: Inbound lead endpoint (`/api/lead`) exposed publicly. Mitigation: Zod input validation (min/max bounds), denial-of-service payload size limit (Next.js default 1MB), sanitization of HTML special chars before Telegram forward.  
**Database Migration Trigger**: N/A (No database modifications).  
**Supply Chain & Licensing**: MIT / Apache-2.0, zero copyleft/GPL contamination in client bundle.  
**Research Spikes & Disposal**: N/A (Direct deterministic refactoring of existing components).

---

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Principle I (Source of Truth)**: Aligned with `undreseller-business-plan.md` **v18.9** and `how-to-make-landing.md`.
- [x] **Principle IV (SemVer Discipline)**: Landing page revision within 0.x zone, fully backward-compatible with multi-project resolver.
- [x] **Principle V (Token Economy)**: No dead files or duplicated components. Shared layout utilized cleanly.
- [x] **Principle VI (Cross-AI Review Gate)**: Prepared for requirements-audit and cross-AI verification pass before release.
- [x] **Principle VII (Artifact Versioning)**: Stage tags applied via Git snapshot convention (`requirements-audit/`, `plan/`, `tasks/`).
- [x] **Principle VII-B (Business Plan Sync)**: Business plans `undreseller` (v18.9) and `undreading` (v2.5) updated and synchronized prior to plan completion.

---

## Project Structure

### Documentation (this feature)

```text
specs/002-underundre-landing-v1/
├── spec.md                   # Feature specification
├── checklists/
│   └── requirements.md       # Specification quality checklist (PASSED)
├── requirements-audit.md     # Formal 4-Pillar requirements audit (PASS)
├── qa/
│   └── preliminary-rtm.md    # Risk-Based Testing Matrix & preliminary RTM
├── research.md               # Phase 0 research & technical decisions
├── data-model.md             # Phase 1 data model & contracts
├── quickstart.md             # Phase 1 local development & verification guide
├── contracts/
│   └── lead-api.ts           # Phase 1 Zod validation schema & contract types
├── plan.md                   # This file (Architecture & implementation plan)
└── tasks.md                  # Phase 2 tasks breakdown
```

### Source Code Layout (Repository Root: `undrllanding/`)

```text
app/
├── layout.tsx                                 # [MODIFIED] Dynamic title template, remove Medusa 2.0 text, Umami script
├── (default)/
│   └── page.tsx                              # [MODIFIED] Dynamic icon resolver pointing to favicon.ico
├── api/
│   └── lead/
│       └── route.ts                           # [NEW] Lead capture endpoint with Zod validation & Telegram failover
components/
├── header-nav.tsx                             # [MODIFIED] Clean navigation anchors for underundre project
└── ui/
    └── footer.tsx                             # [MODIFIED] Fix slug check (underundre || undreseller)
lib/
└── project-config.ts                          # [MODIFIED] Favicon path fix, OG metadata, canonical title & description
projects/underundre/
├── preview.html                               # [MODIFIED] Regenerated static mirror of Version 1 landing
└── components/
    ├── hero-underundre.tsx                    # [MODIFIED] H1 Loss-Framing, TCO Audit $490 CTA, remove dead links
    ├── loom-demo-section.tsx                  # [MODIFIED] Fix "AI AI" typo, reframe as Architecture Spec & DDL mock
    ├── sprint-pricing.tsx                     # [MODIFIED] Rebalanced ladder (Audit $490 -> FOSS $3,500 -> Sprint B Gated)
    ├── opsec-protocol.tsx                     # [MODIFIED] Add id="opsec", eliminate sign.underundre.com dependency
    ├── comparison-matrix.tsx                  # [MODIFIED] Add id="comparison", enhance text contrast to WCAG 2.1 AA
    └── cta-underundre.tsx                     # [MODIFIED] Real POST to /api/lead, dual-tier failover modal
```

---

## Implementation Details

### Step 1: Lead Capture API Handler (`app/api/lead/route.ts`)
- Implement `POST` handler reading JSON payload.
- Validate with `LeadSubmissionSchema` imported from `specs/002-underundre-landing-v1/contracts/lead-api.ts`.
- If valid:
  - If `process.env.TELEGRAM_BOT_TOKEN` and `process.env.TELEGRAM_ALERT_CHAT_ID` are set:
    - Dispatch HTML message via `fetch()` with 4000ms timeout.
    - Message format:
      ```html
      🚨 <b>New Inbound Lead — UnderUndre</b>
      <b>Name:</b> {name}
      <b>Email:</b> {email}
      <b>Company:</b> {company || "N/A"}
      <b>Monthly SaaS Waste:</b> {estimatedMonthlySaaSCost || "N/A"}
      <b>Interest:</b> {productInterest}
      <b>Details:</b>
      {details}
      ```
  - Return `{ success: true, message: "Lead captured successfully", fallback: "none" }`.
- If Telegram alert fails or variables missing:
  - Return `{ success: true, message: "Lead captured (fallback)", fallback: "upwork", upworkUrl: "https://www.upwork.com/direct-contracts" }`.
- If validation fails:
  - Return 400 Bad Request with field errors.

### Step 2: Metadata, Favicon & Brand Isolation
- **`lib/project-config.ts`**:
  - Update `underundre` icon: `icon: "/projects/underundre/favicon.ico"`.
  - Update description: `"Eliminate $15k–$40k/yr in SaaS seat taxes and manual labor leaks. 48-Hour Workaround TCO Audits, OpenAPI specifications, and self-hosted FOSS systems under NACE 62.01."`.
  - Add `ogTitle`, `ogDescription`, `ogUrl: "https://underundre.com"`.
- **`app/layout.tsx`**:
  - Remove hardcoded `title: { template: "%s | Undrlla" }`.
  - Purge line 18 Medusa 2.0 text.
  - Insert `<Script>` for Umami conditional on `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
- **`components/ui/footer.tsx`**:
  - Line 20: update to `config.slug === "underundre" || config.slug === "undreseller"`.

### Step 3: Component Realignment & Anchor Repair
- **`components/header-nav.tsx`**:
  - If project is `underundre`, render nav items: `#audit`, `#pricing`, `#comparison`, `#faq`, `#contact`.
- **`components/hero-underundre.tsx`**:
  - Update H1: `Stop Burning $15k–$40k/Yr on SaaS Seat Taxes and Manual Workarounds.`.
  - Eyebrow: `3X SALESFORCE CERTIFIED ARCHITECT | ZERO SAAS TAXES | UPWORK ESCROW VERIFIED`.
  - Primary CTA: `Book 48-Hour TCO Audit ($490) via Upwork Escrow →`.
  - Trust Badges: Upwork Direct Contracts (5%), 48-Hour SLA, Via Negativa Guarantee, 100% Code & IP Transfer, NACE 62.01.
  - Remove references to `sign.underundre.com` and `shop.underundre.com`.
- **`components/sprint-pricing.tsx`**:
  - Card 0: Workaround TCO Audit & Architecture Spec ($490 Flat, 24–48h SLA, TDABC forensics, Via Negativa, 100% credit).
  - Card 1: Grand Slam FOSS Office Stack ($3,500 setup + $500/mo retainer, 3–5 days, Twenty CRM, Outline, Plane, Chatwoot, Cal.com, Docker Memory Fencing).
  - Card 2: Sovereign Booking & Custom Systems ($4,900 flat, 14 days, *Available Upon Audit*).
- **`components/cta-underundre.tsx`**:
  - Wire stateful form to `POST /api/lead`.
  - Handle loading, success, and graceful fallback states.
- **`components/loom-demo-section.tsx`**:
  - Fix typo at line 56 (`"AI AI"` $\to$ `"03 / TELEMETRY & TRIAGE"`).
- **`components/comparison-matrix.tsx` & `opsec-protocol.tsx`**:
  - Add `id="comparison"` and `id="opsec"`.
  - Bump contrast of muted table text to meet WCAG 2.1 AA $\ge 4.5:1$.

### Step 4: Preview Regeneration
- Synchronize `projects/underundre/preview.html` so that all H1, pricing, badges, and structural copy match the Next.js components byte-for-byte.
