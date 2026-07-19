# Feature Specification: 001-init-storefront-miniapp (undrllanding Storefront & TG Mini App)

**Feature Branch**: `001-init-storefront-miniapp`
**Created**: 2026-07-19
**Status**: Approved / In Specification
**Input**: Implement the unified Next.js Storefront & Telegram Mini App frontend (`undrllanding`). The app connects to the `undrlla` Directus API, dynamically applies brand palettes and CSS custom properties from `@underundre/undesign`, authenticates users via Telegram WebApp `initData` or JWT, and provides responsive UI views for E-commerce shopping, Service bookings, P2P Barter listings, P2P Taxi requests, and the Mutual Aid Queue.

---

## Executive Context & Architecture

`undrllanding` serves as the primary user-facing interface across desktop, mobile web, and Telegram Mini App environments.

### Component Structure

1. **Dynamic Theme Engine (`@underundre/undesign`)**:
   - On page load, fetches `/items/branding_settings` from the tenant Directus API.
   - Injects CSS custom properties (`--color-primary`, `--color-secondary`) and DaisyUI theme class into `<html>` dynamically.

2. **Data Integration (`undrlla` API)**:
   - Directus GraphQL / REST SDK wrapper with TypeScript types.
   - Respects FLS/RLS constraints (strips unpermitted fields cleanly without throwing UI crashes).

3. **Telegram Mini App Integration**:
   - SDK wrapper for `@telegram-apps/sdk`.
   - Sends Telegram `initData` string to `/auth/telegram` for server-side HMAC validation and JWT token issuance.
   - Provides native haptic feedback, main button controls, and geolocator APIs for P2P Taxi requests.

---

## User Scenarios & Acceptance Criteria *(mandatory)*

### User Story 1 — Responsive Storefront & Dynamic Branding (Priority: P1)

As a customer visiting a client marketplace, I want the storefront to render rapidly with the client's custom brand colors from `@underundre/undesign`, display products, and support cart checkout.

**Acceptance Scenarios**:

1. **Given** a visitor loading `shop.zernyoshko.ru`, **When** the page renders, **Then** `@underundre/undesign` CSS variables are applied to Tailwind components, displaying the tenant's brand palette.
2. **Given** items added to cart, **When** the user clicks "Checkout", **Then** the app invokes `undrlla` cart splitting endpoints and redirects to payment processing (Stripe / TON).

---

### User Story 2 — Telegram Mini App Auth & P2P Taxi/Barter UI (Priority: P2)

As a Telegram user, I want to open the marketplace as a Mini App, automatically authenticate via my Telegram identity, and interact with P2P Barter or Taxi boards.

**Acceptance Scenarios**:

1. **Given** a user opening the Telegram Mini App, **When** the app initializes, **Then** `initData` is validated on `undrlla` backend, issuing a JWT session without requiring manual password entry.
2. **Given** a user creating a P2P Taxi request, **When** submitting origin and destination coordinates, **Then** the request is posted to `taxi_requests` and rendered on the interactive map board.

---

## Functional Requirements

- **FR-001**: System MUST be built using Next.js (React / TypeScript) with App Router.
- **FR-002**: System MUST integrate `@underundre/undesign` for runtime CSS variable and DaisyUI theme injection.
- **FR-003**: System MUST support Telegram Mini App initialization via `@telegram-apps/sdk` and `initData` authentication.
- **FR-004**: System MUST render Product Catalog, Cart, Checkout, and Service Booking views.
- **FR-005**: System MUST render P2P Barter listing forms and swap offer proposal modals.
- **FR-006**: System MUST render P2P Taxi map board and request submission interface.
- **FR-007**: System MUST render flagship Mutual Aid Queue status, position calculator, and donation registration form.

---

## Success Criteria

- **SC-001**: Storefront achieves First Contentful Paint (FCP) in under 1.2 seconds on mobile 4G networks.
- **SC-002**: Dynamic theme switching applies brand colors within 50ms of API metadata response without layout cumulative shifts (CLS < 0.05).
- **SC-003**: 100% of Telegram Mini App sessions authenticate seamlessly without manual password prompts.

---
*End of Specification.*
