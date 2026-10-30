# Business Acceptance & UAT Scenarios: 003-landing-template-engine

- **Standard**: ISO/IEC/IEEE 29119-3:2021 (Clause 6.4 - User Acceptance Testing)
- **Feature Target**: `undrllanding/specs/003-landing-template-engine/`

---

## UAT-001: Agency Reseller Scaffolds Client Landing in Under 10 Minutes

- **Target Persona**: Digital Agency Owner / White-Label Partner (Secondary ICP)
- **Business Goal**: Deploy a high-converting, fully rebranded client landing page without writing custom Next.js layout code or dealing with multi-tenant edge routing.
- **Success Criteria**:
  1. A single CLI command `pnpm project:create` creates the client project structure.
  2. Modifying brand colors in `theme.css` and editing `pricing.json` requires zero knowledge of JSX/TSX.
  3. Running `pnpm build` produces a production-ready standalone build in minutes.
- **Validation Steps**:
  1. Clone repository on clean machine.
  2. Run `pnpm project:create --slug="dr-smile" --name="Dr. Smile Dental" --domain="drsmile.dental" --primary-color="#0284c7" --accent-color="#10b981"`.
  3. Replace `projects/dr-smile/public/favicon.ico` with client logo.
  4. Edit `projects/dr-smile/data/pricing.json`: set pricing to $200 / $1,500.
  5. Run `NEXT_PUBLIC_PROJECT_NAME=dr-smile pnpm dev`.
  6. Inspect browser: verify Dr. Smile branding, blue/green color scheme, custom prices, working contact form, and zero references to UnderUndre or Undrlla.
- **Business Sign-off**: [PENDING]

---

## UAT-002: B2B Enterprise Prospect Performs Legal & Compliance Verification

- **Target Persona**: Enterprise CTO / Legal Counsel evaluating UnderUndre
- **Business Goal**: Verify that submitting business information and initiating contracts with the contractor is legally protected, GDPR-compliant, and governed by strict escrow terms.
- **Success Criteria**:
  1. Privacy Policy explicitly identifies data controller, NACE 62.01 classification, and rights under GDPR Art. 13.
  2. Terms of Service explicitly guarantees 100% intellectual property code transfer upon milestone release with zero vendor lock-in.
  3. Engineering Manifesto proves technical rigor, establishing authority and justifying the $350–$490 entry price point.
- **Validation Steps**:
  1. Arrive at `underundre.com`.
  2. Scroll to footer, click "Privacy Policy" $\to$ verify clear statement of data collection purposes and operator contacts.
  3. Click "Terms of Service" $\to$ verify fixed-scope clause, 5% Upwork Direct Contracts escrow terms, and 100% IP transfer upon release.
  4. Scroll to Tagline section, click manifesto citation link $\to$ verify 7 Core Engineering Principles.
  5. Return to Hero $\to$ submit brief form with full legal confidence.
- **Business Sign-off**: [PENDING]
