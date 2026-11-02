# Data Model: 004-landing-template-updates

**Date**: 2026-11-02
**Scope**: additive type changes only; no storage, no DB.

## Entity: ProjectConfig (extended)

```ts
interface ProjectConfig {
  slug: string;
  name: string;
  domain: string;
  title: string;
  description: string;
  iconUrl: string;          // header logo + generic fallback
  faviconUrl?: string;      // NEW (FR-001): small raster, ≤10 KB, 16–48 px slot
  appleIconUrl?: string;    // NEW (FR-001): 180×180 PNG, ≤60 KB
  heroBadge?: string;
  theme: { primaryColor: string; secondaryColor: string };
  navigation: NavigationConfig;
  footer: FooterConfig;
  supportedLocales?: ("ru" | "en" | "uk")[]; // NEW (FR-010): default ["ru", "en"]
  legal?: LegalConfig;
}
```

**Metadata resolution** (app/layout.tsx):

```
icon    = config.faviconUrl   ?? config.iconUrl
shortcut= config.faviconUrl   ?? config.iconUrl
apple   = config.appleIconUrl ?? config.faviconUrl ?? config.iconUrl
```

## Entity: LocalizedText (extended, FR-010)

```ts
// before: { ru: string; en: string }
type LocalizedText = { ru: string; en: string; uk?: string };
```

**Fallback semantics**: `pick(t, lang)` returns `t[lang]` if present, else `t.en`, else `t.ru` (defensive), else `""`. Exact rule: `uk` missing → `en`. Applied in exactly one resolver; components never implement fallback themselves.

**Invariant (NFR-003/SC-005)**: for brands/data without `uk`, generated ru/en HTML is byte-identical to the pre-change baseline snapshot.

## Entity: Brand icon asset set

| Asset | Location | Format | Size budget | Slot |
|---|---|---|---|---|
| Header icon | `public/projects/<slug>/icon.svg` | SVG (PNG-in-SVG allowed) | — | `<img>` in logo.tsx, `iconUrl` fallback |
| Favicon | `public/projects/<slug>/icon-48.png` | PNG 48×48 (square canvas, transparent) | ≤ 10 KB | `<link rel="icon">` |
| Apple touch | `public/projects/<slug>/apple-icon-180.png` | PNG 180×180 | ≤ 60 KB | `<link rel="apple-touch-icon">` |

One source artwork → three renditions. Regeneration tooling: Python/PIL (dev-only, not shipped).

## Entity: Icon route

`app/icon.svg/route.ts` (canonical route handler):

- Path resolution: `public/<config.iconUrl>` (config-derived; no user input).
- MIME map: `.svg → image/svg+xml`, `.png → image/png`, `.ico → image/x-icon`, other → `application/octet-stream`.
- Missing file → 404 (NextResponse status 404), never 500.
- Cache: `public, max-age=31536000, immutable` (unchanged).

## Entity: Manifest citation (convention, not runtime type)

```
citation = { sectionNumber: 1..7, principleName: string }
rendered = "— <manifest title> § N (Principle Name)"
link     = /manifest#p-<N>
```

DOM contract on /manifest: `<section id="p-N" class="scroll-mt-24">` for N=1..7.

## State invariants

- No cross-brand reads at build: building brand A must not touch `public/projects/<B>/`.
- `public/projects/<slug>/` contains exactly the 3 renditions + no duplicate legacy copies (FR-008).
