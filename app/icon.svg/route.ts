import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getActiveProjectConfig } from "@/lib/project-config";

export async function GET() {
  const config = getActiveProjectConfig();
  const iconPath = path.join(process.cwd(), "public", config.iconUrl);
  
  if (fs.existsSync(iconPath)) {
    const fileBuffer = fs.readFileSync(iconPath);
    const contentTypes: Record<string, string> = {
      ".svg": "image/svg+xml",
      ".png": "image/png",
      ".ico": "image/x-icon",
    };
    const contentType = contentTypes[path.extname(iconPath).toLowerCase()] ?? "application/octet-stream";
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return new NextResponse("Icon Not Found", { status: 404 });
}
