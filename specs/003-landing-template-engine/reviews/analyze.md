# SpecKit Analyze: 003-landing-template-engine

**Reviewer**: analyze (ZCode self-consistency gate, rev. 2 artifacts)
**Reviewed at**: 2026-10-30T22:40:00Z
**Commit**: `90462b913adc799663147f2c6a14e77acc6f0da0` (artifacts rev. 2 — post-review fixes uncommitted at analysis time)
**Artifacts**: spec.md (rev. 2), plan.md (rev. 2), tasks.md (rev. 2), data-model.md (rev. 2), contracts/schemas.ts (rev. 2), quickstart.md, research.md, requirements-audit.md, qa/*, reviews/zcode.md (external review, CRITICAL → all 12 findings remediated)

---

## Findings

| ID | Category | Severity | Location(s) | Summary | Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| C1 | Constitution (IX) | MEDIUM | repo branch `003-landing-template-engine` | Planning artifacts (spec/plan/tasks rev. 2) live on the implementation-branch name; Principle IX prescribes a `specs/<slug>` planning branch. Counted MEDIUM, not CRITICAL, because the constitution's own scope statement binds the `underoute-clai` CLI repo (undrllanding adopts it by convention), the identical state PASSed the prior analyze wave, and the fix is a cheap rename before `/speckit.implement`. | Rename branch to `specs/003-landing-template-engine` (or record a one-line deviation note) before starting implementation. |
| C2 | Inconsistency | MEDIUM | plan.md Constitution Check bullet IV | Checklist claims "additive non-breaking modifications", but FR-011/T-023 now remove `undrllaConfig`, `dev:undrlla`/`build:undrlla` scripts, components and routes — a breaking change for existing consumers (0.x semantics: MINOR bump at release). | Rephrase the bullet to "breaking within 0.x zone → MINOR bump on next release (removals per FR-011)". |
| C3 | Underspecification | LOW | spec.md FR-008 | `/manifest` absence semantics (`notFound()` + footer `showManifestLink` gating) are defined in plan Step 3, data-model Entity 2 and TC-LTE-026, but FR-008 itself does not restate the normative rule. | Add one sentence to FR-008: "For projects without `data/manifest.json`, `/manifest` renders 404 and the footer omits the link." |
| C4 | Consistency | LOW | requirements-audit.md | Report reflects spec rev. 1 (header "PASS 100%", §3 patched for undrlla but §1 metric list unchanged). Historical stage artifact — acceptable with drift patch, but a re-run against rev. 2 would be cleaner. | Re-run the requirements audit after this analyze (or annotate header "applies to spec rev. 2"). |
| C5 | Operational readiness (M) | LOW | tasks.md Phase 5 | Lead route error handling stays `console.error`; no structured logging/metric emission task. For a static landing + single VPS this is acceptable, but the fallback analytics (dispatch success/failure counts) are worth one line. | Fold into T-016 acceptance: structured single-line log per dispatch outcome (`fallback` + sink status). |
| C6 | Consistency | LOW | plan.md Constitution Check bullet VII | Lists plan/tasks tags as "upcoming"; they now exist (`plan/003-.../v1`, `tasks/003-.../v1`, `test-design/003-.../v1`). | Update the bullet to past tense at next plan touch. |
| C7 | Supply chain (I) | LOW | package.json (existing) | Pre-existing floating `^` ranges (next, zod, tailwindcss). No NEW dependencies introduced by this feature (scaffold CLI uses node builtins only) — noted for the public-release hygiene pass, not a pipeline defect. | Pin exact versions in the public-release checklist (outside this feature's scope). |

No CRITICAL, no HIGH findings. All detection passes (A–M) otherwise clean; no TODO/TKTK placeholders; no stale `isUnderundre`/`undrlla` references outside removal instructions.

---

## Coverage Summary

| Requirement Key | Has Task? | Task IDs | Notes |
| :--- | :---: | :--- | :--- |
| `header-nav-ioc-theme-decoupling` (FR-001) | YES | T-003, T-004, T-005, T-023 | incl. theme-switcher key/namespace derivation |
| `footer-ioc-decoupling` (FR-002) | YES | T-003, T-004, T-006 | canonical FooterConfig + showLegalLinks/showManifestLink |
| `tailwind-v4-theme-tokens-8` (FR-003) | YES | T-015 | canonical 8-token set consistent spec/tasks/research |
| `bilingual-schema-data-layer` (FR-004) | YES | T-001, T-013, T-014 | LocalizedText {ru,en}; both language blocks extracted |
| `pluggable-lead-api-consumer-migration` (FR-005) | YES | T-016, T-017, T-024 | same-merge form migration; bounds/rate-limit/escaping in T-016 criteria |
| `statutory-privacy-policy` (FR-006) | YES | T-003, T-008 | legal config block + placeholders |
| `statutory-terms-of-service` (FR-007) | YES | T-003, T-009 | overridable escrow/warranty clauses |
| `statutory-manifesto` (FR-008) | YES | T-010, T-011, T-012 | + absence semantics via TC-LTE-026 |
| `interactive-scaffold-cli` (FR-009) | YES | T-019, T-022 | delimited registry append + pnpm validate + contrast warning |
| `canonical-starter-template` (FR-010) | YES | T-018 | incl. legal placeholders |
| `legacy-undrlla-decommission` (FR-011) | YES | T-023 | config, scripts, components, /economics, /api/waitlist |
| `zero-compilation-regressions` (NFR-001) | YES | T-020 | underundre + scaffolded brand matrix |
| `static-pre-rendered-performance` (NFR-002) | YES | T-021, T-025 | LCP/CLS evidence via T-025 |
| `wcag-contrast-accessibility` (NFR-003) | YES | T-008, T-009, T-011, T-025 | axe/Lighthouse task exists |
| `gnu-gplv3-licensing-notice` (NFR-004) | YES | T-002 | LICENSE [NEW] + NOTICE + package-lock cleanup |

**Total Requirement Coverage**: **100% (15 / 15 requirements covered by ≥ 1 task)**.

## Constitution Alignment Issues

- **Principle IX (Two-Phase Flow)**: deviation flagged as C1 (MEDIUM — see scope reasoning there). Rename before implement recommended.
- **Principles I, IV, V, VI, VII, VII-B**: aligned. VII tags for specify/requirements-audit/plan/tasks/test-design present; review wave tag `review/003-landing-template-engine/v1` present.
- **Principle XIII**: not applicable (internal product work, no commercial client intake).

## Commercial / Business Plan Alignment

- Plan files loaded: `undreplans/docs/projects/undreseller/undreseller-business-plan.md` v20.0; `undreplans/docs/projects/undrllanding-reusing-strategy.md` (cross-repo, both exist).
- Focus/hard laws checked: Demand Gate (fork outreach freeze, plan line 253) — not breached (no paid-fork offer); Secondary ICP White-Label alignment — direct fit; GPL-3.0 open-sourcing — strategy-doc-authorized.
- Findings: **no commercial drift**. One documented follow-up: business plan v20.1 changelog entry repositioning the Foundation $4,900 fork SKU vs the free public template (spec.md drift note 2026-10-30, review F11) — owner action, outside pipeline scope.

## Unmapped Tasks

*None.* T-026 (real-form lead E2E) maps to FR-005 as the consumer-contract guard; all remaining tasks map to US1–US5, FR-011, or verification gates.

## Metrics

- Total Requirements: 15 (11 Functional + 4 Non-Functional)
- Total Tasks: 26 (T-001…T-022 + T-023…T-026)
- Coverage %: **100%**
- Ambiguity count: 0
- Duplication count: 0
- CRITICAL count: 0
- HIGH count: 0
- MEDIUM count: 2
- LOW count: 5

## VERDICT

```yaml
verdict: PASS
reviewer: analyze
reviewed_at: 2026-10-30T22:40:00Z
commit: 90462b913adc799663147f2c6a14e77acc6f0da0
critical_count: 0
high_count: 0
medium_count: 2
low_count: 5
```

Note: PASS covers artifact consistency at rev. 2 (uncommitted working tree on top of `90462b9`). Findings C1/C2 are cheap pre-implement fixes; C3–C7 are polish.
