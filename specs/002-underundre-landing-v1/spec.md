# Feature Specification: UnderUndre Landing Realignment v1 (TCO Audit & Sovereign Infrastructure)

**Feature Directory**: `specs/002-underundre-landing-v1`  
**Repository**: `undrllanding`  
**Created**: 2026-10-26  
**Status**: Ready for Review / Executable  
**Commercial Source of Truth**:  
- `undreplans/docs/projects/undreseller/undreseller-business-plan.md` **v18.9** (Multi-Staff SMB ICP + Workaround TCO Audit + Anti-Stall Staging Protocol)  
- `undreplans/docs/projects/undreading/researches/how-to-make-landing.md` (Visual Feedback Loop + Cold Traffic Conversion Anatomy)  
**Input Directive**: Realignment of the `underundre.com` landing page to match current operational capabilities, eliminate lead leakage, remove unready dependencies (unhosted DocuSeal, unready booking template, unintegrated fiat/crypto rails), and deploy a high-converting Workaround TCO Audit ($490) hero offer.

---

## 1. Executive Context & Two-Stage Landing Architecture

### The Core Problem (Forensic Diagnostic):
The current deployment of `projects/underundre` is suffering from a **Category Mismatch and Premature Delivery Promise**:
1. **Unready Infrastructure Promised Live**: The hero and copy promise a live booking template on `shop.underundre.com`, online crypto/Stars payments, and contracts via `sign.underundre.com`. In physical reality, the multi-staff booking template is undergoing core stabilization, self-hosted DocuSeal is not deployed, and Stripe/Paddle/SHKeeper payment rails are in development.
2. **Demand Gate & Positioning Conflict**: The hero currently attempts to sell a $4,900 Sprint B (Booking Platform) to cold traffic. Under business plan v18.9 (Demand Gate), large sprints are gated behind closing 10 paid introductory audits.
3. **Severe Technical Leaks**:
   - The brief submission form (`cta-underundre.tsx`) has a dummy `e.preventDefault()` handler that silently discards leads without transmission.
   - Header navigation references dead anchors (`#how`, `#waitlist`, `/economics`).
   - The footer displays Undrlla marketplace text due to a slug mismatch (`undreseller` vs `underundre`).
   - The page title is contaminated with `| Undrlla`.
   - The favicon references a 2.8 MB unoptimized SVG file.
   - Root metadata retains obsolete references to "Medusa 2.0 marketplace".
   - Zero analytics installed (in contradiction to the Umami FOSS stack requirement).

### The Two-Stage Solution:
- **Version 1 (THIS SPECIFICATION — Deployable NOW)**:
  Position UnderUndre as a **Productized Engineering Bureau for Operational Pain Forensics and Sovereign B2B Infrastructure**.
  - **Hero Product (80% outbound focus)**: **Workaround TCO Audit & Specification ($350–$490 Flat, 24–48h SLA)** using TDABC to calculate manual labor leaks, deliver an OpenAPI 3.0 spec + Docker mock, with a 100% credit toward future sprints.
  - **Secondary / Emergency Cash Flow Valve**: **Grand Slam FOSS Office Stack ($3,500 setup + $500/mo retainer)** deployed on Hetzner CPX42 with Docker Memory Fencing and 16GB Swap.
  - **Contract & Escrow Rail**: 100% Upwork Direct Contracts (5% fee, 0% client fee).
  - **Technical Sanitization**: Zero lead loss (working `/api/lead` or direct email/Upwork modal), lightweight `favicon.ico`, Umami analytics, dead anchor cleanup, Medusa/Undrlla brand purge.
- **Version 2 (DEFERRED — Next Release Milestone)**:
  Flipped to the **Service Booking Platform ($4,900)** for Multi-Staff SMBs (3–25 employees) + **Template Fork Line ($6,800 + $349/mo Care)** once `undreseller` passes release verification, Stripe/Stars rails are live, and `sign.underundre.com` is provisioned.

---

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 - SMB Owner Converts on Workaround TCO Audit (Priority: P1)

As a business owner or operations manager losing hours to manual WhatsApp booking coordination, Excel reconciliation, and bloated SaaS seat fees,  
I want to arrive on `underundre.com`, immediately understand the cost of my operational workarounds (COI), and order a 48-Hour Workaround TCO Audit for $490,  
So that I get an objective forensic audit of my labor leaks, an OpenAPI 3.0 specification for automated bypass, and an authoritative Via Negativa assessment without risk.

**Why this priority**: Directly drives Product 0 sales, satisfies the 10-sale Demand Gate, and exploits corporate P-Card limits (<$500) without CFO sign-off.

