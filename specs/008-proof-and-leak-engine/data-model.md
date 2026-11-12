# Data Model: 008-proof-and-leak-engine

**Date**: 2026-11-12  
**Scope**: Teardown Case Schema, Calculator State Model, Lead Form Telemetry Extension.

---

## 1. Entity: TeardownCase (`lib/schemas/teardown-schema.ts`)

```ts
import { z } from "zod";
import { LocalizedTextSchema } from "./content-schema";

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
    tools: z.array(z.string()),
    totalMonthlyCostUsd: z.number().nonnegative(),
    failureProbability: z.string(), // e.g. "High (4 API retry hops)"
    steps: z.array(TeardownStepSchema),
  }),
  sovereignStack: z.object({
    title: LocalizedTextSchema,
    tools: z.array(z.string()),
    totalMonthlyCostUsd: z.number().nonnegative(),
    failureProbability: z.string(), // e.g. "Near Zero (Transactional ACID)"
    steps: z.array(TeardownStepSchema),
  }),
});

export const TeardownCaseSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: LocalizedTextSchema,
  publishedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  industry: LocalizedTextSchema,
  teamScale: z.string(),
  summary: LocalizedTextSchema,
  metrics: z.array(TeardownMetricSchema).min(2),
  symptom: LocalizedTextSchema,
  measuredLeakAnnualUsd: z.number().positive(),
  measuredLaborHoursPerWeek: z.number().positive(),
  diagnosis: LocalizedTextSchema,
  architectureComparison: TeardownArchitectureComparisonSchema,
  sovereignSolution: LocalizedTextSchema,
  ddlSnippet: z.string().min(10), // SQL / Contract snippet demonstrating DDL rigor
  outcome: LocalizedTextSchema,
});

export type TeardownCase = z.infer<typeof TeardownCaseSchema>;
```

---

## 2. Entity: Calculator State & Payload Model

```ts
export interface CalculatorInputState {
  teamSize: number;       // 1 - 500
  weeklyHours: number;    // 1 - 80
  hourlyRate: number;     // 15 - 250
  selectedToolIds: string[]; // ids matching ToolDefinition
}

export interface CalculatorComputedOutput {
  annualLaborWasteUsd: number;
  annualSaaSSeatTaxUsd: number;
  totalAnnualFrictionUsd: number;
  totalAnnualHoursWasted: number;
}
```

---

## 3. Lead Form Telemetry Extension (`metadata`)

Lead submission payload (`GenericLeadSubmissionSchema`) carries these optional keys when originating from the calculator or teardowns:

```json
{
  "metadata": {
    "sourceComponent": "calculator" | "teardown",
    "targetWorkflow": "ats-recruiting-sync-leak",
    "teamSize": "15",
    "routineHoursPerWeek": "20",
    "annualLaborLeakUsd": "18200",
    "saasBloatUsd": "4320",
    "totalLeakUsd": "22520",
    "referral": "partner_nick"
  }
}
```

---

## 4. Entity: ProjectConfig Extension (`lib/project-config.ts`)

```ts
export interface ProjectConfig {
  // Existing fields...
  /** Optional flag enabling Teardowns vault routes and footer links */
  hasTeardowns?: boolean;
  /** Optional flag enabling standalone /calculator route */
  hasCalculator?: boolean;
}
```
