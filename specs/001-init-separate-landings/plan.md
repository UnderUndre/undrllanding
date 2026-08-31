# Technical Plan: Multi-Project Isolated Landing Engine

**Repository**: `undrllanding` | **Directory**: `specs/001-init-separate-landings`  
**Created**: 2026-08-16 | **Spec**: [`spec.md`](./spec.md)

---

## 1. Executive Summary

This plan details the restructuring of `undrllanding` into a multi-project landing engine:
1. **Isolated Projects Directory (`projects/`)**: Move `undrlla` lander into `projects/undrlla/` and create `projects/undreseller/`.
2. **Project Resolver (`lib/project-config.ts`)**: Implement environment-driven resolver inspecting `process.env.NEXT_PUBLIC_PROJECT_NAME`.
3. **Dynamic Page Renderer (`app/(default)/page.tsx`)**: Update root page layout to render active project components and metadata dynamically.

---

## 2. Technical Context

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS v4 + `@underundre/undesign`
- **Environment Configuration**: `NEXT_PUBLIC_PROJECT_NAME` (`undreseller` | `undrlla`)
- **Deployment**: Vercel / Netlify / Docker

---

## 3. Implementation Phases

### Phase 1: Directory Restructuring & Resolver Implementation
- Create `projects/undrlla/` and migrate existing Medusa lander components.
- Create `projects/undreseller/` directory with `config.ts`.
- Implement `lib/project-config.ts` project resolver.

### Phase 2: Undreseller Landing Components
- Build `HeroUndreseller` component highlighting 14-Day SaaS MVP Factory.
- Build `SprintPricing` component displaying 2 Core SKUs ($3.5k B2B Automation / $4.9k 14-Day SaaS MVP).
- Build `LoomDemoSection` component displaying embedded 90-second Loom teardown.

### Phase 3: Page Integration & Build Verification
- Update `app/(default)/page.tsx` and `app/layout.tsx` to read active project config and metadata.
- Run `pnpm build` under both `NEXT_PUBLIC_PROJECT_NAME=undreseller` and `NEXT_PUBLIC_PROJECT_NAME=undrlla`.
