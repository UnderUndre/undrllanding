# Quickstart: 007-referral-program

## 1. Mint a link

`/referral` → nickname `alice`, network LinkedIn → link `https://underundre.com/?ref=alice` rendered, Copy works, no network requests (DevTools Network tab empty).

## 2. Attribution E2E

1. Open `/?ref=alice` → browse to contact form → submit.
2. Telegram lead message (005 dispatch) contains `referral: alice` in metadata block.
3. Open site without `?ref` → submit form → no `referral` key in metadata.

## 3. Persistence

Open `/?ref=alice`, close tab, open form directly → metadata still carries `alice` (localStorage).

## 4. Verify gate

```bash
npm run validate && npm run verify
# → V5 referral: PASS (PII grep = 0, bilingual keys present)
```

## 5. Ledger discipline (manual, owner)

Paid invoice with `referral: alice` → append row to `undreplans/.../referral-ledger.md` → verify payer ≠ referrer → queue $50 USDT (invoice discounted by −$50) → mark paid + TRC-20 txid. Review bonus: register review URL → calendar +30 days → verify still live → append bonus row (+$50 referrer / +$25 client service credit; +$25 on 2nd platform; total value capped at $200 per converted client).
