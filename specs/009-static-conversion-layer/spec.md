# Feature Specification: 009-static-conversion-layer — Prompt Library, Persona Variants & Book Waitlist

**Feature Branch**: `feature/009-static-conversion-layer`
**Repository**: `undrllanding`
**Created**: 2026-11-14
**Status**: Clarified (ready for plan)
**Parent Features**: `specs/008-proof-and-leak-engine` (calculator bridge + telemetry contour), `specs/007-referral-program` (`?ref=` attribution), `specs/006-seo-geo-foundation` (metadata/JSON-LD spine)
**Input Directive**: Market research 2026-11-14 (see `research.md` R-01..R-06) identified three zero-runtime, high-demand conversion features validated by external data:
1. **Prompt Library as lead magnet** — SaaS vendors (Aha!, Glean, Productboard) ship prompt libraries as product features; for the bureau this publishes the actual discovery methodology in public (same ungated philosophy as 008 teardowns).
2. **Persona-aware static landing variants** — personalization is the dominant 2026 conversion theme; implemented here as static copy variants switched by URL parameter (no runtime AI, no bundle bloat), bridging the 007 referral param and 008 telemetry.
3. **Book waitlist page for the `undreading` brand** — waitlist/pre-launch pages are a proven standalone category; this is the first undreading-specific feature and validates the multi-brand engine on real brand-specific content (book «Сантехника бытия», per `undreplans/docs/projects/undreading/undreading-business-plan.md` v2.8; KDP silence until 30.11.2026 makes audience capture the correct pre-launch move).

**Epistemic reconciliation (Guessing Ban, Mandate 5 v20.2a)**: no feature in this spec displays site-asserted monetary figures; persona variants alter copy, not economics; waitlist captures emails, not estimates.

---

## 1. Executive Context

The landing now has proof (006 SEO/JSON-LD, 008 teardowns), quantification (008 calculator), and incentives (007 referral). The missing conversion layer per market research:

1. **Methodology-as-public-artifact**: prospects want to touch the method before paying $350. A public prompt library — the actual prompts Андрей uses in a SpecKit Discovery — converts "trust me" into "run it yourself, then buy my time".
2. **Message-market fit per visitor**: cold traffic arrives from different jobs (an ops lead drowning in WhatsApp vs a CTO evaluating architecture). One hero copy for all personas leaks conversions; static per-persona variants selected by URL parameter deliver the personalization lift without any runtime AI cost.
3. **Demand capture before launch**: the undreading book has a hard marketing silence until 30.11.2026 (Prix Pascal rules). A waitlist page is the only compliant instrument to bank demand during that window.

All three are statically prerendered, brand-isolated, and verified by an extended gate in the existing `verify-gates.mjs` contour.

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 — Public SpecKit Prompt Library (Priority: P1)

As a prospect or fellow engineer,
I want to read, copy, and download the real prompts used in a SpecKit Discovery,
so that I can run a miniature version of the audit on my own workflow and see the methodology's rigor before paying for it.

**Why this priority**: lead magnet with the lowest build cost and the strongest trust signal; directly extends the ungated-teardown philosophy that the market research validated.

**Independent Test**: open `/prompts`, copy a prompt, download the full pack as one markdown file, verify zero network requests for copy actions.

**Acceptance Scenarios**:

1. **Given** `https://underundre.com/prompts`, **When** rendered, **Then** N prompt cards display with category, bilingual title/description, prompt body in a code block, and a per-card copy-to-clipboard button; copy operations make zero network requests.
2. **Given** the library page, **When** the visitor clicks "Download the full pack (.md)", **Then** a single markdown file containing all prompts downloads (static asset, no runtime generation).
3. **Given** any prompt card, **When** inspected, **Then** a visible CTA links the prompt back to the audit offer («this prompt is step 3 of 5 — I run all five on your real data for $350»), first-person voice per Principle XV.
4. **Given** a non-underundre brand, **When** `/prompts` is requested, **Then** it renders 404 (bureau methodology program, brand-gated like 007/008).

---

### User Story 2 — Persona-Aware Landing Variants (Priority: P2)

As a visitor arriving from a targeted post or referral link,
I want the hero to speak to my role's pain (operations drag vs architecture risk vs owner's budget),
so that the first screen matches my context instead of a generic pitch.

**Why this priority**: personalization is the top 2026 conversion theme per market research; static variants capture most of the lift at zero runtime cost. Depends on hero copy being the highest-leverage real estate.

**Independent Test**: open `/?persona=ops`, `/?persona=cto`, `/?persona=owner` (and no param); verify the hero badge/title/subtitle/CTA copy switches per persona and the default render is byte-identical to the current build.

**Acceptance Scenarios**:

