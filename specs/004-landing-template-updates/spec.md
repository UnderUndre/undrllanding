# Feature Specification: Landing Template Updates — Brand Icon Pipeline, Logo Decoupling & Citation Integrity

**Feature Directory**: `specs/004-landing-template-updates`
**Repository**: `undrllanding`
**Created**: 2026-11-02
**Status**: Clarified (ready for plan)
**Parent Feature**: `specs/003-landing-template-engine` (this spec is an incremental delta; it does NOT re-state FR-001..FR-011 of 003)
**Input**: Post-implementation review findings + template-readiness assessment of the working session 2026-11-02 (icon rework, header logo restyle, manifesto citation fix, favicon weight issue, MIME route defect).

---

## 1. Executive Context

After the 003 engine refactor landed, a working session surfaced four classes of defects/gaps that 003 does not cover:

1. **Brand icon pipeline is not config-driven and is technically broken at the edges.**
   The favicon was a 1.2–1.4 MB raster (ICO or PNG-in-SVG) served for a 16–32 px browser tab slot; `apple-touch-icon` pointed at SVG, which iOS Safari does not render; the icon route (`app/icon.svg/route.ts`) hardcoded `Content-Type: image/svg+xml` regardless of the configured file extension. Icons also existed in two competing locations (`public/projects/<slug>/` vs `projects/<slug>/public/`) with no single source of truth.
2. **Header logo presentation is coupled to a brand-colored chrome.**
   `components/ui/logo.tsx` wrapped the brand icon in an inline-styled box (`background-color: theme.secondaryColor`, border, padding). A brand whose icon is designed for transparent placement (the current `icon.svg`) renders with a foreign-colored backing plate. Presentation decisions (chrome/no chrome) belong to the layout, not to forced inline styles.
3. **Public citation integrity (internal state leak).**
   The homepage tagline was attributed «— Инженерный манифест UnderUndre §18.9», where §18.9 is an internal business-plan revision number, not a section of the public 7-principle manifesto. External readers hit a phantom reference. The public manifesto must be cited only by its own public coordinates (§1–§7) with working anchors.
4. **Template readiness is unproven by a second consumer.**
   The scaffolding CLI (003 FR-009) has exactly one live brand. The cheapest falsifiable test of template quality — a pilot second project — has not been run.

## 2. User Scenarios & Testing *(mandatory)*

### User Story 1 — Lightweight, Config-Driven Favicon & Touch Icons (Priority: P1)

As a landing visitor (and the brand owner configuring it),
I want the browser tab and iOS home-screen icons to come from small raster assets declared in the brand config,
so that the page loads fast, renders correctly on all platforms, and swapping a brand icon never requires touching framework code.

**Why this priority**: every visitor pays the favicon cost on first paint; iOS users currently get no icon at all. Highest blast radius per line of change.

**Independent Test**: `next build` + inspect generated `<head>` link tags and asset sizes.

**Acceptance Scenarios**:

1. **Given** a brand config with `faviconUrl` pointing to a ≤10 KB PNG, **When** the homepage is served, **Then** the `<link rel="icon">` points to that asset and its transfer size is ≤10 KB.
2. **Given** a brand config with `appleIconUrl` pointing to a 180×180 PNG, **When** an iOS visitor adds the page to home screen, **Then** the touch icon renders as brand artwork (not a page screenshot).
3. **Given** `config.iconUrl` is changed to any of `.svg` / `.png` / `.ico`, **When** the icon route is requested, **Then** the response `Content-Type` matches the file extension.
4. **Given** a brand config that omits `faviconUrl`/`appleIconUrl`, **When** metadata is generated, **Then** the engine falls back to `iconUrl` without build failure (backward compatibility for existing brands).

---

### User Story 2 — Header Logo Renders on Transparent Background (Priority: P2)

As a brand owner,
I want the header logo container to present my icon without any forced background plate,
so that transparent-background brand art is not displayed on a foreign color patch.

**Why this priority**: visual defect visible on every page of the live landing; already fixed ad hoc, needs to be locked in as the engine behavior.

**Independent Test**: inspect rendered header DOM/CSS; verify no inline `backgroundColor` on the logo wrapper.

**Acceptance Scenarios**:

1. **Given** the active brand icon, **When** the header renders, **Then** the logo wrapper contains no inline background/border styles derived from `theme`.
2. **Given** a transparent-background SVG/PNG icon, **When** the header renders in dark and light themes, **Then** the page background shows through the icon's transparent regions.
3. **Given** the hover interaction, **When** the user hovers the logo, **Then** the existing scale-105 transition still applies.

---

### User Story 3 — Public Citation Integrity for the Manifesto (Priority: P3)

As an external B2B reader,
I want every on-site citation of the Engineering Manifesto to reference its public section numbering (§1–§7) with a working anchor,
so that no citation points to a non-existent document coordinate and no internal revision identifiers leak into public copy.

**Why this priority**: trust defect; already fixed ad hoc for one citation, needs a general rule so future copy edits cannot reintroduce the leak.

**Independent Test**: grep all public copy/data for internal version patterns (`§18`, `v18`, `/ v2`-style dual versions); click every manifesto citation link.

**Acceptance Scenarios**:

1. **Given** any user-visible copy string citing the manifesto, **When** rendered, **Then** the section number cited is in range 1–7 and matches the principle actually quoted.
2. **Given** a citation «§ N», **When** the reader clicks it, **Then** the browser lands on `/manifest#p-N` and the target principle card is scrolled into view (not obscured by the fixed header).
3. **Given** `manifest.json` publicly served fields, **When** inspected, **Then** `version` contains a single public version token (no `a / b` dual-revision syntax) and no internal business-plan revision numbers appear anywhere in public copy.

---

