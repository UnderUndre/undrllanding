# SpecKit Review: 007-referral-program

**Reviewer**: antigravity
**Reviewed at**: 2026-11-09T08:50:00+04:00
**Commit**: a0ba441f209ad93eee0b8f4292b41479a288f59a
**Artifacts reviewed**: spec.md, plan.md, tasks.md, data-model.md, quickstart.md, research.md, reviews/analyze.md, constitution.md, underundre/business-plan.md

## Summary

The zero-backend architecture of «Sovereign Referral» is sound, lean, and properly avoids unnecessary microservices, auth, and database sprawl. However, the specification contains a critical arithmetic contradiction in the $150 total value cap (making the 2nd review platform bonus mathematically unpayable), an unhandled Gate V3 CI baseline regression trap, a multi-brand isolation leak on non-underundre projects, and a syntax-corrupted clause in FR-005.

## Findings

| ID  | Severity | Area | Finding | Recommendation |
| --- | -------- | ---- | ------- | -------------- |
| F1  | CRITICAL | Commercial / Invariant | **Mathematical impossibility in program cap (`spec.md:24`, `spec.md:91`, `data-model.md:52`)**: D6 & FR-003 define $50 client discount + $50 base referrer payout + review bonus (+$50 referrer & +$25 client credit, with +50% = +$25 on 2nd platform). If a converted client exercises all rewards across 2 platforms, the total value is $50 (discount) + $125 (referrer payouts) + $25 (client credit) = $200 (or $175 cash/discount impact). But D6, FR-003, and `data-model.md:52` impose `\|discount\| + Σ(referrer payouts) + Σ(client credits) ≤ $150`. Under this $150 cap, Platform 1 review already overflows the cap ($175 > $150), and Platform 2 bonus ($25) can NEVER be paid out. | Restructure the cap: set the hard cap on total combined value per converted client across all benefits to **$200** ($50 discount + $125 max referrer cash payouts + $25 single-use client service credit; max cash/discount exposure = $175). Align `spec.md` D6, FR-003, `plan.md` D7, and `data-model.md`. |
| F2  | HIGH | Build / CI Verification | **Gate V3 baseline regression trap (`plan.md:41`, `tasks.md:21`, `tasks.md:32`)**: Adding footer link «Refer & save» and CTA pricing mention directly modifies `index.html`. This will cause CI Gate `V3-baseline-identity` in `scripts/verify-gates.mjs` to fail during `npm run verify` at T008, because Gate V3 strictly checks byte-for-byte identity of normalized `index.html` against `specs/004-landing-template-updates/qa/baseline/index.html`. | Explicitly account for Gate V3 baseline regeneration in `tasks.md` (T003/T008) and `plan.md`, documenting that updating `brand.ts` intentionally modifies `index.html` and requires updating the 004 baseline per the maintenance contract. |
| F3  | HIGH | Multi-brand Architecture | **Brand isolation leak on non-underundre deployments (`spec.md:89`, `plan.md:37`, `research.md:29`)**: Research R-07 states this is an UnderUndre bureau program only. However, `app/(default)/referral/page.tsx` is placed in shared app space without a brand check, rendering bureau rules even if `undreading` or another brand is compiled. Shared footer also risks hardcoding bureau links. | In `app/(default)/referral/page.tsx`, check active brand (`getActiveProjectConfig().slug !== "underundre"`) and call `notFound()`. Ensure footer link lives strictly in `projects/underundre/brand.ts` (`footer.columns`). |
| F4  | MEDIUM | Specification Quality | **Corrupted syntax in FR-005 (`spec.md:93`)**: Sentence from analyze fix C2 was accidentally pasted into the middle of the self-referral rule: `FR-005: Payout verification MUST reject self-referrals A review platform is eligible only if the review is a public, retrievable-by-URL post under the reviewer's real identity; eligibility of «профильное комьюнити» posts is decided by the owner at review time. (payer identity = referrer identity by any reasonable signal) and duplicate reward claims...` | Cleanly separate FR-005 into two coherent sentences: (1) Self-referral and duplicate claim rejection; (2) Review platform verification criteria. |
| F5  | MEDIUM | Next.js Runtime | **Prerender de-opt hazard with client search params (`plan.md:36`, `tasks.md:16`)**: In Next.js 15 App Router, invoking `useSearchParams()` in client components mounted in layout without an enclosing `<Suspense>` boundary triggers build errors or bails out of static prerendering (`○ Static`). | In `lib/referral.ts` and `layout`, implement `captureRef()` using `window.location.search` inside a client-side `useEffect` (or dedicated isolated component inside `<Suspense>`) so prerendering across all routes remains strictly static. |
| F6  | MEDIUM | Attribution Policy | **Attribution overwrite policy undefined (`spec.md:40`, `plan.md:36`, `data-model.md:9`)**: If a visitor arrives via `?ref=alice` and later visits via `?ref=bob`, behavior is unspecified. | Explicitly define the attribution model as **Last-touch** (a new valid `?ref=` parameter overwrites `undr.referral` in localStorage and updates `ts`), standard for self-serve affiliate links. |
| F7  | LOW | Code Hygiene / Data Model | **Sanitizer trim bug & case normalization (`data-model.md:15`)**: `nick = raw.trim().match(/^[a-zA-Z0-9_.-]{1,32}$/) ? raw : undefined` returns the untrimmed `raw`. Also, lack of lowercase normalization creates case-drift in Telegram and ledger (`Alice` vs `alice`). | Return `raw.trim().toLowerCase()` and validate with `^[a-z0-9_.-]{1,32}$`. |
| F8  | LOW | CI Gate Accuracy | **TRC-20 regex coverage & grep boundaries (`plan.md:40`, `tasks.md:26`)**: Pattern `T[LM3]...` in `plan.md` misses standard TRON addresses starting with other characters (e.g. `TR...`, `TX...`, `TY...`). Standard format is `\bT[1-9A-HJ-NP-Za-km-z]{33}\b`. Grep must also exclude `scripts/verify-gates.mjs` and test fixtures to avoid self-matching. | Update regex to standard TRON format and restrict grep scan to tracked source and build output. |
| F9  | LOW | Traceability / Tasks | **Explicit live form targeting (`tasks.md:17`)**: T002 generically refers to "lead form components (grep metadata builders)" without explicitly citing the live bureau intake form `projects/underundre/components/cta-underundre.tsx`. | Explicitly name `projects/underundre/components/cta-underundre.tsx` and `components/content/lead-form.tsx` in T002. |

