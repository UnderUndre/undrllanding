# Quickstart: 003-landing-template-engine

**Feature**: Open-Source Multi-Brand Landing Engine & White-Label Packaging  
**Date**: 2026-10-30

---

## 1. Quick Local Development

```bash
cd undrllanding
pnpm install

# Start development for UnderUndre (default)
pnpm dev:underundre

# (The legacy undrlla dev target is removed — see FR-011.)
```

---

## 2. Scaffolding a New Brand (`pnpm project:create`)

To generate a new brand lander for a client or secondary project:

```bash
# Interactive mode:
pnpm project:create

# Flagged mode (canonical flag names):
pnpm project:create --slug="acme" --name="Acme Systems" --domain="acme.org" --primary-color="#2563eb" --accent-color="#059669"
```

This creates:
- `projects/acme/config.ts` (brand identity, navigation, footer, legal block)
- `projects/acme/theme.css` (Tailwind v4 CSS variable palette)
- `projects/acme/data/pricing.json` (commercial package ladder)
- `projects/acme/data/faq.json` (objection matrix)
- `projects/acme/public/favicon.ico`
…and appends a delimited registry entry to `lib/project-config.ts`, immediately verified with `pnpm validate`.

To test the new brand locally (cross-env for Windows compatibility):
```bash
npx cross-env NEXT_PUBLIC_PROJECT_NAME=acme pnpm dev
```

---

## 3. Statutory Compliance Routes Verification

Open in browser:
- `http://localhost:3000/privacy` — Verifies GDPR Art. 13 data controller identity and rights.
- `http://localhost:3000/terms` — Verifies Upwork Escrow, fixed scope, and 100% IP transfer terms.
- `http://localhost:3000/manifest` — Verifies the 7 Core Engineering Principles.

---

## 4. Generic Lead API Verification (cURL)

```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "email": "lead@client.com",
    "contact": "@telegram_user",
    "topic": "tco-audit",
    "message": "We have 8 staff spending 15 hours a week in WhatsApp.",
    "metadata": {
      "teamSize": 8,
      "estimatedWaste": "$2,000/mo"
    }
  }'
```
Expected: `{"success": true, "message": "Audit request received."}`
