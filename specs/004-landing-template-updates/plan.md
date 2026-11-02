# Implementation Plan: 004-landing-template-updates

**Branch**: `feature/004-landing-template-updates` | **Date**: 2026-11-02 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `undrllanding/specs/004-landing-template-updates/spec.md`
**Requirements Audit**: PASS (`requirements-audit.md`, tag `requirements-audit/004-landing-template-updates/v1`)

## Summary

Incremental hardening of the multi-brand landing engine: config-driven lightweight favicon/apple-icon pipeline with MIME-correct icon route (US1), theme-chrome-free header logo (US2), manifesto citation integrity with public §1–§7 anchors (US3), and template validation by scaffolding the real `undreading` brand with an optional third locale `uk` (US4). Status: US1–US3 already implemented in working tree (session 2026-11-02, accepted as implementation baseline); US4 is new work.

## Technical Context

**Language/Version**: TypeScript 5.x (strict), Next.js 15 (App Router), React 19
**Primary Dependencies**: Tailwind CSS v4, Zod (003 content schemas), PIL/python (asset generation, tooling only)
**Storage**: N/A (static assets + JSON data files; no DB)
**Testing**: `npm run validate` (tsc --noEmit); grep-based CI verify script (new, see contracts/); byte-diff HTML baseline comparison
**Target Platform**: Vercel/static Node host; browsers (modern — SVG+PNG favicon coverage, no .ico legacy target per clarify Q4)
**Project Type**: web (multi-brand landing engine)
**Performance Goals**: favicon transfer ≤ 10 KB; apple icon ≤ 60 KB; LCP ≤ 1.5 s (003 NFR-002, no regression)
**Constraints**: additive-only config contract (NFR-003); ru/en HTML output for `underundre` byte-identical to pre-change baseline (SC-005); asset source-of-truth = `public/projects/<slug>/` (FR-008)
**Security Surface & STRIDE Triggers**: N/A (client assets + copy; icon route path remains config-derived, not user-input-derived)
**Database Migration Trigger**: N/A (no DB changes)
**Supply Chain & Licensing**: no new runtime dependencies; GNU GPL-3.0 unchanged
**Research Spikes & Disposal**: none required (all unknowns resolved in clarify; see research.md)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Source of Truth Discipline | PASS | No `.claude/`/generated-tree edits; brand copy source = business plan v2.5 |
| II. Transformer, Not Fork | N/A | clai-helpers pipeline untouched |
| III. Protected Slots | N/A | No managed-file overrides |
| IV. SemVer 0.x | PASS | No version bump in this feature (landing repo, not clai CLI) |
| V. Token Economy | PASS | Artifacts kept lean |
| VI. Cross-AI Review Gate (NON-NEGOTIABLE) | PENDING | `/speckit.implement` blocked until `analyze.md` PASS + ≥2 external reviewer PASS in `specs/004-landing-template-updates/reviews/` |
| VII. Artifact Versioning | PASS | Tags: `spec/v1`, `clarify/v1`, `requirements-audit/v1` (manual — snapshot script lacks this stage in ValidateSet); plan/tasks tags to follow |
| IX. Two-Phase Review Flow | PASS | Planning on `feature/004-landing-template-updates`; implementation tasks land on same branch (small feature, carve-out not warranted) |

**Post-design re-check**: PASS — no principle violated by the design below.

## Project Structure

### Documentation (this feature)

```text
specs/004-landing-template-updates/
├── spec.md                  # clarified (Q1–Q6 integrated)
├── checklists/requirements.md
├── requirements-audit.md    # PASS
├── qa/preliminary-rtm.md
├── plan.md                  # this file
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── verify-gates.md      # CI verify contract (grep + byte-diff + size budgets)
└── tasks.md                 # Phase 2
```

### Source Code (repository root, undrllanding/)

```text
lib/project-config.ts                       # MODIFY: faviconUrl/appleIconUrl (done), uk locale type (FR-010)
projects/underundre/brand.ts                # MODIFY: icon fields (done)
projects/undreading/                        # NEW: pilot brand (FR-011)
  ├── brand.ts
  ├── data/{copy,pricing,faq,legal,manifest}.json
  ├── components/ (only if brand-specific)
  └── locales.ts → replaced by data/copy.*.json per FR-011 + 003 FR-004
public/projects/undreading/                  # NEW: icon set (icon.svg, icon-48.png, apple-icon-180.png)
app/layout.tsx                              # MODIFY: icons metadata (done), uk locale wiring
app/icon.svg/route.ts                       # MODIFY: MIME map (done), rename → app/icon/route.ts (cosmetic, optional)
components/ui/logo.tsx                      # MODIFY: chrome-free (done, locked by test)
lib/i18n.ts                                 # MODIFY: uk fallback → en
components/... (shared sections)            # MODIFY: accept LocalizedText uk
scripts/create-project.mjs                  # MODIFY: template emits icon set per FR-003/FR-004 into public/projects/<slug>/
projects/_template/                          # MODIFY: assets location per FR-008 (audit requirement)
scripts/verify-gates.mjs                    # NEW: CI verify (contracts/verify-gates.md)
```

## Phase 0 → research.md

No open NEEDS CLARIFICATION remain (Q1–Q6 resolved). research.md records decisions + rationale only.

## Phase 1 Design Decisions

1. **Locale model (FR-010)**: `LocalizedText = { ru: string; en: string; uk?: string }`. Fallback `uk → en` applied in one helper (`pick()` / i18n resolver), not per-component. Rationale: single choke point, testable, byte-identical when `uk` absent.
2. **Icon route rename**: `app/icon.svg/route.ts` → `app/icon/route.ts` (route no longer extension-specific). Serving behavior unchanged; catches the FR-002 MIME map.
3. **Verify gates (FR-006/007/008/010, NFR-003)**: single `scripts/verify-gates.mjs` — grep scans (public build output: internal revisions = 0; asset duplicates = 0), size budgets (favicon ≤ 10 KB, apple ≤ 60 KB), byte-diff of ru/en `underundre` HTML against a stored baseline snapshot. Wired as `npm run verify` and run in CI before deploy.
4. **Undreading scaffold (FR-011)**: `pnpm project:create --slug=undreading --name=Undreading`, then fill copy/pricing/faq/legal from business plan v2.5; `uk` locale included as the pilot of FR-010. Pricing grid = PWYW (Paddle), Amazon KDP EN/UK, Lulu DTC RU — external links, no new API surface.
5. **Template fix**: `projects/_template/` emits `public/projects/<slug>/` assets (audit §2 requirement); `create-project.mjs` updated accordingly.

## Deployment Readiness

- `npm run validate && npm run build && npm run verify` must all pass.
- Baseline snapshot: commit `underundre` ru/en HTML output before FR-010 changes (task T1).
