# Specification Quality Checklist: 005-code-review-fixes

**Feature Directory**: `specs/005-code-review-fixes`
**Date**: 2026-11-02
**Status**: PASSED

## 1. Content & Completeness

- [x] **Clear Problem Statement**: 26 findings from two full-codebase audits (code review verdict HIGH, security audit verdict CRITICAL), dispositioned per finding.
- [x] **Prioritized User Stories**: 5 stories (P1–P3), independently testable.
- [x] **Acceptance Scenarios**: Given-When-Then for every story.
- [x] **Functional Requirements**: FR-001..FR-018, each mapped to a concrete finding via the Disposition Map.
- [x] **Non-Functional Requirements**: NFR-001..003 (validation, no new runtime deps, additive brand contract).

## 2. Architectural Boundaries

- [x] **Delta scope**: remediation only — no new features, no brand-facing surface changes except security headers.
- [x] **Owner-action boundary**: S-01 token rotation explicitly out of code scope (Q4); feature covers verification + guard rails.
- [x] **Contract continuity**: rate-limit header change is env-configurable (`LEAD_TRUSTED_IP_HEADER`) with socket fallback — zero-config default preserved for non-Caddy deployments.

## 3. Clarification Log

| # | Question | Resolution |
|---|----------|------------|
| Q1 | Scope | All 26 findings, one wave |
| Q2 | Rate-limit IP source | Env-configurable trusted header (`X-Real-IP` from Caddy), fallback to socket address |
| Q3 | CSP mode | Enforcing immediately, Umami allowlisted |
| Q4 | Token rotation | Owner action (@BotFather) outside code scope; verification in US1 |

## 4. Dependencies & Gates

- **Prerequisite**: none blocking — audit reports committed (`cd57751`); S-01 rotation can run in parallel with implementation.
- **Commercial delta**: none — technical-debt hardening; business plan unchanged.
- **Constitution**: Principle XII QA contour gets its missing automated half (verify-gates + unit tests) — closes 004 T005/T006 debt inside the same feature.
