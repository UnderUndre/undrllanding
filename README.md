# undrllanding

**UnderUndre** & **Undrlla** Multi-Project Isolated Landing Engine.  
Next.js 15 · React 19 · Tailwind CSS v4 · Geist Typography · `@underundre/undesign` tokens.

Ecosystem role: serves isolated product and marketing landing pages for **UnderUndre** (`underundre.com` — Productized Engineering Bureau & Workaround TCO Audit).  
Commercial SoT: [`specs/002-underundre-landing-v1/spec.md`](./specs/002-underundre-landing-v1/spec.md) · Business Plan: `undreplans/docs/projects/undreseller/undreseller-business-plan.md` (v18.9).

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
| `NEXT_PUBLIC_PROJECT_NAME` | yes (default `underundre`) | Active project slug (`underundre` or `undrlla`) |
| `TELEGRAM_BOT_TOKEN` | for lead alerts | Telegram Bot token for inbound prospect brief notifications |
| `TELEGRAM_ALERT_CHAT_ID` | for lead alerts | Target Telegram chat ID for inbound lead dispatches |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | optional | Umami self-hosted analytics website ID |
| `NEXT_PUBLIC_UMAMI_SRC` | optional | Umami analytics script source URL |

---

## Project Structure & Multi-Project Architecture

`undrllanding` uses an isolated project layout under `projects/` selected at build/request time via `lib/project-config.ts`:

```
projects/
  ├── underundre/                # Productized Engineering Bureau Lander
  │   ├── components/            # Hero, Pricing, TCO Audit, Opsec, Comparison, FAQ, CTA, TaglineReveal
  │   ├── config.ts              # UnderUndre metadata & component exports
  │   └── preview.html           # Synchronized static mirror of Version 1 landing
  └── undrlla/                   # Medusa Marketplace Lander (storefront preview)
app/
  ├── layout.tsx                 # Dynamic metadata resolver, Geist font, Umami analytics
  ├── (default)/page.tsx         # Active project root renderer
  └── api/
      └── lead/route.ts          # Zero Lead Loss API route handler with Telegram dispatch & fallback
```

---

## Version 1 Scope: UnderUndre Landing Realignment

- **Hero Product (80% Outbound Focus)**: **Workaround TCO Audit & Architecture Spec ($490 Flat, 24–48h SLA)** using Time-Driven Activity-Based Costing (TDABC) to calculate manual labor payroll leaks, deliver an OpenAPI 3.0 specification + Docker mock, with 100% credit toward implementation.
- **Emergency Cash Flow Valve**: **Grand Slam FOSS Office Stack ($3,500 setup + $500/mo retainer)** deployed on Hetzner CPX42 with Docker Memory Fencing and 16GB Swap.
- **Contract Rail**: 100% Upwork Direct Contracts Escrow (5% fee, zero client fee).
- **Technical Hygiene**: Zero silent lead loss (`/api/lead`), lightweight `favicon.ico` (<15 KB), Umami analytics, WCAG 2.1 AA compliant color contrast, and Geist typography.

---

## Related Repositories

| Repo | Role |
|------|------|
| `undreseller` | Core template codebase for Sprint B (Service Booking & Professional Portfolio Template) |
| `undreplans` | Business plans (`undreseller-business-plan.md` v18.9, `undreading-business-plan.md` v2.5) |
| `undevops` | One-click server provisioning & Docker Compose stack |
| `undesign` | Shared design tokens package (`@underundre/undesign`) |

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for release history and landing iteration tags.

## License

Original template: GPL / Cruip terms.  
Product copy, UnderUndre branding, and custom components: UnderUndre / UnderUndre Engineering Bureau.
