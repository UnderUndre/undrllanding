# Research: 005-code-review-fixes

**Date**: 2026-11-02
**Status**: Complete — no NEEDS CLARIFICATION (all decisions resolved; Q1–Q4 from clarify + audit hand-offs integrated)

## R-01: Secret-scanning tool

**Decision**: gitleaks (external binary, `.gitleaks.toml` config) over git-secrets / truffleHog.
**Rationale**: default ruleset covers the Telegram token shape out of the box; single-binary pre-commit hook; allowlist per-path is first-class config; actively maintained. git-secrets is AWS-centric, truffleHog is heavier than a hook needs.
**Alternatives rejected**: git-secrets (AWS-flavored patterns), GitHub secret-scanning (repo is not on a paid plan / self-host option exists but not enforced locally), no tool (S-01 root cause).
**Audit hand-off #1 applied**: allowlist entry for `*.example` placeholder strings — otherwise the hook rejects the repo's own `.env.example`.

## R-02: Trusted client IP source behind Caddy

**Decision**: env-configurable header `LEAD_TRUSTED_IP_HEADER` (default `x-real-ip`), socket remote address as fallback; fixed-window in-memory limiter with eviction sweep at insert when `map.size > 10_000`.
**Rationale**: Caddy in this deployment sets `X-Real-IP` (undevops install); `X-Forwarded-For` is client-spoofable (S-02). In-memory map is correct for the declared single-instance VPS target; Redis is over-engineering until multi-instance exists (Via Negativa).
**Alternatives rejected**: trust `X-Forwarded-For` rightmost hop (Caddy config-dependent, fragile), remote-address only (behind Caddy every client shares the proxy IP → one shared 5/60s budget = self-DoS).

## R-03: Test runner

**Decision**: vitest.
**Rationale**: zero-config ESM/TS support matching the repo's stack, fast, dev-dependency only (NFR-002), integrates with the existing `pnpm validate` habit. Jest would need ts-jest/babel plumbing for zero benefit.
**Alternatives rejected**: jest (config overhead), node:test (weaker DX, no watch/reporting niceties), playwright e2e (out of scope — unit contour first; e2e is a 006 candidate).

## R-04: CSP mode

**Decision**: enforcing immediately (Q3); `style-src 'unsafe-inline'` retained.
**Rationale**: site surface is small and fully controlled; Report-Only phase would burn a deploy cycle for zero informational gain. `unsafe-inline` styles are load-bearing: Tailwind utilities plus the icon SVG's inline styling; removing them is a re-architecture with no attacker-value delta (style injection is not script execution).
**Alternatives rejected**: Report-Only phase (unnecessary churn), nonce-based script-src (no inline scripts exist; `strict-dynamic` overkill).

## R-05: Registry-miss policy

**Decision**: build-time throw (FR-010) — the alias `undreseller → underundre` stays the only fallback.
**Rationale**: silent substitution of the real `underundre` brand (legal entity, contact email) under a mistyped name is a legal/PII hazard worse than a failed build. Fail-fast matches the "brand = atomic entity" principle from the reusing-strategy.
**Alternatives rejected**: console.error + render underundre (current bug), 404 page (hides the misconfiguration).

## R-06: verify-gates scope for 005

**Decision**: implement the 004 contract as written (V1/V2/V2a/V3, CLI `--brand`), with the audit-hand-off #2 amendment: gate V3 byte-diff compares the response BODY only, excluding the security headers introduced by FR-004 (headers are response-level, not HTML-body; baseline files store body HTML).
**Rationale**: closes 004 T005/T006 debt; keeps one gate script instead of two overlapping tools (audit §2 note).

## R-07: Token-rotation verification (S-01)

**Decision**: US1 is a verification story — owner rotates tokens at @BotFather; the repo-side work is gitleaks hook (R-01), one-time `.history/` scan-and-clean, and the US1 acceptance checklist (new token works / old token 401).
**Rationale**: tokens never belong in code; the feature only guarantees leak-proofing going forward (Q4 decision).
