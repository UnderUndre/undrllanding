# SpecKit Analyze: 008-proof-and-leak-engine

**Reviewer**: analyze (ZCode self-consistency & cross-artifact analyzer)  
**Reviewed at**: 2026-11-12T05:30:00+04:00  
**Commit**: d1f7507  
**Artifacts**: `spec.md`, `plan.md`, `tasks.md`, `data-model.md`, `research.md`, `contracts/verify-gates-v6.md`, `quickstart.md`, `requirements-audit.md`, `qa/preliminary-rtm.md`

---

## Findings

| ID | Category | Severity | Location(s) | Summary | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **G1** | Agent Routing | LOW | `tasks.md:20` (T003) | `T003` is tagged `[FE]` but includes both pure utility `lib/calculator-math.ts` and unit test `tests/unit/calculator.test.ts`. Per strict role conventions, unit tests fall under `[TEST]`. | Acceptable as single cohesion unit (frontend-consumed math utility + test in same task), or split. Kept as `[FE]` per precedent 004-G1/006-G1. |
| **F1** | Inconsistency | LOW | `plan.md` DD-2 vs `tasks.md` T004 | `plan.md` mentions `useCalculatorBridge` as state bridge, while `tasks.md` describes it generically as "client bridge to smoothly scroll and populate form state". | Clarify in T004 implementation: lightweight React context or custom window event bridge in `components/calculator/` without external state libraries. |
| **C1** | Coverage | LOW | `spec.md` FR-009 vs `app/sitemap.ts` | Brand isolation requires sitemap to conditionally omit `/teardowns` and `/calculator` for brands without `hasTeardowns`/`hasCalculator`. | Explicitly covered in plan DD-4 and tasks T011; ensure Gate V6 validates sitemap contents for `undreading`. |

*(Total findings: 0 CRITICAL, 0 HIGH, 0 MEDIUM, 3 LOW)*

---

## Coverage Summary

