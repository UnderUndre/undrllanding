import { NextResponse } from "next/server";
import { getActiveProjectConfig } from "@/lib/project-config";
import { loadAllPrompts } from "@/lib/schemas/prompt-loaders";

// Spec 009 FR-002 (plan DD-1): the full prompt pack as one markdown file,
// GENERATED from the same JSON files at build time (force-static) — no
// dual-maintenance drift, no runtime cost. Brand-gated (bureau program).

export const dynamic = "force-static";

export function GET() {
  const config = getActiveProjectConfig();
  if (!config.hasPrompts || config.slug !== "underundre") {
    return new NextResponse("Not Found", { status: 404 });
  }
  const prompts = loadAllPrompts(config.slug);
  const header = [
    `# ${config.name} — SpecKit Discovery Prompt Pack`,
    "",
    "The five prompts behind the $350 SpecKit Discovery, published ungated.",
    "Run them in order on your own workflow; arrive with the finished brief",
    "and the audit gets faster and cheaper.",
    "",
  ];
  const body = prompts.flatMap((p) => [
    `## Prompt ${p.order}: ${p.title.en} (${p.relatesTo})`,
    "",
    `> ${p.description.en}`,
    "",
    "```text",
    p.body,
    "```",
    "",
  ]);
  return new NextResponse([...header, ...body].join("\n"), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
