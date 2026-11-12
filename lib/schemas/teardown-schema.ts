import { z } from "zod";
import { LocalizedTextSchema } from "./content-schema";

// Spec 008 FR-006: forensic teardown case schema. Bilingual via LocalizedText
// ({ ru, en }); monetary figures are audit-verified historical facts
// (spec §1 Guessing Ban reconciliation — never invented projections).

export const TeardownMetricSchema = z.object({
  label: LocalizedTextSchema,
  value: z.string().min(1),
  impact: z.enum(["loss", "saved", "neutral"]),
});

export const TeardownStepSchema = z.object({
  stepNumber: z.number().int().positive(),
  title: LocalizedTextSchema,
  description: LocalizedTextSchema,
  tool: z.string().min(1),
  latency: z.string().optional(),
  costPerMo: z.number().nonnegative().optional(),
  failureMode: LocalizedTextSchema.optional(),
});

export const TeardownArchitectureComparisonSchema = z.object({
  fragileStack: z.object({
    title: LocalizedTextSchema,
    tools: z.array(z.string()).min(1),
    totalMonthlyCostUsd: z.number().nonnegative(),
    failureProbability: z.string().min(1),
    steps: z.array(TeardownStepSchema).min(1),
  }),
  sovereignStack: z.object({
    title: LocalizedTextSchema,
    tools: z.array(z.string()).min(1),
    totalMonthlyCostUsd: z.number().nonnegative(),
    failureProbability: z.string().min(1),
    steps: z.array(TeardownStepSchema).min(1),
  }),
});

export const TeardownCaseSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  /** Provenance (review F5): which delivered audit the case is based on. */
  basis: z.enum(["audit", "composite"]),
  title: LocalizedTextSchema,
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  industry: LocalizedTextSchema,
  teamScale: z.string().min(1),
  summary: LocalizedTextSchema,
  metrics: z.array(TeardownMetricSchema).min(2),
  symptom: LocalizedTextSchema,
  measuredLeakAnnualUsd: z.number().positive(),
  measuredLaborHoursPerWeek: z.number().positive(),
  diagnosis: LocalizedTextSchema,
  architectureComparison: TeardownArchitectureComparisonSchema,
  sovereignSolution: LocalizedTextSchema,
  ddlSnippet: z.string().min(10),
  outcome: LocalizedTextSchema,
});

export type TeardownMetric = z.infer<typeof TeardownMetricSchema>;
export type TeardownStep = z.infer<typeof TeardownStepSchema>;
export type TeardownArchitectureComparison = z.infer<
  typeof TeardownArchitectureComparisonSchema
>;
export type TeardownCase = z.infer<typeof TeardownCaseSchema>;
