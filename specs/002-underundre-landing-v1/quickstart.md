# Quickstart: 002-underundre-landing-v1

**Feature**: UnderUndre Landing Realignment v1 (TCO Audit & Sovereign Infrastructure)  
**Date**: 2026-10-26

---

## 1. Local Development Setup

From the `undrllanding` package directory:

```bash
cd undrllanding

# Install dependencies (pnpm 9+)
pnpm install

# Start Next.js development server targeting UnderUndre
NEXT_PUBLIC_PROJECT_NAME=underundre pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 2. Environment Configuration (`.env.local`)

```bash
# Target Project
NEXT_PUBLIC_PROJECT_NAME=underundre

# Lead Alert Notifications (Optional - gracefully falls back if omitted)
TELEGRAM_BOT_TOKEN="your_bot_token"
TELEGRAM_ALERT_CHAT_ID="your_chat_id"

# Umami Analytics (Optional)
NEXT_PUBLIC_UMAMI_WEBSITE_ID="your_umami_id"
NEXT_PUBLIC_UMAMI_SRC="https://analytics.underundre.com/script.js"
```

---

## 3. Verifying Key Endpoints & Features

### A. Lead Capture API Test (cURL)
```bash
curl -X POST http://localhost:3000/api/lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alex Smith",
    "email": "alex@enterprise.com",
    "company": "Smith Logistics LLC",
    "estimatedMonthlySaaSCost": "$4,000/mo",
    "productInterest": "tco-audit",
    "details": "We have 3 full-time dispatchers manually copying orders from WhatsApp into Excel."
  }'
```
Expected Response: `{"success": true, "message": "Lead received..."}`

### B. Favicon Network Payload Check
Inspect network requests in DevTools for `/projects/underundre/favicon.ico`. Total size must be $< 15\text{ KB}$ (replacing the old 2.8 MB SVG).

### C. Visual Regression & Closed Loop Verification
```bash
# Run local build
pnpm build

# Start production server
pnpm start
```
Run visual validation at 375px (mobile) and 1440px (desktop) using Browser tools or Playwright. Verify zero horizontal overflow (`scrollWidth <= innerWidth`).
