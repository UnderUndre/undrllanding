# Tasks: 009-static-conversion-layer

**Input**: `specs/009-static-conversion-layer/` design docs · **Prerequisites**: audit PASS ✅, clarify ✅

## Phase 1: Foundation

- [x] **T001 [SETUP] [US1/US2] Schemas, loaders, config flags**: `lib/schemas/prompt-schema.ts` (PromptPackItemSchema), `lib/schemas/prompt-loaders.ts` (loadAllPrompts, slug uniqueness, missing dir → []), `lib/persona.ts` (resolvePersona/capturePersona/getPersona/personaMetadata, VALID_PERSONA_IDS), `lib/project-config.ts` (+`hasPrompts?`, +`personas?: PersonaVariant[]`).
- [x] **T002 [TEST] [US1/US2] Schema & persona unit tests**: `tests/unit/prompt-schema.test.ts` (valid, invalid slug, missing bilingual field, short body), `tests/unit/persona.test.ts` (resolve valid/invalid/absent, last-touch overwrite, metadata omission, storage-unavailable no-op).

## Phase 2: US1 — Prompt Library

- [x] **T003 [SETUP] [US1] Five provenance prompts**: `projects/underundre/data/prompts/*.json` bound to the real SpecKit Discovery workflow: (1) symptom inventory, (2) TDABC hours odometer, (3) SaaS stack audit, (4) integration workflow map, (5) discovery brief generator. Principle XV voice; body EN, meta RU+EN.
- [x] **T004 [FE] [US1] `/prompts` page + pack route**: `app/(default)/prompts/page.tsx` (brand-gated 404, canonical, CollectionPage JSON-LD), `prompts-content.tsx` (cards + copy buttons, zero network), `app/prompt-pack.md/route.ts` (`force-static`, generated from the same JSON — plan DD-1). Footer link «Free prompts» in `projects/underundre/brand.ts`.

## Phase 3: US2 — Persona Variants

- [x] **T005 [FE] [US2] Persona hero variants + capture**: `personas` array in `projects/underundre/brand.ts` (3 bilingual variants matching intake roles), persona capture added to the visit-capture boundary in `app/(default)/layout.tsx`, hero `projects/underundre/components/hero-underundre.tsx` renders variant by stored/`?persona` value (default = current copy, byte-identity), `cta-underundre.tsx` + `lead-form.tsx` attach `personaMetadata()`.
- [x] **T006 [TEST] [US2] Composition test**: `tests/unit/lead-metadata.test.ts` — persona + referral + calculator telemetry compose into one valid `GenericLeadSubmissionSchema` payload ≤ 20 keys; invalid persona omits key.

## Phase 4: US3 — Undreading Waitlist

- [x] **T007 [FE] [US3] `/waitlist` (undreading-only)**: `projects/undreading/data/waitlist.json` (trilingual copy), `app/(default)/waitlist/page.tsx` (gated `slug !== "undreading"` → 404, canonical, WebPage JSON-LD), `waitlist-content.tsx` (email + consent + submit → `/api/lead` with `topic: "undreading-waitlist"`, referralMetadata composes), footer link in `projects/undreading/brand.ts`.
- [x] **T008 [TEST] [US3] Waitlist payload test**: `tests/unit/waitlist-payload.test.ts` — payload validates against `GenericLeadSubmissionSchema`; consent-unchecked payload shape; metadata composition.

## Phase 5: Gates & Isolation

- [x] **T009 [TEST] [US4] Gate V7 in `scripts/verify-gates.mjs`**: V7.1 prompts integrity + pack route; V7.2 persona source contract; V7.3 waitlist isolation both directions (present in undreading build, absent in underundre build) + no emails in tracked sources.
- [x] **T010 [OPS] [US4] Sitemap, ledger, baseline**: `app/sitemap.ts` conditional entries (`/prompts` underundre, `/waitlist` undreading); init `undreplans/docs/projects/undreading/waitlist-ledger.md`; refresh Gate V3 baseline (footer link DOM change).

## Phase 6: Acceptance

- [x] **T011 [QA] Full pipeline & walkthrough**: `pnpm validate && pnpm test && pnpm build:underundre && pnpm verify --brand underundre` + `pnpm build:undreading && pnpm verify --brand undreading`; browser walkthrough per `quickstart.md`; results → `qa/manual-qa.md`.

---

## Dependency Graph

```text
T001 ──→ T002 ──┐
T001 ──→ T003 ──┼─→ T004 ──┐
T001 ──→ T005 ──┼─→ T006 ──┼─→ T009 ──→ T010 ──→ T011
T007 ──→ T008 ──┘          │
```

**Lanes**: A: T003→T004 · B: T005→T006 · C: T007→T008 · merge: T009→T010→T011
**Critical path**: T001 → T005 → T009 → T010 → T011
**MVP scope**: T001–T006 (prompt library + personas live).

## Agent Dispatch Plan

| Agent | Tasks | Input Context | Files |
|---|---|---|---|
| [SETUP] | T001, T003 | data-model.md, research R-01 | lib/schemas/*, lib/persona.ts, projects/underundre/data/prompts/* |
| [FE] | T004, T005, T007 | plan DD-1..DD-4, spec FR-001..FR-011 | app/(default)/*, components/capture/*, hero, brands |
| [TEST] | T002, T006, T008, T009 | contracts/verify-gates-v7.md, RTM | tests/unit/*, scripts/verify-gates.mjs |
| [OPS] | T010 | plan DD-5, 004 maintenance contract | app/sitemap.ts, brand.ts files, baseline, undreplans ledger |
| [QA] | T011 | quickstart.md | qa/manual-qa.md |

## Constitution Gate Reminder

`/speckit.implement` requires analyze PASS + ≥2 external reviews or explicit owner `--override-gate` (Principle VI).
