# Research: 007-referral-program

**Date**: 2026-11-09 · **Status**: Complete — no open NEEDS CLARIFICATION

## R-01: Attribution without a backend

**Decision**: `?ref=` → localStorage → lead-form `metadata.referral`. **Rationale**: the 005 metadata pipeline already reaches the Telegram dispatch; a referral registry/DB would add auth, GDPR surface, and uptime for a solo-scale loop. **Rejected**: DB-backed referral codes + dashboard (mini-epic, no demand evidence yet).

## R-02: Anti-fraud architecture

**Decision**: integrity enforced at payout review, not at capture. **Rationale**: capture-time defenses (signed links, nick registration) all require a backend and still lose to social engineering; manual review of <10 payouts/month is deterministic and free. **Rejected**: signed/HMAC referral links (backend + key management for zero marginal protection at this scale).

## R-03: Review platforms & ToS exposure

**Decision**: LinkedIn, X, профильные комьюнити eligible; Upwork excluded (ToS prohibits incentivized reviews — account ban risk outweighs reach); Google Maps excluded (owner + Google ToS on incentivized reviews). Bonus framed as thank-you for *lasting public feedback*; 30-day persistence rule raises forgery cost. **Rejected**: per-platform payout scaling beyond +50% on 2nd platform (manufactures spam incentive).

## R-04: Payout rail

**Decision**: USDT TRC-20, wallet collected at payout time via DM, recorded in private ledger only. **Rationale**: USD-pegged accounting, ~$1 fees, no payment-provider onboarding for arbitrary third parties. **Rejected**: Paddle/Stripe payouts (KYC onboarding for every referrer), bank transfers (intl friction for $50).

## R-05: Discount application

**Decision**: manual invoice adjustment, no promo codes. **Rationale**: promo-code systems need issuance + validation infra; solo invoicing is already manual (Upwork escrow / Paddle), and a code is another fraud surface (leak/coupon-farm).

## R-06: Nickname collisions

**Decision**: no reservation, notice on mint page, resolution at payout review. **Rationale**: collision probability is negligible at current traffic; the payout gate (verified third-party payer) is the real identity anchor.

## R-07: Scope — single brand

**Decision**: referral program is an UnderUndre bureau program; wired for brand `underundre` only. **Rationale**: template generality (004) is about landing structure, not program mechanics; no engine-level abstraction until a second brand asks.

## R-08: Explicitly deferred (Via Negativa)

Referral dashboard · server-side attribution · promo codes · auto-payouts · conversion reminders · tiered rewards beyond 2 platforms · multi-brand generalization. Revisit only on first cold-traffic evidence (>10 conversions/month).
