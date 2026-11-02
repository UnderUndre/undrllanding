"use client";

import React, { useEffect, useRef, useState } from "react";
import { GenericLeadSubmissionSchema } from "@/lib/schemas/content-schema";

// Generic lead form for scaffolded brands (spec 003 FR-005 consumer contract):
// posts {email, contact, message, metadata} to /api/lead.
export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  // Spec 005 FR-017: no setState after unmount — abort the in-flight fetch.
  const abortRef = useRef<AbortController | null>(null);
  useEffect(() => () => abortRef.current?.abort(), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      email: (formData.get("email") as string) || "",
      contact: (formData.get("contact") as string) || "",
      message: (formData.get("message") as string) || "",
      metadata: {
        source: "generic-brand-form",
        website: ((formData.get("website") as string) || "").trim(),
      },
    };

    const parsed = GenericLeadSubmissionSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus("error");
      setErrorMessage("Please check the form fields and try again.");
      return;
    }

    try {
      abortRef.current?.abort();
      abortRef.current = new AbortController();
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: abortRef.current.signal,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Submission failed. Please reach out directly.");
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setStatus("error");
      setErrorMessage("Network error. Please reach out directly.");
    }
  };

  if (status === "success") {
    return (
      <div className="p-6 bg-slate-900/60 border border-brand-accent/40 rounded-2xl text-sm text-brand-accent">
        Brief received — we will get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-brand-surface-subtle rounded-2xl border border-brand-border text-left space-y-4">
      {status === "error" && (
        <div className="p-3 bg-red-950/50 border border-red-800/50 rounded-lg text-xs text-red-300">
          {errorMessage}
        </div>
      )}
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1" htmlFor="lead-email">
          Email *
        </label>
        <input
          id="lead-email"
          type="email"
          name="email"
          required
          placeholder="name@company.com"
          className="w-full px-4 py-3 bg-slate-900 border border-brand-border rounded-lg text-sm text-white focus:outline-none focus:border-brand-primary"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1" htmlFor="lead-contact">
          Messenger / phone (optional)
        </label>
        <input
          id="lead-contact"
          type="text"
          name="contact"
          placeholder="@handle or phone"
          className="w-full px-4 py-3 bg-slate-900 border border-brand-border rounded-lg text-sm text-white focus:outline-none focus:border-brand-primary"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1" htmlFor="lead-website">
          Website (optional)
        </label>
        <input
          id="lead-website"
          type="url"
          name="website"
          placeholder="https://yourcompany.com"
          className="w-full px-4 py-3 bg-slate-900 border border-brand-border rounded-lg text-sm text-white focus:outline-none focus:border-brand-primary"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-300 mb-1" htmlFor="lead-message">
          Brief *
        </label>
        <textarea
          id="lead-message"
          name="message"
          required
          rows={3}
          placeholder="Tell us what you need..."
          className="w-full px-4 py-3 bg-slate-900 border border-brand-border rounded-lg text-sm text-white focus:outline-none focus:border-brand-primary"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-3.5 bg-brand-primary hover:bg-brand-primary-hover disabled:opacity-50 text-white font-bold rounded-lg transition-all text-sm cursor-pointer"
      >
        {status === "loading" ? "Sending..." : "Send brief →"}
      </button>
    </form>
  );
}
