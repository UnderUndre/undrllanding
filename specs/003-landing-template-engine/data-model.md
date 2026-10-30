# Phase 1 Data Model: 003-landing-template-engine

**Feature**: Open-Source Multi-Brand Landing Engine & White-Label Packaging  
**Date**: 2026-10-30  
**Status**: Approved (rev. 2 — post-review 2026-10-30: bilingual content, legal config block, canonical FooterConfig)

---

## 0. Bilingual Text Primitive

All user-visible content fields use `LocalizedText` — `{ ru: string; en: string }` (both required).
This matches the site's client-side language context (`lib/i18n.ts`, `context/lang-context.tsx`) and preserves
the bilingual copy currently in `projects/underundre/locales.ts`.

## 1. Decoupled Navigation & Footer Models

### Entity 1: `ProjectNavigationConfig`
Embedded inside each project's `ProjectConfig` (`projects/<slug>/config.ts`), replacing all hardcoded slug checks.

| Field | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `items` | `Array<{ labelKey?: string, labelFallback: string, href: string }>` | Yes | Array of top-level header navigation links |
| `ctaButton` | `{ labelKey?: string, labelFallback: string, href: string }` | No | Optional highlighted header action button |

### Entity 2: `ProjectFooterConfig` (canonical — single definition across all artifacts)
Embedded inside each project's `ProjectConfig`.

| Field | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `taglineKey` | `string` | No | i18n key for the brand mission statement |
| `taglineFallback` | `string` | Yes | Fallback tagline text |
| `columns` | `Array<{ titleKey?: string, titleFallback: string, links: Array<{ labelKey?: string, labelFallback: string, href?: string, badge?: string }> }>` | Yes | Custom columns (Product Ladder, Resources, etc.) |
| `showLegalLinks` | `boolean` | No (default `true`) | Controls automatic rendering of `/privacy` and `/terms` links |
| `showManifestLink` | `boolean` | No (default `false`) | Renders `/manifest` link only for projects that ship `manifest.json` |

### Entity 3: `ProjectLegalConfig` (NEW — review F4)
Embedded inside each project's `ProjectConfig`. Required for `/privacy` and `/terms`; missing fields render
marked placeholders (never silent empty legal text).

| Field | Type | Required | Description |
| :--- | :--- | :---: | :--- |
| `contactEmail` | `string` (email) | Yes | Data-protection / contact email (GDPR Art. 13) |
| `entityName` | `string` | Yes | Legal/operator identity shown on statutory pages |
| `jurisdiction` | `string` | Yes | e.g. `"EU NACE 62.01"` |
| `retentionMonths` | `number` | No (default `12`) | Data retention period disclosed in the privacy policy |
| `escrowProvider` | `string` | No (default `"Upwork Direct Contracts (5% fee, 0% client fee)"`) | `/terms` escrow clause — overridable by White-Label resellers |
| `warrantyDays` | `number` | No (default `7`) | `/terms` bugfix warranty period |

---

## 2. Schema-Driven Content Files (Option C)

All display strings below are `LocalizedText` objects (`{ "ru": "...", "en": "..." }`).

### File: `projects/<slug>/data/pricing.json`
Matches `PricingDataSchema`. Holds commercial package tiers.

