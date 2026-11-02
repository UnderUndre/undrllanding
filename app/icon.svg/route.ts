import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getActiveProjectConfig } from "@/lib/project-config";

// Icon route hardening (spec 005 FR-005):
// - sanitize iconUrl (leading slashes would escape the public/ re-anchor via path.resolve)
// - re-anchor resolved path inside public/, extension allowlist
// - async fs with a lazy per-request buffer cache (config is immutable per build)
// - SVG responses carry a strict per-response CSP + nosniff

const contentTypes: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

const bufferCache = new Map<string, Buffer>();

export async function GET() {
  const config = getActiveProjectConfig();
  const publicDir = path.resolve(process.cwd(), "public");
  // Leading "/" makes path.resolve treat the value as filesystem-root — strip it.
  const cleanIconUrl = config.iconUrl.replace(/^\/+/, "");
  const iconPath = path.resolve(publicDir, cleanIconUrl);

  const reAnchored = iconPath.startsWith(publicDir + path.sep);
  const ext = path.extname(iconPath).toLowerCase();
  if (!reAnchored || !(ext in contentTypes)) {
    return new NextResponse("Icon Not Found", { status: 404 });
  }

  let buffer = bufferCache.get(iconPath);
  if (!buffer) {
    try {
      buffer = await fs.readFile(iconPath);
    } catch {
      return new NextResponse("Icon Not Found", { status: 404 });
    }
    bufferCache.set(iconPath, buffer);
  }

  const headers: Record<string, string> = {
    "Content-Type": contentTypes[ext],
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
  };
  if (ext === ".svg") {
    headers["Content-Security-Policy"] = "default-src 'none'; style-src 'unsafe-inline'";
  }
  return new NextResponse(new Uint8Array(buffer), { headers });
}
