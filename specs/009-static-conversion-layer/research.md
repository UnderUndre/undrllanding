# Research: 009-static-conversion-layer

**Date**: 2026-11-14 · **Status**: Complete — all ambiguities resolved in clarify Q1–Q3

## R-01: Prompt libraries as conversion artifacts (L1A)

Aha! (Sept 2025), Glean, and Productboard ship prompt libraries as product features; teams request shared/versioned prompt management. For the bureau: publishing the real SpecKit Discovery prompts converts "trust me" into "run it yourself". **Decision**: fully open (owner decision Q1) — same ungated philosophy as 008 teardowns; email gating rejected (contradicts the proof philosophy and adds a drip-contour for zero marginal trust gain).

## R-02: Personalization without runtime AI (L2)

Unbounce (57M+ conversions): interactive tools lift conversion up to 4x; personalization is the top 2026 theme per multiple trackers (L3 for specific %s). **Decision**: static persona variants switched by `?persona=` URL param — captures the message-market-fit lift with zero runtime AI, zero token cost, zero bundle bloat. Runtime personalization (GenPage-class tools) rejected: subscription cost + JS weight for a site whose pitch is deterministic engineering.

## R-03: Waitlist as the only compliant pre-launch instrument

undreading BP v2.8: Prix Pascal forbids paid promotion during the contest window (until results, Dec 2026); KDP radio silence until 30.11.2026. A waitlist page banks demand without publishing. **Decision**: email → existing `/api/lead` → Telegram + private ledger (owner decision Q3); double-opt-in SMTP contour rejected as infra creep for a manual-scale list.

## R-04: Brand isolation inverse pattern

007 (`/referral`) and 008 (`/teardowns`, `/calculator`) gate bureau programs to `underundre` and 404 elsewhere. `/waitlist` is the mirror image: undreading-only. **Decision**: identical gating mechanics, inverted brand — Gate V7.3 checks both directions.

## R-05: AI layer boundary

Market research: chatbots and AI SDR agents show real demand signals (peer-reviewed B2B study; active 2026 tooling market), but runtime AI on a site selling forensic determinism costs tokens, adds hallucination surface, and contradicts the Guessing Ban epistemics at current scale (5 touch-log rows). **Decision**: this spec ships the AI layer as static artifacts (human-authored prompts, URL-switched variants). Runtime chatbot/AI-SDR → watchlist until 10+ paid audits.

## R-06: uk locale first consumer

004 FR-010 made `LocalizedText` uk-optional; no feature consumed it yet. The undreading waitlist (audience: RU/EN/UA readers per BP) is the first uk consumer — validates the fallback chain live.
