// Spec 008 FR-001: pure TDABC math engine (plan DD-1) — 100% unit-testable
// without React. Guessing Ban reconciliation (research R-07): the physical
// hours odometer is the primary invariant; dollar figures are projections of
// the USER-SUPPLIED blended rate, never a site-asserted payroll guess.

export interface ToolDefinition {
  id: string;
  /** List price per seat per month (as of 2026-11, review F16). */
  monthlySeatCostUsd: number;
}

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  { id: "salesforce", monthlySeatCostUsd: 165 },
  { id: "hubspot", monthlySeatCostUsd: 90 },
  { id: "zapier", monthlySeatCostUsd: 40 },
  { id: "airtable", monthlySeatCostUsd: 24 },
  { id: "sheets", monthlySeatCostUsd: 0 }, // WhatsApp/Excel: $0 seat, 100% labor
];

export const DEFAULT_TOOL_IDS = ["salesforce", "zapier", "airtable"]; // $229/seat/mo

export const CALCULATOR_BOUNDS = {
  teamSize: { min: 1, max: 500, default: 5 },
  weeklyHoursPerPerson: { min: 1, max: 80, default: 10 },
  hourlyRate: { min: 15, max: 250, default: 35 },
} as const;

export interface CalculatorInputState {
  teamSize: number;
  weeklyHoursPerPerson: number;
  hourlyRate: number;
  selectedToolIds: string[];
}

export interface CalculatorComputedOutput {
  /** Physical odometer invariant (Guessing Ban): team × hours/wk × 52. */
  totalHoursPerYear: number;
  annualLaborWasteUsd: number;
  annualSaaSSeatTaxUsd: number;
  totalAnnualFrictionUsd: number;
}

function clamp(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

function toolSeatCost(selectedToolIds: string[]): number {
  const sum = TOOL_DEFINITIONS.filter((t) => selectedToolIds.includes(t.id)).reduce(
    (acc, t) => acc + t.monthlySeatCostUsd,
    0
  );
  return sum;
}

export function clampInputs(inputs: CalculatorInputState): CalculatorInputState {
  return {
    teamSize: clamp(inputs.teamSize, CALCULATOR_BOUNDS.teamSize.min, CALCULATOR_BOUNDS.teamSize.max),
    weeklyHoursPerPerson: clamp(
      inputs.weeklyHoursPerPerson,
      CALCULATOR_BOUNDS.weeklyHoursPerPerson.min,
      CALCULATOR_BOUNDS.weeklyHoursPerPerson.max
    ),
    hourlyRate: clamp(
      inputs.hourlyRate,
      CALCULATOR_BOUNDS.hourlyRate.min,
      CALCULATOR_BOUNDS.hourlyRate.max
    ),
    selectedToolIds: inputs.selectedToolIds.filter((id) =>
      TOOL_DEFINITIONS.some((t) => t.id === id)
    ),
  };
}

export function calculateTdabcLeak(rawInputs: CalculatorInputState): CalculatorComputedOutput {
  const inputs = clampInputs(rawInputs);
  const totalHoursPerYear =
    inputs.teamSize * inputs.weeklyHoursPerPerson * 52;
  const annualLaborWasteUsd = totalHoursPerYear * inputs.hourlyRate;
  const annualSaaSSeatTaxUsd =
    inputs.teamSize * toolSeatCost(inputs.selectedToolIds) * 12;
  return {
    totalHoursPerYear,
    annualLaborWasteUsd,
    annualSaaSSeatTaxUsd,
    totalAnnualFrictionUsd: annualLaborWasteUsd + annualSaaSSeatTaxUsd,
  };
}

/** Compact formatting for ≥ $1M (review F1: prevents layout breakage at max inputs). */
export function formatUsd(value: number): string {
  if (!Number.isFinite(value)) return "$0";
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  }
  return `$${Math.round(value).toLocaleString("en-US")}`;
}
