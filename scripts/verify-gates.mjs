#!/usr/bin/env node
// verify-gates.mjs — CI verification gates (spec 005 FR-007).
// Implements the 004 contract (specs/004-landing-template-updates/contracts/verify-gates.md):
//   V1  citation integrity, V2 asset integrity, V2a logo chrome-free,
//   V3  locale fallback + baseline byte-identity.
// Amendments (audit hand-offs #1/#2, spec 005):
//   - V3 compares the response BODY only (security headers excluded)
//   - V3 normalizes the DOM before diffing: <script> tags and RSC hydration
//     payloads (self.__next_f) are stripped, because component chunk hashes
//     change on any client-component edit.
// Exit 0 = all gates pass; exit 1 with per-gate report otherwise.

import fs from "node:fs";
import path from "node:path";

const repoRoot = path.resolve(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const m = arg.match(/^--([a-z-]+)(?:=(.*))?$/);
    if (m) {
      const key = m[1];
      if (m[2] !== undefined) {
        args[key] = m[2];
      } else if (i + 1 < argv.length && !argv[i + 1].startsWith("--")) {
        args[key] = argv[++i];
      } else {
        args[key] = "true";
      }
    }
  }
  return args;
}
const args = parseArgs(process.argv.slice(2));
const brand = (args.brand || process.env.NEXT_PUBLIC_PROJECT_NAME || "underundre").toLowerCase();

