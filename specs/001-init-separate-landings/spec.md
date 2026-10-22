# Feature Specification: Multi-Project Isolated Landing Engine

**Feature Directory**: `specs/001-init-separate-landings`  
**Repository**: `undrllanding`  
**Created**: 2026-07-19  
**Updated**: 2026-10-19 (Aligned with UnderUndre Business Plan v18.3 & Sovereign Commerce Engine routing)  
**Status**: Active  
**Commercial Source of Truth**: `undreplans/docs/projects/undreseller/undreseller-business-plan.md` **v18.3**  
**Input**: Multi-project landing architecture for `undrlla` (Medusa storefront marketplace) and `undreseller` (Productized Engineering B2B bureau with 3-tier product ladder: $350 Tripwire, $3,500 FOSS Office Stack, $4,900 14-Day SaaS MVP).

---

## 1. Executive Context & Objectives

`undrllanding` is a single Next.js 15 repository designed to serve multiple distinct brand landers (`underundre.com`, `undreseller.com`, `undrlla.com`, etc.) without duplicating Next.js infrastructure, Tailwind configurations, or routing setups.

### Core Architectural Goals:
1. **Isolated Project Layouts (`projects/[project-name]`)**:
   - Each brand landing page is encapsulated inside its own folder under `projects/` (e.g., `projects/undrlla/`, `projects/undreseller/`).
   - Contains project-specific metadata, components (Hero, Features, Pricing, CTA), assets, and color tokens.
2. **Environment & Host Resolver (`lib/project-config.ts`)**:
   - Inspects `process.env.NEXT_PUBLIC_PROJECT_NAME` (or hostname headers in SSR) to select the active project configuration at build/request time.
   - Falls back gracefully to `undrlla` if `NEXT_PUBLIC_PROJECT_NAME` is unset or invalid.
3. **Zero Cross-Contamination**:
   - Styling and components of `undreseller` (B2B Engineering Conveyor) must not leak into `undrlla` (Medusa Marketplace) or vice versa.
4. **Clean Handoff to Transactional Engine (`undreseller`)**:
   - Marketing landers in `undrllanding` warm up and qualify leads, then seamlessly route them to the transactional engine (`undreseller`) for live slot scheduling, instant demo exploration, and checkout.

---

## 2. User Scenarios & Testing

### User Story 1 - Undreseller B2B Agency Landing Page (Priority: P1)

As a qualified B2B lead, SMB founder, or visitor accessing `underundre.com` / `undreseller.com`,  
I want to view a high-converting Productized Engineering landing page,  
So that I can watch the 90-second Loom demonstration, understand the 3-tier product ladder (Product 0 Tripwire $350, Sprint A FOSS Stack $3,500, Sprint B SaaS MVP $4,900), book a live 1-on-1 audit slot in `undreseller`, or initiate an escrow-protected project via Upwork Direct Contracts (5%) or DocuSeal.

**Why this priority**: Core revenue-generating lander for UnderUndre outbound funnel, LinkedIn DMs, and Loom video teardowns.

**Independent Test**:  
Run `NEXT_PUBLIC_PROJECT_NAME=undreseller pnpm dev` in `undrllanding`. Access `http://localhost:3000`. Verify that `HeroUndreseller`, 3-tier pricing (Tripwire $350 / Sprint A $3.5k / Sprint B $4.9k), Loom showcase, Upwork Escrow (5%) badges, and live demo links to `demo.undreseller.com` render cleanly.

**Acceptance Scenarios**:
1. **Given** `NEXT_PUBLIC_PROJECT_NAME=undreseller`,  
   **When** accessing root route `/`,  
   **Then** `undreseller` metadata, Hero, 3-tier pricing cards, and live links to `undreseller` (`demo.undreseller.com`) are rendered.

---

### User Story 2 - Undrlla Medusa Storefront Landing Page (Priority: P1)

As a Store Visitor accessing `undrlla.com`,  
I want to view the Medusa 2.0 marketplace storefront lander,  
So that I can browse branded stores, preview cart checkout, and access crypto/fiat payment options.

**Why this priority**: Preserves flagship `undrlla` e-commerce lander capabilities within the same codebase.

**Independent Test**:  
Run `NEXT_PUBLIC_PROJECT_NAME=undrlla pnpm dev` in `undrllanding`. Access `http://localhost:3000`. Verify that `HeroUndrlla`, `MarketplacePreviewDemo`, `ShopifyStyleFeatures`, and Medusa store previews render cleanly.

**Acceptance Scenarios**:
1. **Given** `NEXT_PUBLIC_PROJECT_NAME=undrlla` (or default fallback),  
   **When** accessing root route `/`,  
   **Then** `undrlla` metadata, Medusa 2.0 features, and marketplace preview sections are rendered.

---

## 3. Technical Requirements

### Functional Requirements

