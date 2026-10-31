import fs from "node:fs";
import path from "node:path";
import {
  PricingDataSchema,
  FaqDataSchema,
  ManifestDataSchema,
  LegalDocumentSchema,
  LegalConfigSchema,
  type PricingData,
  type FaqData,
  type ManifestData,
  type LegalDocument,
  type LegalConfig,
} from "@/lib/schemas/content-schema";
import type { ZodType } from "zod";

// Server-only runtime file-loaders (build-time enforcement).
// Malformed data halts the build with an explicit file + Zod field-path diagnostic.
// Kept separate from the pure schema module so client components can import
// schemas without dragging node:fs into the browser bundle.

// Malformed data halts the build with an explicit file + Zod field-path diagnostic.
function projectDataFile(slug: string, file: string): string {
  return path.join(process.cwd(), "projects", slug, "data", file);
}

function loadValidated<T>(
  slug: string,
  file: string,
  schema: ZodType<T>
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
  return parsed.data as T;
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

/** Returns null when the project ships no privacy.json / terms.json. */
export function loadPrivacyData(slug: string): LegalDocument | null {
  return loadOptional(slug, "privacy.json", LegalDocumentSchema);
}

export function loadTermsData(slug: string): LegalDocument | null {
  return loadOptional(slug, "terms.json", LegalDocumentSchema);
}

function loadOptional<T>(slug: string, file: string, schema: ZodType<T>): T | null {
  const filePath = projectDataFile(slug, file);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  return loadValidated(slug, file, schema);
}

/** Legal requisites: projects/<slug>/data/legal.json (null → caller falls back to config). */
export function loadLegalConfig(slug: string): LegalConfig | null {
  return loadOptional(slug, "legal.json", LegalConfigSchema);
}
