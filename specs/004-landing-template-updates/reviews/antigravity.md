# SpecKit Review: 004-landing-template-updates

**Reviewer**: antigravity
**Reviewed at**: 2026-11-02T04:45:00Z
**Commit**: 57e8b6a496ca4348f56b1ff51d94fcea1f9bd058
**Artifacts reviewed**: spec.md, plan.md, tasks.md, data-model.md, contracts/verify-gates.md, research.md, quickstart.md, requirements-audit.md, checklists/requirements.md, qa/preliminary-rtm.md, reviews/analyze.md, .specify/memory/constitution.md (v1.8.0), undreplans/docs/projects/undreading/undreading-business-plan.md (v2.5), undreseller-business-plan.md (v20.x), undrllanding-reusing-strategy.md, plus physical inspection of undrllanding codebase (app/, components/, lib/, projects/, context/, scripts/).

## Summary

Документационный комплект фичи `004-landing-template-updates` выглядит проработанным снаружи (детальный RTM, чеклист аудита ISO 29148, матрица гейтов V1–V4). Однако при инструментальном аудите кодовой базы и сопоставлении артефактов обнаружены две **CRITICAL** и три **HIGH** бреши.
Во-первых, в самой спецификации `spec.md` функциональные требования физически обрываются на `FR-009` — требования `FR-010` (модель локализации `LocalizedText {ru, en, uk?}`) и `FR-011` (пилот бренда `undreading`), на которые опираются план, задачи, аудит и analyze, в тексте спецификации **отсутствуют**.
Во-вторых, в коде `app/(default)/page.tsx:14-25` функция `generateMetadata()` дублирует и переопределяет метаданные `app/layout.tsx`, возвращая жесткую ссылку `icons: { icon: config.iconUrl, ... }` без учета новых полей `faviconUrl`/`appleIconUrl`. Из-за специфики Next.js App Router на главной странице браузеры продолжают скачивать тяжелый ассет (1.37 МБ), что де-факто нивелирует главный результат фичи (US1 / SC-001).
В-третьих, механизм переключения языков (`components/header-nav.tsx:56` и `context/lang-context.tsx:20`) захардкожен на бинарный `ru <-> en` и физически не позволяет пользователю активировать украинскую локаль `uk` для `undreading`.
В-четвертых, контракт гейта Gate V3 опирается на предположение, что билд Next.js отдает статический ru/en HTML в `.next`, тогда как в проекте роутинг моноязычный (App Router пререндерит только начальный дефолтный язык `ru`), делая проверку через простой grep файлов `.next` фиктивной.

## Findings