- **FR-001**: `undrllanding` MUST maintain project landers in subdirectories under `projects/`:
  - `projects/undrlla/` (Medusa Storefront Lander)
  - `projects/undreseller/` (Productized Engineering Lander)
- **FR-002**: `lib/project-config.ts` MUST export `getActiveProject()` which reads `process.env.NEXT_PUBLIC_PROJECT_NAME`.
- **FR-003**: `app/(default)/page.tsx` MUST dynamically render the layout and components provided by `getActiveProject()`.
- **FR-004**: Each project config MUST supply: `slug`, `title`, `description`, `heroComponent`, `featuresComponent`, `pricingComponent`, `ctaComponent`, and `metadata`.
- **FR-005**: `undreseller` landing page MUST feature:
  - Hero section highlighting "14-Day SaaS MVP Factory & B2B Automation Conveyor" with 3x Salesforce Certified Developer authority hook.
  - 90-second Loom video showcase section (`video.undreseller.com` or live embed).
  - **3-Tier Product Ladder Pricing Cards**:
    - **Product 0 (Tripwire Specification & Audit)**: $350–$490 flat, 24–48h SLA (OpenAPI 3.0 + Supabase DDL + Docker Mock).
    - **Sprint A (B2B Operations & FOSS Office Stack)**: $3,500 setup + $500/mo retainer on Hetzner CPX42 with 16GB NVMe Swap and Docker Memory Fencing (Twenty CRM, Outline, Plane, Chatwoot, Cal.com).
    - **Sprint B (14-Day SaaS MVP Factory - HERO)**: $4,900 flat fee, 14 calendar days, Next.js 15 + Supabase + Trigger.dev v3 / Inngest (n8n strictly excluded from SaaS MVP to eliminate SUL liability).
  - Upwork Direct Contracts Escrow (5% fee vs 10% marketplace) and self-hosted DocuSeal (`sign.underundre.com`).
- **FR-006**: Build verification MUST succeed (`pnpm build`) for both `NEXT_PUBLIC_PROJECT_NAME=undreseller` and `NEXT_PUBLIC_PROJECT_NAME=undrlla`.
- **FR-007 (Transactional App Cross-Linking)**:
  - Primary Sandbox CTA MUST link to the live transactional application (`https://demo.undreseller.com` or `https://shop.underundre.com`).
  - Tripwire booking CTA MUST link directly to the slot scheduling engine (`https://demo.undreseller.com/book?itemId=sovereign-architecture-audit`).
  - Telegram integration CTA MUST link to the live Telegram Mini App (`https://t.me/UnderUndreBot/app`).
- **FR-008 (Docker Network & Traefik Routing Gateway)**:
  - `undrllanding` and `undreseller` MUST run as isolated Docker containers within a shared `web_gateway` bridge network.
  - Traefik v3 routes HTTP/HTTPS traffic by `Host` header:
    - `underundre.com` / `undreseller.com` $\to$ `undrllanding:3000`
    - `demo.undreseller.com` / `shop.underundre.com` $\to$ `undreseller:3000`
  - Internal container ports (3000) MUST NOT be bound to host `0.0.0.0` directly.

---

## 4. Key Entities & Project Architecture

```
undrllanding/
├── projects/
│   ├── undrlla/                        # Project A: Medusa Marketplace
│   │   ├── config.ts
│   │   └── components/
│   └── undreseller/                    # Project B: Productized Engineering
│       ├── config.ts
│       └── components/
│           ├── hero-undreseller.tsx
│           ├── sprint-pricing.tsx      # 3-Tier Ladder: Tripwire ($350), FOSS ($3.5k), MVP ($4.9k)
│           ├── loom-demo-section.tsx
│           ├── opsec-protocol.tsx
│           ├── comparison-matrix.tsx
│           ├── vibe-coding-warning.tsx
│           ├── faq-section.tsx
│           └── cta-undreseller.tsx
├── lib/
│   └── project-config.ts               # Project Resolver
├── Dockerfile                          # Next.js 15 Standalone Container
└── app/(default)/page.tsx              # Root Route Renderer
```

---

## 5. Success Criteria

- **SC-001**: `undrllanding` builds cleanly (`pnpm build`) under both `NEXT_PUBLIC_PROJECT_NAME=undreseller` and `NEXT_PUBLIC_PROJECT_NAME=undrlla` with zero TypeScript or hydration errors.
- **SC-002**: Switching `NEXT_PUBLIC_PROJECT_NAME` completely swaps metadata, Hero, features, pricing, and CTAs without leftover styles from other projects.
- **SC-003**: Root page load time is **< 1.0 second** on Vercel Edge / Hetzner CPX42 deployments.
- **SC-004**: Traefik v3 reverse proxy correctly routes domain names to respective containers in the shared `web_gateway` Docker network without port collisions.
