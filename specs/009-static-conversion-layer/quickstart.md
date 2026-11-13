# Quickstart: 009-static-conversion-layer

## 1. Prompt library (US1)

1. Open `http://localhost:3000/prompts` → 5 prompt cards with categories.
2. Click any copy button → clipboard contains the prompt; DevTools Network tab: zero requests.
3. Click "Download the full pack" → `prompt-pack.md` downloads; open it → all 5 prompts inside.

## 2. Persona variants (US2)

1. Open `/?persona=ops` → hero badge/title/CTA = ops variant (RU and EN both switch with the language toggle).
2. Open `/?persona=hacker` → default hero, no `metadata.persona` on submit.
3. Open `/?persona=ops&ref=alice` → submit the lead form → Telegram message metadata carries `persona: "ops"` AND `referral: "alice"`.
4. No param → hero identical to baseline (Gate V3 passes without refresh).

## 3. Waitlist (US3)

1. Build undreading: `pnpm build:undreading && pnpm start` → open `/waitlist` → trilingual copy (switch language: RU/EN/UK all render).
2. Submit email + consent → Telegram lead arrives with `topic: "undreading-waitlist"`.
3. Build underundre: `/waitlist` → 404.

## 4. Gates

```bash
pnpm validate && pnpm test && pnpm verify --brand underundre && pnpm verify --brand undreading
# → V7.1 prompts, V7.2 persona contract, V7.3 waitlist isolation — all PASS
```
