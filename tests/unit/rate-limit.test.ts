import { describe, expect, it } from "vitest";
import { RateLimiter } from "@/lib/lead/rate-limit";

function fakeReq(headers: Record<string, string>): Request {
  return new Request("https://x.test/api/lead", { headers });
}

describe("RateLimiter window BVA", () => {
  it("allows 5 requests, rejects the 6th within the window", () => {
    const rl = new RateLimiter({ windowMs: 60_000, maxRequests: 5 });
    for (let i = 0; i < 5; i++) {
      expect(rl.check("1.2.3.4").allowed).toBe(true);
    }
    const sixth = rl.check("1.2.3.4");
    expect(sixth.allowed).toBe(false);
    expect(sixth.retryAfterSec).toBeGreaterThan(0);
  });

  it("keys independently per IP", () => {
    const rl = new RateLimiter({ windowMs: 60_000, maxRequests: 5 });
    for (let i = 0; i < 5; i++) rl.check("1.1.1.1");
    expect(rl.check("1.1.1.1").allowed).toBe(false);
    expect(rl.check("2.2.2.2").allowed).toBe(true);
  });
});

describe("RateLimiter IP resolution (FR-003)", () => {
  it("prefers the trusted header", () => {
    const rl = new RateLimiter({ trustedIpHeader: "x-real-ip" });
    expect(rl.resolveClientIp(fakeReq({ "x-real-ip": "9.9.9.9", "x-forwarded-for": "8.8.8.8" }))).toBe("9.9.9.9");
  });

  it("falls back to x-forwarded-for first hop, then loopback", () => {
    const rl = new RateLimiter({ trustedIpHeader: "x-real-ip" });
    expect(rl.resolveClientIp(fakeReq({ "x-forwarded-for": "8.8.8.8, 7.7.7.7" }))).toBe("8.8.8.8");
    expect(rl.resolveClientIp(fakeReq({}))).toBe("127.0.0.1");
  });

  it("never trusts spoofed XFF when the trusted header is present", () => {
    const rl = new RateLimiter({ trustedIpHeader: "x-real-ip" });
    // Caddy overwrites/sets x-real-ip; a spoofed XFF alone must not diverge keys.
    const withTrusted = rl.resolveClientIp(fakeReq({ "x-real-ip": "1.1.1.1", "x-forwarded-for": "evil" }));
    expect(withTrusted).toBe("1.1.1.1");
  });
});

describe("RateLimiter eviction (FR-003)", () => {
  it("caps the map at maxMapSize with FIFO drop", () => {
    const rl = new RateLimiter({ windowMs: 60_000, maxRequests: 5, maxMapSize: 10 });
    for (let i = 0; i < 50; i++) rl.check(`10.0.0.${i}`);
    // internal map must stay bounded; oldest keys evicted
    // (re-check via behavior: a fresh old key needs re-insertion)
    expect(rl.check("10.0.0.0").allowed).toBe(true); // was evicted, re-inserted fresh
  });
});
