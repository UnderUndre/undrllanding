# SpecKit Analyze: 007-referral-program

**Reviewer**: analyze (ZCode self-consistency)
**Reviewed at**: 2026-11-09T04:30:00+04:00
**Commit**: 032a480
**Artifacts**: spec.md, plan.md, research.md, data-model.md, quickstart.md, tasks.md, checklists/requirements.md

## Findings

| ID | Category | Severity | Location(s) | Summary | Recommendation |
|----|----------|----------|-------------|---------|----------------|
| F1 | Commercial drift | HIGH | spec.md FR-003/D6; plan.md D6; US2-AC1 | База скидки −$50 не определена: применяется к пилотному чеку $350 или стандартному $490? Стекуется ли с другими промо? Это money-path: без строки «к какой цене» приёмка US2 недетерминирована, и есть риск пробить price floor плана ($350 − $50 − будущие промо) | Зафиксировать: скидка применяется к фактически выставленному счёту один раз, не суммируется с другими промо; пример: пилот $350 → $300 |
| C1 | Coverage | MEDIUM | spec.md NFR-002; tasks.md T007 | Perf-часть NFR-002 (LCP ≤ 1.5 s, ≤ 5 KB gz JS) не отражена в задачах — только функциональный walkthrough | Добавить LCP/bundle-замер в T007 manual acceptance |
| C2 | Ambiguity | MEDIUM | spec.md D3; US3 | «Профильное комьюнити» как платформа отзыва — критерий элигибельности не определен (какой пост считать проверяемым?) | Критерий: публичный, индексируемый/открываемый по URL пост под реальным именем; модерация — решением владельца |
| C3 | Underspecification | MEDIUM | spec.md D6/US3-AC1 | «+$25 service credit» для клиента — механика не определена (на что, срок, однократность) | Определить: кредит на любой следующий сервис, 6 месяцев, однократный, гасится вручную в счёте |
| L1 | Inconsistency | LOW | spec.md FR-004 vs plan.md D3 | FR-004: «markdown in repo or clients workspace»; план пинит `undreplans` (private). Синхронизировать формулировку спеки | Спека: «private plans repo (undreplans), никогда не публичный репо» |
| L2 | Underspecification | LOW | tasks.md T002 | «Zod schema extension if typed» — «if» делает задачу недетерминированной | Определить: расширить схему опциональным `referral` полем (type-safe passthrough), не «if» |

## Coverage Summary

| Requirement Key | Has Task? | Task IDs | Notes |
|---|---|---|---|
| FR-001 mint page client-side | ✅ | T003, T004 | |
| FR-002 ?ref capture → metadata | ✅ | T001, T002 | |
| FR-003 rules copy + caps | ✅ | T003 | |
| FR-004 payout ledger | ✅ | T006 | |
| FR-005 anti-fraud rejection | ✅ | T006 (rejected-log), T007 | manual process |
| FR-006 wallet PII minimization | ✅ | T005 (V5 grep), T006 (private repo) | |
| FR-007 bilingual copy | ✅ | T004, T005 (V5 keys) | |
| NFR-001 typecheck | ✅ | T008 | |
| NFR-002 static perf budgets | ⚠️ | T007 (после фикса C1) | |
| NFR-003 no backend/API change | ✅ | T001/T002 by design | |
| NFR-004 zero PII in public repo | ✅ | T005 (V5) | |

## Constitution Alignment Issues

- None. Principle VI: analyze — первый гейт, implement заблокирован до ≥2 внешних PASS. XV (narrative): T004 явно требует first-person копи. VII: теги spec/plan/tasks проставлены.

## Commercial / Business Plan Alignment

- Plan files loaded: `undreseller-business-plan.md` v20.x (bureau pricing context), undreading plan v2.5 (не затронут)
- Findings: **F1 (HIGH)** — база скидки и стекинг с промо не определены; при пилоте $350 скидка даёт $300 — floor-риск при будущих промо должен быть закрыт явным no-stack правилом. Остальное: реферальная механика новых SKU не создаёт, выплаты ≤ $150/клиент в пределах CAC-логики trigger-GTM.

## Unmapped Tasks

- None. T006/T008 — operational/infrastructure, замаплены на FR-004/NFR-001.

## Metrics

- Total Requirements: 11 (7 FR + 4 NFR)
- Total Tasks: 8
- Coverage %: 100% (9 полных, 1 частичная — NFR-002 до C1)
- Ambiguity count: 2 (C2, C3)
- Duplication count: 0
- CRITICAL count: 0
- HIGH count: 1 (F1)
- MEDIUM count: 3 (C1, C2, C3)
- LOW count: 2 (L1, L2)

## VERDICT

```yaml
verdict: MEDIUM
reviewer: analyze
reviewed_at: 2026-11-09T04:30:00+04:00
commit: 032a480
critical_count: 0
high_count: 1
medium_count: 3
low_count: 2
```

**Примечание**: MEDIUM-вердикт — proceed only with explicit acceptance. F1 (money-path) обязан быть закрыт до implement.

## Remediation Log (post-verdict fixes, owner-approved 2026-11-09 — «правь и крути пайплайн»)

- **F1 (HIGH)** → spec FR-003 + plan D7: скидка −$50 к фактической сумме счёта, один раз на конвертированного клиента, no-stack с другими промо (пилот $350 → $300); credit-механика: single-use, любой следующий сервис, 6 мес, ручное применение.
- **C1** → T007 дополнен Lighthouse LCP ≤ 1.5 s и ≤ 5 KB gz замерами на `/referral`.
- **C2** → spec FR-005: критерий элигибельности отзыва — публичный retrievable-by-URL пост под реальным именем; «профильное комьюнити» — решением владельца.
- **C3** → закрыт вместе с F1 (credit-механика в FR-003).
- **L1** → spec FR-004 синхронизирован: ledger в приватном `undreplans`, никогда не публичный репо.
- **L2** → T002: безусловное расширение Zod-схемы опциональным typed `referral`.

Все HIGH/MEDIUM/LOW закрыты. Эффективный вердикт после фиксов: **PASS** (0 CRITICAL / 0 HIGH / 0 MEDIUM open).
