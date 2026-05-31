"use client";

import { Clipboard, Sparkles } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { generateReviewResponse, type ReviewTone } from "@/lib/generators";

const inputClass =
  "min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

export function ReviewResponseTool() {
  const [customerName, setCustomerName] = useState("Taylor");
  const [rating, setRating] = useState("5");
  const [service, setService] = useState("1:1 Strength Coaching");
  const [tone, setTone] = useState<ReviewTone>("warm");
  const [review, setReview] = useState(
    "The coaching felt personal, focused, and easy to stick with.",
  );
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function buildResponse() {
    setCopied(false);
    setOutput(
      generateReviewResponse({
        customerName,
        rating,
        review,
        service,
        tone,
        businessName: siteConfig.businessName,
      }),
    );
  }

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft">
        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Customer name
              <input className={inputClass} value={customerName} onChange={(event) => setCustomerName(event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Rating
              <select className={inputClass} value={rating} onChange={(event) => setRating(event.target.value)}>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Service
            <input className={inputClass} value={service} onChange={(event) => setService(event.target.value)} />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Tone
            <select className={inputClass} value={tone} onChange={(event) => setTone(event.target.value as ReviewTone)}>
              <option value="warm">Warm</option>
              <option value="professional">Professional</option>
              <option value="celebratory">Celebratory</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Review text
            <textarea
              className="min-h-36 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-sm text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
              value={review}
              onChange={(event) => setReview(event.target.value)}
            />
          </label>

          <button
            type="button"
            onClick={buildResponse}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
          >
            <Sparkles aria-hidden="true" className="size-4" />
            Generate response
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-ink p-5 text-white shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-100">
            Draft
          </p>
          <button
            type="button"
            onClick={copyOutput}
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <Clipboard aria-hidden="true" className="size-4" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        <p className="mt-6 whitespace-pre-wrap text-base leading-8 text-zinc-100">
          {output || "Generated review responses will appear here."}
        </p>
      </div>
    </div>
  );
}