**Independent Test**:  
Visit `http://localhost:3000/`. Verify the hero section displays the Workaround TCO Audit headline, TDABC methodology, $490 fixed price, 48-hour SLA, and an Upwork Escrow CTA button. Clicking the primary CTA directs to the Upwork Direct Contracts onboarding link.

**Acceptance Scenarios**:
1. **Given** a visitor on the hero section,  
   **When** reading H1 and eyebrow,  
   **Then** they see clear loss-framing around eliminating SaaS seat taxes and manual labor costs (no unready booking template promises).
2. **Given** a visitor clicks "Book 48-Hour TCO Audit ($490) via Upwork Escrow",  
   **Then** they are routed to the Upwork Direct Contracts onboarding URL with 5% escrow protection guarantees displayed.

---

### User Story 2 - Inbound Lead Capture Without Data Loss (Priority: P1)

As an interested enterprise or SMB prospect filling out the brief form at the bottom of the landing page,  
I want my project details, email, and description to be reliably captured and acknowledged,  
So that the bureau can prepare my audit proposal within 2 hours without my brief getting lost in a silent JavaScript void.

**Why this priority**: Eliminates the catastrophic bug where `cta-underundre.tsx` calls `e.preventDefault()` without sending data, resulting in 100% lead leakage.

**Independent Test**:  
Fill out the brief form with valid inputs (email, scope, project type) and submit. Verify that the form either executes a POST to an active endpoint (storing or dispatching the lead) or provides a deterministic fallback (opening an email client / direct messenger link) with success feedback.

**Acceptance Scenarios**:
1. **Given** valid form input in the final CTA block,  
   **When** clicking "Initialize Sprint Proposal",  
   **Then** the submission is dispatched, the user sees a confirmation state, and an alert is delivered to the bureau operator.
2. **Given** a network failure or empty input,  
   **When** submitting,  
   **Then** accessible validation errors are displayed.

---

### User Story 3 - Emergency Liquidity: FOSS Office Stack Exploration (Priority: P2)

As a growing company spending $15k–$40k/yr on Salesforce, Zendesk, Jira, and Notion seat licenses,  
I want to review the Grand Slam FOSS Office Stack package ($3,500 setup + $500/mo retainer),  
So that I can evaluate migrating to self-hosted Twenty CRM, Outline, Plane, and Chatwoot on dedicated Hetzner hardware with Docker Memory Fencing.

**Why this priority**: Serves as the authorized fallback valve for rapid cash generation ($3,500 setup) in case of critical liquidity needs, without violating the Demand Gate.

**Independent Test**:  
Navigate to the `#pricing` and `#stack` sections. Verify the Grand Slam FOSS Office Stack card specifies exact replaced tools (Salesforce, Zendesk, Jira, Notion), setup timeline (3–5 days), fixed pricing ($3,500), and Hetzner CPX42 infrastructure costs.

**Acceptance Scenarios**:
1. **Given** a user reviewing the pricing ladder,  
   **When** inspecting Sprint A,  
   **Then** they see exact tools (Twenty CRM, Outline, Plane, Chatwoot, Cal.com), Docker Memory Fencing specifications, and transparent Hetzner hosting (€82.69/mo).

---

### User Story 4 - Brand Hygiene, Fast Favicon & Zero Contamination (Priority: P2)

As a technical lead or investor auditing UnderUndre's credibility,  
I want the browser tab, footer, metadata, and assets to load instantaneously without third-party brand leaks (Undrlla) or multi-megabyte favicon assets,  
So that my experience confirms professional engineering rigor and zero amateur sloppy copy.

**Why this priority**: First impressions dictate trust. A 2.8 MB SVG icon and leaked "Undrlla" footer destroy credibility before the copy is read.

**Independent Test**:  
Inspect DOM and network requests. Verify favicon is `favicon.ico` (<15 KB), page title reads `UnderUndre — Productized Engineering & Workaround TCO Audit`, footer contains UnderUndre bureau copy, and Medusa 2.0 mentions are 100% eradicated.

**Acceptance Scenarios**:
1. **Given** the loaded page in any modern browser,  
   **When** inspecting the `<title>` and `<head>`,  
   **Then** title does NOT contain `| Undrlla`, description does NOT contain `Medusa 2.0`, and favicon request loads `favicon.ico`.
2. **Given** the bottom of the page,  
   **When** viewing the footer,  
   **Then** the UnderUndre engineering bureau copyright and navigation are rendered.

---

### User Story 5 - Privacy-Preserving Self-Hosted Analytics & Verified Preview (Priority: P3)

