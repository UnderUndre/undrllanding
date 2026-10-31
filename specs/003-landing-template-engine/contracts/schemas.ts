import { z } from "zod";

/**
 * Zod schema definitions for Schema-Driven Content Layer (Option C).
 * Enforces build-time data integrity for pricing tiers, FAQs, and manifesto principles.
 *
 * Canonical contract (rev. 2, post-review 2026-10-30):
 * - All user-visible content fields are bilingual via LocalizedText { ru, en }
 *   — matches the site's lang-context (lib/i18n.ts) and the bilingual copy
 *   currently living in projects/underundre/locales.ts.
 * - metadata on the lead schema is a bounded flat scalar map (review F7).
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

// 5. Statutory legal documents (privacy / terms) — spec 003 FR-006/FR-007 rev. 2.
// Body strings may reference interpolation tokens resolved from ProjectConfig.legal:
// {{name}}, {{domain}}, {{entityName}}, {{jurisdiction}}, {{contactEmail}},
// {{retentionMonths}}, {{escrowProvider}}, {{warrantyDays}}
export const LegalSectionSchema = z.object({
  heading: LocalizedTextSchema,
  paragraphs: z.array(LocalizedTextSchema).min(1),
});

export const LegalDocumentSchema = z.object({
  title: LocalizedTextSchema,
  updatedAt: LocalizedTextSchema,
  intro: LocalizedTextSchema.optional(),
  sections: z.array(LegalSectionSchema).min(1),
});

export type LegalSection = z.infer<typeof LegalSectionSchema>;
export type LegalDocument = z.infer<typeof LegalDocumentSchema>;

// 6. Legal requisites config (spec 003 FR-006/FR-007 rev. 3): data-driven via
// projects/<slug>/data/legal.json — the {{token}} source for privacy/terms docs.
export const LegalConfigSchema = z.object({
  contactEmail: z.string().email(),
  entityName: z.string().min(1),
  jurisdiction: z.string().min(1),
  retentionMonths: z.number().int().positive().default(12),
  escrowProvider: z.string().min(1),
  warrantyDays: z.number().int().positive().default(7),
});

export type LegalConfig = z.infer<typeof LegalConfigSchema>;

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
