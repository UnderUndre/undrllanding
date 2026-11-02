// Fixed-window in-memory rate limiter (spec 005 FR-003, contracts/hardening.md §1).
// Single-instance VPS deployment target; state is process-local and resets on restart.
// IP resolution: trusted edge header (Caddy sets x-real-ip) → x-forwarded-for first hop
// → loopback fallback (Next.js Web Request exposes no socket address).
// Eviction: throttled full sweep (at most once per sweepIntervalMs) + FIFO
// drop-oldest hard cap at maxMapSize to bound event-loop work under spoofed-IP floods.

export interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
  maxMapSize: number;
  sweepIntervalMs: number;
  trustedIpHeader?: string;
}

export const DEFAULT_RATE_LIMIT_OPTIONS: RateLimitOptions = {
  windowMs: 60_000,
  maxRequests: 5,
  maxMapSize: 10_000,
  sweepIntervalMs: 10_000,
  trustedIpHeader: process.env.LEAD_TRUSTED_IP_HEADER || "x-real-ip",
};

interface WindowEntry {
  count: number;
  windowStart: number;
}

export class RateLimiter {
  private map = new Map<string, WindowEntry>();
  private lastSweep = 0;
  private readonly opts: RateLimitOptions;

  constructor(opts: Partial<RateLimitOptions> = {}) {
    this.opts = { ...DEFAULT_RATE_LIMIT_OPTIONS, ...opts };
  }

  /** Resolve the client IP with the documented fallback chain. */
  resolveClientIp(req: Request): string {
    const trusted = this.opts.trustedIpHeader;
    if (trusted) {
      const value = req.headers.get(trusted)?.trim();
      if (value) return value;
    }
    const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
    if (forwarded) return forwarded;
    // No edge headers (local dev / direct access): shared loopback key.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[rate-limit] no trusted IP header present — falling back to 127.0.0.1");
    }
    return "127.0.0.1";
  }

  check(key: string): { allowed: boolean; retryAfterSec: number } {
    const now = Date.now();
    this.maybeSweep(now);

    const entry = this.map.get(key);
    if (!entry || now - entry.windowStart > this.opts.windowMs) {
      if (this.map.size >= this.opts.maxMapSize) {
        // FIFO: drop the oldest window instead of unbounded growth.
        const oldest = this.map.keys().next().value;
        if (oldest !== undefined) this.map.delete(oldest);
      }
      this.map.set(key, { count: 1, windowStart: now });
      return { allowed: true, retryAfterSec: 0 };
    }

    entry.count += 1;
    if (entry.count > this.opts.maxRequests) {
      const retryAfterSec = Math.ceil((entry.windowStart + this.opts.windowMs - now) / 1000);
      return { allowed: false, retryAfterSec: Math.max(retryAfterSec, 1) };
    }
    return { allowed: true, retryAfterSec: 0 };
  }

  private maybeSweep(now: number): void {
    if (now - this.lastSweep < this.opts.sweepIntervalMs) return;
    this.lastSweep = now;
    for (const [key, entry] of this.map) {
      if (now - entry.windowStart > this.opts.windowMs) this.map.delete(key);
    }
  }
}
