import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";
import { getActiveProjectConfig } from "@/lib/project-config";

// Spec 006 FR-005: brand-agnostic OG share card (1200x630), rendered from the
// active brand config. Zero brand literals.
// Logo: PNG data URI (satori does not rasterize SVG) from the brand's public assets.
//
// force-dynamic + ISR: @vercel/og font resolution crashes Next 15.1 prerender
// on Windows dev builds ("Invalid URL"); on the Linux VPS the route is served
// with revalidate caching, so generation cost is once per day per brand.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 86400;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const config = getActiveProjectConfig();
  const iconPath = path.join(
    process.cwd(),
    "public",
    "projects",
    config.slug,
    "icon-48.png",
  );
  const logoDataUri = fs.existsSync(iconPath)
    ? `data:image/png;base64,${fs.readFileSync(iconPath).toString("base64")}`
    : undefined;

  const { primaryColor, secondaryColor } = config.theme;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, ${secondaryColor} 0%, #080808 55%, ${primaryColor} 100%)`,
          color: "#faf5ff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {logoDataUri ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoDataUri} width={96} height={96} alt="" />
          ) : null}
          <div
            style={{
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            {config.name}
          </div>
        </div>
        <div
          style={{
            fontSize: 34,
            lineHeight: 1.4,
            color: "#d8b4fe",
            display: "flex",
            maxWidth: 960,
          }}
        >
          {config.description}
        </div>
        <div
          style={{
            fontSize: 28,
            color: primaryColor,
            fontWeight: 700,
            display: "flex",
          }}
        >
          {config.domain}
        </div>
      </div>
    ),
    size,
  );
}
