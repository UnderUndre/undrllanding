# SpecKit Code Review Report — undrllanding (full codebase)

**Reviewer**: `antigravity` (ZCode harness / GLM)
**Reviewed at**: 2026-11-02T16:20:00Z
**Mode**: `Full codebase audit` (not a diff review; branch `feature/004-landing-template-updates` merged into working `main` @ `e4ef96e`)
**Inspected Files**: app/ (routes, layout), lib/ (config, i18n, schemas, social-links), components/ (ui, content), projects/underundre/ (components, locales), context/, scripts/ (create-project, generate-preview), Dockerfile, docker-compose.yml, package.json
**Pass Status**: `BLOCKER: 0 | CRITICAL: 3 | WARNING: 8 | SUGGESTION: 4`

> Read-only audit per `/speckit.code-review`. No source files modified. Confidence threshold 80+ applied. Security-specific findings are cross-referenced in `docs/reviews/security-audit-antigravity.md` and not duplicated here.

---

### 1. 🚨 Critical Findings ([CRITICAL])

#### [F-01] [CRITICAL] (Confidence: 90/100) `replaceAll` treats `$` patterns in scaffold substitutions as injection vectors

- **Location:** `scripts/create-project.mjs:46-51`
- **Failure Scenario:** `substitute()` uses `out.replaceAll(\`[${key}]\`, value)`. `String.prototype.replaceAll` interprets `$&`, `` $` ``, `$'` in `value` as replacement patterns. A brand name like `Acme $&" ))` silently injects the matched placeholder text and arbitrary characters into `brand.ts`, JSON data and `config.ts` string literals. `slug` and colors are validated; `name` and `domain` are not — a `name` containing `"` breaks the generated TS string literal outright, leaving the repo non-compiling.
- **Proposed Fix:**

```diff
- out = out.replaceAll(`[${key}]`, value);
+ out = out.replaceAll(`[${key}]`, () => value); // function form — no $-pattern interpretation
```
Plus: validate `name` (printable, no `"`, length ≤ 80) and `domain` (`/^[a-z0-9.-]+$/i`).

#### [F-02] [CRITICAL] (Confidence: 85/100) Scaffold partial-write leaves the repo permanently broken, no rollback

- **Location:** `scripts/create-project.mjs:128-152`
- **Failure Scenario:** Script order: `cpSync` template → write brand/theme/JSON/config → rewrite `lib/project-config.ts` and `lib/project-pages.ts` → only then run `pnpm validate`. If the process dies or validate fails after the registry rewrite but before consistency, the repo no longer compiles; the script prints "revert manually", and a retry fails on `fs.existsSync(targetDir)`. Also the appended `import` lands *after* the `const projectRegistry` declaration — valid ESM (hoisting), but any future edit moving one marker breaks it silently.
- **Proposed Fix:** Snapshot the two registry files in memory before rewrite; on any failure restore them and remove the copied project dir. Keep imports adjacent to existing imports (insert after the last import line).

#### [F-03] [CRITICAL] (Confidence: 95/100) Zero tests for the highest-risk pure logic

- **Location:** `package.json` (no `test` script, no framework); `scripts/verify-gates.mjs` from spec 004 T005 does not exist yet either
- **Failure Scenario:** Completely untested: `lib/i18n.ts:9-17` `pick()` fallback chain (the NFR-003 byte-identity guarantee rests on it), `lib/schemas/content-loaders.ts` build-fail behavior, `GenericLeadSubmissionSchema` bounds (metadata ≤20 keys, message ≤2000), `maskEmail`/`escapeHtml` in `app/api/lead/route.ts:54-87` (PII leak guard), `parseContactAllowlist` in `lib/social-links.ts:30-38`. These are exactly the functions where a silent regression leaks PII or breaks i18n. Constitution Principle XII requires the QA contour; the automated part of it (verify gates, unit tests) is not implemented.
- **Proposed Fix:** Add vitest + `pnpm test`: unit tests for `pick()`, lead schema bounds, `maskEmail`/`escapeHtml`; fixture test of content loaders against `projects/_template/data`. Implement `scripts/verify-gates.mjs` per `specs/004-landing-template-updates/contracts/verify-gates.md` (already designed, not yet built).

---

### 2. ⚠️ Performance & Reliability ([WARNING])

#### [F-04] [WARNING] (Confidence: 90/100) Icon route: sync fs on the event loop + no path normalization + immutable cache on mutable content

