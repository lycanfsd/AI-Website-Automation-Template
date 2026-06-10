"use client";

import {
  Clipboard,
  FilePenLine,
  RefreshCw,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import type { ReviewBusinessType, ReviewTone } from "@/lib/generators";
import {
  businessNameMaxCharacters,
  reviewMaxCharacters,
  reviewMinCharacters,
  validateReviewResponsePayload,
  type ReviewResponseFieldErrors,
  type ValidatedReviewResponseInput,
} from "@/lib/review-response-validation";
import { cx } from "@/lib/utils";

const inputClass =
  "min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

const textareaClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

const toneOptions: { label: string; value: ReviewTone }[] = [
  { label: "Warm", value: "warm" },
  { label: "Professional", value: "professional" },
  { label: "Apologetic", value: "apologetic" },
  { label: "Enthusiastic", value: "enthusiastic" },
  { label: "Luxury/premium", value: "luxury-premium" },
  { label: "Short and simple", value: "short-simple" },
];

const businessTypeOptions: { label: string; value: ReviewBusinessType }[] = [
  { label: "Personal trainer", value: "personal-trainer" },
  { label: "Gym", value: "gym" },
  { label: "Med spa", value: "med-spa" },
  { label: "Chiropractor", value: "chiropractor" },
  { label: "Physical therapy", value: "physical-therapy" },
  { label: "Yoga/Pilates", value: "yoga-pilates" },
  { label: "Nutrition coach", value: "nutrition-coach" },
  { label: "Other", value: "other" },
];

function getFirstFieldError(fieldErrors: ReviewResponseFieldErrors | undefined) {
  if (!fieldErrors) {
    return "";
  }

  return (
    fieldErrors.review ||
    fieldErrors.rating ||
    fieldErrors.tone ||
    fieldErrors.businessType ||
    fieldErrors.businessName ||
    ""
  );
}

export function ReviewResponseTool() {
  const [review, setReview] = useState(
    "Amazing coaching experience. The sessions felt personal, focused, and easy to stay consistent with.",
  );
  const [rating, setRating] =
    useState<ValidatedReviewResponseInput["rating"]>("5");
  const [tone, setTone] = useState<ReviewTone>("warm");
  const [businessType, setBusinessType] =
    useState<ReviewBusinessType>("personal-trainer");
  const [businessName, setBusinessName] = useState(siteConfig.businessName);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function buildResponse() {
    setCopied(false);
    setError("");
    const payload = {
      review,
      rating,
      tone,
      businessType,
      businessName,
    };
    const validation = validateReviewResponsePayload(payload);

    if (!validation.ok) {
      setError(
        getFirstFieldError(validation.fieldErrors) ||
          "Please fix the form and try again.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/review-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        draft?: string;
        error?: string;
        fieldErrors?: ReviewResponseFieldErrors;
      };

      if (!response.ok) {
        setError(
          getFirstFieldError(result.fieldErrors) ||
            result.error ||
            "Unable to generate a response right now. Please try again.",
        );
        return;
      }

      if (!result.draft?.trim()) {
        setError("The AI returned an empty draft. Try adding more review detail.");
        return;
      }

      setOutput(result.draft.trim());
    } catch {
      setError("Unable to generate a response right now. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyOutput() {
    if (!output.trim()) {
      setError("Generate a draft before copying.");
      return;
    }

    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setError("");
    } catch {
      setError("Copy failed. Select the draft text and copy it manually.");
    }
  }

  const isNegativeReview = Number(rating) <= 3;

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-2 border-b border-zinc-200 pb-5">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            <Sparkles aria-hidden="true" className="size-4" />
            AI draft mode
          </div>
          <p className="text-sm leading-6 text-zinc-600">
            Paste a customer review and generate a polished response draft for
            the owner to edit and post manually.
          </p>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-ink">
            Customer review text
            <textarea
              className={cx(textareaClass, "min-h-40")}
              value={review}
              onChange={(event) => setReview(event.target.value)}
              placeholder="Paste the full customer review here."
              maxLength={reviewMaxCharacters}
            />
            <span className="text-xs font-normal text-zinc-500">
              {review.trim().length}/{reviewMaxCharacters} characters. Minimum{" "}
              {reviewMinCharacters}.
            </span>
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Star rating
              <select
                className={inputClass}
                value={rating}
                onChange={(event) =>
                  setRating(
                    event.target.value as ValidatedReviewResponseInput["rating"],
                  )
                }
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-ink">
              Tone
              <select
                className={inputClass}
                value={tone}
                onChange={(event) => setTone(event.target.value as ReviewTone)}
              >
                {toneOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Business type
              <select
                className={inputClass}
                value={businessType}
                onChange={(event) =>
                  setBusinessType(event.target.value as ReviewBusinessType)
                }
              >
                {businessTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-ink">
              Optional business name
              <input
                className={inputClass}
                value={businessName}
                onChange={(event) => setBusinessName(event.target.value)}
                placeholder={siteConfig.businessName}
                maxLength={businessNameMaxCharacters}
              />
              <span className="text-xs font-normal text-zinc-500">
                {businessName.trim().length}/{businessNameMaxCharacters}
              </span>
            </label>
          </div>

          {isNegativeReview ? (
            <div className="rounded-lg border border-copper-100 bg-copper-100/50 px-4 py-3 text-sm leading-6 text-copper-700">
              Negative-review mode is active. Drafts stay empathetic, avoid
              admitting legal fault, and invite the reviewer to continue the
              conversation offline.
            </div>
          ) : null}

          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={buildResponse}
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Sparkles aria-hidden="true" className="size-4" />
            {loading ? "Generating..." : "Generate with AI"}
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-ink p-5 text-white shadow-soft sm:p-6">
        <div className="flex flex-col gap-4 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-100">
              <FilePenLine aria-hidden="true" className="size-4" />
              Editable draft
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">
              Review, adjust, then copy for manual posting.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={copyOutput}
              disabled={!output.trim()}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Clipboard aria-hidden="true" className="size-4" />
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              type="button"
              onClick={buildResponse}
              disabled={loading || !review.trim()}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/20 px-4 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw aria-hidden="true" className="size-4" />
              Regenerate
            </button>
          </div>
        </div>

        <label className="mt-5 grid gap-2 text-sm font-medium text-white">
          Output area
          <span className="text-xs font-normal text-brand-100">
            AI-generated draft. Review and edit before posting.
          </span>
          <textarea
            className="min-h-72 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-zinc-400 focus:border-brand-200 focus:ring-4 focus:ring-white/10"
            value={output}
            onChange={(event) => {
              setOutput(event.target.value);
              setCopied(false);
            }}
            placeholder="Generated review responses will appear here and remain editable."
          />
        </label>

        <div className="mt-5 rounded-lg border border-white/20 bg-white/10 px-4 py-3">
          <p className="flex items-start gap-2 text-sm leading-6 text-zinc-200">
            <ShieldAlert
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-brand-100"
            />
            This tool only drafts responses. It does not automatically post to
            Google, Yelp, Instagram, or any third-party platform. Always review
            the message for accuracy, privacy, and tone before posting manually.
          </p>
        </div>
      </div>
    </div>
  );
}