```json
{
  "sectionBadge": { "ru": "Продуктовая лестница", "en": "Product Ladder" },
  "sectionTitle": { "ru": "Фиксированные чеки. Ноль почасовой оплаты.", "en": "Fixed-Price Engineering. Zero Hourly Drag." },
  "sectionSubtitle": { "ru": "Выберите формат входа...", "en": "Select your entry tier..." },
  "plans": [
    {
      "id": "tco-audit",
      "tierName": { "ru": "ПРОДУКТ 0", "en": "PRODUCT 0" },
      "title": { "ru": "TCO-аудит костылей и спецификация архитектуры", "en": "Workaround TCO Audit & Architecture Spec" },
      "description": { "ru": "Низкорисковый форензик-аудит...", "en": "Low-risk forensic audit..." },
      "price": "$350",
      "originalPrice": "$490",
      "priceNote": { "ru": "вместо $490 после пилотной квоты", "en": "instead of $490 after pilot quota" },
      "turnaround": { "ru": "SLA 24-48 часов", "en": "24-48 Hours SLA" },
      "creditNote": { "ru": "100% зачёт в счёт имплементации", "en": "100% credited toward implementation" },
      "deliverablesTitle": { "ru": "Включённые артефакты (EU NACE 62.01):", "en": "Included Deliverables (EU NACE 62.01):" },
      "deliverables": [
        { "ru": "Форензика затрат TDABC...", "en": "TDABC Cost Forensics..." },
        { "ru": "Официальный вердикт Via Negativa...", "en": "Official Via Negativa Verdict..." },
        { "ru": "Спецификация OpenAPI 3.0...", "en": "OpenAPI 3.0 specification..." },
        { "ru": "DDL-схема PostgreSQL...", "en": "PostgreSQL DDL schema..." }
      ],
      "demandGateNote": { "ru": "Обязательный первый шаг...", "en": "Required initial step..." },
      "ctaText": { "ru": "Запросить аудит за $350 →", "en": "Request the Audit for $350 →" },
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
  "sectionBadge": { "ru": "Ясность и правила игры", "en": "Clarity & Ground Rules" },
  "sectionTitle": { "ru": "Часто задаваемые вопросы", "en": "Frequently Asked Questions" },
  "sectionSubtitle": { "ru": "Всё, что нужно знать...", "en": "Everything you need to know..." },
  "items": [
    {
      "question": { "ru": "Что такое TCO-аудит костылей?", "en": "What is the Workaround TCO Audit?" },
      "answers": [
        { "ru": "Наш вводный 24-48h TDABC-аудит...", "en": "Our introductory 24-48h TDABC audit..." },
        { "ru": "Мы выдаём официальный вердикт Via Negativa...", "en": "We deliver an official Via Negativa verdict..." }
      ]
    }
  ]
}
```

### File: `projects/<slug>/data/manifest.json` (only for projects with `showManifestLink: true`)
Matches `ManifestDataSchema`. Holds the 7 Core Engineering Principles.

```json
{
  "title": { "ru": "Инженерный манифест", "en": "The Engineering Manifesto" },
  "subtitle": { "ru": "7 непреложных операционных принципов", "en": "7 Non-Negotiable Operational Principles for Sovereign Software Systems" },
  "version": "v18.9 / v20.0",
  "principles": [
    {
      "number": 1,
      "title": { "ru": "Via Negativa (директива анти-расточительства)", "en": "Via Negativa (Anti-Waste Directive)" },
      "quote": { "ru": "Никогда не автоматизируй то, что следует удалить.", "en": "Never automate what should be deleted." },
      "summary": { "ru": "Если издержки переключения превышают экономию — автоматизация запрещена.", "en": "If switching costs exceed savings, automation is forbidden." },
      "body": { "ru": "Прежде чем писать строку кода...", "en": "Before writing a line of code or deploying a database table..." }
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
| `topic` | `string` | Optional string, max 100 | Categorization tag (e.g. `tco-audit`) |
| `message` | `string` | Min 3, max 2000 chars | Prospect brief or bottleneck description |
| `metadata` | `Record<string, string \| number \| boolean>` | Optional flat scalar map, **max 20 keys, string values ≤ 500 chars**, no nesting | Dynamic custom fields passed by brand forms (e.g. `bottleneckType`, `teamSize`) |
| `timestamp` | `string` (ISO) | Auto-generated server side | Capture timestamp |

**Dispatcher response contract** (review F7):

| Condition | `fallback` value |
| :--- | :--- |
| No sinks configured | `"direct"` (lead logged redacted: email/contact masked) |
| All configured sinks delivered | `"none"` |
| Some configured sink failed/timed out | `"partial"` (still HTTP 200 — never a 500 to the user) |

**Consumer migration**: the existing form `projects/underundre/components/cta-underundre.tsx` maps to the new contract as
`messenger → contact`, `stackAndTeam → message`, `bottleneckType → metadata.bottleneckType` — migrated in the same merge as the route (FR-005).