1. **Given** `/?persona=ops`, **When** the hero renders, **Then** badge, title, subtitle, and CTA label come from the `ops` persona variant (bilingual), and `metadata.persona = "ops"` is attached to any lead-form submission on this visit.
2. **Given** no `?persona` parameter, **When** the page renders, **Then** the hero is byte-identical to the pre-009 build (baseline V3 contract preserved — the default variant IS the current copy).
3. **Given** an invalid persona value (`?persona=hacker`), **When** the page renders, **Then** it falls back to the default variant and no `metadata.persona` is set.
4. **Given** a visitor with `?persona=ops&ref=alice`, **When** submitting the lead form, **Then** both `metadata.persona = "ops"` and `metadata.referral = "alice"` are present (007 attribution composes with persona).
5. **Given** a `?persona=ops` link shared in a WhatsApp referral message, **When** the visitor switches UI language, **Then** the persona variant re-renders in the selected language without a page reload.

---

### User Story 3 — Undreading Book Waitlist (Priority: P3)

As a reader tracking the book «Сантехника бытия»,
I want to leave my email to be notified at launch (and get the free sample chapter),
so that I don't miss the release while paid channels are silent.

**Why this priority**: only compliant demand-capture instrument during the Prix Pascal silence; first real second-brand feature and a live pilot of the multi-brand engine on brand-specific copy.

