import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveProjectConfig } from "@/lib/project-config";
import { loadAllTeardowns } from "@/lib/schemas/teardown-loaders";
import TeardownAutopsyContent from "./teardown-autopsy-content";

// Spec 008 FR-005 (plan DD-4): statically prerendered autopsy pages.

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  // Runs per active brand at build time; brands without teardowns → [].
  const config = getActiveProjectConfig();
  if (!config.hasTeardowns || config.slug !== "underundre") return [];
  return loadAllTeardowns(config.slug).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = getActiveProjectConfig();
  if (config.slug !== "underundre") return {};
  const c = loadAllTeardowns(config.slug).find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: c.title.en,
    description: c.summary.en,
    alternates: { canonical: `/teardowns/${c.slug}` },
    openGraph: {
      title: c.title.en,
      description: c.summary.en,
      url: `https://${config.domain}/teardowns/${c.slug}`,
      type: "article",
    },
  };
}

export default async function TeardownAutopsyPage({ params }: Props) {
  const { slug } = await params;
  const config = getActiveProjectConfig();
  if (!config.hasTeardowns || config.slug !== "underundre") {
    notFound();
  }
  const c = loadAllTeardowns(config.slug).find((x) => x.slug === slug);
  if (!c) {
    notFound();
  }
  // Case data passed as serializable props — node:fs stays server-only.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: c.title.en,
            description: c.summary.en,
            datePublished: c.publishedAt,
            author: { "@type": "Person", name: "Andrei" },
            publisher: { "@type": "Organization", name: config.name, url: `https://${config.domain}` },
            mainEntityOfPage: `https://${config.domain}/teardowns/${c.slug}`,
          }).replace(/</g, "\u003c"),
        }}
      />
      <TeardownAutopsyContent c={c} />
    </>
  );
}
