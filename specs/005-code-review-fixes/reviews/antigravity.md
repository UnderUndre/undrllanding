# SpecKit Review: 005-code-review-fixes

**Reviewer**: antigravity
**Reviewed at**: 2026-11-02T22:45:00Z
**Commit**: 07a37258aa7e4f279aa9b82f1e1b0240f9eefc41
**Artifacts reviewed**: spec.md, plan.md, tasks.md, data-model.md, contracts/hardening.md, quickstart.md, research.md, requirements-audit.md, qa/preliminary-rtm.md, business-plan-waiver.md, reviews/analyze.md

## Summary

Повторный аудит после прочистки всех находок подтверждает: спецификация, план и контракты приведены в образцовый порядок. Протечка в CSP закрыта добавлением `connect-src` для Umami; путь к иконке защищен от бага с ведущим слэшем; тестовый гейт V3 теперь нормализует DOM без хэшей чанков; словарь `uk` очищен от мертвых ключей `revshare_*`; очистка карты лимитера получила троттлинг и FIFO-ограничитель; создан формальный `business-plan-waiver.md`. Все 10 замечаний устранены, вердикт изменен на PASS.

## Findings Disposition

| ID  | Severity | Area           | Finding & Remediation Status                                                                                                                                                                                | Verdict |
| --- | -------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| F1  | HIGH     | Security & CSP | `connect-src 'self' https://analytics.underundre.com;` добавлен в CSP в `spec.md`, `contracts/hardening.md`, `plan.md` и `data-model.md`. Учтена телеметрия Umami.                                       | FIXED   |
| F2  | HIGH     | Logic / Route  | В `data-model.md`, `plan.md`, `spec.md` и `tasks.md` зафиксирована санитизация ведущего слэша `config.iconUrl.replace(/^\/+/, '')` перед резолвингом. 404 на брендах предотвращен.                       | FIXED   |
| F3  | HIGH     | Test / Gates   | Контракт гейта V3 в `contracts/hardening.md`, `plan.md` и `tasks.md` обновлен: сравнивается нормализованный DOM с вырезанием `<script>` и RSC hydration payload (`self.__next_f`). CI защищен от фейла. | FIXED   |
| F4  | HIGH     | Consistency    | В `spec.md` и `tasks.md` T012 явно включено удаление блока `revshare_*` из словаря `uk` (`lib/i18n.ts:579-590`). TypeScript-ошибки исключены.                                                              | FIXED   |
| F5  | MEDIUM   | Performance    | Очистка карты лимитера в `data-model.md` и `plan.md` получила троттлинг (не чаще раза в 10с) и жесткий FIFO-кап при достижении 10k записей. Риск блокировки Event Loop устранен.                         | FIXED   |
| F6  | MEDIUM   | Context / API  | Определена явная цепочка фоллбэка IP (`LEAD_TRUSTED_IP_HEADER` -> `x-forwarded-for` first hop -> `127.0.0.1` dev) для окружений без edge-прокси Caddy.                                                   | FIXED   |
| F7  | MEDIUM   | Setup / Test   | В артефакты задачи T006 добавлен файл `vitest.config.ts` с маппингом путей `@/*` на корень репозитория.                                                                                                    | FIXED   |
| F8  | MEDIUM   | Ops / Docker   | В T014 зафиксировано обновление `Dockerfile` builder-стейджа до `RUN pnpm build` с сохранением поддержки `ARG NEXT_PUBLIC_PROJECT_NAME`.                                                                    | FIXED   |
| F9  | LOW      | Governance     | Создан файл `specs/005-code-review-fixes/business-plan-waiver.md` со ссылкой на Constitution VII-B.5.                                                                                                      | FIXED   |
| F10 | LOW      | Consistency    | В `spec.md`, `plan.md` и `tasks.md` T011 зафиксирован выброс ошибки на промах страницы бренда в `lib/project-pages.ts` (исключен тихий фоллбэк на чужой бренд).                                            | FIXED   |

## Commercial / business plan notes

- Plans loaded: `undreseller-business-plan.md` v20.x, `undreading-business-plan.md` v2.5 (reference context).
- Business plan waiver: `specs/005-code-review-fixes/business-plan-waiver.md` loaded (Constitution VII-B.5).
- Focus laws / SKU floors: Chore-only feature, brand surface and pricing unchanged.
- Drift: None detected.

## VERDICT

```yaml
verdict: PASS
reviewer: antigravity
reviewed_at: 2026-11-02T22:45:00Z
commit: 07a37258aa7e4f279aa9b82f1e1b0240f9eefc41
critical_count: 0
high_count: 0
medium_count: 0
low_count: 0
```