**Independent Test**: open `https://undreading.com/waitlist` (or the undreading build's route), submit an email, verify it lands in the existing lead pipeline with `topic: "undreading-waitlist"` and appears in the private waitlist ledger.

**Acceptance Scenarios**:

1. **Given** the undreading build, **When** `/waitlist` is requested, **Then** a bilingual-plus-uk page renders (email field, consent checkbox, launch-context copy per business plan v2.8) and the form posts to the existing `/api/lead` with `topic: "undreading-waitlist"`.
2. **Given** the underundre build, **When** `/waitlist` is requested, **Then** it renders 404 (brand-isolated: the book belongs to undreading, mirror-image of 007/008 gating).
3. **Given** a submitted waitlist email, **When** it arrives in the Telegram dispatch, **Then** it carries `metadata.sourceComponent = "waitlist"` and the email is appended to the private waitlist ledger in `undreplans` (GDPR Art. 13 link to `/privacy` present on the page).
4. **Given** a duplicate email submission, **When** processed manually at ledger review, **Then** it is deduplicated (manual process, same contour as 007 payouts — no DB in scope).

---

### Edge Cases

- **Both persona and calculator telemetry in one lead**: persona is a static string key, calculator telemetry is a flat map — both compose into `metadata` within the ≤20-key bound (7 calculator + persona + referral + form fields ≈ 11 keys, within budget).
- **`?persona` combined with `?ref=`**: independent keys, no collision; both captured (US2-AC-4).
- **Waitlist submitted from the wrong brand build**: impossible by construction — the route 404s on underundre.
- **Prompt pack download offline**: static `.md` asset served from `public/`, no runtime generation to fail.
- **Persona param set by a referral partner to mislead attribution**: persona is a UX segment, not an economic reward key — no payout depends on it (zero fraud surface, unlike 007 nicknames).


## 5. Clarification Log (Phase 2, 2026-11-14)

| # | Question | Resolution |
|---|---|---|
| Q1 | Prompt pack gating | **Fully open**: page with per-card copy buttons + static `.md` download; no email gates (same ungated philosophy as 008 teardowns). |
| Q2 | Persona set | **3 personas** mapped 1:1 to the existing intake-form roles: `owner` (Owner/CEO), `ops` (Operations Lead), `cto` (manager/architecture) — metadata maps cleanly into lead analytics. |
| Q3 | Waitlist mechanics | **Email → existing `/api/lead` → Telegram dispatch + private ledger** in `undreplans` with manual dedup; consent checkbox + `/privacy` link; no double-opt-in SMTP contour in scope. |

## 3. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `/prompts` MUST render N prompt cards from `projects/underundre/data/prompts/*.json` (Zod-validated `PromptSchema`: slug, category, bilingual title/description, prompt body, `relatesTo` audit-step label), each with a client-side copy button making zero network requests.
- **FR-002**: `/prompts` MUST offer "Download full pack (.md)" served as a static asset from `public/projects/underundre/prompt-pack.md` (generated at authoring time, not runtime).
- **FR-003**: The initial prompt set MUST be 5 prompts bound to the real SpecKit Discovery workflow (provenance rule of 008 T006 applies: prompts are the ones Андрей actually runs, first-person voice, Principle XV).
- **FR-004**: Brand config MUST gain optional `hasPrompts?: boolean`; `/prompts` MUST render 404 for brands without it.
- **FR-005**: Brand config MUST gain optional `personas?: { id: "ops" | "owner" | "cto"; badge; title; subtitle; ctaLabel }[]` (bilingual, per-variant); the hero MUST switch badge/title/subtitle/CTA client-side by `?persona=<id>` with default fallback = current copy.
- **FR-006**: A valid `?persona=<id>` MUST be persisted to localStorage (`undr.persona`, last-touch overwrite, same contour as 007 FR-002) and attached as `metadata.persona` to lead-form submissions; invalid/absent values MUST omit the key.
- **FR-007**: `/waitlist` MUST exist ONLY in the undreading build (underundre → 404), render trilingual copy (ru/en/uk per `LocalizedText` uk support), and post to the existing `/api/lead` with `topic: "undreading-waitlist"` and `metadata.sourceComponent = "waitlist"`.
- **FR-008**: The waitlist form MUST include an explicit consent checkbox with a link to `/privacy` (GDPR Art. 13), and submissions MUST be appended to a private waitlist ledger in `undreplans` (manual dedup, no DB).
- **FR-009**: All new pages MUST be statically prerendered with canonical URLs, and `/prompts` MUST generate `CollectionPage` JSON-LD, `/waitlist` — `WebPage` JSON-LD, following the 006 spine (`<`-escape, `metadataBase`).
- **FR-010**: Sitemap MUST conditionally include `/prompts` (underundre only), `/waitlist` (undreading only), mirroring the 008 conditional pattern.
- **FR-011**: Footer links: «Free prompts» (underundre footer) and «Waitlist» (undreading footer) added via brand configs — no header nav churn.

### Non-Functional Requirements

- **NFR-001**: `pnpm validate` and `pnpm test` pass with 0 errors for both brands.
- **NFR-002**: Total client bundle increase ≤ 10 KB gzipped; all new pages `○ Static`, LCP ≤ 1.5 s, CLS = 0.
- **NFR-003**: Zero new runtime dependencies; zero runtime AI calls in this entire spec (the "AI features" here are static artifacts: prompts authored by a human, variants switched by URL).
- **NFR-004**: Default rendering of homepage hero MUST remain byte-identical to the pre-009 baseline for Gate V3 (default persona variant IS the existing copy); baseline refresh only if footer link changes normalized DOM (per 004 maintenance contract).
- **NFR-005**: verify-gates MUST gain Gate V7: V7.1 prompt schema + slug uniqueness, V7.2 persona-key contract (default = byte-identity, valid param = variant renders, invalid = fallback), V7.3 waitlist brand isolation (404 on underundre, present on undreading).

### Security & Threat Mitigation (STRIDE)

- **Spoofing**: persona param is UX-only (no payouts, no data access) — spoofing surface is zero-value by construction.
- **Tampering**: all lead payloads pass the existing `GenericLeadSubmissionSchema` bounded map; prompt pack is a static file.
- **Repudiation**: waitlist ledger is append-only markdown in the private repo (007 FR-004 contour).
- **Information Disclosure**: waitlist emails live only in the private `undreplans` repo + Telegram dispatch; public repo greps clean (V5 pattern extended to new data files).
- **Denial of Service**: all routes static; lead API already rate-limited (005).
- **Elevation of Privilege**: N/A (no auth surface).

### Key Entities

- **PromptPack item**: `{ slug, category, relatesTo, title{ru,en}, description{ru,en}, body, order }` — static, Zod-validated, human-authored (provenance: Андрей's real discovery prompts).
- **PersonaVariant**: `{ id: "ops"|"owner"|"cto", badge{ru,en}, title{ru,en}, subtitle{ru,en}, ctaLabel{ru,en} }` — copy-only, no economic data.
- **WaitlistEntry**: ledger row `{ date, email, source, lang }` — private repo, manual dedup.

## 4. Success Criteria *(mandatory)*

- **SC-001**: A visitor copies any prompt in ≤ 2 clicks with zero network requests; the full pack downloads as one `.md`.
- **SC-002**: `/?persona=ops|owner|cto` renders the correct variant in both languages; default render is byte-identical to baseline (Gate V3 green without refresh, unless footer DOM changes — then one documented refresh).
- **SC-003**: A lead submitted after a persona visit carries `metadata.persona`; combined `persona` + `referral` + calculator telemetry compose within the ≤20-key bound.
- **SC-004**: A waitlist email submitted on the undreading build arrives in Telegram with `topic: "undreading-waitlist"` and lands in the private ledger; underundre build returns 404 for `/waitlist`.
- **SC-005**: `pnpm verify` passes for both brands with Gate V7 active; total bundle growth ≤ 10 KB gz.