| ID | Severity | Area | Finding | Recommendation |
| --- | -------- | ---- | ------- | -------------- |
| F1 | **CRITICAL** | Specification Integrity | **В `spec.md` отсутствуют требования FR-010 и FR-011, на которые ссылается весь downstream.** В `specs/004-landing-template-updates/spec.md:112-120` секция Functional Requirements заканчивается на `FR-009: *(pilot brand — pending scope clarification)*`. При этом `plan.md:65,89`, `tasks.md:21,32`, `data-model.md:34`, `requirements-audit.md:39` и `analyze.md:32-33` напрямую валидируют и реализуют `FR-010` (расширение `LocalizedText` до `{ru, en, uk?}`) и `FR-011` (онбординг бренда `undreading`). Юридический фундамент фичи рассинхронизирован: код и план проектируют то, чего формально нет в спеке. | Дописать в `spec.md` секцию Functional Requirements точные формулировки `FR-010` и `FR-011`, зафиксированные в `requirements-audit.md` и `data-model.md`. Убрать пометку `pending scope clarification` из FR-009, так как скоуп пилота был утвержден еще на этапе clarify (Q1). |
| F2 | **CRITICAL** | Metadata / Next.js Routing | **`app/(default)/page.tsx` переопределяет метаданные и обнуляет оптимизацию favicon (US1 / SC-001).** В коммите `fcd5ef9` метаданные с `faviconUrl` и `appleIconUrl` были добавлены в `app/layout.tsx:28-32`. Однако на странице `app/(default)/page.tsx:14-25` объявлен собственный экспорт `generateMetadata()`, который жестко возвращает `icons: { icon: config.iconUrl, shortcut: config.iconUrl, apple: config.iconUrl }`. В Next.js App Router page metadata переопределяет layout metadata. На главной странице сайта браузер получает `<link rel="icon">` на 1.37 МБ `icon.svg`, а не на 5.5 КБ `icon-48.png`. Целевая метрика SC-001 (снижение веса до ≤10 KB) на проде не достигается. | Удалить переопределение `icons` из `app/(default)/page.tsx:14-25` (пусть наследуется из корневого `app/layout.tsx`), либо синхронизировать цепочку фолбэков `faviconUrl ?? iconUrl` и `appleIconUrl ?? faviconUrl ?? iconUrl`. Добавить в gate V2 автоматическую проверку финального `<head>` именно в скомпилированном `index.html`. |
| F3 | **HIGH** | i18n / UI Interaction | **Шапка сайта физически не умеет переключать три языка для `undreading`.** В `components/header-nav.tsx:56` функция переключения захардкожена: `const nextLang: Language = lang === "ru" ? "en" : "ru";`. На лендинге `undreading` посетитель не имеет никакой возможности выбрать украинский язык `uk`. Более того, в `context/lang-context.tsx:20-22` хук принудительно игнорирует любой язык, кроме `ru` и `en`: `if (saved === "ru" || saved === "en") setLangState(saved);` и использует легаси-ключ `undrlla_lang`. В `lib/i18n.ts` тип `Language` также объявлен строго как `"ru" | "en"`. | Расширить `Language = "ru" | "en" | "uk"` в `lib/i18n.ts`. В `ProjectConfig` добавить список поддерживаемых языков `supportedLocales?: Language[]` (по умолчанию `["ru", "en"]`, для `undreading` — `["ru", "en", "uk"]`). В `HeaderNav` переделать переключатель с бинарного toggle на циклический перебор или сегментированный контрол по `config.supportedLocales`. В `lang-context.tsx` исправить валидацию сохраненного языка. |
| F4 | **HIGH** | Verify Gates / Build Architecture | **Контракт Gate V3 (`verify-gates.md`) и задача T002 требуют валидации "ru/en HTML output", которого нет в `.next`.** В Next.js App Router данное приложение не использует динамические роуты локализации `/[lang]/`. Все страницы (`app/(default)/page.tsx`, `/manifest`, `/privacy`, `/terms`) компилируются на этапе `next build` в статический HTML исключительно с начальным серверным языком `ru` (дефолт `useState("ru")` в `LangProvider`). Статических файлов `en.html` или `uk.html` в `.next` физически не существует — перевод подставляется исключительно на клиенте в React Context. Требование Gate V3 («For undreading: every string with uk renders uk in rendered HTML») и T002 («Capture ru/en baseline .next HTML output») технически невыполнимо обычным сканированием директории `.next`. | Явно специфицировать механизм верификации Gate V3: либо генерация статических снимков для каждого языка специальным SSR-скриптом (по аналогии с `scripts/generate-preview.mjs --lang=...`), либо headless smoke-тест (Playwright), либо модульный тест функции `pick()` / контент-рендереров. Снять невыполнимое требование сканирования несуществующих мультиязычных файлов из `.next`. |
| F5 | **HIGH** | Data Schema / Content Types | **`LocalizedTextSchema` в `lib/schemas/content-schema.ts:15-18` запрещает `uk` и сломает валидацию JSON.** В схеме контента жестко зафиксировано: `export const LocalizedTextSchema = z.object({ ru: z.string().min(1), en: z.string().min(1) });`. При попытке запустить `loadPricingData("undreading")` или `loadFaqData("undreading")` с JSON-файлами, содержащими поле `"uk": "..."`, Zod в текущей конфигурации либо срежет `uk` (если не `passthrough`), либо TypeScript выдаст ошибку несовместимости типов в компонентах `GenericPricingView` и `GenericFaqView`, где `pick` типизирован локально как `(field: { ru: string; en: string })`. | Обновить `LocalizedTextSchema` в `lib/schemas/content-schema.ts`, добавив `uk: z.string().min(1).optional()`. Внести правку в `plan.md` и `data-model.md`. Унифицировать хелпер `pick()` как экспорт из `lib/i18n.ts`, удалив самописные копии `pick` из `generic-pricing-view.tsx`, `generic-faq-view.tsx` и `manifest-content.tsx`. |
| F6 | **HIGH** | Operational Readiness / CI | **Задача T006 ссылается на несуществующий CI workflow.** В `tasks.md:29` задача T006 гласит: `[OPS] US1 Wire npm run verify into CI before deploy: extend existing workflow`. В репозитории `undrllanding` полностью отсутствует папка `.github/` и нет ни одного файла CI workflow. Деплой проекта исторически осуществляется bash-скриптами на VPS (`deploy.sh`, `server-deploy.sh`). | Переформулировать T006: либо создать с нуля базовый GitHub Actions workflow `.github/workflows/ci.yml` (прогоняющий `validate`, `build`, `verify`), либо внедрить `npm run verify` как обязательный шаговой гейт в `deploy.sh` перед перезапуском Docker-контейнера. |
| F7 | **MEDIUM** | Route Architecture | **Коллизия переименования `app/icon.svg/route.ts` -> `app/icon/route.ts`.** В `plan.md:74` и `data-model.md:57` декларируется переименование роута в `app/icon/route.ts`, однако в `tasks.md` задачи на переименование нет. Если роут переименовать в `/icon`, сломается обратная совместимость со сторонними ссылками на `/icon.svg`, при том что ни один шаблон сейчас маршрут `/icon` не использует (все бренды берут иконку по прямому пути `/projects/<slug>/...`). | Зафиксировать решение: оставить роут как `app/icon.svg/route.ts` (поскольку MIME-маппинг внутри него уже реализован в `fcd5ef9`), либо добавить редирект с `/icon.svg` на `/icon` и явно отразить задачу в `tasks.md`. |
| F8 | **LOW** | Documentation / DX | **Смешение пакетных менеджеров в инструкциях.** Репозиторий зафиксирован на `pnpm` (`pnpm-lock.yaml`, `pnpm-workspace.yaml`). В `spec.md` используются команды `pnpm project:create`, `pnpm build`, тогда как в `plan.md`, `tasks.md` и `quickstart.md` команды записаны через `npm run verify`, `npm run build`. | Унифицировать документацию на использование `pnpm` во всех файлах спецификации и ранбуков. |

