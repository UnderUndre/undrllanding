# Specification Quality Checklist: 006-seo-geo-foundation

**Feature Directory**: `specs/006-seo-geo-foundation`
**Date**: 2026-11-06
**Status**: PASSED

## 1. Content & Completeness

- [x] **Clear Problem Statement**: SEO gap audit of the live landing — zero robots/sitemap/canonical/OG/JSON-LD/llms.txt infrastructure despite production content.
- [x] **Prioritized User Stories**: 4 stories (P1–P3), independently testable (indexation, share cards, AI citation, lang attribute).
- [x] **Acceptance Scenarios**: Given-When-Then for every story.
- [x] **Functional Requirements**: FR-001..FR-011, each mapped to an audit finding via the Disposition Map.
- [x] **Non-Functional Requirements**: NFR-001..004 (green pipeline, no new deps, additive contract, LCP guard).

## 2. Architectural Boundaries

- [x] **Brand-agnostic scope**: all SEO artifacts sourced from `ProjectConfig` + `data/*.json` — zero brand literals in shared code (FR-011); proven on second brand (SC-006).
- [x] **No [lang] routing**: client-side `html lang` sync only (FR-009) — consistent with the 004 review decision (SSR-локализация отвергнута, Via Negativa).
- [x] **No new runtime deps**: `next/og` is built into Next 15 (FR-005, NFR-002).
- [x] **Gate continuity**: SEO checks extend the existing `verify-gates.mjs` contour as gate V4 (Q3) — same pattern as 005.

## 3. Clarification Log

| # | Question | Resolution |
|---|----------|------------|
| Q1 | Scope | Full SEO+GEO foundation in one wave |
| Q2 | OG-image approach | Dynamic `next/og` ImageResponse from brand config |
| Q3 | Automated SEO gate | Gate V4 in verify-gates.mjs, wired into CI |

## 4. Dependencies & Gates

- **Prerequisite**: none blocking — 004/005 fully implemented and live; verify-gates contour operational.
- **Commercial delta**: none — visibility infrastructure; business plan unchanged.
- **Constitution**: Principle XII — extends the automated QA contour; Principle XIII — no analysis paralysis, foundation ships in one wave.
