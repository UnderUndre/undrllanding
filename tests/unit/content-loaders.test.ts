import { describe, expect, it } from "vitest";
import { ContentValidationError, loadPricingData } from "@/lib/schemas/content-loaders";

describe("content loaders vs _template fixtures", () => {
  it("parses valid _template pricing.json", () => {
    const pricing = loadPricingData("_template");
    expect(pricing.plans.length).toBeGreaterThan(0);
  });

  it("throws ContentValidationError (no process.exit) for a missing fixture", () => {
    expect(() => loadPricingData("__no_such_project__")).toThrow(ContentValidationError);
  });
});
