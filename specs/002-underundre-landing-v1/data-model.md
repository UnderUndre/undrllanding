# Phase 1 Data Model: 002-underundre-landing-v1

**Feature**: UnderUndre Landing Realignment v1  
**Date**: 2026-10-26  
**Status**: Approved

---

## 1. Core Entities

### Entity 1: `LeadSubmission` (Inbound Prospect Brief)
Represents a prospective client initiating contact via the landing page brief form.

| Field | Type | Required | Constraints / Validation | Description |
| :--- | :--- | :---: | :--- | :--- |
| `name` | string | Yes | 1–100 chars, stripped | Full name or representative name |
| `email` | string | Yes | Valid email, RFC 5322 compliant | Contact email |
| `company` | string | No | $\le 100$ chars | Company / Organization name |
| `estimatedMonthlySaaSCost` | string | No | $\le 50$ chars (e.g. "$2,500/mo") | Self-reported SaaS / manual spend |
| `productInterest` | enum | Yes | `tco-audit` \| `foss-office` \| `custom-sprint` \| `other` | Selected product ladder entry |
| `details` | string | No | $\le 2000$ chars | Description of operational bottlenecks |
| `timestamp` | ISO String | Generated | Auto ISO 8601 | Capture timestamp |

### Entity 2: `ProjectConfig` (Multi-Brand Landing Resolver)
Represents the runtime configuration consumed by Next.js App Router layout and pages.

| Field | Type | Description |
| :--- | :--- | :--- |
| `slug` | `"underundre" \| "undrlla"` | Project identifier resolved from `process.env.NEXT_PUBLIC_PROJECT_NAME` |
| `domain` | string | Primary domain (e.g., `underundre.com`) |
| `title` | string | Base title tag for `<head>` |
| `description` | string | Search engine meta description (NACE 62.01 compliant) |
| `icon` | string | Path to optimized favicon (`/projects/underundre/favicon.ico`) |
| `primaryColor` | hex | Brand primary (`#4e007a`) |
| `accentColor` | hex | Brand accent (`#b45500`) |
| `navItems` | array | Array of `{ label: string, href: string }` anchors |

### Entity 3: `PricingTier` (Product Ladder Representation)
Defines the calibrated 3-tier offer ladder displayed in `sprint-pricing.tsx`.

| Field | Type | Example |
| :--- | :--- | :--- |
| `id` | string | `product-0-audit`, `sprint-a-office`, `sprint-b-custom` |
| `name` | string | `Workaround TCO Audit & Architecture Spec` |
| `price` | string | `$490` |
| `period` | string | `flat-fee` |
| `timeline` | string | `24–48 Hours SLA` |
| `badge` | string | `POPULAR ENTRY (100% CREDITED)` |
| `gated` | boolean | `false` for Product 0/Sprint A; `true` for Sprint B (*Available via Audit*) |
| `deliverables` | string[] | Array of forensic and architectural deliverables |
| `ctaLabel` | string | `Lock 48-Hour TCO Audit via Escrow →` |
| `ctaUrl` | string | Upwork Direct Contracts destination URL |
