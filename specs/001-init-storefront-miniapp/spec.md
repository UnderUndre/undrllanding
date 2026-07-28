# Feature Specification: 001-init-storefront-miniapp

**Feature Branch**: `001-init-storefront-miniapp`  
**Created**: 2026-07-19  
**Updated**: 2026-07-28 (Fully aligned with Medusa 2.0 + Paddle + undrepay pivot)  
**Status**: Draft — Active (Retargeted to Medusa Store API)  
**Input**: `undrllanding` = primary storefront + Mini App shell; one codebase, feature flags (`ECOSYSTEM.md`).

---

## Retargeting Fix (2026-07-28)

| Concern | Target Architecture (Medusa 2.0 + Paddle) |
|---------|-------------------------------------------|
| **Client Shop API** | **Medusa Store API** (`MEDUSA_BACKEND_URL`) via `@medusajs/medusa-js` / Store REST |
| **Fiat Checkout** | **Paddle Billing (MoR)** (client-side JS overlay + webhook verification) |
| **Crypto Checkout** | **undrepay** (SHKeeper + Blnk ledger, via Medusa `undrepay` provider) |
| **Identity / Auth** | **Medusa Customer Session** for shop; optional **undrlla IdP** SSO token pass-through |
| **Branding / Theme** | `@underundre/undesign` design system tokens + fallback theme |

---

## Executive Context

`undrllanding` is the customer UI for client shops and (later) flagship Undrlla.com.

| Wave | Scope |
|------|--------|
| **Wave 1 (Active)** | Catalog, product detail, cart, checkout via **Paddle** + Medusa Store API, undesign branding, Medusa Customer session |
| **Wave 2** | Telegram Mini App `initData` auth, TG UX chrome |
| **Wave 3+** | Flagship modules: housing queue, hub search, unet subscribe |
| **Out of Wave 1** | TG-only login, hub MoR cart, multi-vendor Connect (needs Stripe phase). |

Deploy: single image; env `MEDUSA_BACKEND_URL`, `TENANT_MODE=client|flagship`, `FEATURES=shop`, `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`.

---

## Clarifications

- Q: One app or two? → **One codebase**, feature flags (`ECOSYSTEM` Q2).
- Q: TG auth in MVP? → **No.** Wave 2 after `undrlla` ships `initData` → JWT.
- Q: Admin tokens in browser? → **Never.** Medusa publishable API key / customer JWT only.

---

## User Stories

### US1 — Branded shop + cart checkout (P1)
Visitor sees tenant brand via `@underundre/undesign`; browses products via Medusa Store API; manages cart; checks out via **Paddle** (fiat) or **undrepay** (crypto).

### US2 — Service booking (P1)
Customer books a service slot (Medusa custom booking module / prepaid).

### US3 — Customer Auth (P1 Wave-1)
Email/password (Medusa Store Auth). Guest checkout supported via cart session.

### US4 — TG Mini App auth (P2 Wave-2)
`initData` → undrlla `/auth/telegram` → session pass-through. Not required for Wave-1 ship.

---

## Functional Requirements

- **FR-001**: Next.js App Router + TypeScript.
- **FR-002**: Integrate `@underundre/undesign`; load tenant branding from Medusa / undesign theme preset; fallback to default undesign theme if API is down.
- **FR-003**: Wave-1 auth = Medusa Customer native session / JWT; **MUST NOT** require Telegram for shop.
- **FR-004**: Wave-1 views: catalog (`/products`), PDP (`/products/[id]`), cart (`/cart`), checkout (`/checkout`), order confirmation (`/orders/[id]`).
- **FR-005**: Use Medusa Store API publishable key only; no admin static tokens or secrets in client bundle.
- **FR-006**: Feature flags hide flagship modules when `FEATURES` lacks them.
- **FR-007**: Wave-2: TG Mini App SDK + server-validated `initData` (undrlla).
- **FR-008**: `plan.md` + `tasks.md` required before implement.

---

## Success Criteria

- **SC-001**: Wave-1 E2E: browse Medusa catalog → add to cart → Paddle sandbox pay → order completed.
- **SC-002**: UI gracefully falls back to default undesign theme if tenant API fails.
- **SC-003**: Zero admin tokens in client bundle (verified by static analysis / secret scan).

---

*End of Specification.*
