# Tasks: 007-referral-program

**Input**: `specs/007-referral-program/` — spec.md, plan.md, research.md, data-model.md, quickstart.md
**Prerequisites**: 005 metadata pipeline (implemented), verify-gates.mjs (004/006)

## Format: `[ID] [AGENT] [Story?] Description`

## Task Statuses

`- [ ]` pending · `- [→]` in progress · `- [X]` done · `- [!]` failed · `- [~]` blocked

---

## Phase 0: Attribution Core

- [ ] **T001 [FE] US1 Implement `lib/referral.ts`**: `captureRef()` (idempotent `?ref=` capture → localStorage `undr.referral`, sanitizer `^[a-zA-Z0-9_.-]{1,32}$`, silent no-op without localStorage), `getReferral()`. Wire `captureRef()` once from root layout client boundary. Files: `lib/referral.ts`, root layout.
- [ ] **T002 [FE] US1 Pass `metadata.referral` through lead forms**: forms read `getReferral()`; include key only when defined (no empty strings). Extend the metadata Zod schema with an optional typed `referral` field. Files: lead form components (grep `metadata` builders), Zod schema module.

## Phase 1: Mint Page

- [ ] **T003 [FE] US1 Build `/referral` page**: static bilingual page (`app/(default)/referral/page.tsx`) — hero, rules block (FR-003 verbatim: rewards table, $150 cap, ineligible platforms Upwork/Google Maps, nickname-collision notice), client mint component (`components/referral/mint.tsx`): nickname input (maxlength 32), network select (LinkedIn/X/профильное комьюнити), link render `${origin}/?ref=<nick>`, copy button, zero network requests. Footer link «Refer & save» → `/referral`. Files per plan §1.2. Depends: none (parallel with T001/T002).
- [ ] **T004 [FE] US1–US3 Bilingual copy keys**: RU/EN (+uk optional) strings for all `/referral` copy in brand copy data; first-person voice (no agency «мы»). Depends: T003.

## Phase 2: Gates & Ledger

- [ ] **T005 [E2E] US2–US3 Verify gate V5**: extend `scripts/verify-gates.mjs` — PII grep (TRC-20/0x/bc1 patterns) over repo + build output = 0; `/referral` bilingual keys present; `?ref` capture asserted via unit test on `lib/referral.ts` (Vitest-style or node assert — repo convention). Update `npm run verify`. Depends: T001.
- [ ] **T006 [OPS] US2–US3 Init private payout ledger**: `undreplans/docs/projects/undrllanding/referral-ledger.md` per data-model RewardRecord (tables for paid-referral/review-bonus, capUsed column, rejected-log section); ensure landing repo contains no wallet strings. Depends: none (parallel). 

## Phase 3: Acceptance

- [ ] **T007 [QA] US1–US3 Manual acceptance**: quickstart.md §1–§4 walkthrough + rules copy review (RU/EN tone, first person, D6 amounts) + 30-day review-bonus calendar entry created. Results → `specs/007-referral-program/qa/manual-qa.md`. Perf: Lighthouse LCP ≤ 1.5 s and added JS ≤ 5 KB gz on `/referral` (NFR-002). Depends: T003, T005.
- [ ] **T008 [OPS] US1 Final pipeline**: `npm run validate && npm run build && npm run verify` green. Depends: T002, T004, T005, T007.

---

## Dependency Graph

```text
T001 ─→ T002 ─┐
T003 ─→ T004 ─┼─→ T008
T001 ─→ T005 ─┘
T006 (parallel)
T003,T005 ─→ T007
```

**Parallel lanes**: A: T001→T002, T005 · B: T003→T004 · C: T006 · merge: T007→T008
**Critical path**: T001 → T005 → T007 → T008
**MVP scope**: T001–T005 (loop live); T006/T007 complete operational readiness.

## Agent Dispatch Plan

| Agent | Tasks | Input context | Files |
|---|---|---|---|
| [FE] frontend-specialist | T001–T004 | data-model.md, plan.md D1/D2/D6, 005 form builders | lib/referral.ts, layout, forms, app/(default)/referral/, components/referral/, copy data |
| [E2E] test-engineer | T005 | contracts data-model §Verify V5, verify-gates.mjs conventions (004/006) | scripts/verify-gates.mjs, package.json |
| [OPS] devops-engineer | T006, T008 | data-model §RewardRecord, plan.md D3 | undreplans ledger, package.json |
| [QA] human-qa-tester | T007 | quickstart.md, spec acceptance scenarios | qa/manual-qa.md |
