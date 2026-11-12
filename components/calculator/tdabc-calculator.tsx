"use client";

import { useEffect, useMemo, useState } from "react";
import {
  calculateTdabcLeak,
  clampInputs,
  formatUsd,
  TOOL_DEFINITIONS,
  DEFAULT_TOOL_IDS,
  CALCULATOR_BOUNDS,
  type CalculatorInputState,
} from "@/lib/calculator-math";

// Spec 008 FR-002 (plan DD-2): canonical telemetry payload crossing the
// component boundary. sessionStorage key per review F3 (cross-route handoff).

export const CALCULATOR_BRIDGE_KEY = "undr.calculator_bridge";

export interface CalculatorTelemetry {
  sourceComponent: "calculator";
  teamSize: string;
  routineHoursPerWeek: string;
  totalHoursPerYear: string;
  annualLaborLeakUsd: string;
  saasBloatUsd: string;
  totalLeakUsd: string;
}

/** Canonical telemetry (data-model §3, review F4). Values as strings (flat scalar map). */
export function buildTelemetry(inputs: CalculatorInputState): CalculatorTelemetry {
  const out = calculateTdabcLeak(inputs);
  const clamped = clampInputs(inputs);
  return {
    sourceComponent: "calculator",
    teamSize: String(clamped.teamSize),
    routineHoursPerWeek: String(clamped.weeklyHoursPerPerson),
    totalHoursPerYear: String(out.totalHoursPerYear),
    annualLaborLeakUsd: String(out.annualLaborWasteUsd),
    saasBloatUsd: String(out.annualSaaSSeatTaxUsd),
    totalLeakUsd: String(out.totalAnnualFrictionUsd),
  };
}

/** Persist telemetry for cross-route handoff (/calculator → /#contact), review F3. */
export function persistBridge(telemetry: CalculatorTelemetry): void {
  try {
    window.sessionStorage.setItem(CALCULATOR_BRIDGE_KEY, JSON.stringify(telemetry));
  } catch {
    // sessionStorage unavailable → silent degradation to plain /#contact link
  }
}

/** Read + clear bridge on the homepage side (cta-underundre mount). */
export function consumeBridge(): CalculatorTelemetry | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = window.sessionStorage.getItem(CALCULATOR_BRIDGE_KEY);
    if (!raw) return undefined;
    window.sessionStorage.removeItem(CALCULATOR_BRIDGE_KEY);
    const parsed = JSON.parse(raw) as CalculatorTelemetry;
    return parsed && parsed.sourceComponent === "calculator" ? parsed : undefined;
  } catch {
    return undefined;
  }
}

interface Props {
  copy: {
    badge: string;
    title: string;
    subtitle: string;
    teamSizeLabel: string;
    hoursLabel: string;
    rateLabel: string;
    rateHint: string;
    toolsLabel: string;
    physicalWasteLabel: string;
    laborWasteLabel: string;
    saasTaxLabel: string;
    totalFrictionLabel: string;
    rateDisclaimer: string;
    applyButton: string;
  };
  /** Homepage embed → in-page scroll; standalone route → cross-route push. */
  mode: "homepage" | "standalone";
}

