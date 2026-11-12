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
  teamSize: number;               // 1 - 500 (default: 5)
  weeklyHoursPerPerson: number;   // 1 - 80 (default: 10)
  hourlyRate: number;             // 15 - 250 (default: 35)
  selectedToolIds: string[];      // default: ["salesforce", "zapier", "airtable"]
}

export interface CalculatorComputedOutput {
  totalHoursPerYear: number;      // physical hours: teamSize * weeklyHoursPerPerson * 52
  annualLaborWasteUsd: number;    // totalHoursPerYear * hourlyRate
  annualSaaSSeatTaxUsd: number;   // teamSize * sum(selectedToolCosts) * 12
  totalAnnualFrictionUsd: number; // labor + saas
}
```

---

## 3. Lead Form Telemetry Extension (`metadata`)

Lead submission payload (`GenericLeadSubmissionSchema`) carries these optional keys when originating from the calculator or teardowns:

```ts
export interface LeadCalculatorTelemetry {
  sourceComponent: "calculator" | "teardown";
  targetWorkflow?: string;        // e.g. "ats-recruiting-sync-leak"
  teamSize: string;               // e.g. "15"
  routineHoursPerWeek: string;    // e.g. "20" (per person)
  totalHoursPerYear: string;      // e.g. "15600" (physical odometer invariant)
  annualLaborLeakUsd: string;     // e.g. "546000"
  saasBloatUsd: string;           // e.g. "36900"
  totalLeakUsd: string;           // e.g. "582900"
  referral?: string;              // preserved from 007
}
```
All keys are flat strings conforming to `GenericLeadSubmissionSchema` (<= 20 keys, <= 50 chars).
The legacy `odometer` string is normalized to `${totalHoursPerYear} hrs/yr`.

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


---

## 5. Entity: Brand Locale Interface Extension (`projects/underundre/locales.ts`)

```ts
export interface CalculatorCopy {
  badge: string;
  title: string;
  subtitle: string;
  teamSizeLabel: string;
  hoursLabel: string;
  rateLabel: string;
  toolsLabel: string;
  physicalWasteLabel: string;
  laborWasteLabel: string;
  saasTaxLabel: string;
  totalFrictionLabel: string;
  rateDisclaimer: string;
  applyButton: string;
}

export interface InspectorCopy {
  badge: string;
  title: string;
  subtitle: string;
  fragileTabLabel: string;
  sovereignTabLabel: string;
  latencyLabel: string;
  failureRiskLabel: string;
  monthlyCostLabel: string;
}
```
Both `CalculatorCopy` and `InspectorCopy` are added to `UnderundreCopy` and translated into `ru` and `en`.