## Commercial / business plan notes

- **Plans loaded**:
  - `undreplans/docs/projects/undreading/undreading-business-plan.md` (v2.5) — коммерческий план пилотного бренда `undreading`.
  - `undreseller-business-plan.md` (v20.x) — контекст вторичного ICP (White-Label реселлеры).
  - `undrllanding-reusing-strategy.md` — стратегия шаблонизации движка.
- **Focus laws / SKU floors checked**:
  - Тарифная сетка для `undreading` в задаче T008 (PWYW $5/$12.99, Amazon KDP $24.99 EN/UK, Lulu DTC RU $24.99) строго соответствует §2 и §5 бизнес-плана `undreading` v2.5.
  - White-Label шаблон распространяется под GNU GPL-3.0 в соответствии с принятой стратегией (Option A + Option C). Платный закрытый контур (CRM, кастомные модули) не размывается бесплатным шаблоном.
- **Drift**: **Коммерческий дрейф отсутствует.** Ценовые полы соблюдены, монетизационные ссылки (Paddle, Amazon KDP) являются внешними и не требуют развертывания нового бэкенда.

## Alternative approaches considered

- **SSR-локализация против Client-side Context**: Текущая реализация мультиязычности через React Context в App Router приводит к тому, что статический HTML пререндерится только на одном языке (RU). Для поисковой оптимизации книжной платформы `undreading` и B2B-страниц `underundre` было бы эффективнее использовать локализацию на уровне App Router сегментов (например, `app/[lang]/page.tsx`) или cookie-based middleware rewrite. Однако, учитывая правило Via Negativa и запрет на неоправданный рерайт движка, для фичи 004 достаточно сохранить текущий стек, но снабдить верификатор `verify-gates.mjs` явным SSR-тест-рендерером, чтобы честно валидировать генерацию строк для `en` и `uk`.

## VERDICT

```yaml
verdict: CRITICAL
reviewer: antigravity
reviewed_at: 2026-11-02T04:45:00Z
commit: 57e8b6a496ca4348f56b1ff51d94fcea1f9bd058
critical_count: 2
high_count: 4
medium_count: 1
low_count: 1
```

*Блокирующие замечания (CRITICAL):*
1. **F1**: Синхронизировать `spec.md`, внеся требования `FR-010` (`LocalizedText {ru, en, uk?}`) и `FR-011` (`undreading` pilot brand), на которых держится весь downstream.
2. **F2**: Устранить переопределение `generateMetadata` в `app/(default)/page.tsx`, которое перебивает `app/layout.tsx` и заставляет главную страницу отдавать 1.37 МБ иконку вместо легковесного favicon.

*Замечания высокой важности (HIGH):*
Устранить бинарный засор языкового переключателя в `HeaderNav` (F3), актуализировать схему `LocalizedTextSchema` под `uk` (F5), формализовать методику проверки `Gate V3` в `verify-gates.md` (F4) и перепривязать T006 к реальному механизму сборки/деплоя (F6).
После устранения замечаний спецификация готова к повторному ревью и переходу в `/speckit.implement`.
