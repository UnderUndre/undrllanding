import fs from "node:fs";
import path from "node:path";
import {
  PromptPackItemSchema,
  type PromptPackItem,
} from "@/lib/schemas/prompt-schema";
import { ContentValidationError } from "./content-loaders";

// Spec 009 FR-001: modular prompt loaders (008 DD-3 pattern).
// Missing directory → [] (brand without prompts renders 404, NFR-003).

function promptsDir(slug: string): string {
  return path.join(process.cwd(), "projects", slug, "data", "prompts");
}

export function loadAllPrompts(slug: string): PromptPackItem[] {
  const dir = promptsDir(slug);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json")).sort();
  const items = files.map((f) => {
    const filePath = path.join(dir, f);
    let raw: unknown;
    try {
      raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch (err) {
      throw new ContentValidationError(
        `Failed to parse ${filePath}: ${err instanceof Error ? err.message : String(err)}`,
        filePath
      );
    }
    const parsed = PromptPackItemSchema.safeParse(raw);
    if (!parsed.success) {
      throw new ContentValidationError(
        `Prompt schema validation failed for ${filePath}: ${JSON.stringify(parsed.error.format(), null, 2)}`,
        filePath
      );
    }
    return parsed.data as PromptPackItem;
  });

  const slugs = new Set<string>();
  for (const item of items) {
    if (slugs.has(item.slug)) {
      throw new ContentValidationError(
        `Duplicate prompt slug "${item.slug}" in ${dir}`,
        dir
      );
    }
    slugs.add(item.slug);
  }
  return items.sort((a, b) => a.order - b.order);
}
