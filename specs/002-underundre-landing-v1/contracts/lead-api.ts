import { z } from "zod";

/**
 * Lead capture contract for UnderUndre landing page (/api/lead).
 * Validated strictly at runtime to reject spam and ensure actionable forensic briefs.
 */
export const LeadSubmissionSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name exceeds maximum length"),
  email: z
    .string()
    .email("Invalid email format")
    .max(255, "Email exceeds maximum length"),
  company: z
    .string()
    .max(100, "Company name exceeds maximum length")
    .optional()
    .default(""),
  estimatedMonthlySaaSCost: z
    .string()
    .max(50, "Cost string exceeds maximum length")
    .optional()
    .default(""),
  productInterest: z
    .enum(["tco-audit", "foss-office", "custom-sprint", "other"])
    .default("tco-audit"),
  details: z
    .string()
    .max(2000, "Project brief exceeds maximum length (2000 chars)")
    .optional()
    .default(""),
});

export type LeadSubmissionRequest = z.infer<typeof LeadSubmissionSchema>;

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  fallback?: "upwork" | "none";
  upworkUrl?: string;
  error?: string;
}
