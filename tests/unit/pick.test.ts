import { describe, expect, it } from "vitest";
import { pick } from "@/lib/i18n";

// Fallback matrix (spec 005 FR-006): lang -> en -> ru -> "".
describe("pick() fallback matrix", () => {
  const full = { ru: "Р", en: "E", uk: "У" };
  const noUk = { ru: "Р", en: "E" };

  it("returns the requested language when present", () => {
    expect(pick(full, "ru")).toBe("Р");
    expect(pick(full, "en")).toBe("E");
    expect(pick(full, "uk")).toBe("У");
  });

  it("falls back uk -> en -> ru", () => {
    expect(pick(noUk, "uk")).toBe("E");
    expect(pick({ ru: "Р", en: "E", uk: "У" }, "uk")).toBe("У");
    expect(pick({ ru: "Р", en: "" }, "en")).toBe("Р");
  });

  it("returns empty string for nullish or empty input", () => {
    expect(pick(undefined, "ru")).toBe("");
    expect(pick(null, "en")).toBe("");
    expect(pick({ ru: "", en: "", uk: "" }, "uk")).toBe("");
  });
});