### User Story 4 — Engine Validated by the Real `undreading` Brand (Priority: P4)

As the owner of the upcoming `undreading` brand (trilingual book platform «Сантехника бытия», per `undreplans/docs/projects/undreading/undreading-business-plan.md` v2.5),
I want the landing engine to host a second, real brand scaffolded via `pnpm project:create`,
so that template claims are validated by an actual consumer with real copy, pricing, and a third locale.

**Why this priority**: falsification test for the whole engine; blocks the undreading launch, but ships after the engine fixes.

**Independent Test**: scaffold `projects/undreading/`, build with `NEXT_PUBLIC_PROJECT_NAME=undreading`, assert all routes render with zero `underundre` references.

**Acceptance Scenarios**:

1. **Given** the CLI, **When** `pnpm project:create --slug=undreading --name="Undreading"` runs, **Then** a complete brand folder is produced (brand.ts, copy/pricing/faq/legal/manifest data, theme.css, icon set conforming to FR-003/FR-004) with copy sourced from the undreading business plan v2.5.
2. **Given** `NEXT_PUBLIC_PROJECT_NAME=undreading`, **When** `pnpm build` runs, **Then** all routes compile and render with zero references to the `underundre` brand.
3. **Given** the `uk` locale is present in undreading copy, **When** the site renders with `uk` selected, **Then** every user-visible string lacking a `uk` value renders its `en` value (rendered empty strings = 0) and brand content renders full `uk` copy.
4. **Given** both brands, **When** either is built, **Then** no `public/projects/<other-slug>/` assets are required for the build to succeed (asset isolation).

---

### Edge Cases

- What happens when `faviconUrl` points to a missing file? (Icon route returns 404 — must not 500.)
- What happens when `appleIconUrl` references a non-180×180 image? (No server-side resize in scope — document the contract, metadata renders as configured.)
- What happens when a manifesto citation cites §8+ (out of range)? (Copy-review checklist item; no runtime validation of prose in scope.)
- What happens when two brands are built sequentially in one working tree? (Asset isolation: no cross-brand reads.)

## 3. Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: `ProjectConfig` MUST support optional `faviconUrl` (small raster favicon) and `appleIconUrl` (180×180 PNG) fields, with fallback resolution `faviconUrl ?? iconUrl` and `appleIconUrl ?? faviconUrl ?? iconUrl` in metadata generation.
- **FR-002**: The icon route MUST select `Content-Type` from the file extension (`.svg` → `image/svg+xml`, `.png` → `image/png`, `.ico` → `image/x-icon`), returning `application/octet-stream` for unknown extensions, and MUST return 404 (not 500) when the file is missing.
- **FR-003**: Each brand MUST ship a favicon asset ≤10 KB suitable for 16–48 px rendering, generated from the same source artwork as the header icon.
- **FR-004**: Each brand MUST ship an `apple-touch-icon` asset of 180×180 px in PNG format.
- **FR-005**: The header logo component MUST NOT apply inline background, border, or padding chrome derived from brand theme colors; the icon asset is the sole visual element.
- **FR-006**: All user-visible citations of the Engineering Manifesto MUST reference public section numbers (§1–§7) and link to `/manifest#p-<N>`; principle cards on `/manifest` MUST carry stable DOM ids `p-1`…`p-7` with scroll margin compensating the fixed header.
- **FR-007**: The public `manifest.json` `version` field MUST contain a single public version token; internal business-plan revision numbers MUST NOT appear in any publicly served copy, config, or metadata.
- **FR-008**: Brand icon assets MUST have a single source-of-truth location per project (`public/projects/<slug>/`); duplicate asset copies in `projects/<slug>/public/` MUST NOT exist. The source-of-truth is the served `public/` tree (owner decision 2026-11-02: single location, no build-time copy step).
- **FR-009**: *(pilot brand — pending scope clarification)* Scaffolding MUST produce icon assets conforming to FR-003/FR-004.

### Non-Functional Requirements

- **NFR-001**: `pnpm validate` (tsc --noEmit) passes with the new config fields.
- **NFR-002**: Favicon transfer size ≤10 KB; apple icon ≤60 KB; no regression to LCP (003 NFR-002 unchanged).
- **NFR-003**: No behavioral change for brands that omit the new optional config fields or the optional `uk` locale (pure additive contract).

### Security & Threat Mitigation (STRIDE)

> STRIDE: N/A — client-side asset pipeline and copy changes only; no new endpoints, auth, or PII handling. (Icon route already exists; path stays config-derived, not user-input-derived.)

### Key Entities

- **ProjectConfig** (extended): gains optional `faviconUrl`, `appleIconUrl`; fallback chain defined in FR-001.
- **Brand icon asset set**: header icon (`iconUrl`, full-quality vector/raster), favicon (`faviconUrl`, ≤10 KB raster), apple touch icon (`appleIconUrl`, 180×180 PNG) — one source artwork, three renditions.
- **Manifesto citation**: `{ text, sectionNumber (1–7), principleName, anchor: p-<N> }` — citations use the format «§ N (Principle Name)»; prose-level convention, not a runtime type.

## 4. Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Favicon transfer size reduced from ~1.34 MB to ≤10 KB (≥99% reduction), verified by network inspector.
- **SC-002**: iOS home-screen add renders brand artwork (manual verification on Safari/iOS or device emulator).
- **SC-003**: Zero occurrences of internal revision identifiers (`§18`, `v18.9`, dual `a / b` version tokens) in publicly served output — verified by grep over build artifacts.
- **SC-004**: `pnpm project:create --slug=undreading` + `pnpm build` completes with zero manual code fixes outside generated brand files.
- **SC-005**: `uk` locale renders for undreading brand content; ru/en output for `underundre` is byte-identical to pre-change baseline.
