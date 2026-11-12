import { describe, it, expect } from "vitest";
import {
  TeardownCaseSchema,
  type TeardownCase,
} from "@/lib/schemas/teardown-schema";

// Spec 008 T002: negative contract tests for the teardown schema
// (RTM FR-006, risk 15 — malformed data must fail build, not render).

function validCase(overrides: Partial<TeardownCase> = {}): TeardownCase {
  return {
    slug: "test-case",
    basis: "audit",
    title: { ru: "Кейс", en: "Case" },
    publishedAt: "2026-11-12",
    industry: { ru: "B2B", en: "B2B" },
    teamScale: "15 человек",
    summary: { ru: "Сводка", en: "Summary" },
    metrics: [
      { label: { ru: "Потеря", en: "Loss" }, value: "$32k/yr", impact: "loss" },
      { label: { ru: "Часы", en: "Hours" }, value: "18h/wk", impact: "loss" },
    ],
    symptom: { ru: "Симптом", en: "Symptom" },
    measuredLeakAnnualUsd: 32000,
    measuredLaborHoursPerWeek: 18,
    diagnosis: { ru: "Диагноз", en: "Diagnosis" },
    architectureComparison: {
      fragileStack: {
        title: { ru: "Костыль", en: "Patchwork" },
        tools: ["Zapier", "Airtable"],
        totalMonthlyCostUsd: 280,
        failureProbability: "High",
        steps: [
          {
            stepNumber: 1,
            title: { ru: "Шаг", en: "Step" },
            description: { ru: "Описание", en: "Description" },
            tool: "Zapier",
          },
        ],
      },
      sovereignStack: {
        title: { ru: "Суверен", en: "Sovereign" },
        tools: ["PostgreSQL", "Next.js"],
        totalMonthlyCostUsd: 10,
        failureProbability: "Near Zero",
        steps: [
          {
            stepNumber: 1,
            title: { ru: "Шаг", en: "Step" },
            description: { ru: "Описание", en: "Description" },
            tool: "PostgreSQL",
          },
        ],
      },
    },
    sovereignSolution: { ru: "Решение", en: "Solution" },
    ddlSnippet: "CREATE TABLE orders (id UUID PRIMARY KEY);",
    outcome: { ru: "Итог", en: "Outcome" },
    ...overrides,
  };
}

describe("TeardownCaseSchema", () => {
  it("accepts a fully valid case", () => {
    const res = TeardownCaseSchema.safeParse(validCase());
    expect(res.success).toBe(true);
  });

  it("rejects invalid slug (uppercase / spaces)", () => {
    const res = TeardownCaseSchema.safeParse(validCase({ slug: "Bad Slug" }));
    expect(res.success).toBe(false);
  });

  it("rejects non-positive measuredLeakAnnualUsd", () => {
    const res = TeardownCaseSchema.safeParse(validCase({ measuredLeakAnnualUsd: 0 }));
    expect(res.success).toBe(false);
  });

  it("rejects fewer than 2 metrics", () => {
    const res = TeardownCaseSchema.safeParse(
      validCase({ metrics: [validCase().metrics[0]] })
    );
    expect(res.success).toBe(false);
  });

  it("rejects invalid basis enum", () => {
    const res = TeardownCaseSchema.safeParse(validCase({ basis: "invented" as never }));
    expect(res.success).toBe(false);
  });

  it("rejects malformed publishedAt", () => {
    const res = TeardownCaseSchema.safeParse(validCase({ publishedAt: "Nov 2026" }));
    expect(res.success).toBe(false);
  });

  it("rejects missing bilingual field (en absent)", () => {
    const c = validCase();
    const broken = {
      ...c,
      summary: { ru: "Только русский" },
    };
    const res = TeardownCaseSchema.safeParse(broken);
    expect(res.success).toBe(false);
  });
});