As the bureau operator running 300 targeted weekly touches (80 LinkedIn + 220 cold emails),  
I want privacy-compliant Umami analytics tracking page views and CTA button conversions, and a regenerated `preview.html` file that mirrors production,  
So that I can measure outbound traffic conversion rates and perform cross-AI visual reviews without running a dev server.

**Why this priority**: Validates conversion hypotheses from the research document; enables deterministic verification.

**Independent Test**:  
Inspect page source for the Umami script tag configuration (`NEXT_PUBLIC_UMAMI_WEBSITE_ID`). Verify `preview.html` in the project root can be opened standalone in Chromium and reflects identical copy to `projects/underundre`.

**Acceptance Scenarios**:
1. **Given** environment variables for Umami configured,  
   **When** a user visits,  
   **Then** Umami tracking script is loaded asynchronously without blocking render.
2. **Given** `projects/underundre/preview.html`,  
   **When** rendered in a browser,  
   **Then** its copy matches the updated Version 1 components byte-for-byte.

---

## 3. Technical Requirements

### Functional Requirements

- **FR-001 (Hero Realignment)**:  
  `components/hero-underundre.tsx` MUST be updated:
  - Eyebrow: `3X SALESFORCE CERTIFIED ARCHITECT | ZERO SAAS TAXES | UPWORK ESCROW VERIFIED`
  - H1: `Stop Burning $15k–$40k/Yr on SaaS Seat Taxes and Manual Workarounds.`
  - Subtitle: `We perform a 48-Hour Workaround TCO Audit ($490) using Time-Driven Activity-Based Costing (TDABC). We pinpoint exact manual labor payroll leaks, eliminate redundant subscriptions, and deliver an OpenAPI 3.0 specification with a Docker mock. 100% credited toward implementation.`
  - Primary CTA: `Book 48-Hour TCO Audit ($490) via Upwork Escrow →` (linking to `https://www.upwork.com/direct-contracts`)
  - Secondary CTA: `Explore Grand Slam FOSS Office Stack ↓` (scrolling smoothly to `#stack`)
  - Trust Badges: `Upwork 5% Escrow Protection`, `48-Hour SLA`, `Via Negativa Guarantee`, `100% Code & IP Transfer`, `NACE 62.01 Compliant`.
  - All mentions of unready `shop.underundre.com` and `sign.underundre.com` in Hero MUST be removed or reframed into architecture deliverables.

- **FR-002 (Product Ladder Rebalancing in Pricing)**:  
  `components/sprint-pricing.tsx` MUST present the calibrated ladder:
  - **Product 0 (HERO CARD / FEATURED)**: `Workaround TCO Audit & Architecture Spec` — **$490 Flat** ($350 early-bird for qualified SMBs). SLA: 24–48 hours. Deliverables: TDABC Cost Forensics, Via Negativa verdict, OpenAPI 3.0 spec, PostgreSQL DDL schemas, Docker Compose mock. 100% credited toward Sprint A or B.
  - **Sprint A (FAST CASH / EMERGENCY VALVE)**: `Grand Slam FOSS Office Stack` — **$3,500 setup + $500/mo retainer**. Delivery: 3–5 business days. Stack: Twenty CRM / EspoCRM, Outline, Plane, Chatwoot, Cal.com on Hetzner CPX42 (€82.69/mo) with Docker Memory Fencing and 16GB Swap.
  - **Sprint B (LADDER CONTINUATION / POST-AUDIT)**: `Sovereign Booking & Custom Systems` — **$4,900 flat**. Delivery: 14 calendar days. Explicitly labeled: *"Available upon completion of TCO Audit"*. Explains multi-staff booking architecture, 3 fixed roles, Zod guards, and zero SaaS seat fees.

