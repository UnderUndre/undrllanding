#!/usr/bin/env node
// Interactive project scaffolding CLI (spec 003 FR-009, T-019).
// Usage:
//   pnpm project:create
//   node scripts/create-project.mjs --slug=acme --name="Acme Systems" --domain=acme.org --primary-color=#2563eb --accent-color=#059669
//
// Zero third-party dependencies (node:fs / node:readline).
// Registers the brand by appending a delimited block to lib/project-config.ts
// and lib/project-pages.ts, then immediately runs `pnpm validate`.

import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { execSync } from "node:child_process";

const repoRoot = path.resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const templateDir = path.join(repoRoot, "projects", "_template");
const projectsDir = path.join(repoRoot, "projects");

function parseArgs(argv) {
  const args = {};
  for (const arg of argv) {
    const m = arg.match(/^--([a-z-]+)=(.*)$/s);
    if (m) args[m[1]] = m[2];
  }
  return args;
}

function ask(rl, question, fallback) {
  return new Promise((resolve) => {
    rl.question(`${question}${fallback ? ` [${fallback}]` : ""}: `, (answer) => {
      resolve(answer.trim() || fallback || "");
    });
  });
}

function fail(message) {
  console.error(`✖ ${message}`);
  process.exit(1);
}

function relativeLuminance(hex) {
  const rgb = hex.replace("#", "").padEnd(6, "0").match(/.{2}/g).map((h) => parseInt(h, 16) / 255);
  const lin = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

function contrastRatio(fg, bg) {
  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function substitute(content, vars) {
  let out = content;
  for (const [key, value] of Object.entries(vars)) {
    out = out.replaceAll(`[${key}]`, value);
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  const slug = (args.slug || (await ask(rl, "Project slug (lowercase, [a-z0-9-])"))).toLowerCase();
  const name = args.name || (await ask(rl, "Brand name"));
  const domain = args.domain || (await ask(rl, "Domain", `${slug}.com`));
  const primaryColor = (args["primary-color"] || (await ask(rl, "Primary color", "#2563eb"))).toLowerCase();
  const accentColor = (args["accent-color"] || (await ask(rl, "Accent color", "#059669"))).toLowerCase();
  rl.close();

  if (!/^[a-z][a-z0-9-]*$/.test(slug)) {
    fail(`Invalid slug "${slug}" — must match ^[a-z][a-z0-9-]*$`);
  }
  if (slug === "_template") {
    fail(`Slug "${slug}" is reserved.`);
  }
  const targetDir = path.join(projectsDir, slug);
  if (fs.existsSync(targetDir)) {
    fail(`Project "${slug}" already exists at projects/${slug}`);
  }
  if (!fs.existsSync(templateDir)) {
    fail("projects/_template/ not found — repository is broken.");
  }
  if (!/^#[0-9a-f]{6}$/.test(primaryColor) || !/^#[0-9a-f]{6}$/.test(accentColor)) {
    fail("Colors must be in #rrggbb format.");
  }

  // NFR-003 guard: warn when the palette cannot reach AA contrast on the dark bg.
  const bg = "#030712";
  for (const [label, hex] of [["primary", primaryColor], ["accent", accentColor]]) {
    const ratio = contrastRatio(hex, bg);
    if (ratio < 4.5) {
      console.warn(`⚠ Contrast of ${label} (${hex}) on dark bg is ${ratio.toFixed(2)}:1 (< 4.5:1 WCAG AA). Consider a lighter shade.`);
    }
  }

  console.log(`\n→ Scaffolding projects/${slug} ...`);
  fs.cpSync(templateDir, targetDir, { recursive: true });

  const vars = {
    SLUG: slug,
    NAME: name,
    DOMAIN: domain,
    "PRIMARY-COLOR": primaryColor,
    "ACCENT-COLOR": accentColor,
  };

  const brandPath = path.join(targetDir, "brand.ts");
  fs.writeFileSync(brandPath, substitute(fs.readFileSync(brandPath, "utf-8"), vars));

  const themePath = path.join(targetDir, "theme.css");
  fs.writeFileSync(
    themePath,
    substitute(fs.readFileSync(themePath, "utf-8"), {
      "PRIMARY-COLOR": primaryColor,
      "PRIMARY-HOVER": primaryColor,
      "ACCENT-COLOR": accentColor,
    })
      .replace(/--brand-primary:\s*#[0-9a-f]{6};/, `--brand-primary: ${primaryColor};`)
      .replace(/--brand-primary-hover:\s*#[0-9a-f]{6};/, `--brand-primary-hover: ${primaryColor};`)
      .replace(/--brand-accent:\s*#[0-9a-f]{6};/, `--brand-accent: ${accentColor};`)
  );

  for (const dataFile of ["data/pricing.json", "data/faq.json"]) {
    const p = path.join(targetDir, dataFile);
    fs.writeFileSync(p, substitute(fs.readFileSync(p, "utf-8"), { NAME: name, SLUG: slug }));
  }

  const configPath = path.join(targetDir, "config.tsx");
  fs.writeFileSync(configPath, substitute(fs.readFileSync(configPath, "utf-8"), { SLUG: slug, NAME: name }));

  // Rename the template brand export to a slug-specific symbol.
  const camelSlug = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
  let configSrc = fs.readFileSync(configPath, "utf-8");
  configSrc = configSrc
    .replaceAll("TemplateHome", `${camelSlug}Home`)
    .replace('import { templateBrand } from "./brand";', `import { ${camelSlug}Brand } from "./brand";`)
    .replaceAll("templateBrand", `${camelSlug}Brand`);
  fs.writeFileSync(configPath, configSrc);

  let brandSrc = fs.readFileSync(brandPath, "utf-8");
  brandSrc = brandSrc
    .replace("templateBrand", `${camelSlug}Brand`)
    .replace("CANONICAL STARTER TEMPLATE (spec 003 FR-010, T-018).", `Brand config for projects/${slug} (generated by pnpm project:create).`);
  fs.writeFileSync(brandPath, brandSrc);

  // Append registry entries inside the delimited generated blocks.
  const brandRegistryPath = path.join(repoRoot, "lib", "project-config.ts");
  let brandRegistry = fs.readFileSync(brandRegistryPath, "utf-8");
  brandRegistry = brandRegistry.replace(
    "// END GENERATED PROJECT REGISTRY",
    [
      `import { ${camelSlug}Brand } from "@/projects/${slug}/brand";`,
      "",
      "projectRegistry" + `[${JSON.stringify(slug)}] = ${camelSlug}Brand;`,
      "// END GENERATED PROJECT REGISTRY",
    ].join("\n")
  );
  fs.writeFileSync(brandRegistryPath, brandRegistry);

  const pagesRegistryPath = path.join(repoRoot, "lib", "project-pages.ts");
  let pagesRegistry = fs.readFileSync(pagesRegistryPath, "utf-8");
  pagesRegistry = pagesRegistry.replace(
    "// END GENERATED PROJECT PAGES",
    [
      `import { ${camelSlug}Home } from "@/projects/${slug}/config";`,
      "",
      "projectPages" + `[${JSON.stringify(slug)}] = ${camelSlug}Home;`,
      "// END GENERATED PROJECT PAGES",
    ].join("\n")
  );
  fs.writeFileSync(pagesRegistryPath, pagesRegistry);

  // Immediate compile verification of the appended registry (research §6).
  console.log("→ Running pnpm validate ...");
  try {
    execSync("pnpm validate", { cwd: repoRoot, stdio: "inherit" });
  } catch {
    fail("pnpm validate failed — the appended registry entry broke compilation. Revert manually.");
  }

  console.log(`
✔ Project "${name}" created at projects/${slug}/
  Next steps:
    1. Replace all [PLACEHOLDER] values in projects/${slug}/brand.ts and data/*.json
    2. Replace projects/${slug}/public/favicon.ico with the brand icon
    3. Review legal block (privacy/terms clauses) before production
    4. Run: npx cross-env NEXT_PUBLIC_PROJECT_NAME=${slug} pnpm dev
`);
}

main().catch((err) => fail(err instanceof Error ? err.message : String(err)));
