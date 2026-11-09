# Feature Specification: Referral Program («Sovereign Referral»)

**Feature Directory**: `specs/007-referral-program`
**Repository**: `undrllanding`
**Created**: 2026-11-09
**Status**: Draft (owner decisions D1–D6 integrated; ready for plan)
**Input**: Owner brainstorm 2026-11-09: anyone can mint a referral link from a nickname + chosen social network; client receives a discount; referrer receives a crypto payout; additional bonus payout to both when the client leaves a verified review.

## 1. Executive Context

The landing has zero warm-traffic channels beyond direct outreach; the touch-log shows trigger-based referrals outperform cold contact. This feature adds a self-serve referral loop with **no backend**: link minting is client-side, attribution rides the existing lead-form `metadata` pipeline (005), and all payouts are manual, verification-gated, and capped.

**Anti-fraud stance (design-level)**: the program pays only for *verified payments by third parties*, never for leads or clicks. Payout review is manual — appropriate for solo-founder volume (<10 payouts/month); automation of payouts is explicitly out of scope.

## 2. Owner Decisions (2026-11-09)

| # | Decision |
|---|---|
| D1 | Client reward = **discount** (−$50 off the audit invoice), not a crypto payout |
| D2 | Referrer eligibility = **anyone**; fraud protection lives in payout gates, not registration |
| D3 | Review platforms: **LinkedIn, X, профильные комьюнити**; Google Maps excluded (owner + platform ToS); **Upwork excluded** (ToS bans incentivized reviews) |
| D4 | Review bonus scales to max **2 platforms**: 1 platform = base bonus, 2nd platform = +50%, hard cap |
| D5 | Payout asset: **USDT TRC-20** (USD-pegged; ~$1 network fee); wallet address collected at payout time only |
| D6 | Amounts (owner-approved defaults, revisable at plan): $50 referrer / −$50 client discount / +$50 referrer & +$25 client service-credit for review (+50% = +$25 on 2nd platform); **hard cap $200 total incentive value ($175 max cash/discount exposure: $50 discount + $125 max referrer payouts; +$25 single-use client service credit) per converted client** |

## 3. User Scenarios & Testing *(mandatory)*

### User Story 1 — Mint a Referral Link (Priority: P1)

As any visitor,
I want to enter my nickname and pick a social network on `/referral` and instantly get my personal link,
so that I can share it and be credited without registering anywhere.

**Why this priority**: the entire loop dies if minting is not instant and registration-free.

**Independent Test**: open `/referral`, enter nickname, select network → link rendered and copied.

**Acceptance Scenarios**:

1. **Given** nickname `alice` + network `LinkedIn`, **When** submitted, **Then** the page renders `https://underundre.com/?ref=alice` with a copy button; no server request is made.
2. **Given** any page with `?ref=alice`, **When** the visitor later opens the lead form, **Then** the form payload includes `metadata.referral = "alice"` (persisted via localStorage across pages).
3. **Given** no `?ref` parameter, **When** the lead form is submitted, **Then** `metadata.referral` is absent (no empty-string noise).

### User Story 2 — Paid-Referral Rewards (Priority: P2)

As a referrer,
I want a flat $50 USDT payout once my referral's audit is paid,
so that sharing the link has concrete value.

**Why this priority**: the money event of the whole loop; gated on payment, not leads.

**Independent Test**: end-to-end reconciliation — a lead with `metadata.referral` pays an audit → payout row appears in the manual ledger.

**Acceptance Scenarios**:

1. **Given** a paid audit whose lead carried `metadata.referral = alice`, **When** the owner verifies the payer is a third party (not the referrer's own identity/wallet), **Then** a $50 USDT TRC-20 payout is queued; the client's invoice shows −$50.
2. **Given** a referral whose payer matches the referrer (self-referral), **When** reviewed, **Then** the payout is rejected and logged as rejected.
3. **Given** multiple referrals converted by one referrer, **When** payouts are queued, **Then** each converted client yields at most one base payout (cap accounting: total incentive value per converted client ≤ $200 across all rewards, with max $125 in referrer payouts).

### User Story 3 — Verified Review Bonus (Priority: P3)

As a referrer or client,
I want a bonus after my review has been publicly visible for 30+ days on an eligible platform,
so that honest, lasting reviews are worth more than drive-by ratings.

**Why this priority**: high-value, but only meaningful after US1–US2 produce real clients; delayed payout by design.

**Independent Test**: ledger check 30+ days after a review URL is registered.

**Acceptance Scenarios**:

1. **Given** a paid client's review published on LinkedIn, **When** 30 days elapse and the post is still live under a real identity, **Then** referrer receives +$50 and the client a +$25 service credit (duplicated review registration = rejected).
2. **Given** the same client posts a second review on X, **When** verified after 30 days, **Then** the referrer's review bonus total is +$75 (+50% on the 2nd platform) and the client's credit +$25 once.
3. **Given** a 3rd platform review, **When** submitted, **Then** no further bonus accrues (cap = 2 platforms).
4. **Given** an Upwork or Google Maps review URL, **When** submitted, **Then** the system (page rules) states those platforms are ineligible.

### Edge Cases

- Attribution overwrite policy: **Last-touch** — arriving with a new valid `?ref=<nickname>` parameter overwrites the existing referral in localStorage and updates the timestamp.
- Brand isolation: program is active exclusively for brand `underundre`; `/referral` renders 404 (`notFound()`) on non-underundre brands, and footer links are configured via `projects/underundre/brand.ts`.
- Nickname collision: two referrers pick the same nickname → payouts reconcile to distinct identities only via manually verified payer context; `/referral` page displays a notice that nicknames are not reserved and duplicates resolve at payout review.
- Referral lead never converts: no payout, no reminder infrastructure (out of scope).
- Client requests payout in something other than USDT: out of scope — USDT TRC-20 only (D5).
- Referral parameter spoofing (`?ref=` self-entered at checkout): mitigated by payout review only; no technical exclusion claimed.
- localStorage cleared between visit and form submit → referral lost; acceptable (documented), no server-side attribution in MVP.

## 4. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `/referral` page MUST render a mint form (nickname input + social network select ≥ LinkedIn, X, «профильное комьюнити») producing a canonical share link `https://<domain>/?ref=<nickname>` fully client-side, with a copy-to-clipboard button and program rules (rewards, caps, eligibility, ineligible platforms). Gated to brand `underundre` (other brands return 404).
- **FR-002**: All landing pages MUST persist a `?ref=<nickname>` query parameter to localStorage (key `undr.referral`, last-touch overwrite policy) and include it as `metadata.referral` in every lead-form submission; absence MUST omit the field.
- **FR-003**: Program rules MUST state: referrer reward $50 USDT TRC-20 per converted (paid) referral; client discount −$50 applied to the actual invoiced amount exactly once per converted client and never stacked with any other promotion (example: pilot $350 → $300); review bonus +$50 referrer / +$25 client service credit per verified 30-day review; +50% referrer bonus on a 2nd platform (+$25); hard cap $200 total incentive value per converted client (max $125 referrer cash payouts, −$50 client invoice discount, +$25 client service credit); ineligible platforms: Upwork, Google Maps. Client credit mechanics: single-use credit toward any next service, expires 6 months after issue, applied manually at invoicing.
- **FR-004**: A manual payout ledger (markdown in the private plans repo `undreplans` — never the public landing repo) MUST record every queued/paid/rejected reward with: referrer identity, referral lead id, payer verification note, amount, TRC-20 address, date, review URL(s).
- **FR-005**: Payout verification MUST reject self-referrals (payer identity = referrer identity by any reasonable signal) and duplicate reward claims for the same converted client; rejections logged per FR-004. A review platform is eligible only if the review is a public, retrievable-by-URL post under the reviewer's real identity; eligibility of «профильное комьюнити» posts is decided by the owner at review time.
- **FR-006**: TRC-20 wallet addresses MUST be collected only at payout time (form/page field or direct message), MUST NOT be stored in public repo files, and the referral flow MUST NOT collect any other personal data beyond nickname.
- **FR-007**: Bilingual (RU/EN) page copy per existing `LocalizedText` engine conventions.

### Non-Functional Requirements

- **NFR-001**: `npm run validate` passes; no new runtime dependencies beyond existing stack.
- **NFR-002**: `/referral` fully static (○ Static prerender), LCP ≤ 1.5 s, adds ≤ 5 KB gzipped JS over baseline.
- **NFR-003**: No backend/API changes required for link minting; lead-form change limited to `metadata.referral` passthrough.
- **NFR-004**: Zero PII beyond nickname in public artifacts; wallet addresses never committed (verified by grep gate, added to verify-gates).

### Security & Threat Mitigation (STRIDE)

- **Spoofing**: self-referral → FR-005 payout rejection; no auto-payouts.
- **Tampering**: `?ref` is attacker-controllable — accepted, integrity enforced at payout review, not at capture.
- **Repudiation**: FR-004 ledger = append-only record of decisions.
- **Information Disclosure**: FR-006 (wallet PII minimization); no public mapping nickname→person.
- **Denial of Service**: N/A (static page, no payout API).
- **Elevation of Privilege**: N/A (no auth, no privileged surface).

## 5. Success Criteria *(mandatory)*

- **SC-001**: A visitor can mint and copy a referral link in ≤ 30 seconds without registration.
- **SC-002**: 100% of lead-form submissions from a `?ref` visit carry `metadata.referral`.
- **SC-003**: First verified paid referral → payout executed within 7 days of payment.
- **SC-004**: Zero payouts without a matching paid invoice + verification note in the ledger.
- **SC-005**: `npm run verify` extended gate passes: wallet addresses absent from repo (grep), referral copy bilingual.
