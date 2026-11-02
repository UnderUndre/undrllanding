# SpecKit Analyze: 004-landing-template-updates

**Reviewer**: analyze (ZCode self-consistency)
**Reviewed at**: 2026-11-02T03:55:00+04:00
**Commit**: c9c163f
**Artifacts**: spec.md, plan.md, tasks.md, research.md, data-model.md, contracts/verify-gates.md, quickstart.md, requirements-audit.md, qa/preliminary-rtm.md

## Findings

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| C1 | Coverage | MEDIUM | spec.md FR-005; contracts/verify-gates.md; tasks.md T005/T011 | FR-005 (logo chrome-free) проверяется только вручную (T011), хотя RTM планирует automated DOM assert; verify-gates V1–V3 контракт не включает FR-005 | Добавить в T005 gate V2а: grep JSX/выходного HTML на inline `background-color`/`border` в wrapper логотипа = 0, либо явно понизить до manual-only в RTM |
| C2 | Coverage | MEDIUM | spec.md NFR-002; tasks.md | LCP-regression check (Lighthouse compare из RTM) не отражён ни в одной задаче — T011 покрывает только quickstart-чеклист | Включить LCP-замер в T011 (manual, оба бренда) или в T006 CI job |
| F1 | Inconsistency | MEDIUM | tasks.md T008/T009; plan.md Phase 1 §5 | Тема undreading описана как «neutral placeholder until brand kit lands» — конкретные hex-токены не определены; критерий приёмки T008 по theme.css размыт | Закрепить: undreading theme.css использует палитру `_template` (#030712 / #2563eb) до появления бренд-бука; замена токенов — отдельная задача вне 004 |
| F2 | Inconsistency | LOW | plan.md Project Structure; 003 FR-004 | Два контент-слоя: underundre остаётся на `locales.ts` (TS), undreading стартует на JSON per 003 FR-004. Документированный транзишн, но в 004 не зафиксирован как осознанный | Добавить примечание в plan.md: миграция underundre на JSON — скоуп 003-задач, не 004 |
| F3 | Inconsistency | LOW | quickstart.md §4; contracts/verify-gates.md §CLI | quickstart показывает `npm run verify` без аргументов; контракт определяет `--brand` флаг; поведение verify без флага (default brand из env) в контракте оговорено, но в quickstart не различено | Одна строка в quickstart: default = `NEXT_PUBLIC_PROJECT_NAME` |
| G1 | Agent routing | LOW | tasks.md T003/T004 | Обе задачи помечены [FE], но T003 меняет `lib/` типы (по правилам file-path routing это ближе к [SETUP]/[BE]) | Допустимо: resolver — UI-смежный контракт; либо перекрасить T003 в [SETUP] |

## Coverage Summary

| Requirement Key | Has Task? | Task IDs | Notes |
|---|---|---|---|
| FR-001 config icon fields + fallback | ✅ | T001 | accepted baseline |
| FR-002 MIME map + 404 | ✅ | T001, T011 | 404-ветка — manual (quickstart curl) |
| FR-003 favicon ≤10 KB | ✅ | T001, T005 (V2) | automated size gate |
| FR-004 apple 180×180 | ✅ | T001, T005 (V2) | dimensions gate |
| FR-005 logo chrome-free | ⚠️ | T011 | automated assert отсутствует → C1 |
| FR-006 citations §1–7 + anchors | ✅ | T001, T005 (V1) | |
| FR-007 version token / no internal revisions | ✅ | T005 (V1) | |
| FR-008 icon source-of-truth | ✅ | T007, T005 (V2) | template fix + duplicate scan |
| FR-009 scaffold icon emission | ✅ | T007 | |
| FR-010 LocalizedText {ru,en,uk?} | ✅ | T003, T004, T005 (V3) | |
| FR-011 undreading pilot | ✅ | T008, T009, T010 | |
| NFR-001 tsc 0 errors | ✅ | T012 | |
| NFR-002 asset budgets + LCP | ⚠️ | T005 (V2), T011 | LCP-часть не атавана → C2 |
| NFR-003 additive compat byte-identical | ✅ | T002, T005 (V3) | |

## Constitution Alignment Issues

- None. Principle VI gate pending by design (эта команда — первый гейт; implement заблокирован до ≥2 внешних PASS). VII: теги spec/clarify/requirements-audit/plan/tasks проставлены (requirements-audit — вручную, вне ValidateSet скрипта).

## Commercial / Business Plan Alignment

- Plan files loaded: `undreplans/docs/projects/undreading/undreading-business-plan.md` v2.5; `undreseller-business-plan.md` v20.x (engine context)
- Focus/hard laws checked: undreading — не frozen-бренд, онбординг через шаблон соответствует white-label стратегии 003; цены пилота (PWYW $5/$12.99, KDP $24.99, Lulu DTC RU) взяты из §2 бизнес-плана v2.5 без искажений
- Findings: **No commercial drift detected.** Прайс-грид T008 дословно из плана v2.5; monetization surface (Paddle/KDP) — внешние ссылки, новых платёжных поверхностей движок не получает → plan UPDATE не требуется.

## Unmapped Tasks

- None. T002/T006/T012 — infrastructure-задачи, замаплены на NFR-003/NFR-001 и процесс гейтов.

## Metrics

- Total Requirements: 14 (11 FR + 3 NFR)
- Total Tasks: 12
- Coverage % (requirements with ≥1 task): 100% (12 полных, 2 частичных — C1/C2)
- Ambiguity count: 1 (F1)
- Duplication count: 0
- CRITICAL count: 0
- HIGH count: 0
- MEDIUM count: 3 (C1, C2, F1)
- LOW count: 3 (F2, F3, G1)

## VERDICT

```yaml
verdict: PASS
reviewer: analyze
reviewed_at: 2026-11-02T03:55:00+04:00
commit: c9c163f
critical_count: 0
high_count: 0
medium_count: 3
low_count: 3
```

**Примечание**: PASS с 3 MEDIUM. C1/C2/F1 рекомендуется закрыть точечными правками tasks.md/quickstart.md до `/speckit.implement` (правки разрешены — analyze read-only, фиксят обычные команды).

## Remediation Log (post-verdict edits, owner-approved 2026-11-02)

- **C1** → Gate V2a (logo chrome-free grep) добавлен в contracts/verify-gates.md и T005; T010 включает V2a для обоих брендов.
- **C2** → LCP spot-check (≤ 1.5 s, оба бренда) добавлен в T011.
- **F1** → theme.css undreading закреплён на палитре `_template` (#030712/#2563eb); свап токенов — вне 004.
- **F2** → plan.md Phase 1 §6: dual content layer задокументирован как осознанный, миграция underundre на JSON — 003-scope.
- **F3** → quickstart.md: default-brand поведение verify оговорено.
- **G1** → принят как есть ([FE] для i18n-резолвера).

Все MEDIUM/LOW findings закрыты или приняты. Verdict PASS подтверждается.
