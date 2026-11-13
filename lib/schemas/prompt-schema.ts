import { z } from "zod";
import { LocalizedTextSchema } from "./content-schema";

// Spec 009 FR-001/FR-003: public SpecKit prompt library.
// Prompts are human-authored (provenance: the real Discovery workflow,
// Principle XV voice) — static artifacts, NOT runtime AI (NFR-003).

export const PROMPT_CATEGORIES = ["discovery", "quantification", "architecture", "brief"] as const;

export const PromptPackItemSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  order: z.number().int().positive(),
  category: z.enum(PROMPT_CATEGORIES),
  /** Which step of the Discovery workflow this prompt runs (provenance label). */
  relatesTo: z.string().min(1),
  title: LocalizedTextSchema,
  description: LocalizedTextSchema,
  /** Prompt body — authored in EN (LLM working language). */
  body: z.string().min(40),
});

export type PromptPackItem = z.infer<typeof PromptPackItemSchema>;
export type PromptCategory = (typeof PROMPT_CATEGORIES)[number];
