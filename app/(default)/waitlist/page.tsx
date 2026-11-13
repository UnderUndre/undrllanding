import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveProjectConfig } from "@/lib/project-config";
import WaitlistContent from "./waitlist-content";

// Spec 009 FR-007: book waitlist — undreading brand ONLY (mirror isolation of
// 007/008 bureau gating). Demand capture during the Prix Pascal silence window.

export const metadata: Metadata = {
  title: "Waitlist — «Сантехника бытия»",
  alternates: { canonical: "/waitlist" },
};

export default function WaitlistPage() {
  const config = getActiveProjectConfig();
  if (config.slug !== "undreading") {
    notFound();
  }
  return <WaitlistContent />;
}
