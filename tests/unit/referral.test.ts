import { describe, it, expect, vi, beforeEach } from "vitest";
import { sanitizeNick, getReferral, captureRef, referralMetadata } from "@/lib/referral";

// Spec 007 T005: unit tests for the referral attribution core
// (sanitizer F7, last-touch F6, silent no-op NFR-003).
// Node environment — window/localStorage stubbed by hand (no jsdom dep, NFR-001).

function makeWindowStub() {
  const store = new Map<string, string>();
  return {
    localStorage: {
      getItem: (k: string) => store.get(k) ?? null,
      setItem: (k: string, v: string) => void store.set(k, v),
      clear: () => store.clear(),
    },
  };
}

const w = makeWindowStub();

beforeEach(() => {
  vi.stubGlobal("window", w);
  w.localStorage.clear();
});

describe("sanitizeNick", () => {
  it("trims and lowercases valid nicks (review F7)", () => {
    expect(sanitizeNick("  Alice ")).toBe("alice");
    expect(sanitizeNick("bob_42.x-y")).toBe("bob_42.x-y");
  });

  it("rejects invalid nicks", () => {
    expect(sanitizeNick("")).toBeUndefined();
    expect(sanitizeNick("has space")).toBeUndefined();
    expect(sanitizeNick("кириллица")).toBeUndefined();
    expect(sanitizeNick("a".repeat(33))).toBeUndefined();
    expect(sanitizeNick(null)).toBeUndefined();
  });
});

describe("captureRef / getReferral (last-touch)", () => {
  beforeEach(() => {
    vi.resetModules();
    window.localStorage.clear();
  });

  it("stores a valid ?ref and getReferral returns it", () => {
    captureRef("?ref=Alice");
    expect(getReferral()).toBe("alice");
  });

  it("last-touch: new valid ?ref overwrites stored referral (review F6)", () => {
    captureRef("?ref=alice");
    captureRef("?ref=bob");
    expect(getReferral()).toBe("bob");
  });

  it("invalid or absent ?ref leaves stored referral untouched", () => {
    captureRef("?ref=alice");
    captureRef("?ref=not valid!");
    captureRef("?other=1");
    expect(getReferral()).toBe("alice");
  });

  it("referralMetadata omits the key when nothing stored (no empty strings)", () => {
    expect(referralMetadata()).toEqual({});
    captureRef("?ref=alice");
    expect(referralMetadata()).toEqual({ referral: "alice" });
  });

  it("corrupted localStorage record → treated as absent", () => {
    window.localStorage.setItem("undr.referral", "{not json");
    expect(getReferral()).toBeUndefined();
  });
});