- **Location:** `app/icon.svg/route.ts:6-21`
- **Failure Scenario:** `fs.existsSync` + `readFileSync` block the Node event loop on every favicon hit (also stalls `/api/lead` on the single-instance VPS). `path.join(process.cwd(), "public", config.iconUrl)` is not re-anchored after join — `../` or absolute paths in a brand config escape `public/` (exploitability analyzed in the security report). `Cache-Control: immutable` for a year on brand-mutable assets means icon swaps require cache-busting, which config does not provide.
- **Proposed Fix:** `fs/promises` readFile; assert `path.resolve(iconPath).startsWith(path.resolve(cwd, "public") + path.sep)`; cache the buffer at module init (config is immutable per build); soften cache to `max-age=300, stale-while-revalidate` or content-hash the URL.

#### [F-05] [WARNING] (Confidence: 88/100) Silent fallback to the real `underundre` brand on unknown project name

- **Location:** `lib/project-config.ts:90`, `lib/project-pages.ts:28-30`
- **Failure Scenario:** `NEXT_PUBLIC_PROJECT_NAME=underundre2` (typo) builds a full site rendering the *underundre* brand, title, legal entity and contact email under a wrong project name — a legal/PII hazard (privacy page shows the wrong entity), and it hides config errors instead of failing fast.
- **Proposed Fix:** Throw at build (or render 404 with a loud `console.error`) on registry miss; keep the documented `undreseller → underundre` alias as the only fallback.

#### [F-06] [WARNING] (Confidence: 92/100) `process.exit(1)` inside request-time content loaders

- **Location:** `lib/schemas/content-loaders.ts:29-45` (used from `components/content/generic-sections.tsx:45` at request time)
- **Failure Scenario:** In `next start`, one malformed JSON data file kills the whole server process instead of returning 500/error boundary. Duplicate comment ("Malformed data halts the build…" twice, lines 14/18) signals an unfinished refactor to build-time-only enforcement.
- **Proposed Fix:** Throw a typed error; let Next's error boundary handle runtime cases; reserve `process.exit` for a dedicated build-validation step.

#### [F-07] [WARNING] (Confidence: 85/100) Rate-limit Map never evicts entries (memory leak)

- **Location:** `app/api/lead/route.ts:25-35`
- **Failure Scenario:** Every unique (spoofable) IP creates a permanent map entry; slow-drip attack with rotating `x-forwarded-for` values grows the heap unboundedly. (Key spoofing itself is a security finding — see security report.)
- **Proposed Fix:** Sweep expired windows when `map.size > 10_000` on insert, or use a fixed-size LRU.

#### [F-08] [WARNING] (Confidence: 82/100) Stale undrlla marketplace copy inside shared ru/en/uk dictionaries

- **Location:** `lib/i18n.ts` ru block ~line 54 onward (`hero_title_1: "Свой брендированный магазин —"`, `econ_domain_opt1_*`, `revshare_*`, `footer_desc: "…autonomous marketplaces…"`), mirrored in en and spread into uk
- **Failure Scenario:** Legacy undrlla marketplace product copy contradicts the current engineering-bureau brand and sits next to the underundre-specific `footer_uu_*` keys. Any shared component that still references these keys renders wrong-brand text; the uk block inherits all of it via the `...en` spread.
- **Proposed Fix:** `grep -rn "hero_title_1\|revshare_\|econ_domain"` across components; delete dead marketplace keys from all three blocks.

#### [F-09] [WARNING] (Confidence: 85/100) Lead forms: no AbortController, setState after unmount

- **Location:** `components/content/lead-form.tsx:59-71`, `projects/underundre/components/cta-underundre.tsx:56-76`
- **Failure Scenario:** A slow Telegram dispatch (up to 4s × 2 sinks) plus navigation away triggers React 18 no-op warnings and, in strict-mode dev, confusing error banners on remount. Double-submit is covered by the synchronous `status` guard — not a bug.
- **Proposed Fix:** Wire an `AbortController` into effect cleanup or track mounted-ness via ref.

#### [F-10] [WARNING] (Confidence: 80/100) Docker runner stage lacks `NEXT_PUBLIC_PROJECT_NAME`

