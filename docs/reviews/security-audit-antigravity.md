# Security Audit Report — undrllanding

**Auditor**: `antigravity` (ZCode harness / GLM) — adversarial stance per `/speckit.security-auditor`
**Audited at**: 2026-11-02T16:20:00Z
**Commit**: `e4ef96e` (branch `main`)
**Scope**: full attack surface — `app/api/*`, `app/icon.svg/route.ts`, `lib/schemas/*`, `lib/project-config.ts`, `scripts/*.mjs`, `Dockerfile`, `docker-compose.yml`, `.env*`, `docs/deploy-vps.md`, `next.config.js`, dependencies
**Framework**: OWASP Top 10:2025 · STRIDE · NIST SP 800-218 (SSDF) · ISO 27001 Controls 8.25/8.28

**Severity Summary**: `CRITICAL: 1 | HIGH: 2 | MEDIUM: 4 | LOW: 5`

> ⚠️ **Immediate action (S-01)**: два живых Telegram-токена лежат в рабочих env-файлах (не в git). Ротация в @BotFather — до любых других работ. Токены в этом отчёте намеренно замаскированы.

---

## S-01 · CRITICAL — Живые секреты в рабочих env-файлах (A04 · Cryptographic Failures)

- **Location:** `.env:15,18` (`TELEGRAM_BOT_TOKEN=8298336741:AAF…zfMvK6zNYWEcHs` — masked, chat ID `854703568`), `.env.production:21-22` (второй живой токен `TELEGRAM_NOTIFY_TOKEN=8628…AAKRl0BIrY` — masked)
- **Mitigation verified:** `.env`/`.env.production` **не git-tracked** (`.gitignore:38-41`, `git ls-files` показывает только `*.example`); `.env.example` содержит только плейсхолдер; `.dockerignore` исключает `.env*` из build context.
- **Attack scenario:** компрометация машины разработчика, editor cloud-sync (в репо лежит папка `.history/` — VSCode Local History, туда мог попасть дубликат), бэкап или скриншот шаринга репо отдают полный контроль над lead-relay ботом: чтение истории сообщений, спам от имени бренда, фишинг клиентов через бот-канал.
- **Fix:** **ротировать оба токена в @BotFather немедленно**; проверить `.history/` и синхронизированные копии на дубликаты; поставить `gitleaks` pre-commit hook; хранить продовые секреты в менеджере секретов, а не в файлах на диске.

## S-02 · HIGH — Rate limiter на спуфабельном `x-forwarded-for` (A01 · Broken Access Control / A06)

- **Location:** `app/api/lead/route.ts:27-37` (limiter 5/60s), `route.ts:135-139` (IP из `x-forwarded-for`/`x-real-ip`)
- **Attack scenario:** деплой за Caddy (`docker-compose.yml:9`, `docs/deploy-vps.md:13`). Если Caddy не перезаписывает клиентский `X-Forwarded-For` единственным значением, атакующий ротирует заголовок на каждый запрос → лимит 5/60s обходится → безлимитный Telegram-spam relay (расход квоты бота, спам в ops-канал). Плюс `rateLimitMap` не высвобождает записи — медленная heap-утечка (код-ревью F-07).
- **Fix:** доверять только фиксированному хоп-заголовку от Caddy (или использовать remote address); периодически чистить map; глобальный fallback-кап на endpoint.

## S-03 · HIGH — Ноль security-заголовков (A02 · Security Misconfiguration)

- **Location:** `next.config.js:1-2` — пустой конфиг: нет `headers()`, CSP, HSTS, `X-Frame-Options`, `Referrer-Policy`, `X-Content-Type-Options`
- **Attack scenario:** сайт фреймится (clickjacking на lead-форме); отсутствие CSP снимает последний рубеж для любых будущих injection-синков (включая SVG-роут S-05); нет HSTS на сайте, принимающем лид-PII.
- **Fix:**

```js
// next.config.js
async headers() {
  return [{ source: "/(.*)", headers: [
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "Content-Security-Policy", value: "default-src 'self'; script-src 'self' https://analytics.underundre.com; frame-ancestors 'none'" },
  ]}];
}
```

## S-04 · MEDIUM — Icon route без санитизации пути (A01 · Broken Access Control / Path Traversal)

- **Location:** `app/icon.svg/route.ts:6-9` — `path.join(process.cwd(), "public", config.iconUrl)` без re-anchor
- **Attack scenario:** `path.join` сворачивает `..` — брендовый конфиг с `iconUrl: "../.env"` или `"../projects/underundre/data/legal.json"` читает любой файл, доступный пользователю `nextjs` в контейнере, и отдаёт его на публичный URL. Конфиг build-time и сегодня доверенный, но весь продукт — это «заскэффолдить новый бренд»: злонамеренный/скомпрометированный бренд-шаблон или PR со сторонним `brand.ts` превращается в arbitrary-file-read.
- **Fix:** `path.resolve(iconPath)` должен начинаться с `path.resolve(cwd, "public") + path.sep`; allowlist расширений (.svg/.png/.ico) до открытия файла.

## S-05 · MEDIUM — SVG инлайном с годовым immutable-кэшем (A05 · Injection / stored XSS)

- **Location:** `app/icon.svg/route.ts:12-21` — `Content-Type: image/svg+xml`, `Cache-Control: immutable` на год, без CSP/nosniff
- **Attack scenario:** SVG при прямой навигации исполняет скрипты. Злонамеренный брендовый ассет (`icon.svg` с `<script>fetch('/api/lead',…)</script>` или эксфильтрацией на umami) становится персистентным XSS на origin на год кэша.
- **Fix:** для `.svg` добавить заголовки `Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'` и `X-Content-Type-Options: nosniff` в ответ роута; либо санитизировать SVG (strip `<script>`/`on*`) при чтении.