- **FR-003 (Lead Capture Route & Fix)**:  
  `components/cta-underundre.tsx` MUST be fixed:
  - Replace the dead `e.preventDefault(); setSubmitted(true)` stub.
  - Create a lightweight API route `app/api/lead/route.ts` that validates payload with Zod (`name`, `email`, `company`, `details`, `productInterest`).
  - If a Telegram Bot Token & Chat ID are provided via env (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_ALERT_CHAT_ID`), dispatch an instant lead alert.
  - If env is absent, log cleanly and return `{ success: true, fallback: "upwork" }`, gracefully presenting the direct Upwork Escrow initiation link to the user.

- **FR-004 (Brand & Metadata Decontamination)**:  
  - In `app/layout.tsx`:
    - Remove the hardcoded `"%s | Undrlla"` title template. Replace with dynamic resolver based on `getActiveProjectConfig().title`.
    - Eradicate line 18 description: `"Launch your autonomous marketplace powered by Medusa 2.0 with custom branding..."`.
    - Provide UnderUndre canonical metadata: Title: `UnderUndre — Productized Engineering & Workaround TCO Audit`, Description: `Eliminate $15k–$40k/yr in SaaS seat taxes and manual labor leaks. 48-Hour Workaround TCO Audits, OpenAPI specifications, and self-hosted FOSS systems under NACE 62.01.`
  - In `components/ui/footer.tsx`:
    - Line 20: Change check `config.slug === "undreseller"` to `config.slug === "underundre" || config.slug === "undreseller"`, ensuring the UnderUndre bureau copyright and links render.

- **FR-005 (Favicon & Asset Optimization)**:  
  - In `lib/project-config.ts` and `app/(default)/page.tsx`:
    - Replace reference to `/projects/underundre/icon.svg` (2.8 MB) with `/projects/underundre/favicon.ico`.
    - Verify `undrllanding/public/projects/underundre/favicon.ico` exists and is served with `image/x-icon` mime-type.

- **FR-006 (Navigation & Anchor Repair)**:  
  - In `components/header-nav.tsx`:
    - For `underundre` project, update nav items from dead links (`#how`, `#waitlist`, `/economics`) to:
      `#audit` (Hero/Audit), `#stack` (FOSS Office Stack), `#pricing` (Ladder), `#comparison` (Vs Agencies), `#faq` (FAQ), `#contact` (CTA).
  - In `components/comparison-matrix.tsx`: Add missing `id="comparison"`.
  - In `components/opsec-protocol.tsx`: Add missing `id="opsec"`.
  - In `components/loom-demo-section.tsx`: Ensure `id="audit"` or `id="telemetry"` is bound.

- **FR-007 (Telemetry & Pipeline Section Reframing)**:  
  `components/loom-demo-section.tsx`:
  - Fix typo at line 56: change `"AI AI"` to `"03 / TELEMETRY & TRIAGE"`.
  - Reframe description from "Test our live sandbox app on shop.underundre.com" to "Forensic Architecture & Code Pipeline Proof": highlight OpenAPI 3.0 contracts, PostgreSQL DDL schemas, Docker Memory Fencing, Zod runtime validation, and Dead Letter Queue (DLQ) alerts.

- **FR-008 (Analytics Integration)**:  
  - Integrate Umami self-hosted analytics into `app/layout.tsx`.
  - Read `NEXT_PUBLIC_UMAMI_WEBSITE_ID` and `NEXT_PUBLIC_UMAMI_SRC` (e.g., `https://analytics.underundre.com/script.js`).
  - If variables are not set, omit the script tag cleanly without error.

- **FR-009 (Open Graph & Social Cards)**:  
  - Configure Open Graph (OG) and Twitter card metadata in `lib/project-config.ts` for UnderUndre:
    - `og:title`: `UnderUndre — Stop Burning Runway on SaaS Seat Taxes`
    - `og:description`: `48-Hour Workaround TCO Audits & Grand Slam FOSS Office Stack. 100% Upwork Escrow Protection.`
    - `og:type`: `website`
    - `og:url`: `https://underundre.com`

- **FR-010 (Deterministic `preview.html` Regeneration)**:  
  - Regenerate `projects/underundre/preview.html` to mirror the updated Version 1 copy, pricing, badges, and layout, eliminating stale claims of 0% Upwork fee, Medusa 2.0, or obsolete H1 headlines.

---

### Non-Functional Requirements & Linter Gates

- **NFR-001 (Core Web Vitals & Performance)**:
  - First Contentful Paint (FCP) $\le 1.0$s on standard broadband.
  - Largest Contentful Paint (LCP) $\le 1.5$s.
  - Cumulative Layout Shift (CLS) $= 0$.
  - Elimination of the 2.8 MB SVG icon reduces initial document bundle payload by over 95%.
- **NFR-002 (Responsive & Layout Shift Bounds)**:
  - Mobile viewport compatibility down to 320px width without horizontal scroll (`scrollWidth <= window.innerWidth`).
  - Table in `comparison-matrix.tsx` must maintain responsive horizontal swipe with clear scroll indicators.
- **NFR-003 (Accessibility - WCAG 2.1 AA)**:
  - All text contrast ratios $\ge 4.5:1$ against dark background (remedying `text-purple-300/50` muted elements).
  - All interactive triggers (links, buttons, `<details>` summaries) have accessible focus rings and minimum touch targets of $44 \times 44$ px.
- **NFR-004 (Visual Feedback Loop Gate)**:
  - Before sign-off, verify rendered page using Playwright / browser automation at 375px (mobile) and 1440px (desktop) under `document.fonts.ready`.
  - Visual artifacts must show zero clipped containers, zero text overlapping, and intact padding hierarchy.

---

## 4. Key Entities & System Map

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 UNDRLLANDING MULTI-PROJECT ENGINE (NEXT.JS 15)              │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
              Environment Resolver: NEXT_PUBLIC_PROJECT_NAME
                                      │
                 ┌────────────────────┴────────────────────┐
                 ▼                                         ▼
        [ projects/undrlla ]                    [ projects/underundre ]
     (Medusa Marketplace Lander)               (Productized Engineering Bureau)
                                                           │
                               ┌───────────────────────────┴───────────────────────────┐
                               ▼                                                       ▼
                    [ VERSION 1: ACTIVE NOW ]                               [ VERSION 2: DEFERRED ]
           • Hero: Workaround TCO Audit ($490)                     • Hero: Multi-Staff Booking ($4,900)
           • Sprint A: FOSS Office Stack ($3,500)                  • Fork Line: Custom Dev ($6,800)
           • Contract: Upwork Direct (5%)                          • Contract: DocuSeal (sign.underundre)
           • Proof: OpenAPI / DDL Mock / Architecture              • Proof: Live shop.underundre.com
           • Assets: favicon.ico (<15KB)                           • Payments: Stripe, Stars, Crypto
           • Analytics: Umami self-hosted                          • Acceptance: Anti-Stall Staging
```

---

## 5. Pre-Mortem & Forensic Risk Mitigation Matrix

| Risk Code | Failure Mode | Severity | Mitigation Mechanism |
| :--- | :--- | :--- | :--- |
| **FM-01** | Lead submits form on Friday night, API endpoint is down or unconfigured | **HIGH** | Client-side graceful fallback: form triggers `mailto:` or opens Upwork Direct Contracts modal upon failed API response. Lead is NEVER silently eaten. |
| **FM-02** | Prospect attempts to click `sign.underundre.com` and gets DNS resolution failure | **CRITICAL** | Zero references to `sign.underundre.com` in Version 1. All legal protection references Upwork Direct Contracts (5% fee, zero client fee, escrow backed). |
| **FM-03** | Prospect demands instant $4,900 booking site delivery while core template is frozen | **MEDIUM** | Sprint B is labeled *"Available Upon Audit / Selective Onboarding"* with a 10-sale Demand Gate note, directing initial engagement to the $490 TCO Audit. |
| **FM-04** | Large SVG icon (2.8 MB) delays mobile LCP to >4.5s on 4G cellular networks | **HIGH** | Replacement with static `favicon.ico` (32x32 / 48x48) in metadata configuration. |
| **FM-05** | Shared layout leaks Undrlla keywords, confusing B2B enterprise prospects | **HIGH** | Dedicated project metadata isolation in `app/layout.tsx` and `footer.tsx` ensuring 100% brand separation. |
| **FM-06** | Color contrast violations on muted comparison text fail WCAG audit | **LOW** | Ratchet text color from `text-purple-300/40` to `text-purple-200/80`, passing WCAG 2.1 AA $4.5:1$ threshold. |

---

## 6. Phase 2 Clarifications Log (Integrated Decisions)

1. **Demand Gate & Sprint A**: Softened per founder directive. Public outbound pushes for $6,800+ custom forks remain frozen, but Sprint A ($3,500 setup + $500/mo FOSS Office Stack) is available immediately as an emergency cash-flow valve.
2. **Product 0 Rebranding**: Fully updated to **Workaround TCO Audit ($350–$490 Flat, 24–48h SLA)** with TDABC methodology, Via Negativa assessment, and 100% credit toward implementation.
3. **Icon Migration**: Explicitly pinned to `undrllanding/projects/underundre/public/favicon.ico`.
4. **Deferred Features (Version 2 Boundary)**: Multi-staff booking template (`undreseller`), self-hosted DocuSeal (`sign.underundre.com`), and online payment gateways (Stripe Checkout Feature 005, Telegram Stars, crypto) are isolated from Version 1 claims.
5. **Medusa 2.0 Purge**: All references to Medusa 2.0 removed from UnderUndre layout and metadata.
6. **Analytics Tool of Record**: Umami self-hosted script integration specified with clean environment fallbacks.
7. **Preview Mirror**: `projects/underundre/preview.html` scheduled for full regeneration directly from the validated Next.js component output.