| Requirement Key | Has Task? | Task IDs | Notes |
| :--- | :--- | :--- | :--- |
| **FR-001** (TDABC Math Formulas) | ✅ | T003, T004 | Covered by pure math engine + component |
| **FR-002** (Export to #contact & metadata) | ✅ | T004 | Covered by form bridge |
| **FR-003** (Routes /calculator + homepage) | ✅ | T005, T011 | Standalone route + homepage embed |
| **FR-004** (Route /teardowns index) | ✅ | T007, T011 | Grid index + CollectionPage schema |
| **FR-005** (Routes /teardowns/[slug]) | ✅ | T008 | Static prerender with dynamic params |
| **FR-006** (Teardown Zod Schema) | ✅ | T001, T002 | Schema definition + unit tests |
| **FR-007** (Visual Architecture Inspector) | ✅ | T009 | Zero-dep comparison component |
| **FR-008** (Lead metadata telemetry) | ✅ | T004 | Extended metadata in lead payload |
| **FR-009** (Brand isolation) | ✅ | T001, T010 | Config flags + 404 enforcement + CI check |
| **FR-010** (Article & Breadcrumb JSON-LD) | ✅ | T007, T008, T010 | Schema generation with `<`-escape |
| **FR-011** (3 initial case studies) | ✅ | T006, T010 | Data files + schema & OpSec validation |
| **NFR-001** (Compilation & 0 errors) | ✅ | T002, T003, T012 | `tsc --noEmit` and `vitest run` |
| **NFR-002** (LCP <= 1.5s, bundle <= 15 KB gz) | ✅ | T012 | Web vitals & bundle check |
| **NFR-003** (Zero external chart/WASM deps) | ✅ | T009, T012 | Dependency verification |
| **NFR-004** (Gate V6 in verify-gates.mjs) | ✅ | T010, T012 | CI gate implementation |

**Requirement Coverage**: **100%** (15 of 15 requirements mapped to concrete tasks).

---

## Constitution Alignment Issues

- **Principle I (Source of Truth)**: PASS. No generated trees hand-edited.
- **Principle II (Transformer, Not Fork)**: PASS. No config duplications.
- **Principle IV (SemVer)**: PASS. Landing repo, no version bump.
- **Principle V (Token Economy)**: PASS. Modular JSON files avoid monolithic context dumps.
- **Principle VI (Cross-AI Review Gate)**: PENDING. This analysis is Gate 1. Before `/speckit.implement`, $\ge 2$ external AI reviews or an explicit owner `--override-gate` is required.
- **Principle VII (Artifact Versioning)**: PASS. `spec/v1`, `clarify/v1`, `requirements-audit/v1`, `plan/v1`, `tasks/v1` tagged in git.
- **Principle IX (Two-Phase Review Flow)**: PASS. Work tracked on `feature/008-proof-and-leak-engine`.
- **Principle XV (Narrative Integrity)**: PASS. First-person voice preserved; no agency «мы».

---

## Commercial / Business Plan Alignment

- **Plan loaded**: `undreplans/docs/projects/underundre/business-plan.md` v20.2b
- **Focus laws & price floors**: Product 0 pilot floor ($350) and Sprint A ($3.5k) respected.
- **GTM alignment**: Directly tackles the 5 `LOST_STATUS_QUO` rejections recorded in `touch-log.md`. Provides Level 1/Level 2 proof artifacts for cold outreach.
- **Findings**: **No commercial drift detected.** No new SKU introduced; no ad spend; pure conversion enablement.

---

## Unmapped Tasks

- **None**. All 12 tasks (T001–T012) map directly to functional requirements, quality gates, and verification milestones.

---

## Metrics

- **Total Requirements**: 15 (11 FR + 4 NFR)
- **Total Tasks**: 12
- **Coverage %**: 100%
- **Ambiguity count**: 0
- **Duplication count**: 0
- **CRITICAL count**: 0
- **HIGH count**: 0
- **MEDIUM count**: 0
- **LOW count**: 3 (G1, F1, C1)

---

## VERDICT

```yaml
verdict: PASS
reviewer: analyze
reviewed_at: 2026-11-12T05:30:00+04:00
commit: d1f7507
critical_count: 0
high_count: 0
medium_count: 0
low_count: 3
```

**Verdict is PASS**. Zero CRITICAL, zero HIGH, zero MEDIUM findings. The specification, technical plan, data contracts, and task breakdown are fully consistent and ready for review/implementation.


---

## Remediation Log (External Review zcode.md Resolutions — 2026-11-12)

All 16 findings from external review `zcode.md` (0 CRITICAL, 4 HIGH, 6 MEDIUM, 6 LOW) have been systematically resolved:

- **F1 (HIGH — Math & Formula Contradiction)**: Unified formula semantics to per-person weekly hours. Recomputed AC-1 defaults ($91,000 labor waste + $13,740 SaaS bloat = $104,740 total friction tax) and quickstart §2 ($546,000 labor waste + $36,900 SaaS bloat = $582,900 total). Defined compact formatting for numbers >= $1M.
- **F2 (HIGH — Guessing Ban v20.2a Reconciliation)**: Explicitly reconciled with Business Plan v20.2a/v20.3 Mandate 5. Established physical manual hours (`totalHoursPerYear`) as primary invariant odometer; dollar values are user-supplied rate projections; teardown figures are bound to audit-verified records.
- **F3 (HIGH — Standalone `/calculator` to `/#contact` Handoff)**: Designed cross-route state bridge via `sessionStorage` (`undr.calculator_bridge`) + `router.push('/#contact')` with form hydration on mount. Preserves 007 referral codes. Fallback uses plain `<a href="/#contact">`.
- **F4 (HIGH — Canonical Metadata Key Set)**: Froze unified canonical schema in `data-model.md` §3 (`sourceComponent`, `targetWorkflow`, `teamSize`, `routineHoursPerWeek`, `totalHoursPerYear`, `annualLaborLeakUsd`, `saasBloatUsd`, `totalLeakUsd`, `referral`). Realigned all specs, tasks, and audit matrices.
- **F5 (MEDIUM — Content Provenance & Voice)**: Bound T006 directly to delivered audit corpus (`clients/` folder & `content-pack.md`). Enforced Principle XV first-person voice rules. Added `basis: "audit" | "composite"` attribute.
- **F6 (MEDIUM — OpSec Phone Regex)**: Refined V6.2 scan to check localized human-readable text fields with international regex `\+[1-9]\d{8,14}`, preventing false-positive matches on code, ports, or metric integers.
- **F7 (MEDIUM — Bilingual Copy i18n)**: Added typed `calculator` and `inspector` copy interfaces to `projects/underundre/locales.ts` for RU and EN.
- **F8 (MEDIUM — Gate V6 Calculator Bounds)**: Added Check V6.5 to `contracts/verify-gates-v6.md` and T010 asserting deterministic input clamping.
- **F9 (MEDIUM — Lead Metadata Test)**: Added `tests/unit/lead-metadata.test.ts` into T004 to test metadata construction against `GenericLeadSubmissionSchema`.
- **F10 (MEDIUM — Git Stage Tags)**: Synchronized all stage tags in both `undrllanding` and `repos`.
- **F11–F16 (LOW — Typo, Count, Script Reuse, Robustness, Clarity)**: Fixed FR-011 directory path, updated gate count to 20 in T012, switched to `pnpm build:undreading`, added `data-testid` contracts, reworded to "sanitized teardowns", and date-stamped SaaS pricing constants.

**Effective Status after Remediation**: **PASS** (0 open CRITICAL / 0 open HIGH / 0 open MEDIUM).
