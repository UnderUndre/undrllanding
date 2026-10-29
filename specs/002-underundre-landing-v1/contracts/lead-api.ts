import { z } from "zod";

/**
 * Lead capture contract for UnderUndre landing page v1 (/api/lead).
 * 4-field low-friction B2B intake:
 *   1) email (required — for Upwork Direct Contract escrow link & 90s Loom delivery)
 *   2) messenger (optional — Telegram / WhatsApp / LinkedIn handle for fast async delivery)
 *   3) bottleneckType (required — qualifies pain & maps to Product 0 / Sprint A / Sprint B)
 *   4) stackAndTeam (required — team size, current tools, and bottleneck summary)
 */
export const BottleneckTypeSchema = z.enum([
  "whatsapp-manual",
  "excel-chaos",
  "saas-tax-foss",
  "custom-sprint",
  "other",
]);

export const LeadSubmissionSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .max(255, "Email exceeds maximum length"),
  messenger: z
    .string()
    .trim()
    .max(150, "Contact handle exceeds maximum length")
    .optional()
    .default(""),
  bottleneckType: BottleneckTypeSchema.default("whatsapp-manual"),
  stackAndTeam: z
    .string()
    .trim()
    .min(3, "Please briefly describe your team size and current tools")
    .max(2000, "Brief exceeds maximum length (2000 chars)"),
});

export type BottleneckType = z.infer<typeof BottleneckTypeSchema>;
export type LeadSubmissionRequest = z.infer<typeof LeadSubmissionSchema>;

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  fallback?: "direct" | "none";
  error?: string;
}
