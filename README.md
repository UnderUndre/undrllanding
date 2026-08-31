# undrllanding

**Undrlla** marketing + waitlist landing (and future storefront shell).  
Next.js 15 · React 19 · Tailwind CSS v4 · `@underundre/undesign` tokens.

Ecosystem role: customer UI for **client shops** (Medusa Store API) and later **flagship** Undrlla.com modules (`FEATURES` flags).  
Product SoT: [`specs/001-init-storefront-miniapp/`](./specs/001-init-storefront-miniapp/) · cross-repo glue: `undrlla/specs/ECOSYSTEM.md`.

> Based on a Cruip Simple Light template; heavily rebranded for Undrlla (waitlist, alpha economics, Medusa narrative).

---

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000  (turbopack)
pnpm build
pnpm start
pnpm exec tsc --noEmit
```

Copy env template:

```bash
cp .env.example .env.local   # if present; otherwise create .env.local
```

### Environment

| Variable | Required | Description |
|----------|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | for alerts | Bot token for waitlist notifications |
| `TELEGRAM_CHAT_ID` | for alerts | Chat/channel id (personal: `/start` bot first; channel: `-100…`) |
| `WAITLIST_ALPHA_LIMIT` | no | Alpha seat cap (default `50`) |
| `WAITLIST_BASE_CLAIMED` | no | Seats already claimed **outside** this process (CRM / previous deploys). Cold start memory resets — keep this in sync on serverless. |

Waitlist storage is **in-process** (`lib/waitlist-store.ts`). Fine for dogfood; production should move to a real DB and drop `BASE_CLAIMED` hacks.

---

## Site map

| Route | Purpose |
|-------|---------|
| `/` | Waitlist landing (CRO hero, deploy story, features, pricing, CTA) |
| `/economics` | Economics manifesto (0% GMV, alpha, rebate, hub fees) |
| `/api/waitlist` | `GET` stats · `POST` signup |
| `/api/hello` | Template leftover |
| `/signin`, `/signup`, `/reset-password` | Auth shell (template; not Wave-1 product) |

---

## Landing product notes (2026-07)

Work in this pass focused on **waitlist conversion** + **wow that sells the product**, not heavy 3D.

### CRO (P0)

- Outcome-focused H1 (A/B — see below)
- Waitlist form: **email-first**; Telegram/socials behind “add contacts”
- Trust chips at form: `0% GMV` · Alpha free · Paddle/crypto
- Header: primary = Waitlist; secondary = How / Pricing / Manifest
- **Sticky CTA** on mobile when waitlist leaves viewport (`components/sticky-cta.tsx`)

### Visual (P1)

- Less purple mesh / “AI SaaS soup”; slate + **orange** primary CTA
- `prefers-reduced-motion` respected (AOS off, confetti off, pulse/ping off)
- Brand tokens via undesign / CSS theme (`app/css/style.css`)

### Wow without thrash (P2)

- **Deploy story** (`#how`): Claim → Deploy → Storefront (`components/deploy-story.tsx`)
- Success confetti (~0.9s) + check pop on submit
- Alpha pricing card visually anchored
- CLI typing demo (`hero-typing-showcase.tsx`)

### Live alpha counter

| Surface | Component / API |
|---------|-----------------|
| Hero | `AlphaSpotsCounter` variant `hero` |
| Waitlist form | variant `inline` (bar + remaining) |
| Sticky bar | claimed/remaining text |
| API | `GET /api/waitlist` → `{ claimed, remaining, limit, open, h1_variants }` |
| After submit | `publishAlphaStats` updates all clients without reload |
| Poll | ~20–30s via `useAlphaStats` |

`claimed = WAITLIST_BASE_CLAIMED + signups_in_this_process`.

### H1 A/B test

| Variant | Intent | EN (structure) |
|---------|--------|----------------|
| **A** | Outcome / speed | `title_1` + accent **live** + `title_2` **in one deploy** |
| **B** | Fee / risk | 0% platform tax · turnkey store · $0 alpha |

- Split: **50/50**, sticky 30 days (`localStorage` `undrlla_h1_variant` + cookie `undrlla_h1`)
- Force QA: `/?h1=a` or `/?h1=b`
- Events: `h1_view`, `waitlist_submit` → `window.dataLayer` + `window.undrllaEvents` (dev console)
- POST body includes `h1_variant`; Telegram alert shows variant + session A/B counts
- Code: `lib/h1-ab.ts`, copy in `lib/i18n.ts` (`hero_*` / `hero_b_*`)

**Do not** change form + color + H1 in the same experiment week — isolate the variable.

---

## Key files

```
app/
  (default)/page.tsx          # home composition
  (default)/layout.tsx        # AOS + LangProvider + header/footer
  api/waitlist/route.ts       # GET stats, POST signup + TG alert
  economics/page.tsx
  css/style.css               # tokens, confetti, reduced-motion
components/
  hero-undrlla.tsx            # H1 A/B + waitlist grid
  waitlist-form.tsx           # email-first + confetti
  alpha-spots-counter.tsx
  deploy-story.tsx
  sticky-cta.tsx
  pricing-section.tsx
  marketplace-preview-demo.tsx
  shopify-style-features.tsx
  economics-client.tsx
lib/
  i18n.ts                     # RU/EN
  h1-ab.ts                    # A/B assign + track
  waitlist-store.ts           # in-memory store + stats
  use-alpha-stats.ts          # client poll + custom event
specs/001-init-storefront-miniapp/
  spec.md                     # Wave-1 Medusa + Paddle target
```

i18n: `context/lang-context.tsx` · toggle in header (RU/EN).

---

## Spec / roadmap alignment

| Wave | Scope (spec) | Landing today |
|------|----------------|---------------|
| **Wave 1** | Catalog/cart/checkout Medusa + Paddle; Medusa customer auth | **Waitlist marketing** + economics (pre-shop code) |
| **Wave 2** | Telegram Mini App `initData` | Not implemented |
| **Wave 3+** | Flagship housing / hub / unet flags | Not implemented |

Do not implement Directus client-shop paths; commerce SoT = **undreseller** Medusa.

---

## Scripts reference

| Command | Action |
|---------|--------|
| `pnpm dev` | Dev server (turbopack) |
| `pnpm build` | Production build |
| `pnpm start` | Serve production build |
| `pnpm lint` | ESLint (if configured) |

---

## Related repos

| Repo | Role |
|------|------|
| `undreseller` | Medusa template-shop (Gate 0) |
| `undevops` | One-click provision of shop + this image |
| `undrlla` | IdP, housing, polity, ProvisioningManifest SoT |
| `undrepay` | Crypto + ledger (Phase C) |
| `undesign` | Shared design tokens package |

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for template history + Undrlla landing releases.

## License

Original template: GPL / Cruip terms (see historical notice below).  
Product copy, Undrlla branding, and custom components: project / UnderUndre as applicable.

---

### Template provenance

Originally derived from [Cruip Simple Light](https://github.com/cruip/tailwind-landing-page-template) (Tailwind + Next.js). Credits: Cruip, Nucleo icons where still used.