export default function TdabcCalculator({ copy, mode }: Props) {
  const [teamSize, setTeamSize] = useState<number>(CALCULATOR_BOUNDS.teamSize.default);
  const [hours, setHours] = useState<number>(CALCULATOR_BOUNDS.weeklyHoursPerPerson.default);
  const [rate, setRate] = useState<number>(CALCULATOR_BOUNDS.hourlyRate.default);
  const [tools, setTools] = useState<string[]>(DEFAULT_TOOL_IDS);
  const [navigating, setNavigating] = useState(false);

  const inputs: CalculatorInputState = useMemo(
    () => ({ teamSize, weeklyHoursPerPerson: hours, hourlyRate: rate, selectedToolIds: tools }),
    [teamSize, hours, rate, tools]
  );
  const out = useMemo(() => calculateTdabcLeak(inputs), [inputs]);

  const apply = () => {
    const telemetry = buildTelemetry(inputs);
    if (mode === "standalone") {
      persistBridge(telemetry);
      setNavigating(true);
      window.location.href = "/#contact"; // full navigation carries sessionStorage
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(
        new CustomEvent("undr:calculator-apply", { detail: telemetry })
      );
    }
  };

  return (
    <div data-testid="tdabc-calculator" className="w-full max-w-3xl mx-auto">
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <label htmlFor="calc-team" className="block text-sm font-medium text-purple-200 mb-2">
            {copy.teamSizeLabel}: <span className="text-orange-400 font-bold">{teamSize}</span>
          </label>
          <input
            id="calc-team"
            type="range"
            min={CALCULATOR_BOUNDS.teamSize.min}
            max={CALCULATOR_BOUNDS.teamSize.max}
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>
        <div>
          <label htmlFor="calc-hours" className="block text-sm font-medium text-purple-200 mb-2">
            {copy.hoursLabel}: <span className="text-orange-400 font-bold">{hours}h</span>
          </label>
          <input
            id="calc-hours"
            type="range"
            min={CALCULATOR_BOUNDS.weeklyHoursPerPerson.min}
            max={CALCULATOR_BOUNDS.weeklyHoursPerPerson.max}
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
        </div>
        <div>
          <label htmlFor="calc-rate" className="block text-sm font-medium text-purple-200 mb-2">
            {copy.rateLabel}: <span className="text-orange-400 font-bold">${rate}</span>
          </label>
          <input
            id="calc-rate"
            type="range"
            min={CALCULATOR_BOUNDS.hourlyRate.min}
            max={CALCULATOR_BOUNDS.hourlyRate.max}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full accent-orange-500"
          />
          <p className="mt-1 text-xs text-purple-300/50">{copy.rateHint}</p>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="block text-sm font-medium text-purple-200 mb-2">{copy.toolsLabel}</legend>
        <div className="flex flex-wrap gap-2">
          {TOOL_DEFINITIONS.map((tool) => {
            const active = tools.includes(tool.id);
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() =>
                  setTools((prev) =>
                    prev.includes(tool.id) ? prev.filter((t) => t !== tool.id) : [...prev, tool.id]
                  )
                }
                className={`rounded-full px-4 py-2 text-xs font-bold border transition-colors ${
                  active
                    ? "bg-orange-600/80 border-orange-500 text-white"
                    : "bg-transparent border-purple-800/60 text-purple-300 hover:border-orange-500/50"
                }`}
              >
                {tool.id}
                {tool.monthlySeatCostUsd > 0 ? ` ($${tool.monthlySeatCostUsd}/seat)` : ""}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-brand-border bg-brand-surface-subtle p-4">
          <p className="text-xs uppercase tracking-wider text-purple-300/60">{copy.physicalWasteLabel}</p>
          <p className="mt-1 text-2xl font-extrabold text-white" data-testid="calc-hours-out">
            {out.totalHoursPerYear.toLocaleString("en-US")} <span className="text-sm font-medium text-purple-300/60">hrs/yr</span>
          </p>
        </div>
        <div className="rounded-xl border border-brand-border bg-brand-surface-subtle p-4">
          <p className="text-xs uppercase tracking-wider text-purple-300/60">{copy.laborWasteLabel}</p>
          <p className="mt-1 text-2xl font-extrabold text-white">{formatUsd(out.annualLaborWasteUsd)}</p>
        </div>
        <div className="rounded-xl border border-brand-border bg-brand-surface-subtle p-4">
          <p className="text-xs uppercase tracking-wider text-purple-300/60">{copy.saasTaxLabel}</p>
          <p className="mt-1 text-2xl font-extrabold text-white">{formatUsd(out.annualSaaSSeatTaxUsd)}</p>
        </div>
        <div className="rounded-xl border border-orange-500/60 bg-orange-950/30 p-4">
          <p className="text-xs uppercase tracking-wider text-orange-300/80">{copy.totalFrictionLabel}</p>
          <p className="mt-1 text-2xl font-extrabold text-orange-400" data-testid="calc-total-out">
            {formatUsd(out.totalAnnualFrictionUsd)}
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-purple-300/50">{copy.rateDisclaimer}</p>
      <button
        type="button"
        onClick={apply}
        className="mt-4 rounded-xl bg-orange-600 hover:bg-orange-500 px-6 py-3 text-sm font-bold text-white transition-colors"
      >
        {navigating ? "…" : copy.applyButton}
      </button>
    </div>
  );
}
