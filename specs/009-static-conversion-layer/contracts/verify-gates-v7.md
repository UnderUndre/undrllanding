# Contract: verify-gates-v7 (CI Verification Gate V7)

**Feature**: `009-static-conversion-layer` · **Entry**: `scripts/verify-gates.mjs` via `pnpm verify`.

## Check V7.1 — Prompt library integrity (FR-001..FR-004)

For brand `underundre` (`hasPrompts: true`):

- `projects/underundre/data/prompts/*.json`: ≥ 5 files, each parses; required keys present (`slug`, `category`, `relatesTo`, `title.ru/en`, `description.ru/en`, `body`); slugs unique; `body` length ≥ 40 chars.
- Build output `.next/server/app/prompts.html` exists and contains `data-testid="prompt-card"`.
- `.next/server/app/prompt-pack.md.body` (or prerendered route output) exists and contains ≥ 5 `## Prompt:` headings.
- For other brands: `.next/server/app/prompts*` MUST NOT exist (brand isolation).

## Check V7.2 — Persona contract (FR-005/FR-006, NFR-004)

- `lib/persona.ts` source exports exactly `["owner","ops","cto"]` as valid ids and `undr.persona` as the storage key (source assertion).
- Hero component source references the persona resolver (no hardcoded variant copy in the hero file).
- Default byte-identity is enforced by existing Gate V3 (`V3-baseline-identity`) — V7.2 does not duplicate it; V7.2 fails if `lib/persona.ts` is missing or the valid-id set drifts from the 3-role contract.

## Check V7.3 — Waitlist brand isolation (FR-007/FR-008)

- For brand `undreading`: `.next/server/app/waitlist.html` exists, contains `data-testid="waitlist-form"` and `/privacy` link; copy file `projects/undreading/data/waitlist.json` has `ru`, `en`, and `uk` keys for all fields.
- For brand `underundre`: `.next/server/app/waitlist*` MUST NOT exist (mirror isolation).
- Both builds: no waitlist emails in any tracked source file (regex scan reuse from V5 contour).
