# Implementation Plan: 007-referral-program

**Branch**: `feature/007-referral-program` | **Date**: 2026-11-09 | **Spec**: [spec.md](spec.md)
**Input**: spec.md (D1–D6 integrated) · Requirements audit: folded into analyze (small feature, solo flow)

## Summary

Zero-backend referral loop: client-side link minting on `/referral`, attribution through localStorage → lead-form `metadata.referral` (existing 005 pipeline), manual verification-gated payouts (USDT TRC-20) tracked in a private ledger, review bonus capped at 2 platforms with a 30-day persistence rule. No new runtime dependencies, no API surface changes beyond `metadata.referral` passthrough.

## Technical Context

**Language/Version**: TypeScript 5.x strict, Next.js 15 App Router, React 19
**Primary Dependencies**: existing stack only (Tailwind v4, Zod); zero new deps
**Storage**: N/A (localStorage for attribution; markdown ledger in private repo `undreplans` for payouts)
**Testing**: `npm run validate`; new verify-gate V5 (PII grep + bilingual copy); manual acceptance
**Target Platform**: Vercel/Node host; modern browsers (localStorage required — graceful no-op without it)
**Project Type**: web (multi-brand landing engine, brand `underundre` only — referral is an UnderUndre bureau program)
**Performance Goals**: `/referral` static prerender; ≤ 5 KB gzipped added JS; LCP ≤ 1.5 s
**Constraints**: additive-only; no PII beyond nickname in public artifacts; wallets never committed
**Security Surface & STRIDE**: spoofing/tampering accepted at capture, enforced at manual payout review (see spec STRIDE block); no new endpoints
**Database Migration Trigger**: N/A
**Supply Chain & Licensing**: no changes; GPL-3.0 unchanged

## Constitution Check

| Principle | Status |
|---|---|
| I Source of Truth | PASS — no generated-tree edits |
| IV SemVer | PASS — no bump |
| VI Cross-AI Review Gate | PENDING — analyze + ≥2 external reviews before implement |
| VII Artifact Versioning | PASS — tags per stage |
| XV Narrative (§0 rule) | PASS — client-facing copy written first-person (Андрей), no agency «мы», no Валера in artifacts |

## Phase 1 Design Decisions

1. **Attribution module** (`lib/referral.ts`): single client-side module — `captureRef()` reads `?ref=` via `window.location.search` inside a client-side `useEffect` (browser-only, preventing Next.js 15 prerender de-opt), sanitizes and lowercases the nickname (`^[a-z0-9_.-]{1,32}$`), and persists `{ nick, ts }` to localStorage key `undr.referral` using a **Last-touch** overwrite policy (new valid `?ref=` overwrites existing stored referral and updates `ts`). `getReferral()` returns the sanitized string or undefined; consumed by lead forms → `metadata.referral`. localStorage unavailable → silent no-op.
2. **Mint page** (`app/(default)/referral/page.tsx` + `components/referral/mint.tsx`): static server page (bilingual copy via `pick()`), protected by brand isolation check (`getActiveProjectConfig().slug !== "underundre"` → `notFound()`). Client component renders form; link built preferencing canonical domain `https://${config.domain}/?ref=<nick>` (falling back to `window.location.origin` in local development). Networks: LinkedIn / X / профильное комьюнити (labels only — no per-network link variants). Nickname sanitized to lowercase `[a-z0-9_.-]{1,32}`.
3. **Ledger location**: `undreplans/docs/projects/undrllanding/referral-ledger.md` (private repo) — payout decisions + wallet addresses live outside the public landing repo; public repo holds only the *rules* (FR-003).
4. **Discount mechanics**: no promo-code system — the −$50 is applied manually at invoicing; rules page states «скидка подтверждается при выставлении счёта». Cheap and unfakeable.
5. **Verify gate V5 & Gate V3 baseline** (extends `scripts/verify-gates.mjs`):
   - Gate V5: grep tracked repo sources and prerendered build HTML (`.next/server/app/**/*.html`) for wallet-shaped strings (TRON standard: `\bT[1-9A-HJ-NP-Za-km-z]{33}\b`, EVM: `\b0x[a-fA-F0-9]{40}\b`, Bitcoin: `\bbc1[a-z0-9]{20,}\b`) → 0 hits (excluding `scripts/verify-gates.mjs` and fixtures); bilingual keys present for `/referral` copy.
   - Gate V3: adding footer link «Refer & save» to `projects/underundre/brand.ts` intentionally alters `index.html` normalized DOM; the baseline `specs/004-landing-template-updates/qa/baseline/index.html` must be refreshed once in the tasks per the 004 contract maintenance section.
6. **Navigation**: footer link «Refer & save» in `projects/underundre/brand.ts` (`footer.columns`) + CTA mention on pricing section; header nav untouched (avoid nav churn).
7. **Discount base & Hard Cap (audit F1 / review F1)**: −$50 applies to the actual invoiced amount once per converted client; never stacked with other promotions (pilot $350 → $300); +$25 client credit = single-use, any next service, 6-month expiry, manual application. Hard cap per converted client across all benefits: **$200 total value** ($175 max cash/discount exposure: $50 discount + $125 max referrer payouts across 2 review platforms; +$25 single-use client service credit).
8. **Excluded**: server-side attribution, referral dashboard, promo codes, auto-payouts, reminder emails — all deferred (documented in research R-08).
