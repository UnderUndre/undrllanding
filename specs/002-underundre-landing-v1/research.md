# Phase 0 Research & Technical Decisions: 002-underundre-landing-v1

**Feature**: UnderUndre Landing Realignment v1 (TCO Audit & Sovereign Infrastructure)  
**Date**: 2026-10-26  
**Status**: Completed & Approved

---

## 1. Lead Capture Architecture: Zero Lead Loss Protocol (FR-003)

### The Problem
In `components/cta-underundre.tsx`, the form submission currently executes:
```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitted(true);
};
```
No HTTP request is sent, no logging occurs, and prospect contact info vanishes into RAM. The user is shown: *"✓ Brief submitted successfully! We will prepare your DDL schema & Upwork Escrow link within 2 hours."*

### Architectural Decision
Build a Next.js 15 Route Handler (`app/api/lead/route.ts`) backed by a 3-tier delivery failover:

```
[ Prospect Submits Form ]
           │
           ▼
[ Client Validation (Zod/HTML5) ]
           │
           ▼ POST /api/lead
[ Next.js Route Handler ] ───► Validate Zod Schema
           │
     ┌─────┴────────────────────────┐
     ▼ (Telegram Env Present)       ▼ (Telegram Env Absent / Network Error)
[ Dispatch Telegram Bot Alert ]    [ Log to Console / Serverless Log ]
     │                              │
     ├─► Success: 200 OK            └─► Success with Fallback Flag:
     │                                  { success: true, fallback: "upwork" }
     ▼
[ Client UI: Success State + Upwork Direct Contract Instant Button ]
```

#### Dual Failover Circuit:
1. **Tier 1 (Server-Side Telegram Webhook)**:
   - `fetch("https://api.telegram.org/bot<TOKEN>/sendMessage", { method: "POST", signal: AbortSignal.timeout(4000) })`
   - Payload formatted with HTML markdown (Name, Email, Company, Loss Estimate, Product Interest).
2. **Tier 2 (Client-Side Network Failure Fallback)**:
   - If `/api/lead` returns a 5xx error or network drops:
     - Client opens fallback modal: *"Network glitch detected. Your brief is preserved below."*
     - Provides one-click `mailto:sales@underundre.com?subject=TCO%20Audit%20Brief...` with pre-filled body, and a button to initiate directly via Upwork Direct Contracts.

---

## 2. Favicon & Asset Performance Optimization (FR-005, NFR-001)

### The Problem
`public/projects/underundre/icon.svg` is **2,825,987 bytes (2.8 MB)**. On mobile networks with 3G/4G bandwidth, downloading this icon blocks initial rendering, causes thread jank, and damages Core Web Vitals (LCP > 4.0s).

### Architectural Decision
- Use the existing lightweight icon: `projects/underundre/public/favicon.ico` (<15 KB).
- Update `lib/project-config.ts` (`icon: "/projects/underundre/favicon.ico"`).
- Update `app/(default)/page.tsx` metadata icons to point to `favicon.ico`.
- Result: **99.5% payload reduction** on the favicon network request.

---

## 3. Brand & Metadata Decontamination (FR-004)

### The Problem
1. `app/layout.tsx:15` contains: `title: { default: "Undrlla", template: "%s | Undrlla" }`. Any page in `underundre` gets tagged with `| Undrlla`, contaminating corporate trust.
2. `app/layout.tsx:18` contains: `"Launch your autonomous marketplace powered by Medusa 2.0 with custom branding, custom Next.js 15 storefront, custom domain, card (Paddle/Stripe) and crypto (SHKeeper) payments."`
3. `components/ui/footer.tsx:20` evaluates `config.slug === "undreseller"`. Because `project-config.ts` sets `slug: "underundre"`, this condition fails, falling through to render the Undrlla marketplace footer.

### Architectural Decision
1. In `app/layout.tsx`, make `title` template conditional or set default dynamically per active project configuration.
2. Eradicate all Medusa 2.0 text from default metadata; substitute NACE 62.01 UnderUndre bureau definition.
3. In `footer.tsx`, update condition to: `config.slug === "underundre" || config.slug === "undreseller"`.

---

## 4. Navigation & Section Anchors (FR-006)

### The Problem
`header-nav.tsx` includes links to `#how`, `#waitlist`, `/economics`. None of these exist on the underundre page. Clicking them scrolls nowhere or triggers 404s. Furthermore, `comparison-matrix.tsx` is missing `id="comparison"`, and `opsec-protocol.tsx` is missing `id="opsec"`.

### Architectural Decision
- Add explicit `id` attributes:
  - `hero-underundre.tsx` $\to$ `id="audit"`
  - `loom-demo-section.tsx` $\to$ `id="telemetry"`
  - `sprint-pricing.tsx` $\to$ `id="pricing"`
  - `fork-service-line.tsx` $\to$ `id="fork"`
  - `opsec-protocol.tsx` $\to$ `id="opsec"`
  - `comparison-matrix.tsx` $\to$ `id="comparison"`
  - `vibe-coding-warning.tsx` $\to$ `id="vibe-trap"`
  - `faq-section.tsx` $\to$ `id="faq"`
  - `cta-underundre.tsx` $\to$ `id="contact"`
- In `header-nav.tsx`, render project-specific navigation:
  - UnderUndre nav items: `[ { name: "TCO Audit", href: "#audit" }, { name: "Pricing Ladder", href: "#pricing" }, { name: "Vs Agencies", href: "#comparison" }, { name: "FAQ", href: "#faq" }, { name: "Contact", href: "#contact" } ]`.

---

## 5. Umami Self-Hosted Analytics Integration (FR-008)

### Architectural Decision
Use Next.js 15 `<Script>` component with conditional evaluation:
```tsx
{process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
  <Script
    strategy="afterInteractive"
    src={process.env.NEXT_PUBLIC_UMAMI_SRC || "https://analytics.underundre.com/script.js"}
    data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
  />
)}
```
Zero bundle bloat when environment variables are omitted; zero impact on LCP/CLS.
