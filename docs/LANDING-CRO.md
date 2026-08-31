# Landing CRO & experiments

Operational notes for the waitlist homepage (`/`). For full product scope see `specs/001-init-storefront-miniapp/`.

## Single purpose

Primary goal: **email → waitlist**. Secondary: economics education (`/economics`), pricing scan, “wow product” demo.

Avoid adding nav links that dump users into dead ends before submit.

## Form

1. Required: email only  
2. Optional accordion: Telegram + socials  
3. Trust under CTA: no spam · no card · domain/SSL  

API: `POST /api/waitlist` body:

```json
{
  "email": "ceo@brand.com",
  "telegram": "@optional",
  "socials": {},
  "h1_variant": "a"
}
```

## Alpha counter

- `GET /api/waitlist` → public stats (no PII)
- UI: hero, form bar, sticky
- Env seed: `WAITLIST_BASE_CLAIMED` after deploys / CRM sync
- Limit: `WAITLIST_ALPHA_LIMIT` (default 50)

## H1 A/B

| | A | B |
|--|---|---|
| Hypothesis | Speed/outcome converts builders | Fee message converts fee-sensitive merchants |
| Sticky | 30d cookie + localStorage | same |
| Force | `?h1=a` | `?h1=b` |
| Success metric | `waitlist_submit` / `h1_view` per variant | same |

Copy keys: `hero_title_*` (A), `hero_b_title_*` (B) in `lib/i18n.ts` (RU+EN).

**Rule:** do not run concurrent experiments on button color + form length + H1.

### Reading results

1. Telegram alerts include `H1 A/B: variant A|B`  
2. DevTools: `window.undrllaEvents`  
3. If GTM installed: `dataLayer` events `h1_view`, `waitlist_submit` with `h1_variant`  
4. Session totals: `GET /api/waitlist` → `h1_variants` (in-memory only)

After a clear winner: hardcode winning copy, delete the loser keys, set assign always to winner (or remove flipper).

## Motion

- Prefer `transform` / `opacity`
- Honor `prefers-reduced-motion`
- AOS disabled on phone and when reduced-motion is on

## Related

- README: project overview  
- CHANGELOG: `undrlla-landing-0.3.0`  
- Ecosystem: `undrlla/specs/ECOSYSTEM-REQUIREMENTS.md` Phase A  
