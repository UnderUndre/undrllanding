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

1. **Attribution module** (`lib/referral.ts`): single client-side module — `captureRef()` reads `?ref=` on any page load (idempotent, called once from root layout client boundary), stores `{ nick, ts }` in localStorage key `undr.referral` (TTL none in MVP); `getReferral()` consumed by lead forms → `metadata.referral`. localStorage unavailable → silent no-op.
2. **Mint page** (`app/(default)/referral/page.tsx` + `components/referral/mint.tsx`): static server page (bilingual copy via `pick()`), client component renders form; link built as `${origin}/?ref=<nick>` from `window.location.origin`; networks: LinkedIn / X / профильное комьюнити (labels only — no per-network link variants). Nickname sanitized to `[a-zA-Z0-9_.-]{1,32}`.
3. **Ledger location**: `undreplans/docs/projects/undrllanding/referral-ledger.md` (private repo) — payout decisions + wallet addresses live outside the public landing repo; public repo holds only the *rules* (FR-003).
4. **Discount mechanics**: no promo-code system — the −$50 is applied manually at invoicing; rules page states «скидка подтверждается при выставлении счёта». Cheap and unfakeable.
5. **Verify gate V5** (extends `scripts/verify-gates.mjs`): grep repo + build output for wallet-shaped strings (`T[LM3][A-HJ-NP-Za-km-z1-9]{33}`, `0x[a-fA-F0-9]{40}`, `bc1[a-z0-9]{20,}`) → 0 hits; bilingual keys present for `/referral` copy.
6. **Navigation**: footer link «Refer & save» + CTA mention on pricing section; header nav untouched (avoid nav churn).
7. **Excluded**: server-side attribution, referral dashboard, promo codes, auto-payouts, reminder emails — all deferred (documented in research R-08).
