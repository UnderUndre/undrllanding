---
description: "Task list for 002-underundre-landing-v1 with agent routing, dependency graph and parallel lanes"
---

# Tasks: UnderUndre Landing Realignment v1

**Input**: Design documents from `specs/002-underundre-landing-v1/`  
**Prerequisites**: `spec.md`, `requirements-audit.md`, `research.md`, `data-model.md`, `contracts/lead-api.ts`, `plan.md`  
**Target Repository**: `undrllanding`  
**Branch**: `002-underundre-landing-v1`

---

## Agent Tags Summary

| Tag | Specialist Agent | Domain & Scope |
| :--- | :--- | :--- |
| `[SETUP]` | orchestrator | Dependency validation, configuration scaffolding |
| `[BE]` | `backend-specialist` | Next.js API Route Handlers, Zod schemas, webhook forwarders |
| `[FE]` | `frontend-specialist` | React components, Tailwind styling, accessibility, copy |
| `[OPS]` | `devops-engineer` | Next.js layout, asset optimizations, analytics, build gates |
| `[QA]` | `test-engineer` | Contract verification, responsive layout checks, visual review |

---

## Task List

### Phase 1: Setup & Shared Contracts

- [ ] **T-001** `[SETUP]` Verify dependencies and import paths for `specs/002-underundre-landing-v1/contracts/lead-api.ts`.
- [ ] **T-002** `[OPS]` Verify `public/projects/underundre/favicon.ico` exists and configure icon path in `lib/project-config.ts` and `app/(default)/page.tsx`.

---

### Phase 2: Inbound Lead Capture & Zero Lead Loss Protocol (User Story 2 — Priority: P1)

- [ ] **T-003** `[BE]` `[US2]` Implement Next.js 15 Route Handler `app/api/lead/route.ts` with `LeadSubmissionSchema` Zod validation.
- [ ] **T-004** `[BE]` `[US2]` Implement Telegram Bot alert dispatcher with 4000ms timeout and graceful fallback payload (`{ fallback: "upwork" }`) in `app/api/lead/route.ts`.
- [ ] **T-005** `[FE]` `[US2]` Refactor `projects/underundre/components/cta-underundre.tsx` to execute real `POST /api/lead`, with pending state, error validation, and a client-side mailto/Upwork fallback modal on failure.

---

### Phase 3: Core Value Proposition & Hero Realignment (User Story 1 — Priority: P1)

- [ ] **T-006** `[FE]` `[US1]` Update `projects/underundre/components/hero-underundre.tsx` with Loss-Framing H1, TDABC eyebrow, and TCO Audit $490 value proposition.
- [ ] **T-007** `[FE]` `[US1]` Realign Hero CTAs: Primary button to Upwork Direct Contracts ($490 Escrow), Secondary button scrolling smoothly to `#stack`; remove broken links to `shop.underundre.com` and `sign.underundre.com`.
- [ ] **T-008** `[FE]` `[US1]` Rebalance `projects/underundre/components/sprint-pricing.tsx`: make Card 0 the featured `Workaround TCO Audit ($490 Flat / 24–48h SLA)` with 100% credit toward implementation.

---

### Phase 4: Emergency Liquidity & Telemetry Reframing (User Story 3 — Priority: P2)

- [ ] **T-009** `[FE]` `[US3]` Realign Card 1 in `projects/underundre/components/sprint-pricing.tsx` for `Grand Slam FOSS Office Stack ($3,500 setup + $500/mo retainer)` with explicit Docker Memory Fencing details.
- [ ] **T-010** `[FE]` `[US3]` Fix typo in `projects/underundre/components/loom-demo-section.tsx:56` (`"AI AI"` $\to$ `"03 / TELEMETRY & TRIAGE"`) and reframe copy from booking sandbox to Architecture Spec & DDL mock.
- [ ] **T-011** `[FE]` `[US3]` Add `id="opsec"` to `projects/underundre/components/opsec-protocol.tsx` and isolate Upwork Escrow guarantees from un-deployed DocuSeal domains.

---

### Phase 5: Brand Hygiene, Contrast & Navigation Integrity (User Story 4 — Priority: P2)

- [ ] **T-012** `[FE]` `[US4]` Purge legacy Medusa 2.0 copy from `app/layout.tsx:18` and replace title template with dynamic project resolver, eliminating leaked `| Undrlla`.
- [ ] **T-013** `[FE]` `[US4]` Fix slug evaluation bug in `components/ui/footer.tsx:20` to render UnderUndre bureau copyright and links.
- [ ] **T-014** `[FE]` `[US4]` Rebuild navigation links in `components/header-nav.tsx` for `underundre` (`#audit`, `#pricing`, `#comparison`, `#faq`, `#contact`).
- [ ] **T-015** `[FE]` `[US4]` Add `id="comparison"` to `projects/underundre/components/comparison-matrix.tsx` and ratchet muted text contrast from `text-purple-300/40` to `text-purple-200/80` (WCAG 2.1 AA compliant).

