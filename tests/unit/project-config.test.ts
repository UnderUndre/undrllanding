import { afterEach, describe, expect, it } from "vitest";
import { getActiveProjectConfig } from "@/lib/project-config";

afterEach(() => {
  delete process.env.NEXT_PUBLIC_PROJECT_NAME;
});

describe("project-config fail-fast (FR-010)", () => {
  it("resolves the undreseller -> underundre alias", () => {
    process.env.NEXT_PUBLIC_PROJECT_NAME = "undreseller";
    expect(getActiveProjectConfig().slug).toBe("underundre");
  });

  it("defaults to underundre when unset", () => {
    expect(getActiveProjectConfig().slug).toBe("underundre");
  });

  it("throws on registry miss", () => {
    process.env.NEXT_PUBLIC_PROJECT_NAME = "__unknown_brand__";
    expect(() => getActiveProjectConfig()).toThrow(/Unknown NEXT_PUBLIC_PROJECT_NAME/);
  });
});
