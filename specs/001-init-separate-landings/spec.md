# Feature Specification: Multi-Project Isolated Landing Engine

**Feature Directory**: `specs/001-init-separate-landings`  
**Repository**: `undrllanding`  
**Created**: 2026-07-19  
**Updated**: 2026-08-16 (Refactored to Multi-Project Isolated Landing Engine)  
**Status**: Active  
**Input**: Multi-project landing architecture for `undrlla` (Medusa storefront marketplace) and `undreseller` (Productized Engineering B2B bureau with 2-SKU pricing $3.5k/$4.9k).

---

## 1. Executive Context & Objectives

`undrllanding` is a single Next.js 15 repository designed to serve multiple distinct brand landers (`undrlla.com`, `undreseller.com`, etc.) without duplicating Next.js infrastructure, Tailwind configurations, or routing setups.

### Core Architectural Goals:
1. **Isolated Project Layouts (`projects/[project-name]`)**:
   - Each brand landing page is encapsulated inside its own folder under `projects/` (e.g., `projects/undrlla/`, `projects/undreseller/`).
   - Contains project-specific metadata, components (Hero, Features, Pricing, CTA), assets, and color tokens.
2. **Environment & Host Resolver (`lib/project-config.ts`)**:
   - Inspects `process.env.NEXT_PUBLIC_PROJECT_NAME` (or hostname headers in SSR) to select the active project configuration at build/request time.
   - Falls back gracefully to `undrlla` if `NEXT_PUBLIC_PROJECT_NAME` is unset or invalid.
3. **Zero Cross-Contamination**:
   - Styling and components of `undreseller` (B2B Engineering Conveyor) must not leak into `undrlla` (Medusa Marketplace) or vice versa.

---

## 2. User Scenarios & Testing

### User Story 1 - Undreseller B2B Agency Landing Page (Priority: P1)

As a LinkedIn Lead or Visitor accessing `undreseller.com`,  
I want to view a high-converting Productized Engineering landing page,  
So that I can watch the 90-second Loom demonstration, understand the 2 core SKUs ($3,500 B2B Automation / $4,900 14-Day SaaS MVP), and initiate an Upwork Escrow project booking.

**Why this priority**: Core revenue-generating lander for Undreseller cold outbound and Loom video teardowns.

**Independent Test**:  
Run `NEXT_PUBLIC_PROJECT_NAME=undreseller pnpm dev` in `undrllanding`. Access `http://localhost:3000`. Verify that the HeroUndreseller, 2-SKU Sprint Pricing, Loom showcase, and Upwork Escrow safety badges are rendered.

**Acceptance Scenarios**:
1. **Given** `NEXT_PUBLIC_PROJECT_NAME=undreseller`,  
   **When** accessing root route `/`,  
   **Then** `undreseller` metadata, Hero, 14-Day Sprint features, $3.5k/$4.9k pricing cards, and Upwork Escrow safety badges are rendered.

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
  - Hero section highlighting "14-Day SaaS MVP Factory & B2B Automation Conveyor"
  - 90-second Loom video showcase section (`video.undreseller.com`)
  - 2 Core SKU Pricing cards ($3,500 setup + $500/mo Retainer / $4,900 flat 14-Day SaaS MVP)
  - Upwork Direct Contracts Escrow (0% fee) and 7-Day SLA badges
- **FR-006**: Build verification MUST succeed (`pnpm build`) for both `NEXT_PUBLIC_PROJECT_NAME=undreseller` and `NEXT_PUBLIC_PROJECT_NAME=undrlla`.

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
│           ├── sprint-pricing.tsx
│           └── loom-demo-section.tsx
├── lib/
│   └── project-config.ts               # Project Resolver
└── app/(default)/page.tsx              # Root Route Renderer
```

---

## 5. Success Criteria

- **SC-001**: `undrllanding` builds cleanly (`pnpm build`) under both `NEXT_PUBLIC_PROJECT_NAME=undreseller` and `NEXT_PUBLIC_PROJECT_NAME=undrlla` with zero TypeScript or hydration errors.
- **SC-002**: Switching `NEXT_PUBLIC_PROJECT_NAME` completely swaps metadata, Hero, features, pricing, and CTAs without leftover styles from other projects.
- **SC-003**: Root page load time is **< 1.0 second** on Vercel Edge / Netlify deployments.
