# Implementation Plan: 009-static-conversion-layer

**Branch**: `feature/009-static-conversion-layer` | **Date**: 2026-11-14 | **Spec**: [spec.md](spec.md)
**Requirements Audit**: PASS (`requirements-audit.md`, tag `requirements-audit/009-static-conversion-layer/v1`)

## Summary

Static conversion layer in three independent stories: (1) public SpecKit prompt library `/prompts` with per-card copy + one-file `.md` download (bureau-only), (2) persona-aware hero variants switched by `?persona=owner|ops|cto` with localStorage persistence and `metadata.persona` (bureau-only), (3) trilingual book waitlist `/waitlist` for the undreading brand routed through the existing `/api/lead` → Telegram → private ledger. Zero runtime AI, zero new dependencies, all routes ○ Static.

## Technical Context

**Language/Version**: TypeScript 5.x strict, Next.js 15.1.11 App Router, React 19
**Primary Dependencies**: existing stack (Tailwind v4, Zod) — zero new deps (NFR-003)
**Storage**: localStorage (`undr.persona`); static JSON data files; private markdown ledgers in `undreplans`
**Testing**: `pnpm validate`, `pnpm test` (Vitest), `pnpm verify` (Gates V1–V7)
**Target Platform**: static prerender on VPS; modern browsers
**Performance Goals**: bundle +≤10 KB gz; LCP ≤ 1.5 s; CLS = 0
**Constraints**: default hero byte-identical (Gate V3); brand isolation both directions; ≤20-key metadata bound
**Security Surface**: persona param = UX-only (zero-value spoofing target); waitlist emails private-repo-only; STRIDE per spec §STRIDE (info disclosure handled by private ledgers + grep gates)
**Database Migration Trigger**: N/A

## Constitution Check

| Principle | Status | Notes |
|---|---|---|
| I Source of Truth | PASS | No generated-tree edits |
| IV SemVer 0.x | PASS | No bump |
| V Token Economy | PASS | Modular JSON, no monoliths |
| VI Cross-AI Review Gate | PENDING | analyze PASS + owner `--override-gate "owner approval 2026-11-14"` (external reviews waived by owner, consistent with 007/008 practice) |
| VII Artifact Versioning | PASS | Stage tags per convention |
| IX Two-Phase Flow | PASS | Feature branch pattern |
| XII QA Contour | PASS | Gate V7 extends V1–V6 |
| XV Narrative | PASS | First-person voice in prompts and waitlist copy |

## Project Structure

```text
lib/schemas/prompt-schema.ts              # NEW: PromptPackItem Zod schema
lib/schemas/prompt-loaders.ts             # NEW: loadAllPrompts (dir-based, slug uniqueness)
lib/persona.ts                            # NEW: pure persona resolver + storage helpers
lib/project-config.ts                     # MODIFY: hasPrompts?, personas? (PersonaVariant[])
components/capture/visit-capture.tsx      # MODIFY (referral-capture): + capturePersona()
components/persona/persona-hero.tsx       # NEW: persona-aware hero wrapper
app/(default)/prompts/page.tsx            # NEW: vault index (brand-gated)
app/(default)/prompts/prompts-content.tsx # NEW: client grid + copy buttons
app/prompt-pack.md/route.ts               # NEW: force-static markdown generation from JSON (no drift)
app/(default)/waitlist/page.tsx           # NEW: undreading-only waitlist
app/(default)/waitlist/waitlist-content.tsx # NEW: client form (email + consent → /api/lead)
projects/underundre/data/prompts/*.json   # NEW: 5 prompts (real discovery workflow)
projects/undreading/data/waitlist.json    # NEW: trilingual waitlist copy
projects/underundre/brand.ts              # MODIFY: hasPrompts + personas + footer link
projects/undreading/brand.ts              # MODIFY: footer waitlist link
projects/underundre/components/cta-underundre.tsx # MODIFY: + personaMetadata()
projects/underundre/components/hero-underundre.tsx # MODIFY: persona-aware copy
app/sitemap.ts                            # MODIFY: conditional /prompts (underundre), /waitlist (undreading)
scripts/verify-gates.mjs                  # MODIFY: Gate V7 (V7.1–V7.3)
tests/unit/prompt-schema.test.ts          # NEW
tests/unit/persona.test.ts                # NEW
tests/unit/waitlist-payload.test.ts       # NEW
specs/004-landing-template-updates/qa/baseline/index.html # REFRESH (footer link DOM change)
```

## Phase 1 Design Decisions

1. **DD-1 (Prompt pack without drift)**: FR-002 is implemented as `app/prompt-pack.md/route.ts` with `export const dynamic = "force-static"` — markdown is generated from the same JSON files at build time (prerendered route handler, zero runtime cost). This removes the dual-maintenance risk of a hand-authored static copy. Spec FR-002's intent ("no runtime generation on user click") is preserved: the file is baked at build.
2. **DD-2 (Persona resolution order)**: `resolvePersona(param)` is pure; `capturePersona()` writes localStorage on `?persona=` (last-touch); hero reads localStorage on mount and falls back to direct `location.search` read — immune to effect-ordering between the capture boundary and the hero subtree.
3. **DD-3 (Personas live in brand config)**: `ProjectConfig.personas?: PersonaVariant[]` per FR-005; `brand.ts` is pure data and safe to import client-side; bilingual copy rides the config, not locales.ts (multi-brand IoC preserved).
4. **DD-4 (Waitlist reuses lead trunk)**: no new endpoint — payload `{ email, contact, topic: "undreading-waitlist", message, metadata: { sourceComponent: "waitlist", referral? } }` validated by `GenericLeadSubmissionSchema`; Telegram dispatch and rate limiting inherited from 005.
5. **DD-5 (Gate V3 strategy)**: footer link additions change normalized DOM → baseline refreshed once in tasks; hero default variant is current copy → zero hero-side DOM drift.
6. **DD-6 (Waitlist copy in JSON)**: undreading uses the 003 JSON data layer; `waitlist.json` carries trilingual copy (`uk` strings included — first consumer of the uk locale).

## Deployment Readiness

- `pnpm validate && pnpm test && pnpm build:underundre && pnpm verify --brand underundre` green; same for undreading.
- Waitlist live-check: email submitted on undreading build lands in Telegram with `topic: "undreading-waitlist"`.
