import { z } from "zod";

/**
 * Zod schema definitions for Schema-Driven Content Layer (Option C).
 * Enforces build-time data integrity for pricing tiers, FAQs, and manifesto principles.
 */

// 1. Pricing Plan Schema
export const PricingPlanItemSchema = z.object({
  id: z.string().min(1),
  tierName: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.string().min(1),
  originalPrice: z.string().optional(),
  priceNote: z.string().optional(),
  turnaround: z.string().min(1),
  creditNote: z.string().optional(),
  deliverablesTitle: z.string().min(1),
  deliverables: z.array(z.string()).min(1),
  demandGateNote: z.string().optional(),
  ctaText: z.string().min(1),
  ctaHref: z.string().min(1),
  isHero: z.boolean().default(false),
});

export const PricingDataSchema = z.object({
  sectionBadge: z.string().min(1),
  sectionTitle: z.string().min(1),
  sectionSubtitle: z.string().min(1),
  plans: z.array(PricingPlanItemSchema).min(1),
});

export type PricingPlanItem = z.infer<typeof PricingPlanItemSchema>;
export type PricingData = z.infer<typeof PricingDataSchema>;

// 2. FAQ Item Schema
export const FaqItemSchema = z.object({
  question: z.string().min(1),
  answers: z.array(z.string()).min(1),
});

export const FaqDataSchema = z.object({
  sectionBadge: z.string().min(1),
  sectionTitle: z.string().min(1),
  sectionSubtitle: z.string().min(1),
  items: z.array(FaqItemSchema).min(1),
});

export type FaqItem = z.infer<typeof FaqItemSchema>;
export type FaqData = z.infer<typeof FaqDataSchema>;

// 3. Manifesto Principle Schema
export const ManifestoPrincipleSchema = z.object({
  number: z.number().int().positive(),
  title: z.string().min(1),
  quote: z.string().optional(),
  summary: z.string().min(1),
  body: z.string().min(1),
});

export const ManifestDataSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().min(1),
  version: z.string().min(1),
  principles: z.array(ManifestoPrincipleSchema).length(7),
});

export type ManifestoPrinciple = z.infer<typeof ManifestoPrincipleSchema>;
export type ManifestData = z.infer<typeof ManifestDataSchema>;

// 4. Pluggable Inbound Lead Schema
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
  metadata: z.record(z.unknown()).optional().default({}),
});

export type GenericLeadSubmission = z.infer<typeof GenericLeadSubmissionSchema>;
