import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveProjectConfig } from "@/lib/project-config";
import CalculatorSection from "./calculator-section";

// Spec 008 FR-003: standalone /calculator route (brand-gated, review F3).
// Bureau program: brands without hasCalculator render 404.

export const metadata: Metadata = {
  title: "Operational Friction Calculator",
  alternates: { canonical: "/calculator" },
};

export default function CalculatorPage() {
  const config = getActiveProjectConfig();
  if (!config.hasCalculator || config.slug !== "underundre") {
    notFound();
  }
  return <CalculatorSection mode="standalone" />;
}
