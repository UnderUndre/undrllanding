import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { getActiveProjectConfig } from "@/lib/project-config";
import { loadFaqData, loadLegalConfig } from "@/lib/schemas/content-loaders";

// Spec 006 FR-008: brand-generated llms.txt manifest for AI crawlers.
// Built exclusively from ProjectConfig + data/*.json — zero per-brand copy (FR-011).

export function GET() {
  const config = getActiveProjectConfig();
  const base = `https://${config.domain}`;
  const lines: string[] = [
    `# ${config.name}`,
    "",
    config.description,
    "",
    "## Key pages",
    `- [Home](${base}/)`,
    `- [Engineering Manifesto](${base}/manifest)`,
    `- [Privacy Policy](${base}/privacy)`,
    `- [Terms of Service](${base}/terms)`,
  ];

  try {
    const faq = loadFaqData(config.slug);
    lines.push("", "## FAQ topics");
    for (const item of faq.items) {
      lines.push(`- ${item.question.en || item.question.ru}`);
    }
  } catch {
    // brands without faq.json omit the section (additive contract, NFR-003)
  }

  const legal = loadLegalConfig(config.slug);
  if (legal?.contactEmail) {
    lines.push("", "## Contact", `- Email: ${legal.contactEmail}`);
  }

  return new NextResponse(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
