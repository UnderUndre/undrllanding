import Link from "next/link";
import { loadPricingData, loadFaqData } from "@/lib/schemas/content-loaders";
import { getActiveProjectConfig } from "@/lib/project-config";
import GenericPricingView from "./generic-pricing-view";
import GenericFaqView from "./generic-faq-view";
import LeadForm from "./lead-form";

// Generic brand-home sections for scaffolded projects (spec 003 FR-010, T-018):
// neutral dark palette, data-driven from projects/<slug>/data/*.json.
// Shared by projects/_template and every `pnpm project:create` brand.

export function PlaceholderHero() {
  const config = getActiveProjectConfig();
  return (
    <section className="py-24 bg-brand-bg text-slate-100 border-b border-brand-border">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
        {config.heroBadge && (
          <span className="inline-block px-3 py-1 bg-slate-900 text-slate-300 text-xs font-semibold rounded-full uppercase tracking-wider border border-slate-700">
            {config.heroBadge}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
          {config.name}
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">{config.description}</p>
        {config.navigation.ctaButton && (
          <a
            href={config.navigation.ctaButton.href}
            className="inline-block px-6 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary-hover active:scale-[0.98] text-white font-bold transition-all"
          >
            {config.navigation.ctaButton.labelFallback} →
          </a>
        )}
      </div>
    </section>
  );
}

export function BrandPricing({ slug }: { slug: string }) {
  const data = loadPricingData(slug);
  return <GenericPricingView data={data} />;
}

export function BrandFaq({ slug }: { slug: string }) {
  const data = loadFaqData(slug);
  return <GenericFaqView data={data} />;
}

export function BrandContact() {
  const config = getActiveProjectConfig();
  return (
    <section id="contact" className="py-20 bg-brand-bg text-slate-100 border-b border-brand-border">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <h2 className="text-3xl font-bold text-white">Contact {config.name}</h2>
        <p className="text-slate-400 text-sm">
          Leave your email and a short brief — we will get back to you.
        </p>
        <LeadForm />
        {config.legal?.contactEmail && (
          <p className="text-xs text-slate-500">
            Or email us directly:{" "}
            <a className="text-brand-accent hover:underline" href={`mailto:${config.legal.contactEmail}`}>
              {config.legal.contactEmail}
            </a>
          </p>
        )}
        <p className="text-[11px] text-slate-600">
          <Link href="/privacy" className="hover:text-slate-400">Privacy Policy</Link>
          {" · "}
          <Link href="/terms" className="hover:text-slate-400">Terms of Service</Link>
        </p>
      </div>
    </section>
  );
}