---

### Phase 6: Analytics & Deterministic Static Mirror (User Story 5 — Priority: P3)

- [ ] **T-016** `[OPS]` `[US5]` Inject conditional Umami analytics script into `app/layout.tsx` using Next.js `<Script>` component.
- [ ] **T-017** `[FE]` `[US5]` Add Open Graph and Twitter Card social metadata to `lib/project-config.ts` for LinkedIn/email outbound previews.
- [ ] **T-018** `[FE]` `[US5]` Regenerate `projects/underundre/preview.html` to mirror the updated components byte-for-byte.

---

### Phase 7: Verification & Visual Feedback Gate

- [ ] **T-019** `[QA]` Execute automated cURL contract tests against `/api/lead` verifying valid submissions, Zod error rejections, and fallback behavior.
- [ ] **T-020** `[QA]` Execute Closed-Loop Visual Feedback Pass at 375px (iPhone DPR=3) and 1440px (Desktop) under `await document.fonts.ready`, verifying zero horizontal overflow (`scrollWidth <= innerWidth`).
- [ ] **T-021** `[OPS]` Execute production build (`pnpm build`) verifying zero TypeScript errors, valid metadata generation, and zero bundle regressions.

---

## Dependency Graph & Parallel Execution Lanes

```
                    ┌─────────────────┐
                    │  T-001 / T-002  │
                    │  (Setup & Asset)│
                    └────────┬────────┘
                             │
     ┌───────────────────────┼───────────────────────┐
     ▼                       ▼                       ▼
  [ LANE A: BE & LEAD ]   [ LANE B: HERO & COPY ]   [ LANE C: BRAND & NAV ]
     T-003 (Lead Route)      T-006 (Hero Copy)       T-012 (Metadata Purge)
     T-004 (Telegram Alert)  T-007 (Hero CTA)        T-013 (Footer Slug)
     T-005 (CTA Form UI)     T-008 (Pricing Cards)   T-014 (Nav Anchors)
                             T-009 (FOSS Stack)      T-015 (Contrast & ID)
                             T-010 (Telemetry Typo)
                             T-011 (OpSec Anchor)
     │                       │                       │
     └───────────────────────┼───────────────────────┘
                             │
                             ▼
                  [ LANE D: ANALYTICS & MIRROR ]
                     T-016 (Umami Analytics)
                     T-017 (OG Social Cards)
                     T-018 (Preview.html Sync)
                             │
                             ▼
                  [ LANE E: VERIFICATION GATE ]
                     T-019 (API Contract QA)
                     T-020 (Visual Feedback Pass)
                     T-021 (Production Build)
```

---

## Agent Dispatch Plan

| Agent | Tasks | Key Skills | Input Context | Target Files |
| :--- | :--- | :--- | :--- | :--- |
| `backend-specialist` | T-003, T-004 | Next.js Route Handlers, Zod, fetch | `contracts/lead-api.ts`, `research.md` §1 | `app/api/lead/route.ts` |
| `frontend-specialist` | T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-017, T-018 | React 19, Tailwind v4, WCAG AA, Copy | `spec.md` §3, `data-model.md`, `research.md` §3–4 | `projects/underundre/components/*`, `components/*`, `app/layout.tsx`, `preview.html` |
| `devops-engineer` | T-002, T-016, T-021 | Next.js build, Asset Optimization, Lighthouse | `quickstart.md`, `research.md` §2, §5 | `lib/project-config.ts`, `app/layout.tsx`, `package.json` |
| `test-engineer` | T-019, T-020 | cURL, Playwright, Accessibility Linter | `qa/preliminary-rtm.md`, `spec.md` NFR-001–004 | Test scripts, browser screenshots, terminal logs |

---

## Critical Path & Suggested MVP Scope

- **Critical Path**: `T-001` $\to$ `T-003` $\to$ `T-005` $\to$ `T-006` $\to$ `T-008` $\to$ `T-012` $\to$ `T-020` $\to$ `T-021`.
- **MVP Cut (Immediate Emergency Fix)**:
  - If pressed for time: `T-003` + `T-005` (fix silent lead loss) and `T-006` + `T-007` (fix unready booking promises in Hero) and `T-002` (drop 2.8 MB SVG).
