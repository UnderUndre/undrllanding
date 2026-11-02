# Data Model: 005-code-review-fixes

**Date**: 2026-11-02
**Scope**: no storage, no DB, no brand-facing schema changes. Additive env contract + validation bounds on existing entities.

## Entity: RateLimitConfig (NEW, runtime)

```ts
// lib/lead/rate-limit.ts
interface RateLimitOptions {
  windowMs: number;        // default 60_000
  maxRequests: number;     // default 5
  maxMapSize: number;      // default 10_000 — hard cap threshold
  sweepIntervalMs: number; // default 10_000 — throttle between full sweeps
  trustedIpHeader?: string; // from LEAD_TRUSTED_IP_HEADER env, default "x-real-ip"
}
resolveClientIp(req, opts): string   // trusted header value if present, else x-forwarded-for first hop, else 127.0.0.1
check(key): { allowed: boolean; retryAfterSec: number }
// eviction: throttled sweep (now - lastSweep > sweepIntervalMs); if map.size >= maxMapSize, FIFO drop oldest
```

Data classification: Internal (IP strings + counters; no PII beyond network identifiers, no persistence).

## Entity: LeadMetadata (BOUNDED, existing)

```ts
// lib/schemas/content-schema.ts — changes only
metadata: z.record(z.string(), LeadMetadataValueSchema)
  .refine(keys ≤ 20)
  .refine(Object.keys().every(k => k.length <= 50))   // NEW (S-07)
LeadMetadataValueSchema.number → z.number().finite()   // NEW (S-07)
```

Request body: `Content-Length` header checked against 64 KB BEFORE `request.text()` (S-07); mismatch → 413.

## Entity: SecurityHeaders (NEW, response-level)

```js
// next.config.js headers() — all routes
Strict-Transport-Security: max-age=63072000; includeSubDomains
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' https://analytics.underundre.com; connect-src 'self' https://analytics.underundre.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'
// icon route (per-response, SVG only): Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'
```

Data classification: Public.

## Entity: IconRouteRequest (HARDENED, existing)

```ts
// app/icon.svg/route.ts
cleanIconUrl = config.iconUrl.replace(/^\/+/, "")
resolved = path.resolve(cwd, "public", cleanIconUrl)
assert resolved.startsWith(path.resolve(cwd, "public") + path.sep)   // else 404
assert extname ∈ {".svg", ".png", ".ico"}                             // else 404
read: fs/promises, lazy buffer cache on first request keyed by resolved path
cache: public, max-age=86400, stale-while-revalidate=604800           // was immutable-1y
```

## Entity: ScaffoldVars (VALIDATED, existing)

```ts
// scripts/create-project.mjs
name:   printable, no `"`, length ≤ 80        // NEW
domain: /^[a-z0-9.-]+$/i, length ≤ 253        // NEW
slug:   /^[a-z][a-z0-9-]*$/                    // existing
colors: /^#[0-9a-f]{6}$/                       // existing
substitution: replaceAll(token, () => value)   // function form — no $-patterns (F-01)
registry: in-memory snapshot before rewrite; restore + dir cleanup on ANY failure (F-02)
```

## Entity: GitleaksConfig (NEW)

```toml
# .gitleaks.toml
[extend] useDefault = true
[allowlist]
  paths = ['''\.env\.example$''', '''\.env\.production\.example$''', '''docs/''']
  description = "placeholder tokens in examples + runbook docs"
```

## State invariants

- No brand-facing data schema changes: `LocalizedText`, `PricingData`, `FaqData`, `ManifestData` untouched.
- HTML body byte-identity for underundre preserved except intentional changes; security headers are response-level and excluded from the V3 body-diff (audit hand-off #2).
- Rate-limit state is process-local; container restart resets counters (accepted, single-instance).
