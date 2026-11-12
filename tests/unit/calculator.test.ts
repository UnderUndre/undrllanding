import { describe, it, expect } from "vitest";
import {
  calculateTdabcLeak,
  clampInputs,
  formatUsd,
  TOOL_DEFINITIONS,
  DEFAULT_TOOL_IDS,
  CALCULATOR_BOUNDS,
} from "@/lib/calculator-math";

// Spec 008 T003: BVA suite for the TDABC math engine (RTM risk 12).
// Semantics (review F1): weeklyHoursPerPerson is PER PERSON;
// dollars are projections of the user-supplied rate (Guessing Ban reconciliation).

describe("calculateTdabcLeak — canonical scenarios", () => {
  it("AC-1 defaults: team 5 × 10h/wk/person × $35 → 2,600 hrs/yr, $104,740 total", () => {
    const out = calculateTdabcLeak({
      teamSize: 5,
      weeklyHoursPerPerson: 10,
      hourlyRate: 35,
      selectedToolIds: DEFAULT_TOOL_IDS,
    });
    expect(out.totalHoursPerYear).toBe(2600);
    expect(out.annualLaborWasteUsd).toBe(91000);
    // Salesforce 165 + Zapier 40 + Airtable 24 = 229/seat/mo → 5 × 229 × 12
    expect(out.annualSaaSSeatTaxUsd).toBe(13740);
    expect(out.totalAnnualFrictionUsd).toBe(104740);
  });

  it("quickstart scenario: team 15 × 20h/wk × $35 → 15,600 hrs/yr, $582,900 total", () => {
    const out = calculateTdabcLeak({
      teamSize: 15,
      weeklyHoursPerPerson: 20,
      hourlyRate: 35,
      selectedToolIds: DEFAULT_TOOL_IDS,
    });
    expect(out.totalHoursPerYear).toBe(15600);
    expect(out.annualLaborWasteUsd).toBe(546000);
    expect(out.annualSaaSSeatTaxUsd).toBe(15 * 229 * 12);
    expect(out.totalAnnualFrictionUsd).toBe(546000 + 15 * 229 * 12);
  });
});

describe("calculateTdabcLeak — BVA clamping (Gate V6.5)", () => {
  it("clamps below minimums", () => {
    const out = calculateTdabcLeak({
      teamSize: -5,
      weeklyHoursPerPerson: 0,
      hourlyRate: 1,
      selectedToolIds: [],
    });
    expect(out.totalHoursPerYear).toBe(CALCULATOR_BOUNDS.teamSize.min * CALCULATOR_BOUNDS.weeklyHoursPerPerson.min * 52);
  });

  it("clamps above maximums (team 1000, 200h, $9999)", () => {
    const out = calculateTdabcLeak({
      teamSize: 1000,
      weeklyHoursPerPerson: 200,
      hourlyRate: 9999,
      selectedToolIds: DEFAULT_TOOL_IDS,
    });
    const clamped = clampInputs({ teamSize: 1000, weeklyHoursPerPerson: 200, hourlyRate: 9999, selectedToolIds: [] });
    expect(clamped.teamSize).toBe(500);
    expect(clamped.weeklyHoursPerPerson).toBe(80);
    expect(clamped.hourlyRate).toBe(250);
    // Max physical: 500 × 80 × 52 = 2,080,000 hrs/yr
    expect(out.totalHoursPerYear).toBe(2_080_000);
  });

  it("NaN inputs clamp to minimums without NaN outputs (Gate V6.5)", () => {
    const out = calculateTdabcLeak({
      teamSize: Number.NaN,
      weeklyHoursPerPerson: Number.NaN,
      hourlyRate: Number.NaN,
      selectedToolIds: [],
    });
    expect(Number.isFinite(out.totalHoursPerYear)).toBe(true);
    expect(Number.isFinite(out.totalAnnualFrictionUsd)).toBe(true);
  });

  it("unknown tool ids are filtered out", () => {
    const out = calculateTdabcLeak({
      teamSize: 5,
      weeklyHoursPerPerson: 10,
      hourlyRate: 35,
      selectedToolIds: ["salesforce", "fake-tool"],
    });
    expect(out.annualSaaSSeatTaxUsd).toBe(5 * 165 * 12);
  });
});

describe("formatUsd (review F1)", () => {
  it("uses compact notation for ≥ $1M", () => {
    expect(formatUsd(1_200_000)).toBe("$1.2M");
    expect(formatUsd(520_000_000)).toBe("$520M");
  });
  it("uses thousands separators below $1M", () => {
    expect(formatUsd(104740)).toBe("$104,740");
    expect(formatUsd(0)).toBe("$0");
  });
});

describe("tool definitions (review F16: list prices as of 2026-11)", () => {
  it("default selection sums to $229/seat/mo", () => {
    const sum = TOOL_DEFINITIONS.filter((t) => DEFAULT_TOOL_IDS.includes(t.id)).reduce(
      (a, t) => a + t.monthlySeatCostUsd,
      0
    );
    expect(sum).toBe(229);
  });
});
