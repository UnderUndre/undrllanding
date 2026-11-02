# Contract: verify-gates.mjs (CI Verify Script)

**Feature**: 004-landing-template-updates
**Entry**: `npm run verify` (new script in package.json), runs after `build`.

Single script implementing four audit gates (RTM FR-006/007/008/010, NFR-002/003). Exit 0 = all gates pass; exit 1 with per-gate report on failure.

## Gate V1 — Citation integrity (FR-006, FR-007)

Input: generated `.next` HTML output (or `out/` for static export) for brand `underundre` + brand data files.

- Scan public output for patterns: `/§\s*(?:1[89]|[2-9]\d)\./`, `/v18\.9/`, `/v\d+\.\d+\s*\/\s*v\d+/`, `18\.9` in user-visible text nodes.
- Assert count = 0.
- Assert every `/manifest#p-N` link target has matching `id="p-N"` with N ∈ 1..7 in the same build.

## Gate V2 — Asset integrity (FR-003, FR-004, FR-008, NFR-002)

Input: `public/projects/*/` and `.next/server/app/index.html`.

- For each brand: `icon-48.png` exists, file size ≤ 10 240 bytes, PNG dimensions = 48×48.
- `apple-icon-180.png` exists, size ≤ 61 440 bytes, dimensions = 180×180.
- `icon.svg` exists.
- Head metadata assert: rendered `index.html` has `<link rel="icon"` pointing to `icon-48.png` (not the heavy SVG source).
- Duplicate scan: no icon asset files under `projects/<slug>/public/` (path must not exist).
- Cross-brand isolation: build of brand A does not reference `public/projects/<B>/` (grep build output for other-brand asset paths = 0).

## Gate V2a — Logo chrome-free (FR-005)

Input: `components/ui/logo.tsx` + rendered header HTML.

- Assert logo wrapper JSX contains no inline `style={{` with `backgroundColor`, `borderColor`, or `padding` derived from `config.theme` (grep = 0).
- Assert rendered header wrapper element has no `background-color` inline style.

## Gate V3 — Locale fallback & baseline byte-identity (FR-010, NFR-003)

Input: brand data JSON/TS, resolver contracts, and rendered HTML.

- For undreading: contract unit verification of `pick()` resolver ensures every localized string with `uk` content renders `uk` when lang=uk; every string lacking `uk` renders `en` (assert count of empty strings = 0 for lang=uk).
- For underundre: rendered HTML byte-identical to baseline snapshot `specs/004-landing-template-updates/qa/baseline/index.html` (stored pre-FR-010 build output; regenerated via `pnpm build` at T002 and committed).

## Gate V4 — Type/compile hygiene (NFR-001)

- `tsc --noEmit` passes (delegated: `pnpm validate` runs before verify in CI).

## CLI

```bash
pnpm verify [-- --brand <slug>]   # default: NEXT_PUBLIC_PROJECT_NAME
```

Output: per-gate PASS/FAIL lines; non-zero exit on any FAIL.

## Maintenance

Baseline snapshots are regenerated ONLY when a byte-identical-output change is intended (deliberate content change), with commit message reference to the spec section. Any baseline diff on an additive-compat change = bug.