## S-06 · MEDIUM — Синхронный fs на event loop (A10 · Exceptional Conditions / DoS-adjacent)

- **Location:** `app/icon.svg/route.ts:8,10` — `fs.existsSync` + `readFileSync` на каждый запрос
- **Attack scenario:** burst на `/icon.svg` блокирует event loop единственного контейнера — заодно встаёт и `/api/lead`. Детали и фикс — в код-ревью F-04.

## S-07 · MEDIUM — Ограничения lead-схемы дырявые по ключам и числам (A06 · Insecure Design)

- **Location:** `lib/schemas/content-schema.ts:118-127` — ключи metadata без `.max()` (значения ≤500 chars, но сами *ключи* любой длины), `z.number()` принимает `1e308`; body-cap 64KB применяется **после** `request.text()` уже забуферил всё тело в память (`route.ts:44-46`)
- **Attack scenario:** 20 ключей × ~3KB имён или 20 × `Number.MAX_VALUE` едут в Telegram-сообщениеverbatim (route рендерит все entries) — мусорные лиды и раздутые webhook-пейлоады; multi-MB тела полностью читаются в память до отказа.
- **Fix:** superRefine на `k.length <= 50` для всех ключей; `.finite()` для чисел; проверять `Content-Length` заголовок до чтения тела.

## S-08 · LOW — Полная Zod error map уходит клиенту (A09 · Logging & Alerting)

- **Location:** `app/api/lead/route.ts:160-167` — `errors: parsed.error.format()`
- **Impact:** раскрывает форму внутренней схемы фаззерам (помогает вычислить bounds). Стектрейсов нет, 500-handler возвращает generic — хорошо.
- **Fix:** в проде возвращать только `issue.path` или дропать `errors`.

## S-09 · LOW — `href`-поля без scheme-allowlist (A05)

- **Location:** `lib/schemas/content-schema.ts:44` (`ctaHref`), `lib/project-config.ts:12-13,22,41,59` (nav/footer href) — `z.string().min(1)`
- **Impact:** `javascript:`/`data:` URI в брендовом `pricing.json`/`brand.ts` становятся кликабельными ссылками. Граница доверия — build-time (тот же вектор, что S-04): отравленный бренд-шаблон.
- **Fix:** `z.string().url()` + allowlist `https?:` для ctaHref и nav/footer href.

## S-10 · LOW — Плавающие `^`-версии; патч без документации (A03 · Supply Chain)

- **Location:** `package.json:14-27` — все зависимости кроме React/types на `^` (включая `next: ^15.1.11` — срелюзит любой 15.x при rebuild); `patches/@underundre__undesign.patch` переписывает `dist/tokens.css` (CSS-only, при осмотре benign), но без notes о причине.
- **Fix:** запинить `next` на точную версию; `pnpm audit` + Renovate; README в `patches/`.

## S-11 · LOW — `preview.html` генерируется в дерево исходников (A02)

- **Location:** `scripts/generate-preview.mjs:26,76` → `projects/underundre/preview.html` (инлайн CSS, скрипты stripped)
- **Impact:** не сервится (Next роутит только `app/` + `public/`, Docker runner копирует только `public/.next/node_modules`), но это hygiene/info-disclosure шум; правило `.dockerignore:16` как написано не матчит `projects/**/preview.html`.
- **Fix:** писать в `.next/preview/` или добавить `projects/*/preview.html` в `.gitignore`.

---

## ✅ Verified Positives (Zero-Trust проверено, не принято на веру)

- **SSRF: отсутствует** — `LEAD_WEBHOOK_URL` и Telegram URL серверно-контролируемые (`route.ts:86,104-108`), user input до URL не доходит.
- **Header/CRLF injection в Telegram: отсутствует** — payload уходит JSON-телом; все интерполированные поля проходят `escapeHtml()` при `parse_mode: "HTML"`.
- **PII-гигиена логов: соответствует** — `redactedLeadLog` маскирует email (`maskEmail`), бланkit contact, логирует только `messageLength` + ключи metadata; сырой PII идёт только в Telegram/webhook.
- **`dangerouslySetInnerHTML`: 0 вхождений** по всему коду.
- **Секреты/build разделены** — Dockerfile прокидывает только `NEXT_PUBLIC_*` как build ARGs; `TELEGRAM_BOT_TOKEN` идёт только через compose `env_file` в runtime.
- **Контейнер hardened:** non-root `USER nextjs`, `--frozen-lockfile`, нет host-портов (только Caddy-сеть), HEALTHCHECK есть.
- **`create-project.mjs`:** `execSync("pnpm validate")` — фиксированная строка, arg injection невозможен; других exec/spawn в скриптах нет.
- **`docs/deploy-vps.md`:** токенов и реальных IP нет — только плейсхолдеры.

## VERDICT

```yaml
verdict: CRITICAL
reviewer: antigravity
audited_at: 2026-11-02T16:20:00Z
critical_count: 1
high_count: 2
medium_count: 4
low_count: 5
owasp_coverage: A01 A02 A03 A04 A05 A06 A09 A10
```

**Priority order (attacker's clock):**
1. **S-01** — ротировать оба Telegram-токена (сегодня, 5 минут в @BotFather).
2. **S-02** — фиксированный hop-заголовок для IP + eviction в rate-limit map.
3. **S-03** — security-заголовки в `next.config.js` (30 минут, закрывает фрейминг + backstop для S-05).
4. **S-04/S-05** — re-anchor пути и CSP на SVG-роуте (блокирует arbitrary-read и stored-XSS вектора white-label сценария).
5. S-07…S-11 — по ходу следующих спринтов.
