# Specification Quality Checklist: 004-landing-template-updates

**Feature Directory**: `specs/004-landing-template-updates`
**Date**: 2026-11-02
**Status**: PASSED

## 1. Content & Completeness

- [x] **Clear Problem Statement**: 4 gap classes from post-implementation review (icon pipeline, logo chrome coupling, citation integrity, unproven template) with evidence from session 2026-11-02.
- [x] **Prioritized User Stories**: 4 stories (P1–P4), independently testable.
- [x] **Acceptance Scenarios**: Given-When-Then for every story.
- [x] **Functional Requirements**: FR-001..FR-011.
- [x] **Non-Functional Requirements**: NFR-001..003 (typecheck, asset budgets, additive compatibility).

## 2. Architectural Boundaries

- [x] **Delta scope**: explicitly does not re-state 003 FR-001..FR-011; extends ProjectConfig and LocalizedText additively.
- [x] **Asset source-of-truth**: single location `public/projects/<slug>/` (owner decision 2026-11-02; no build-time copy step).
- [x] **Locale extension**: additive `{ru,en,uk?}` with en-fallback; ru/en baseline byte-identical (SC-005).

## 3. Clarification Log

| # | Question | Resolution |
|---|----------|------------|
| Q1 | Pilot second brand in scope? | Yes — real brand `undreading` (business plan v2.5), not a throwaway |
| Q2 | Icon asset source-of-truth | `public/projects/<slug>/` (served tree), no copy step |
| Q3 | Citation format | «§ N (Principle Name)» — number plus principle title |
| Q4 | `.ico` fallback for legacy browsers | No — PNG-only (SVG+PNG coverage accepted) |
| Q5 | Session fixes (logo.tsx, faviconUrl, § 1) | Counted as implemented; spec formalizes acceptance/tests |
| Q6 | Third locale for undreading (RU/EN/UK) | Extend `LocalizedText` to `{ru,en,uk?}` with en-fallback |

## 4. Dependencies & Gates

- **Prerequisite**: `undreading-business-plan.md` v2.5 exists (verified: `undreplans/docs/projects/undreading/`) — brand copy, pricing grid (PWYW / KDP / DTC), and positioning source from it.
- **Commercial delta**: new brand onboarding via template → flagged for business-plan owner (undreseller plan v20.x changelog), same pattern as 003 drift note.
