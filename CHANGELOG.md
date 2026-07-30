# CHANGELOG.md

## [undrlla-landing-0.3.0] - 2026-07-30

### Undrlla waitlist CRO + counter + H1 A/B

**Conversion (P0)**

- Outcome H1 + email-first waitlist (Telegram/socials optional accordion)
- Trust chips next to form; header primary CTA → `#waitlist`
- Mobile sticky CTA when waitlist is off-screen
- Economics page retained for manifesto deep-dive

**Visual (P1)**

- Reduce purple mesh / neon-SaaS look; orange primary CTAs, slate surfaces
- `prefers-reduced-motion` for AOS, confetti, decorative pulse/ping
- Bento cards / CTA / pricing polish

**Wow (P2)**

- Deploy story section (`#how`): claim → deploy → storefront
- Submit confetti + success pop
- Alpha pricing card scale/anchor
- Typing CLI showcase motion-safe

**Live alpha counter**

- `lib/waitlist-store.ts` + `GET/POST /api/waitlist` stats
- `components/alpha-spots-counter.tsx`, `lib/use-alpha-stats.ts`
- Env: `WAITLIST_ALPHA_LIMIT`, `WAITLIST_BASE_CLAIMED`
- Telegram alert includes claimed/remaining

**H1 A/B**

- Variant A: outcome (“live / in one deploy”)
- Variant B: fee framing (“0% tax / $0 alpha”)
- `lib/h1-ab.ts` — 50/50 sticky assign, `?h1=a|b` force
- Events: `h1_view`, `waitlist_submit` → `dataLayer` / `undrllaEvents`
- POST + TG alert include `h1_variant`; GET returns `h1_variants` session counts
- Fixed empty `hero_title_2` (EN/RU split accent + trailing phrase)

**Docs**

- README rewritten for Undrlla (was Cruip template boilerplate)

### Files added

- `components/alpha-spots-counter.tsx`
- `components/deploy-story.tsx`
- `components/sticky-cta.tsx`
- `lib/h1-ab.ts`
- `lib/use-alpha-stats.ts`
- `lib/waitlist-store.ts`

---

## [undrlla-landing-0.2.0] - 2026-07 (prior)

- Rebrand homepage to Undrlla, waitlist API + Telegram alerts
- Dark mode, i18n RU/EN, pricing/economics, Medusa/Paddle narrative
- SpecKit `specs/001-init-storefront-miniapp` retargeted to Medusa Store API

---

## Template history (Cruip Simple Light)

## [4.0.0] - 2025-02-04

- Upgrade to Tailwind v4
- Update dependencies

## [3.1.0] - 2024-12-08

- Update dependencies + Upgrade to Next.js 15

## [3.0.2] - 2024-08-23

- Remove unneeded scroll handler

## [3.0.1] - 2024-06-20

- Minor styling changes + Prettify code

## [3.0.0] - 2024-06-18

- Redesign the entire template

## [2.4.0] - 2023-12-08

Update to Next.js 14
Update dependencies

## [2.3.2] - 2023-10-04

Update Twitter icon
Update dependencies

## [2.3.0] - 2023-06-20

Fix issue with Google Fonts

## [2.2.1] - 2023-06-13

Fix minor issue

## [2.2.0] - 2023-05-31

Update dependencies and fix some issues

## [2.1.0] - 2023-05-07

Modal video improvements

## [2.0.0] - 2023-03-31

Conversion to Next.js

## [1.3.3] - 2023-03-28

- Fix video

## [1.3.2] - 2023-03-28

- Add self-hosted video

## [1.3.1] - 2023-02-13

- Update dependencies

## [1.3.0] - 2022-07-15

- Update dependencies
- Update React to v18
- Replace Sass with CSS files

## [1.1.0] - 2022-01-27

- Replace CRA (Create React App) with Vite
- Remove Craco
- Update dependencies

## [1.0.1] - 2020-10-19

Fix issue with testimonail image on mobile
