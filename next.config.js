/** @type {import('next').NextConfig} */

// Security headers (spec 005 FR-004, contracts/hardening.md §2).
// Enforcing CSP — no Report-Only phase (Q3 decision).
// connect-src allows Umami analytics beacons (app/layout.tsx Script).
const CSP = [
  "default-src 'self'",
  "script-src 'self' https://analytics.underundre.com",
  "connect-src 'self' https://analytics.underundre.com",
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
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

module.exports = nextConfig;
