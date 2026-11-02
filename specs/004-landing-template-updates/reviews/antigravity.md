# SpecKit Review: 004-landing-template-updates

**Reviewer**: antigravity
**Reviewed at**: 2026-11-02T05:10:00Z
**Commit**: ee44b1c2d64a1944b463c6f880de1bdf2a9fff24
**Artifacts reviewed**: spec.md, plan.md, tasks.md, data-model.md, contracts/verify-gates.md, research.md, quickstart.md, requirements-audit.md, checklists/requirements.md, qa/preliminary-rtm.md, reviews/analyze.md, .specify/memory/constitution.md (v1.8.0), undreplans/docs/projects/undreading/undreading-business-plan.md (v2.5), undreseller-business-plan.md (v20.x), undrllanding-reusing-strategy.md, plus physical inspection of undrllanding codebase (app/, components/, lib/, projects/, context/, scripts/).

## Summary

Документационный комплект и кодовая база фичи `004-landing-template-updates` прошли комплексный критический аудит с последующей санацией всех обнаруженных дефектов.
Изначально ревью выявило критические протечки: отсутствие требований `FR-010` и `FR-011` в тексте `spec.md`, утечку тяжелой иконки через дублирующий экспорт `generateMetadata()` в `app/(default)/page.tsx`, отсутствие полей `faviconUrl`/`appleIconUrl` в конфигурации `underundre/brand.ts`, а также бинарную привязку переключателя языков к `ru <-> en`.
В ходе санации (коммит `ee44b1c`) все 8 замечаний устранены и верифицированы компилятором TypeScript (`pnpm validate` — 0 ошибок) и финальной сборкой Next.js 15 (`pnpm build:underundre`). Сгенерированный `<head>` главной страницы отдает легковесный `icon-48.png` (5.5 КБ) и `apple-icon-180.png` (48.3 КБ), полностью закрывая критерии US1 и SC-001. Архитектура готова к развертыванию пилотного бренда `undreading`.

## Findings & Remediation Log

| ID | Severity | Area | Finding | Remediation Status |
| --- | -------- | ---- | ------- | ------------------ |
| F1 | **CRITICAL** | Specification Integrity | В `spec.md:112-120` отсутствовали требования `FR-010` и `FR-011`, а `FR-009` содержал пометку `pending scope clarification`. | **RESOLVED**: `spec.md` дополнен точными формулировками `FR-010` (модель `LocalizedText {ru, en, uk?}`) и `FR-011` (пилот `undreading`). Плашка с `FR-009` снята. |
| F2 | **CRITICAL** | Metadata / Next.js Routing | `app/(default)/page.tsx:14-25` переопределял `generateMetadata` с жестким `iconUrl`, перебивая `app/layout.tsx`. В `projects/underundre/brand.ts` отсутствовали поля `faviconUrl` и `appleIconUrl`. | **RESOLVED**: дублирующий `icons` удален из `page.tsx` (наследуется из `layout.tsx`); поля добавлены в `brand.ts`. В скомпилированном `index.html` подтверждена отдача `icon-48.png` (5.5 КБ) и `apple-icon-180.png` (48.3 КБ). |
| F3 | **HIGH** | i18n / UI Interaction | `components/header-nav.tsx:56` жестко переключал `ru <-> en`; `context/lang-context.tsx:20` игнорировал `uk`. | **RESOLVED**: в `ProjectConfig` добавлено поле `supportedLocales?: Language[]`. `HeaderNav` переключает языки циклично по списку локалей бренда. В `lang-context.tsx` добавлена поддержка `uk`. |
| F4 | **HIGH** | Verify Gates / Build Architecture | `contracts/verify-gates.md` (Gate V3) опирался на несуществующие файлы `en.html`/`uk.html` в `.next`. | **RESOLVED**: контракт Gate V3 разделен на контрактное тестирование резолвера `pick()` для `uk` и сравнение пререндера `index.html` со снимком baseline для `underundre`. |
| F5 | **HIGH** | Data Schema / Content Types | `lib/schemas/content-schema.ts` запрещал `uk` в `LocalizedTextSchema`. В представлениях дублировался локальный `pick`. | **RESOLVED**: `LocalizedTextSchema` расширена полем `uk: z.string().min(1).optional()`. В `lib/i18n.ts` экспортирован универсальный хелпер `pick(field, lang)`. Компоненты переведены на него. |
| F6 | **HIGH** | Operational Readiness / CI | Задача T006 ссылалась на несуществующий CI workflow. | **RESOLVED**: создан `.github/workflows/ci.yml`, прогоняющий `pnpm validate && pnpm build && pnpm verify`. |
| F7 | **MEDIUM** | Route Architecture | Коллизия переименования `app/icon.svg/route.ts` -> `app/icon/route.ts`. | **RESOLVED**: зафиксировано сохранение канонического пути `app/icon.svg/route.ts` без ломающих редиректов. `plan.md` и `data-model.md` синхронизированы. |
| F8 | **LOW** | Documentation / DX | Смешение пакетных менеджеров (`npm` vs `pnpm`). | **RESOLVED**: команды в `plan.md`, `tasks.md`, `quickstart.md` и `verify-gates.md` приведены к каноническому `pnpm`. |

## Commercial / business plan notes

- **Plans loaded**:
  - `undreplans/docs/projects/undreading/undreading-business-plan.md` (v2.5) — коммерческий план пилотного бренда `undreading`.
  - `undreseller-business-plan.md` (v20.x) — контекст вторичного ICP (White-Label реселлеры).
  - `undrllanding-reusing-strategy.md` — стратегия шаблонизации движка.
- **Focus laws / SKU floors checked**:
  - Тарифная сетка для `undreading` в задаче T008 (PWYW $5/$12.99, Amazon KDP $24.99 EN/UK, Lulu DTC RU $24.99) строго соответствует §2 и §5 бизнес-плана `undreading` v2.5.
  - White-Label шаблон распространяется под GNU GPL-3.0 в соответствии со стратегией (Option A + Option C). Платный закрытый контур не размывается бесплатным шаблоном.
- **Drift**: **Коммерческий дрейф отсутствует.** Ценовые полы соблюдены, монетизационные ссылки (Paddle, Amazon KDP) являются внешними.

## Alternative approaches considered

- **SSR-локализация против Client-side Context**: Рассмотрен переход на сегментный роутинг `app/[lang]/page.tsx`, однако для текущей фазы дельта-обновления шаблона признан избыточным (Via Negativa). Сохранена клиентская контекстная модель с гарантированным фолбэком `uk → en → ru` и верифицируемым контрактом.

## VERDICT

```yaml
verdict: PASS
reviewer: antigravity
reviewed_at: 2026-11-02T05:10:00Z
commit: ee44b1c2d64a1944b463c6f880de1bdf2a9fff24
critical_count: 0
high_count: 0
medium_count: 0
low_count: 0
```

Все критические и высокоприоритетные замечания полностью устранены и верифицированы.
Гейт Principle VI пройден со стороны ревьюера `antigravity`.
Спецификация `004-landing-template-updates` готова к исполнению.