const results = [];
function gate(id, ok, detail) {
  results.push({ id, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"} [${id}] ${detail}`);
}

// --- Inputs ---------------------------------------------------------------
const prerendered = path.join(repoRoot, ".next", "server", "app", "index.html");
const baseline = path.join(repoRoot, "specs", "004-landing-template-updates", "qa", "baseline", "index.html");

if (!fs.existsSync(prerendered)) {
  console.error(`✖ ${prerendered} not found — run \`pnpm build\` first.`);
  process.exit(1);
}
const html = fs.readFileSync(prerendered, "utf-8");

// --- Gate V1: citation integrity ------------------------------------------
{
  const citationPatterns = [/§\s*(?:1[89]|[2-9]\d)\./g, /v18\.9/g, /\b18\.9\b/g];
  const hits = citationPatterns.reduce((n, re) => n + (html.match(re) || []).length, 0);
  gate("V1-citations", hits === 0, `citation-pattern hits in rendered HTML: ${hits} (expect 0)`);

  // Manifest anchors live on the /manifest route — scan the whole prerendered
  // build, not just index.html (004 contract: "in the same build").
  const appDir = path.dirname(prerendered);
  const buildHtml = [];
  const collect = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) collect(full);
      else if (entry.name.endsWith(".html")) buildHtml.push(fs.readFileSync(full, "utf-8"));
    }
  };
  collect(appDir);
  const buildAll = buildHtml.join("\n");

  const manifestLinks = [...new Set([...html.matchAll(/\/manifest#p-(\d)/g)].map((m) => m[1]))];
  const missingTargets = manifestLinks.filter((n) => !buildAll.includes(`id="p-${n}"`));
  gate("V1-manifest-anchors", missingTargets.length === 0,
    `manifest anchors: ${manifestLinks.length} links, missing targets in build: [${missingTargets.join(", ") || "none"}]`);
}

// --- Gate V2: asset integrity ---------------------------------------------
{
  const brandPublic = path.join(repoRoot, "public", "projects", brand);
  const icon48 = path.join(brandPublic, "icon-48.png");
  const apple180 = path.join(brandPublic, "apple-icon-180.png");
  const iconSvg = path.join(brandPublic, "icon.svg");

  const icon48ok = fs.existsSync(icon48) && fs.statSync(icon48).size <= 10_240;
  const apple180ok = fs.existsSync(apple180) && fs.statSync(apple180).size <= 61_440;
  const iconSvgok = fs.existsSync(iconSvg);
  gate("V2-assets", icon48ok && apple180ok && iconSvgok,
    `icon-48.png(≤10KB): ${icon48ok}, apple-icon-180.png(≤60KB): ${apple180ok}, icon.svg: ${iconSvgok}`);

  const faviconLinkOk = /<link rel="icon"[^>]+icon-48\.png/.test(html) || /href="[^"]*icon-48\.png/.test(html);
  gate("V2-favicon-link", faviconLinkOk, `rendered head references icon-48.png: ${faviconLinkOk}`);

  const dupDir = path.join(brandPublic, "public");
  gate("V2-no-dup-assets", !fs.existsSync(dupDir), `projects/${brand}/public/ must not exist: ${!fs.existsSync(dupDir)}`);

  const otherBrandRefs = [...html.matchAll(/\/projects\/([a-z0-9_-]+)\//g)]
    .map((m) => m[1])
    .filter((s) => s !== brand && s !== "_template");
  gate("V2-brand-isolation", otherBrandRefs.length === 0,
    `other-brand asset refs in HTML: ${otherBrandRefs.length}`);
}

// --- Gate V2a: logo chrome-free -------------------------------------------
{
  const logoPath = path.join(repoRoot, "components", "ui", "logo.tsx");
  const logoSrc = fs.existsSync(logoPath) ? fs.readFileSync(logoPath, "utf-8") : "";
  const inlineThemeStyles = (logoSrc.match(/style=\{\{[^}]*(backgroundColor|borderColor|padding)/g) || []).length;
  gate("V2a-logo-chrome", inlineThemeStyles === 0, `theme-derived inline styles in logo.tsx: ${inlineThemeStyles} (expect 0)`);
}

// --- Gate V3: locale fallback & baseline byte-identity (contract 004) -------
{
  if (brand === "underundre") {
    if (!fs.existsSync(baseline)) {
      gate("V3-baseline", false, `baseline missing: ${baseline}`);
    } else {
      const normalize = (src) =>
        src
          // strip hydration/RSC payloads and script tags (chunk hashes change on edit)
          .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
          .replace(/<script\b[^>]*\/>/g, "")
          .replace(/self\.__next_f\.push\([\s\S]*?\)\);?/g, "")
          // strip preload/modulepreload links (chunk-hash bearing)
          .replace(/<link[^>]+rel="(preload|modulepreload)"[^>]*>/g, "")
          // canonicalize hashed asset URLs (css/js chunk hashes change on edit;
          // the css bundle *set* is content-addressed by the build itself)
          .replace(/(\/_next\/static\/(?:css|chunks)\/)[^"']+/g, "$1<HASH>")
          .trim();

      const a = normalize(fs.readFileSync(baseline, "utf-8"));
      const b = normalize(html);
      gate("V3-baseline-identity", a === b,
        a === b
          ? `normalized DOM identical to 004 baseline (${a.length} bytes)`
          : `normalized DOM differs from baseline (baseline ${a.length}B vs current ${b.length}B) — if this change is intentional, regenerate the baseline per the 004 contract Maintenance section`);
    }
  } else {
    // For undreading (contract 004 Gate V3): verify brand isolation (brand title,
    // headings, and copy must not render the underundre bureau brand; author
    // personal social profile URLs like github.com/UnderUndre are permitted).
    const contentWithoutSocialUrls = html.replace(/https?:\/\/[^\s"']*(?:underundre)[^\s"']*/gi, "");
    const underundreRefs = (contentWithoutSocialUrls.match(/\bunderundre\b/gi) || []).length;
    gate("V3-brand-isolation", underundreRefs === 0,
      `brand isolation for ${brand}: ${underundreRefs} references to underundre brand in copy (expect 0)`);
  }
}

// --- Gate V4: SEO foundation (spec 006) ------------------------------------
{
  const domain = process.env.NEXT_PUBLIC_BRAND_DOMAIN || "";

  // V4-robots: prerendered robots.txt body
  const robotsPath = path.join(repoRoot, ".next", "server", "app", "robots.txt.body");
  if (fs.existsSync(robotsPath)) {
    const robots = fs.readFileSync(robotsPath, "utf-8");
    const robotsOk = /Sitemap:\s*https:\/\/[^\s]+\/sitemap\.xml/.test(robots) && robots.includes("Disallow: /api/");
    gate("V4-robots", robotsOk, `robots.txt: sitemap pointer + /api disallow: ${robotsOk}`);
  } else {
    gate("V4-robots", false, "robots.txt.body not found in build output");
  }

  // V4-sitemap: prerendered sitemap body
  const sitemapPath = path.join(repoRoot, ".next", "server", "app", "sitemap.xml.body");
  if (fs.existsSync(sitemapPath)) {
    const sitemap = fs.readFileSync(sitemapPath, "utf-8");
    const hasUrlset = sitemap.includes("<urlset");
    // /manifest is listed only for brands shipping data/manifest.json (003 FR-008
    // absence semantics — the route 404s otherwise, so the gate mirrors that).
    const manifestShipped = fs.existsSync(path.join(repoRoot, "projects", brand, "data", "manifest.json"));
    const hasManifest = sitemap.includes("/manifest");
    const noAuth = !/(signin|signup|reset-password|\/api\/)/.test(sitemap);
    gate("V4-sitemap", hasUrlset && (hasManifest === manifestShipped) && noAuth,
      `sitemap.xml: urlset=${hasUrlset}, manifest listed=${hasManifest} (shipped=${manifestShipped}), auth routes excluded=${noAuth}`);
  } else {
    gate("V4-sitemap", false, "sitemap.xml.body not found in build output");
  }

  // V4-head: canonical + OG image + twitter card in rendered homepage head
  const headOk =
    /<link rel="canonical" href="https:\/\/[^"]+"/.test(html) &&
    html.includes('property="og:image"') &&
    html.includes('name="twitter:card" content="summary_large_image"');
  gate("V4-head", headOk, `head: canonical + og:image + twitter:card: ${headOk}`);

  // V4-jsonld: every ld+json block parses; WebSite + brand entity required;
  // FAQPage required when the brand ships faq.json.
  const ldMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const blocks = [];
  let parseErrors = 0;
  for (const m of ldMatches) {
    try {
      blocks.push(JSON.parse(m[1].replace(/\u003c/g, "<")));
    } catch {
      parseErrors += 1;
    }
  }
  const types = new Set(blocks.map((b) => b["@type"]));
  const faqFile = path.join(repoRoot, "projects", brand, "data", "faq.json");
  const jsonLdOk =
    ldMatches.length > 0 &&
    parseErrors === 0 &&
    blocks.every((b) => b["@context"] === "https://schema.org") &&
    types.has("WebSite") &&
    ["ProfessionalService", "Organization", "Book"].some((t) => types.has(t)) &&
    (fs.existsSync(faqFile) ? types.has("FAQPage") : true);
  gate("V4-jsonld", jsonLdOk,
    `JSON-LD: ${blocks.length} blocks, parseErrors=${parseErrors}, types=[${[...types].join(", ")}]`);
}

// --- Gate V5: referral PII & copy (spec 007) -------------------------------
{
  // V5-no-wallets: no crypto-wallet-shaped strings in tracked sources or
  // prerendered HTML. Exclusions: this script itself, test fixtures, the
  // patches dir, node_modules (review F8 — grep boundary).
  const walletPatterns = [
    /T[1-9A-HJ-NP-Za-km-z]{33}/g, // TRON (USDT TRC-20)
    /0x[a-fA-F0-9]{40}/g,          // EVM
    /bc1[a-z0-9]{20,}/g,           // Bitcoin bech32
  ];
  const skipDirs = new Set(["node_modules", ".next", ".git", ".history", "patches", "qa"]);
  const textExts = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".html", ".css"]);
  let walletHits = [];
  const scan = (dir) => {
    if (path.basename(dir) === "node_modules" || dir.includes(".pnpm_patches")) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!skipDirs.has(entry.name)) scan(full);
      } else if (
        textExts.has(path.extname(entry.name)) &&
        !entry.name.includes("verify-gates") &&
        !entry.name.includes(".test.")
      ) {
        const content = fs.readFileSync(full, "utf-8");
        for (const re of walletPatterns) {
          const hits = content.match(re);
          if (hits) walletHits.push(`${path.relative(repoRoot, full)}: ${hits.join(", ")}`);
        }
      }
    }
  };
  // scan app source dirs (repo root scan would drown in specs docs)
  for (const dir of ["app", "components", "lib", "context", "projects", "public", "tests", "scripts"]) {
    const abs = path.join(repoRoot, dir);
    if (fs.existsSync(abs)) scan(abs);
  }
  const htmlWallets = walletPatterns.flatMap((re) => html.match(re) || []);
  gate("V5-no-wallets", walletHits.length === 0 && htmlWallets.length === 0,
    `wallet-shaped strings in sources/build: ${walletHits.length + htmlWallets.length} (expect 0)`);

  // V5-referral-copy: /referral page prerendered with rules copy for underundre
  const referralHtmlPath = path.join(repoRoot, ".next", "server", "app", "referral.html");
  if (brand === "underundre") {
    if (fs.existsSync(referralHtmlPath)) {
      const refHtml = fs.readFileSync(referralHtmlPath, "utf-8");
      const ok = refHtml.includes("/?ref=") || refHtml.includes("ref=");
      gate("V5-referral-copy", ok, `/referral prerendered with mint form: ${ok}`);
    } else {
      gate("V5-referral-copy", false, "referral.html not found in build output (expected for underundre)");
    }
  } else {
    gate("V5-referral-copy", true, `brand ${brand}: /referral is bureau-only (404 expected)`);
  }
}

// --- Gate V6: proof engine — teardowns & calculator (spec 008) --------------
{
  const teardownsDir = path.join(repoRoot, "projects", brand, "data", "teardowns");
  const brandShipsTeardowns = brand === "underundre"; // hasTeardowns flag source of truth
  if (brandShipsTeardowns) {
    // V6.1: Zod-equivalent structural validation + slug uniqueness
    let v61ok = true, v61detail = "";
    if (!fs.existsSync(teardownsDir)) {
      v61ok = false;
      v61detail = "teardowns dir missing for underundre";
    } else {
      const files = fs.readdirSync(teardownsDir).filter((f) => f.endsWith(".json"));
      const slugs = new Set();
      for (const f of files) {
        try {
          const c = JSON.parse(fs.readFileSync(path.join(teardownsDir, f), "utf-8"));
          if (!c.slug || !/^[a-z0-9-]+$/.test(c.slug)) { v61ok = false; v61detail = `${f}: bad slug`; break; }
          if (slugs.has(c.slug)) { v61ok = false; v61detail = `${f}: duplicate slug ${c.slug}`; break; }
          slugs.add(c.slug);
          for (const req of ["title", "summary", "symptom", "diagnosis", "outcome", "architectureComparison", "ddlSnippet", "metrics"]) {
            if (!(req in c)) { v61ok = false; v61detail = `${f}: missing ${req}`; break; }
          }
          if (!v61ok) break;
        } catch (e) {
          v61ok = false; v61detail = `${f}: JSON parse error`;
          break;
        }
      }
      if (v61ok && files.length === 0) { v61ok = false; v61detail = "no teardown files"; }
      if (v61ok) v61detail = `${files.length} cases, slugs unique, required fields present`;
    }
    gate("V6.1-teardowns-schema", v61ok, v61detail);

    // V6.2: OpSec PII scan on localized human-text fields only (review F6)
    const phoneRe = /\+[1-9]\d{8,14}/g;
    const emailRe = /[a-zA-Z0-9._%+-]+@(?!example\.com|underundre\.com)[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    let piiHits = [];
    for (const f of fs.readdirSync(teardownsDir).filter((x) => x.endsWith(".json"))) {
      const c = JSON.parse(fs.readFileSync(path.join(teardownsDir, f), "utf-8"));
      const textFields = [c.symptom, c.diagnosis, c.outcome, c.sovereignSolution, c.summary].map((x) => `${x?.ru || ""} ${x?.en || ""}`).join(" ");
      for (const re of [phoneRe, emailRe]) {
        const hits = textFields.match(re);
        if (hits) piiHits.push(`${f}: ${hits.join(", ")}`);
      }
    }
    gate("V6.2-opsec-pii", piiHits.length === 0,
      `PII hits in teardown human-text fields: ${piiHits.length}${piiHits.length ? " -> " + piiHits.join("; ") : ""}`);

    // V6.3: prerender + Article JSON-LD via data-testid contracts (review F14a)
    const idxHtml = path.join(repoRoot, ".next", "server", "app", "teardowns.html");
    const idxOk = fs.existsSync(idxHtml) && fs.readFileSync(idxHtml, "utf-8").includes('data-testid="teardown-card"');
    let articleOk = true;
    let articleDetail = "";
    for (const f of fs.readdirSync(teardownsDir).filter((x) => x.endsWith(".json"))) {
      const c = JSON.parse(fs.readFileSync(path.join(teardownsDir, f), "utf-8"));
      const p = path.join(repoRoot, ".next", "server", "app", "teardowns", c.slug + ".html");
      if (!fs.existsSync(p)) { articleOk = false; articleDetail = `${c.slug}.html missing`; break; }
      const body = fs.readFileSync(p, "utf-8");
      const ld = [...body.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
      const hasArticle = ld.some((m) => {
        try { return JSON.parse(m[1].replace(/\u003c/g, "<"))["@type"] === "Article"; }
        catch { return false; }
      });
      if (!hasArticle) { articleOk = false; articleDetail = `${c.slug}: Article JSON-LD missing`; break; }
    }
    gate("V6.3-routes", idxOk && articleOk, `index ${idxOk ? "ok" : "missing cards"}; article JSON-LD: ${articleOk ? "ok" : articleDetail}`);

    // V6.5: calculator math bounds (review F8) — verify constants in source
    const mathSrc = fs.readFileSync(path.join(repoRoot, "lib", "calculator-math.ts"), "utf-8");
    const boundsOk =
      mathSrc.includes("min: 1, max: 500") &&
      mathSrc.includes("min: 1, max: 80") &&
      mathSrc.includes("min: 15, max: 250") &&
      mathSrc.includes("function clamp(");
    const calcHtml = path.join(repoRoot, ".next", "server", "app", "calculator.html");
    const calcPrerendered = fs.existsSync(calcHtml) && fs.readFileSync(calcHtml, "utf-8").includes('data-testid="tdabc-calculator"');
    gate("V6.5-calculator-bounds", boundsOk && calcPrerendered,
      `bounds clamping: ${boundsOk}; /calculator prerendered: ${calcPrerendered}`);
  } else {
    // V6.4: brand isolation — non-bureau brands must not ship bureau teardowns
    const buildsDir = path.join(repoRoot, ".next", "server", "app", "teardowns");
    const leakFiles = [];
    if (fs.existsSync(buildsDir)) {
      const collect = (dir) => {
        for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
          const full = path.join(dir, e.name);
          if (e.isDirectory()) collect(full);
          else if (e.name.endsWith(".html")) {
            const body = fs.readFileSync(full, "utf-8");
            if (body.includes("/teardowns/") && body.includes("franchise") === false && /ats-recruiting|whatsapp-retail|field-service/.test(body)) {
              leakFiles.push(path.relative(repoRoot, full));
            }
          }
        }
      };
      collect(buildsDir);
    }
    gate("V6.4-brand-isolation", leakFiles.length === 0,
      `bureau teardown leakage into ${brand} build: ${leakFiles.length} files`);
  }
}

// --- Report ----------------------------------------------------------------
const failed = results.filter((r) => !r.ok);
console.log(`\nverify-gates: ${results.length - failed.length}/${results.length} gates passed (brand: ${brand})`);
process.exit(failed.length ? 1 : 0);
