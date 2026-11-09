# Specification Quality Checklist: 007-referral-program

**Feature Directory**: `specs/007-referral-program`
**Date**: 2026-11-09
**Status**: PASSED

## 1. Content & Completeness

- [x] **Clear Problem Statement**: zero warm-traffic referral channel; loop defined (mint → share → paid conversion → rewards → review bonus).
- [x] **Prioritized User Stories**: 3 stories (P1 mint, P2 paid-reward, P3 review bonus) with independent tests and Given-When-Then scenarios.
- [x] **Functional Requirements**: FR-001..FR-007 (mint page, attribution, rules copy, ledger, anti-fraud, PII minimization, bilingual).
- [x] **Non-Functional Requirements**: NFR-001..004 (typecheck, static perf budget ≤5 KB gz, no backend, PII grep gate).

## 2. Architectural Boundaries

- [x] **No backend**: minting client-side; attribution via existing lead-form metadata (005); payouts manual — no payment infra, no auth surface.
- [x] **Fraud model explicit**: pay-for-payment, self-referral rejection, cap accounting, ledger (D2/D6 + FR-004/005).
- [x] **Platform ToS compliance**: Upwork + Google Maps ineligible (D3/D4) — incentivized-review risk carved out.

## 3. Clarification Log

| # | Question | Resolution |
|---|----------|------------|
| Q1 | Client reward: discount vs payout | Discount −$50 (D1) |
| Q2 | Referrer eligibility | Anyone; gates at payout (D2) |
| Q3 | Review platforms | LinkedIn/X/communities; multi-platform +50% cap 2; Upwork+Maps ineligible (D3/D4) |
| Q4 | Payout asset/amounts | USDT TRC-20; D6 table; hard cap $150/client |

## 4. Dependencies

- 005 lead-form `metadata` pipeline (implemented).
- verify-gates script (004) — new PII gate FR-006/NFR-004 to be added in plan.
- Business plan: referral CAC ($150 max) consistent with trigger-based GTM (touch-log); **Business plan: unchanged** — no new SKU, discount is a price modifier within existing floors.
