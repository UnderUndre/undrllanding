# Specification Quality Checklist: 009-static-conversion-layer

**Feature Directory**: `specs/009-static-conversion-layer`
**Date**: 2026-11-14
**Status**: PASSED (Phase 1; Phase 2 clarify questions pending)

## 1. Content & Completeness

- [x] **Clear Problem Statement**: three conversion gaps from market research 2026-11-14 (methodology not public as artifact, one-size-fits-all hero, no compliant demand capture during Prix Pascal silence).
- [x] **Prioritized User Stories**: 3 stories (P1 prompt library, P2 persona variants, P3 waitlist) with independent tests and Given-When-Then scenarios.
- [x] **Acceptance Scenarios**: defined for every story including cross-feature composition (persona + referral + calculator telemetry).
- [x] **Functional Requirements**: FR-001..FR-011.
- [x] **Non-Functional Requirements**: NFR-001..005 (typecheck, ≤10 KB gz bundle budget, zero runtime AI, Gate V3 byte-identity default, Gate V7).

## 2. Architectural Boundaries

- [x] **Zero runtime AI**: prompts are human-authored static artifacts; persona variants are URL-switched copy; no chatbot, no LLM calls — the entire spec is ○ Static.
- [x] **Brand isolation both directions**: `/prompts` bureau-only (404 elsewhere), `/waitlist` undreading-only (404 on underundre) — first undreading-specific feature, validating the multi-brand engine.
- [x] **Guessing Ban clean**: no monetary figures asserted by the site anywhere in this spec.
- [x] **Existing pipes reused**: `/api/lead` + bounded metadata map (≤20 keys), localStorage contour from 007, Gate V3 baseline contract from 004, Gate pattern from 005–008.

## 3. Phase 1 [NEEDS CLARIFICATION] items (→ Phase 2)

1. Prompt pack gating: fully open page + copy buttons + static `.md` download (recommended), or email-gated pack?
2. Persona set: 3 variants matching the existing intake-form roles (owner / ops_lead / manager→cto) — confirm or extend?
3. Waitlist mechanics: email → existing Telegram dispatch + private ledger (recommended), or full double-opt-in confirmation flow?

## 4. Dependencies

- 005: `/api/lead` bounded metadata + rate limiting.
- 006: metadata/JSON-LD spine for new routes.
- 007: `?ref=` attribution composes with `?persona=`.
- 008: calculator telemetry composes within ≤20-key bound; Gate pattern extended as V7.
- Business plan: underundre v20.3 (Product 0 floor respected), undreading v2.8 (book launch context, Prix Pascal silence) — **Business plan: unchanged** (no new SKU, no price delta; waitlist is demand capture for an existing product).
