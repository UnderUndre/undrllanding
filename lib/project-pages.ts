import type { ComponentType } from "react";
import { getActiveProjectConfig } from "@/lib/project-config";

// Per-project home-page registry (spec 003 T-018/T-019).
// scripts/create-project.mjs appends new entries inside the GENERATED block.

// BEGIN GENERATED PROJECT PAGES (managed by scripts/create-project.mjs — do not edit outside this block)
import { UnderundreHome } from "@/projects/underundre/config";
import { TemplateHome } from "@/projects/_template/config";

const projectPages: Record<string, ComponentType> = {
  underundre: UnderundreHome,
  _template: TemplateHome,
};
// END GENERATED PROJECT PAGES

export function getActiveProjectHome(): ComponentType {
  const config = getActiveProjectConfig();
  const home = projectPages[config.slug] ?? projectPages[config.name.toLowerCase()];
  // Spec 005 FR-010: no silent cross-brand fallback — a registered brand
  // without a registered home page is a scaffold bug, not a template case.
  if (!home) {
    throw new Error(
      `[project-pages] No home page registered for project "${config.slug}" — ` +
        `add it to the GENERATED PROJECT PAGES block in lib/project-pages.ts.`
    );
  }
  return home;
}
