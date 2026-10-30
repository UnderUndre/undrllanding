import fs from "node:fs";
import path from "node:path";
import { z } from "zod";

/**
 * Zod schema definitions for Schema-Driven Content Layer (Option C).
 * Enforces build-time data integrity for pricing tiers, FAQs, and manifesto principles.
 *
 * Canonical contract: specs/003-landing-template-engine/contracts/schemas.ts (rev. 2)
 * - All user-visible content fields are bilingual via LocalizedText { ru, en }
 * - Lead metadata is a bounded flat scalar map (review F7)
 */

// 0. Bilingual text primitive
export const LocalizedTextSchema = z.object({
  ru: z.string().min(1),
  en: z.string().min(1),
});

export type LocalizedText = z.infer<typeof LocalizedTextSchema>;

// 1. Pricing Plan Schema
export const PricingPlanItemSchema = z.object({
  id: z.string().min(1),
  tierName: LocalizedTextSchema,
  heroTag: LocalizedTextSchema.optional(),
  title: LocalizedTextSchema,
  description: LocalizedTextSchema,
  price: z.string().min(1), // display string, e.g. "$350" — language-neutral
  originalPrice: z.string().optional(),
  priceNote: LocalizedTextSchema.optional(),
  turnaround: LocalizedTextSchema,
  creditNote: LocalizedTextSchema.optional(),
  deliverablesTitle: LocalizedTextSchema,
  deliverables: z.array(LocalizedTextSchema).min(1),
  demandGateNote: LocalizedTextSchema.optional(),
  ctaText: LocalizedTextSchema,
  ctaHref: z.string().min(1),
  isHero: z.boolean().default(false),
});

export const PricingDataSchema = z.object({
  sectionBadge: LocalizedTextSchema,
  sectionTitle: LocalizedTextSchema,
  sectionSubtitle: LocalizedTextSchema,
  plans: z.array(PricingPlanItemSchema).min(1),
});

export type PricingPlanItem = z.infer<typeof PricingPlanItemSchema>;
export type PricingData = z.infer<typeof PricingDataSchema>;

// 2. FAQ Item Schema
export const FaqItemSchema = z.object({
  question: LocalizedTextSchema,
  answers: z.array(LocalizedTextSchema).min(1),
});

export const FaqDataSchema = z.object({
  sectionBadge: LocalizedTextSchema,
  sectionTitle: LocalizedTextSchema,
  sectionSubtitle: LocalizedTextSchema,
  items: z.array(FaqItemSchema).min(1),
});

export type FaqItem = z.infer<typeof FaqItemSchema>;
export type FaqData = z.infer<typeof FaqDataSchema>;

// 3. Manifesto Principle Schema
export const ManifestoPrincipleSchema = z.object({
  number: z.number().int().positive(),
  title: LocalizedTextSchema,
  quote: LocalizedTextSchema.optional(),
  summary: LocalizedTextSchema,
  body: LocalizedTextSchema,
});

export const ManifestDataSchema = z.object({
  title: LocalizedTextSchema,
  subtitle: LocalizedTextSchema,
  version: z.string().min(1),
  principles: z.array(ManifestoPrincipleSchema).length(7),
});

export type ManifestoPrinciple = z.infer<typeof ManifestoPrincipleSchema>;
export type ManifestData = z.infer<typeof ManifestDataSchema>;

// 4. Pluggable Inbound Lead Schema
export const LeadMetadataValueSchema = z.union([
  z.string().max(500, "Metadata string value exceeds maximum length (500 chars)"),
  z.number(),
  z.boolean(),
]);

export const GenericLeadSubmissionSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .max(255, "Email exceeds maximum length"),
  contact: z
    .string()
    .trim()
    .max(150, "Contact handle exceeds maximum length")
    .optional()
    .default(""),
  topic: z
    .string()
    .trim()
    .max(100, "Topic exceeds maximum length")
    .optional()
    .default("general"),
  message: z
    .string()
    .trim()
    .min(3, "Brief must be at least 3 characters")
    .max(2000, "Brief exceeds maximum length (2000 chars)"),
  // Bounded flat scalar map (review F7): max 20 keys, scalar values only —
  // no nested objects/arrays, kills payload-depth/CPU amplification.
  metadata: z
    .record(z.string(), LeadMetadataValueSchema)
    .refine((v) => Object.keys(v).length <= 20, "Metadata exceeds maximum of 20 keys")
    .optional()
    .default({}),
});

export type GenericLeadSubmission = z.infer<typeof GenericLeadSubmissionSchema>;

// 5. Runtime file-loaders with error diagnostics (build-time enforcement).
// Malformed data halts the build with an explicit file + Zod field-path diagnostic.
function projectDataFile(slug: string, file: string): string {
  return path.join(process.cwd(), "projects", slug, "data", file);
}

function loadValidated<T>(
  slug: string,
  file: string,
  schema: z.ZodType<T>
): T {
  const filePath = projectDataFile(slug, file);
  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    console.error(
      `[content-schema] Failed to parse ${filePath}:`,
      err instanceof Error ? err.message : err
    );
    process.exit(1);
  }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    console.error(
      `[content-schema] Schema validation failed for ${filePath}:`,
      JSON.stringify(parsed.error.format(), null, 2)
    );
    process.exit(1);
  }
  return parsed.data;
}

export function loadPricingData(slug: string): PricingData {
  return loadValidated(slug, "pricing.json", PricingDataSchema);
}

export function loadFaqData(slug: string): FaqData {
  return loadValidated(slug, "faq.json", FaqDataSchema);
}

/** Returns null when the active project ships no manifesto (page renders notFound()). */
export function loadManifestData(slug: string): ManifestData | null {
  const filePath = projectDataFile(slug, "manifest.json");
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return loadValidated(slug, "manifest.json", ManifestDataSchema);
}