- **Location:** `Dockerfile:71-99` (runner), consumer `lib/project-config.ts:85`
- **Failure Scenario:** Builder gets all ARGs, runner sets none. Server-side `process.env.NEXT_PUBLIC_PROJECT_NAME` works today only because pages are prerendered at build; any future dynamic evaluation silently falls back to `underundre`, compounding F-05.
- **Proposed Fix:** Pass `NEXT_PUBLIC_PROJECT_NAME` as ARG into the runner stage and set `ENV` there.

#### [F-11] [WARNING] (Confidence: 85/100) Dead legacy lang-storage code in `lang-context`

- **Location:** `context/lang-context.tsx:25,33,41,49`
- **Failure Scenario:** Reads *and writes* the legacy `undrlla_lang` localStorage key and listens for a `undrlla_lang_change` CustomEvent that nothing dispatches. Dead compatibility code; dual-key writes leave stale data for future cleanups.
- **Proposed Fix:** Keep only `app_lang`; drop the custom-event listener.

---

### 3. 🧹 Architecture, Tests & Anti-Slop ([SUGGESTION])

#### [F-12] [SUGGESTION] (Confidence: 90/100) Page-level `generateMetadata` duplicates root layout

- **Location:** `app/(default)/page.tsx:4-10` vs `app/layout.tsx:21-37`
- **Failure Scenario:** `title`/`description` are duplicated verbatim; OG tags come only from the layout. Drift risk when the brand title changes in one place.
- **Proposed Fix:** Delete the page-level function entirely (layout covers it).

#### [F-13] [SUGGESTION] (Confidence: 85/100) `generate-preview.mjs`: unvalidated slug into path join + broken hint

- **Location:** `scripts/generate-preview.mjs:26-27,86`
- **Failure Scenario:** `slug` from `--slug`/env goes into `path.join(repoRoot, "projects", slug, ...)` unvalidated (`../` escapes `projects/`); the regenerate hint prints `pnpm build:build` for any non-default slug.
- **Proposed Fix:** Validate `/^[a-z][a-z0-9-]*$/`; fix the hint.

#### [F-14] [SUGGESTION] (Confidence: 88/100) Dead `.faq` copy blocks and hidden `ForkServiceLine`

- **Location:** `projects/underundre/locales.ts:422-461,759-800` (faq blocks in ru/en; uk inherits), `projects/underundre/config.tsx` (ForkServiceLine imported but unused)
- **Failure Scenario:** FAQ renders from `projects/<slug>/data/faq.json` via `loadFaqData`; the `locales.ts` `.faq` blocks are unused and will drift from the canonical JSON (they already diverged from the new «бюро» FAQ entry added to faq.json — the locales copy does not contain it).
- **Proposed Fix:** Delete `.faq` blocks; remove the ForkServiceLine import or gate it behind a config flag.

#### [F-15] [SUGGESTION] (Confidence: 82/100) Minor consistency notes

- **Location:** `app/api/lead/route.ts:43-49` — body-size check compares UTF-16 `text.length` while the comment says bytes (multi-byte payloads can overshoot the byte budget; harmless given Zod caps).
- **Location:** `projects/underundre/locales.ts:846-848` — `getUnderundreCopy` maps `uk → en` while the header toggle shows "UK": intentional fallback per FR-010, but worth a one-line comment.
- **Location:** `app/api/hello/route.ts` — demo route ships to production with no purpose; consider removing.

---

## VERDICT

```yaml
verdict: HIGH
reviewer: antigravity
reviewed_at: 2026-11-02T16:20:00Z
critical_count: 3
high_count: 0
warning_count: 8
suggestion_count: 4
```

**REWORK REQUIRED** — три CRITICAL (scaffold-инъекция, partial-write без rollback, полное отсутствие тестов) не блокируют текущий прод (скрипты scaffold/dev-only, прод уже работает), но блокируют развитие white-label сценария: любой `project:create` для реального второго бренда упрётся ровно в эти три дыры. Рекомендуемый порядок: F-01/F-02 (одна правка `create-project.mjs`) → F-03 (vitest + verify-gates из контракта 004) → F-04/F-05 → остальное по ходу.

Clean areas verified: Telegram/webhook dispatch имеет 4s `AbortSignal.timeout` и аккуратные try/catch без unhandled rejections; Zod-bound metadata (≤20 keys, scalar-only) sound; theme persistence без гонок; Dockerfile ARG/ENV passthrough полный для всех используемых `NEXT_PUBLIC_*`.

Suggest: run `/speckit.fix-review` to apply patches for F-01..F-15.
