import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  resolvePersona,
  capturePersona,
  getPersona,
  personaMetadata,
  VALID_PERSONA_IDS,
} from "@/lib/persona";

// Spec 009 T002: persona contract tests (RTM FR-005/006, risk 12).
// Node env — window/localStorage stubbed by hand (no jsdom dep, NFR-003).

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

describe("resolvePersona", () => {
  it("accepts exactly the 3 role-mapped ids (owner/ops/cto)", () => {
    expect(VALID_PERSONA_IDS).toEqual(["owner", "ops", "cto"]);
    expect(resolvePersona("ops")).toBe("ops");
    expect(resolvePersona("  OWNER ")).toBe("owner");
  });

  it("rejects invalid and absent values", () => {
    expect(resolvePersona("hacker")).toBeUndefined();
    expect(resolvePersona("")).toBeUndefined();
    expect(resolvePersona(null)).toBeUndefined();
    expect(resolvePersona(undefined)).toBeUndefined();
  });
});

describe("capturePersona / getPersona (last-touch)", () => {
  it("stores valid ?persona and getPersona returns it", () => {
    capturePersona("?persona=ops");
    expect(getPersona()).toBe("ops");
  });

  it("last-touch: new valid param overwrites", () => {
    capturePersona("?persona=ops");
    capturePersona("?persona=cto");
    expect(getPersona()).toBe("cto");
  });

  it("invalid/absent param leaves stored persona untouched", () => {
    capturePersona("?persona=ops");
    capturePersona("?persona=hacker");
    capturePersona("?utm_source=x");
    expect(getPersona()).toBe("ops");
  });
});

describe("personaMetadata", () => {
  it("omits the key when no persona stored (no empty strings)", () => {
    expect(personaMetadata()).toEqual({});
    capturePersona("?persona=owner");
    expect(personaMetadata()).toEqual({ persona: "owner" });
  });
});
