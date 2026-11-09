import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveProjectConfig } from "@/lib/project-config";
import ReferralContent from "./referral-content";

// Spec 007 FR-001: self-serve referral link minting. Brand isolation (review F3):
// the program is an UnderUndre bureau program — other brands render 404.

export const metadata: Metadata = {
  title: "Refer & Save",
  alternates: { canonical: "/referral" },
};

export default function ReferralPage() {
  const config = getActiveProjectConfig();
  if (config.slug !== "underundre") {
    notFound();
  }
  return <ReferralContent />;
}
