# Quickstart: 004-landing-template-updates

Verify the feature in under 10 minutes.

## Prerequisites

```bash
cd undrllanding
npm install
```

## 1. Icons (US1)

```bash
npm run build && npm start
# → view-source localhost:3000 | grep rel="icon"
# expect: /projects/undreading|underundre/icon-48.png  (≤10 KB)
# expect: /projects/.../apple-icon-180.png             (≤60 KB)
```

MIME probe:

```bash
curl -sI localhost:3000/projects/underundre/icon-48.png | grep -i content-type   # image/png
curl -sI localhost:3000/projects/underundre/icon.svg       | grep -i content-type   # image/svg+xml
```

## 2. Logo (US2)

DevTools on the header logo wrapper: no inline `background-color`/`border`; hover → scale-105.

## 3. Citations (US3)

Homepage tagline footer: «§ 1 (Via Negativa)», click → `/manifest#p-1`, principle card visible below fixed header.

## 4. Verify gates

```bash
npm run validate && npm run verify
# → V1 citations: PASS, V2 assets: PASS, V3 locale fallback: PASS
```

## 5. Pilot brand (US4)

```bash
NEXT_PUBLIC_PROJECT_NAME=undreading npm run build
# → zero references to "underundre" in output
# → uk locale renders; strings without uk fall back to en
```
