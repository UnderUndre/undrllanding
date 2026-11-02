# SpecKit Analyze: 005-code-review-fixes

**Reviewer**: analyze (ZCode self-consistency)
**Reviewed at**: 2026-11-02T17:10:00Z
**Commit**: c94c279 (branch `specs/005-code-review-fixes`)
**Artifacts**: spec.md, plan.md, tasks.md, data-model.md, contracts/hardening.md, quickstart.md, research.md, requirements-audit.md, qa/preliminary-rtm.md, checklists/requirements.md

## Findings

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| G1 | Agent routing | MEDIUM | tasks.md T011, T012 | Tag/file mismatch: T011 ([FE]) модифицирует `lib/project-config.ts` и `lib/schemas/content-loaders.ts`, T012 ([FE]) — `lib/i18n.ts`; по правилам file-path routing это `[BE]`/`[SETUP]`-территория. Прецедент 003-G1 (i18n-смежное принято как [FE]) — но здесь чистые lib-модули без UI. | Перекрасить T011/T012 в `[BE]` (или оставить [FE] с одной строкой обоснования, как в 003 G1). Правка допустима обычной командой до implement. |
| F1 | Inconsistency | LOW | plan.md Project Structure | Строка `components/header-nav.tsx # MODIFY: sun icon done; nothing here in 005 except no-op check` — файл перечислен как MODIFY, но изменений нет (иконка починена в `ab2c316` до этой фичи). Шум в карте файлов. | Удалить строку из списка plan.md. |
| L1 | Regulatory/ops | LOW | contracts/hardening.md §2, tasks T004 | Dual-CPS merge note: глобальный CSP (T002) + per-route SVG CSP (T004) дают два CSP-заголовка на `/icon.svg`; браузеры применяют конъюнкцию (strict-сторона — безопасно), но поведение стоит зафиксировать одной строкой в контракте §2. | Добавить примечание в contracts/hardening.md §2 при первой правке артефактов. |
| I1 | Supply chain | LOW | plan.md NFR-002, research R-03 | vitest добавляется dev-зависимостью; правило пиннинга (S-10, FR-015) зафиксировано только для `next`. Рекомендация: в T006 пиновать vitest точной версией тоже (дев-рандомизация ломает воспроизводимость CI). | Одно слово в T006: «vitest (pinned exact)». |
| M1 | Operational readiness | LOW | tasks T016 | Rollback-стратегия для headers/CSP не задокументирована (для лендинга = `git revert` + редеплой через deploy.sh, RTO минуты). Отсутствие явной записи — не риск для статики, но M-пасс требует строки. | Одна строка в quickstart/T016: «rollback: git revert + redeploy». |
| E1 | Coverage | LOW | spec NFR-003, tasks T015 | NFR-003 (additive brand contract) верифицируется только через T015 manual quickstart §5 (scaffold+build smoke демо-бренда); автоматической задачи нет. Для техдолг-фичи приемлемо. | Принять как есть; при желании T007 может добавить scaffold-smoke в verify-gates. |

## Coverage Summary

| Requirement Key | Has Task? | Task IDs | Notes |
|---|---|---|---|
| FR-001 scaffold validation + safe substitution | ✅ | T009 | quickstart §5 |
| FR-002 snapshot/rollback | ✅ | T010 | failure simulation |
| FR-003 trusted-header rate limiter + eviction | ✅ | T003, T006 | RTM High (16): BVA + негативные |
| FR-004 security headers enforcing | ✅ | T002, T008 | curl-матрица |
| FR-005 icon route re-anchor/allowlist/async/CSP | ✅ | T004 | per-route CSP |
| FR-006 vitest contour | ✅ | T006 | 6 тест-файлов по контракту |
| FR-007 verify-gates.mjs (V1/V2/V2a/V3) | ✅ | T007 | 004 contract + hand-off #2 |
| FR-008 metadata bounds + Content-Length | ✅ | T005, T006 | BVA 49/50/51 |
| FR-009 typed errors вместо process.exit | ✅ | T011, T006 | grep=0 gate |
| FR-010 build fail на registry miss | ✅ | T011, T006 | alias сохранён |
| FR-011 dead code removal | ✅ | T012 | grep=0 на каждый блок |
| FR-012 runner env + /api/hello removal | ✅ | T014 | |
| FR-013 gitleaks hook + .history/ scan | ✅ | T001 | hand-off #1 allowlist |
| FR-014 field-paths errors + href allowlist | ✅ | T005 | |
| FR-015 pin next + patches/README | ✅ | T014 | S-10 |
| FR-016 preview slug validation + ignores | ✅ | T014 | |
| FR-017 form AbortController | ✅ | T013 | |
| FR-018 metadata dedup | ✅ | T014 | |
| NFR-001 pipeline green + byte-identity | ✅ | T008, T016 | V3 body-only |
| NFR-002 vitest dev-only | ✅ | T006 | |
| NFR-003 additive brand contract | ✅ | T015 (manual), T016 | см. E1 |
| US1 token rotation verification | ✅ | T001, T015 | owner action (Q4) |
| US2 scaffold safety | ✅ | T009, T010, T015 | |
| US3 perimeter | ✅ | T002, T003, T004, T005, T015 | |
| US4 test contour | ✅ | T006, T007, T008 | |
| US5 hygiene | ✅ | T011–T014, T015 | |

## Constitution Alignment Issues

- None. Principle VII: полный тег-контур `spec/`, `clarify/`, `requirements-audit/`, `plan/`, `tasks/` v1 присутствует (requirements-audit — вручную, ValidateSet-гэп известен с 004). Principle VI: pending by design — эта команда и есть первый гейт. Principle XII: фича закрывает собственный долг (T006/T007 = автоматический контур 2.5/5.5).

## Commercial / Business Plan Alignment

- Plan files loaded: `docs/reviews/*` (техдолг-контекст); бизнес-планы — `undreseller-business-plan.md` v20.x, `undreading-business-plan.md` v2.5 (референс).
- Focus/hard laws: n/a — feature chore-only (hardening), не монетизирована, brand-facing surface не меняется (кроме response-заголовков).
- Findings: **No commercial drift detected.**

## Unmapped Tasks

- None. T016 мапится на SC-002/SC-003 + NFR-001 (сквозной пайплайн + ре-аудит).

## Metrics

- Total Requirements: 21 (18 FR + 3 NFR) + 5 US
- Total Tasks: 16
- Coverage % (requirements with ≥1 task): 100%
- Ambiguity count: 0
- Duplication count: 0 (кросс-референсы S-04/05/06 → FR-005 и F-07 → FR-003 заданы в Disposition Map намеренно)
- CRITICAL count: 0
- HIGH count: 0
- MEDIUM count: 1 (G1)
- LOW count: 5 (F1, L1, I1, M1, E1)

## VERDICT

```yaml
verdict: PASS
reviewer: analyze
reviewed_at: 2026-11-02T17:10:00Z
commit: c94c279
critical_count: 0
high_count: 0
medium_count: 1
low_count: 5
```

**Примечание**: PASS с 1 MEDIUM (G1 — перекраска тегов T011/T012) и 5 LOW. Все точки — косметика артефактов, правятся одной командой до `/speckit.implement`; ни одна не блокирует реализацию.
