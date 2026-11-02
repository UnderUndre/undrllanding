# Research: 004-landing-template-updates

**Date**: 2026-11-02
**Status**: Complete — no open NEEDS CLARIFICATION (all resolved during clarify Q1–Q6, see checklists/requirements.md §3)

## R-01: Favicon format strategy

**Decision**: PNG-only (SVG + PNG), no `.ico` fallback.
**Rationale**: modern browsers (Chrome/Edge/Firefox/Safari ≥ 12+) resolve SVG and PNG favicons via `<link rel="icon">`; the landing has no IE/legacy-Safari target. Saves a multi-size ICO build step. Owner decision Q4.
**Alternatives rejected**: multi-size `favicon.ico` (16/32/48) — extra asset + build step for a non-target audience.

## R-02: Icon asset source-of-truth

**Decision**: `public/projects/<slug>/` (the served tree), single location, no build-time copy step.
**Rationale**: Next.js serves root `public/` directly; brand.ts + preview generator already reference this tree. A `projects/<slug>/public/` + copy step adds a build stage for zero benefit at current scale (2 brands). Owner decision Q2.
**Consequence**: `projects/_template/` and `scripts/create-project.mjs` must emit assets into `public/projects/<slug>/` (audit §2 cross-doc requirement).
**Alternatives rejected**: `projects/<slug>/public/` + copy script — architecturally cleaner but unjustified for N=2 brands; revisit if asset generation becomes part of brand builds.

## R-03: Third locale modeling

**Decision**: extend `LocalizedText` to `{ ru: string; en: string; uk?: string }`, fallback `uk → en` in a single resolver.
**Rationale**: undreading is trilingual (business plan v2.5: RU/EN/UK); making `uk` optional keeps `underundre` (bilingual) additive-compatible without touching its data. Owner decision Q6.
**Alternatives rejected**: (a) full schema-driven locale set per brand — mini-epic, deferred; (b) pilot without uk — fails the trilingual requirement that motivated the pilot.

## R-04: Pilot brand choice

**Decision**: real brand `undreading` (owner decision Q1), copy sourced from `undreplans/docs/projects/undreading/undreading-business-plan.md` v2.5.
**Rationale**: a throwaway pilot validates the scaffold but not real-content fit (long-form book copy, pricing grid, manifest). Real brand turns the pilot into launch work.
**Prerequisite verified**: business plan v2.5 exists (26.10.2026, trilingual publishing platform, PWYW/KDP/Lulu grid).

## R-05: Citation format

**Decision**: «§ N (Principle Name)» + anchor `/manifest#p-N`. Owner decision Q3.
**Rationale**: reader sees the principle name before clicking; anchor lands on the exact card. Consistent with FR-006/FR-007 of this spec.

## R-06: Already-implemented baseline

**Decision**: US1–US3 changes in working tree (session 2026-11-02) accepted as implementation; plan adds tests/verify gates, not re-implementation. Owner decision Q5.
**Evidence**: `components/ui/logo.tsx`, `lib/project-config.ts`, `projects/underundre/brand.ts`, `app/layout.tsx`, `app/icon.svg/route.ts`, `public/projects/underundre/{icon.svg,icon-48.png,apple-icon-180.png}`, citation strings in locales.

## R-07: No-Code First check (§4.9)

Rejected alternatives for favicon pipeline: real-favicon-generator SaaS (manual step in every brand onboarding — conflicts with `project:create` one-shot goal), `favicons` npm package (new build dependency for a 3-asset static set). Precomputed static assets + scaffold emission is the minimal-machine solution.
