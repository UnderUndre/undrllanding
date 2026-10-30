# Phase 1 Data Model: 003-landing-template-engine

**Feature**: Open-Source Multi-Brand Landing Engine & White-Label Packaging  
**Date**: 2026-10-30  
**Status**: Approved

---

## 1. Decoupled Navigation & Footer Models

### Entity 1: `ProjectNavigationConfig`
Embedded inside each project's `ProjectConfig` (`projects/<slug>/config.ts`), replacing all hardcoded slug checks.

| Field | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `items` | `Array<{ labelKey?: string, labelFallback: string, href: string }>` | Yes | Array of top-level header navigation links |
| `ctaButton` | `{ labelKey?: string, labelFallback: string, href: string }` | No | Optional highlighted header action button |

### Entity 2: `ProjectFooterConfig`
Embedded inside each project's `ProjectConfig`.

| Field | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `tagline` | `{ key?: string, fallback: string }` | Yes | Brand mission statement or bureau description |
| `columns` | `Array<{ titleKey?: string, titleFallback: string, links: Array<{ labelKey?: string, labelFallback: string, href?: string, badge?: string }> }>` | Yes | Custom columns (Product Ladder, Resources, etc.) |
| `showLegalLinks` | `boolean` | No (default `true`) | Controls automatic rendering of `/privacy` and `/terms` links |

---

## 2. Schema-Driven Content Files (Option C)

### File: `projects/<slug>/data/pricing.json`
Matches `PricingDataSchema`. Holds commercial package tiers.

```json
{
  "sectionBadge": "Product Ladder",
  "sectionTitle": "Fixed-Price Engineering. Zero Hourly Drag.",
  "sectionSubtitle": "Select your entry tier...",
  "plans": [
    {
      "id": "tco-audit",
      "tierName": "PRODUCT 0",
      "title": "Workaround TCO Audit & Architecture Spec",
      "description": "Low-risk forensic audit...",
      "price": "$350",
      "originalPrice": "$490",
      "priceNote": "instead of $490 after pilot quota",
      "turnaround": "24-48 Hours SLA",
      "creditNote": "100% credited toward implementation",
      "deliverablesTitle": "Included Deliverables (EU NACE 62.01):",
      "deliverables": [
        "TDABC Cost Forensics...",
        "Official Via Negativa Verdict...",
        "OpenAPI 3.0 specification...",
        "PostgreSQL DDL schema..."
      ],
      "demandGateNote": "Required initial step...",
      "ctaText": "Request the Audit for $350 →",
      "ctaHref": "#contact",
      "isHero": true
    }
  ]
}
```

### File: `projects/<slug>/data/faq.json`
Matches `FaqDataSchema`. Holds categorized objection-handling entries.

```json
{
  "sectionBadge": "Clarity & Ground Rules",
  "sectionTitle": "Frequently Asked Questions",
  "sectionSubtitle": "Everything you need to know...",
  "items": [
    {
      "question": "What is the Workaround TCO Audit?",
      "answers": [
        "Our introductory 24-48h TDABC audit...",
        "We deliver an official Via Negativa verdict..."
      ]
    }
  ]
}
```

### File: `projects/<slug>/data/manifest.json`
Matches `ManifestDataSchema`. Holds the 7 Core Engineering Principles.

```json
{
  "title": "The Engineering Manifesto",
  "subtitle": "7 Non-Negotiable Operational Principles for Sovereign Software Systems",
  "version": "v18.9 / v20.0",
  "principles": [
    {
      "number": 1,
      "title": "Via Negativa (Anti-Waste Directive)",
      "quote": "Never automate what should be deleted.",
      "summary": "If switching costs exceed savings, automation is forbidden.",
      "body": "Before writing a line of code or deploying a database table..."
    }
  ]
}
```

---

## 3. Pluggable Inbound Lead Model

### Entity: `GenericLeadSubmission`
Processed by `app/api/lead/route.ts`.

| Field | Type | Validation / Constraints | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | RFC 5322 Email, max 255 | Work email of prospect |
| `contact` | `string` | Optional string, max 150 | Telegram handle, WhatsApp, LinkedIn, phone |
| `topic` | `string` | Optional string, max 100 | Categorization tag (e.g. `tco-audit`, `foss-office`) |
| `message` | `string` | Min 3, max 2000 chars | Prospect brief or bottleneck description |
| `metadata` | `Record<string, unknown>` | Optional dictionary | Dynamic custom fields passed by brand forms |
| `timestamp` | `string` (ISO) | Auto-generated server side | Capture timestamp |
