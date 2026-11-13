"use client";

import { useEffect } from "react";
import { captureRef } from "@/lib/referral";
import { capturePersona } from "@/lib/persona";

// Spec 007 FR-002: client boundary mounted once in the default layout —
// captures ?ref= on any (default)-route page load. Browser-only, no
// useSearchParams (preserves ○ Static prerender across all routes).
export default function ReferralCapture() {
  useEffect(() => {
    captureRef();
    capturePersona(); // spec 009 FR-006: same URL-param capture contour
  }, []);
  return null;
}
