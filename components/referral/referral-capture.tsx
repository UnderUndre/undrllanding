"use client";

import { useEffect } from "react";
import { captureRef } from "@/lib/referral";

// Spec 007 FR-002: client boundary mounted once in the default layout —
// captures ?ref= on any (default)-route page load. Browser-only, no
// useSearchParams (preserves ○ Static prerender across all routes).
export default function ReferralCapture() {
  useEffect(() => {
    captureRef();
  }, []);
  return null;
}