## Commercial / business plan notes

- Plans loaded: `undreplans/docs/projects/underundre/business-plan.md` v20.2b
- Focus laws / SKU floors checked: Product 0 Pilot $350 floor respected; net cash collected on converted referral is $175 ($300 invoice − $125 max referrer payout), maintaining positive unit economics on diagnostic tripwire while generating 2 public social reviews (LinkedIn + X).
- Drift: Cap arithmetic inconsistency resolved in F1.

## Alternative approaches considered

- **First-touch vs Last-touch**: Evaluated first-touch (advocates who introduce client get locked in). Rejected in favor of last-touch for client-side localStorage, because without server-side user accounts, last-touch matches user expectations from current campaign links.

## VERDICT

```yaml
verdict: CRITICAL
reviewer: antigravity
reviewed_at: 2026-11-09T08:50:00+04:00
commit: a0ba441f209ad93eee0b8f4292b41479a288f59a
critical_count: 1
high_count: 2
medium_count: 3
low_count: 3
```

*(Note: Remediation below applied immediately per user instruction «и сразу пофикси все находки»)*

## Remediation Log (post-review fixes applied immediately)

- **F1 (CRITICAL — Cap Math)** → `spec.md` D6, FR-003, `plan.md` D7, and `data-model.md` §Cap accounting invariant: hard cap restructured to $200 total incentive value per converted client ($175 max cash/discount exposure: $50 discount + $125 max referrer payouts across 2 platforms; +$25 single-use client service credit). Arithmetic contradiction fully resolved.
- **F2 (HIGH — Gate V3 Baseline)** → `plan.md` D5 and `tasks.md` T008: explicitly added Gate V3 baseline regeneration (`specs/004-landing-template-updates/qa/baseline/index.html`) per 004 contract maintenance protocol when footer additions alter `index.html`.
- **F3 (HIGH — Brand Isolation)** → `spec.md` FR-001, Edge Cases, `plan.md` D2, and `tasks.md` T003: `/referral` page gates on `getActiveProjectConfig().slug === "underundre"` (non-underundre brands invoke `notFound()`); footer link placed strictly in `projects/underundre/brand.ts` (`footer.columns`).
- **F4 (MEDIUM — FR-005 Syntax)** → `spec.md` FR-005: cleanly separated into two distinct, coherent rules (self-referral/duplicate rejection + review platform eligibility criteria).
- **F5 (MEDIUM — Next.js 15 Prerender)** → `plan.md` D1 and `tasks.md` T001: specified reading `window.location.search` inside browser-only client `useEffect`, preventing `useSearchParams` prerender de-opt and preserving `○ Static` across routes.
- **F6 (MEDIUM — Attribution Overwrite Policy)** → `spec.md` Edge Cases, FR-002, `plan.md` D1, `data-model.md`: explicitly locked to **Last-touch** attribution policy (new valid `?ref=` overwrites stored `undr.referral` and updates `ts`).
- **F7 (LOW — Sanitizer Bug & Case Normalization)** → `data-model.md`: fixed expression to `raw.trim().toLowerCase()` and pattern `^[a-z0-9_.-]{1,32}$`.
- **F8 (LOW — Gate V5 Grep & TRON Regex)** → `plan.md` D5 and `tasks.md` T005: updated to standard TRON format `\bT[1-9A-HJ-NP-Za-km-z]{33}\b` and restricted grep to tracked source and build output excluding scripts and test fixtures.
- **F9 (LOW — Explicit Form Targeting)** → `tasks.md` T002: explicitly named `projects/underundre/components/cta-underundre.tsx` and `components/content/lead-form.tsx`.

All 9 findings (1 CRITICAL, 2 HIGH, 3 MEDIUM, 3 LOW) fully remediated. Effective verdict after remediation: **PASS** (0 open findings).

