# pnpm patches

## `@underundre__undesign.patch`

**Pinned target**: the exact `@underundre/undesign` version resolved in `pnpm-lock.yaml`.

**Why patched** (spec 005 FR-015, audit S-10): the internal design-system package
ships CSS/theme defaults that diverge from the landing's brand-token contract
(003/004). The patch adjusts the exported CSS entry so Tailwind brand tokens
resolve without forking the package.

**Maintenance rules**:
- Never hand-edit `node_modules` — edit the patch via `pnpm patch @underundre/undesign`.
- When bumping the package version, regenerate the patch and re-verify
  `pnpm validate && pnpm build` before committing.
- `next` is pinned to an exact version in `package.json` (no `^`) — do not
  re-float it; supply-chain review (S-10) requires reproducible deploys.
