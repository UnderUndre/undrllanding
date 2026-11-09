# Data Model: 007-referral-program

**Date**: 2026-11-09 · Additive; no storage, no DB.

## Entity: Referral attribution (client-side)

```ts
// lib/referral.ts
interface ReferralRecord { nick: string; ts: number }
// localStorage key: "undr.referral"
captureRef(): void          // reads location.search ?ref=, sanitizes, persists (idempotent)
getReferral(): string | undefined  // returns nick or undefined; consumed by lead forms
```

Sanitizer: `nick = raw.trim().match(/^[a-zA-Z0-9_.-]{1,32}$/) ? raw : undefined`.

**Lead form contract**: `metadata.referral?: string` — present only when `getReferral()` yields a value (no empty strings). Downstream: unchanged Telegram dispatch (005).

## Entity: Mint form (client component)

```
input:  nickname   string, sanitized client-side, maxlength 32
select: network    "linkedin" | "x" | "community"
output: link       `${location.origin}/?ref=${nick}`   (client-side only)
button: copy       navigator.clipboard.writeText(link)
```

No network requests. Nickname collisions: non-reserved (notice in rules copy).

## Entity: Reward (ledger record, private repo)

```ts
interface RewardRecord {
  id: string;               // RR-YYYYMMDD-<seq>
  type: "paid-referral" | "review-bonus" | "review-bonus-2nd-platform";
  referrerNick: string;
  clientLeadId: string;     // ties to touch-log / invoice
  payerVerification: string;// why payer ≠ referrer
  amountUsd: number;        // against D6 table + $150 cap
  status: "queued" | "paid" | "rejected";
  rejectionReason?: string;
  trc20Address?: string;    // private repo only
  reviewUrls?: string[];    // max 2, 30-day check date
  dates: { event: string; paid?: string };
}
```

Ledger: `undreplans/docs/projects/undrllanding/referral-ledger.md` — append-only, one table per type + cap-accounting column per converted client.

## Cap accounting invariant

Per converted client: |discount| + Σ(referrer payouts) + Σ(client credits) ≤ $150 (D6). Ledger column `capUsed` recomputed on every append.

## Public copy surface

`/referral` rules block mirrors FR-003 verbatim (bilingual). Ineligible platforms listed explicitly: Upwork, Google Maps.
