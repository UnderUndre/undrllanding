import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getActiveProjectConfig } from "@/lib/project-config";

export async function GET() {
  const config = getActiveProjectConfig();
  const iconPath = path.join(process.cwd(), "public", config.iconUrl);
  
  if (fs.existsSync(iconPath)) {
    const fileBuffer = fs.readFileSync(iconPath);
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }

  return new NextResponse("Icon Not Found", { status: 404 });
}
