/** @type {import('next').NextConfig} */

// Security headers (spec 005 FR-004, contracts/hardening.md §2).
// Enforcing CSP — no Report-Only phase (Q3 decision).
// The analytics origin is DERIVED from NEXT_PUBLIC_UMAMI_SRC (the tracker URL
// set per deployment) — changing the analytics host is an env change, not a
// code change. Fallback: the default brand analytics origin.
function umamiOrigin(src) {
  try {
    return new URL(src).origin;
  } catch {
    return null; // relative path (first-party tracker) — no extra origin needed
  }
}

const UMAMI_SRC =
  process.env.NEXT_PUBLIC_UMAMI_SRC || "/umami-tracker.js";
const UMAMI_ORIGIN = umamiOrigin(UMAMI_SRC);

const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' for scripts: the App Router emits inline bootstrap/hydration
  // scripts that a hash-less script-src blocks (breaking hydration for ALL
  // visitors). Nonce-based CSP requires middleware + dynamic rendering —
  // overkill for a static landing; React escapes all rendered content, and
  // base-uri/form-action/frame-ancestors remain locked.
  `script-src 'self' 'unsafe-inline'${UMAMI_ORIGIN ? ` ${UMAMI_ORIGIN}` : ""}`,
  `connect-src 'self'${UMAMI_ORIGIN ? ` ${UMAMI_ORIGIN}` : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig = {
  async redirects() {
    return [
      // Browsers request /favicon.ico by default — serve the brand icon route
      // instead of a 404 (hardened path re-anchoring applies).
      { source: "/favicon.ico", destination: "/icon.svg", permanent: true },
    ];
  },
  async rewrites() {
    // First-party analytics (Umami bypass-ad-blockers pattern, docs.umami.is):
    // the tracker is served same-origin from /umami-tracker.js and beacons POST
    // to /api/collect, which the server proxies to the real Umami host. The
    // browser never sees a third-party origin — CSP stays 'self'.
    // Production (VPS): http://umami:3000 via the docker network.
    const umamiUpstream =
      process.env.UMAMI_UPSTREAM_URL || "https://umami.undrexplorer-4g.netcraze.pro";
    return [
      {
        source: "/api/collect",
        destination: `${umamiUpstream}/api/collect`,
      },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
