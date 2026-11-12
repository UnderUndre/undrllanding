import fs from "node:fs";
import path from "node:path";
import {
  TeardownCaseSchema,
  type TeardownCase,
} from "@/lib/schemas/teardown-schema";
import { ContentValidationError } from "./content-loaders";

// Spec 008 FR-004/FR-005: modular teardown loaders (plan DD-3).
// Each case is an individual JSON file in projects/<slug>/data/teardowns/.
// Missing directory → empty array (brand without teardowns renders 404, NFR-003).
// Duplicate slugs → hard error at build (review F14c — generateStaticParams
// would otherwise crash with a confusing Next.js collision message).

function teardownsDir(slug: string): string {
  return path.join(process.cwd(), "projects", slug, "data", "teardowns");
}

function parseCaseFile(filePath: string): TeardownCase {
  let raw: unknown;
  try {
    raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch (err) {
    throw new ContentValidationError(
      `Failed to parse ${filePath}: ${err instanceof Error ? err.message : String(err)}`,
      filePath
    );
  }
  const parsed = TeardownCaseSchema.safeParse(raw);
  if (!parsed.success) {
    throw new ContentValidationError(
      `Teardown schema validation failed for ${filePath}: ${JSON.stringify(parsed.error.format(), null, 2)}`,
      filePath
    );
  }
  return parsed.data as TeardownCase;
}

/** All teardown cases for a brand, newest first. Missing dir → []. */
export function loadAllTeardowns(slug: string): TeardownCase[] {
  const dir = teardownsDir(slug);
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .sort();
  const cases = files.map((f) => parseCaseFile(path.join(dir, f)));

  const slugs = new Set<string>();
  for (const c of cases) {
    if (slugs.has(c.slug)) {
      throw new ContentValidationError(
        `Duplicate teardown slug "${c.slug}" in ${dir} — slugs must be unique`,
        dir
      );
    }
    slugs.add(c.slug);
  }
  return cases.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Single case by slug; undefined when absent (page renders notFound()). */
export function loadTeardownBySlug(
  slug: string,
  caseSlug: string
): TeardownCase | undefined {
  return loadAllTeardowns(slug).find((c) => c.slug === caseSlug);
}
