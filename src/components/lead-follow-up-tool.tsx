"use client";

import {
  Clipboard,
  FilePenLine,
  RefreshCw,
  ShieldAlert,
  WandSparkles,
} from "lucide-react";
import { useState } from "react";
import type { FollowUpChannel, FollowUpTone } from "@/lib/generators";
import {
  followUpGoalMaxCharacters,
  followUpLeadNameMaxCharacters,
  followUpMessageMaxCharacters,
  followUpServiceMaxCharacters,
  followUpTimelineValues,
  validateLeadFollowUpPayload,
  type LeadFollowUpFieldErrors,
} from "@/lib/lead-follow-up-validation";
import { cx } from "@/lib/utils";

const inputClass =
  "min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

const textareaClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-sm leading-6 text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

const toneOptions: { label: string; value: FollowUpTone }[] = [
  { label: "Friendly", value: "friendly" },
  { label: "Professional", value: "professional" },
  { label: "Motivational", value: "motivational" },
  { label: "Premium", value: "premium" },
  { label: "Short and direct", value: "short-direct" },
];

const channelOptions: { label: string; value: FollowUpChannel }[] = [
  { label: "Email", value: "email" },
  { label: "SMS", value: "sms" },
  { label: "Instagram DM", value: "instagram-dm" },
];

function getFirstFieldError(fieldErrors: LeadFollowUpFieldErrors | undefined) {
  if (!fieldErrors) {
    return "";
  }

  return (
    fieldErrors.leadName ||
    fieldErrors.goal ||
    fieldErrors.preferredService ||
    fieldErrors.timeline ||
    fieldErrors.leadMessage ||
    fieldErrors.tone ||
    fieldErrors.channel ||
    ""
  );
}

export function LeadFollowUpTool() {
  const [leadName, setLeadName] = useState("Jordan");
  const [goal, setGoal] = useState(
    "Build strength and stay consistent without aggravating old shoulder pain.",
  );
  const [preferredService, setPreferredService] = useState(
    "1-on-1 Personal Training",
  );
  const [timeline, setTimeline] = useState("This week");
  const [leadMessage, setLeadMessage] = useState(
    "I have tried a few programs before but struggle to stay on track after work.",
  );
  const [tone, setTone] = useState<FollowUpTone>("friendly");
  const [channel, setChannel] = useState<FollowUpChannel>("email");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function buildMessage() {
    setCopied(false);
    setError("");
    const payload = {
      leadName,
      goal,
      preferredService,
      timeline,
      leadMessage,
      tone,
      channel,
    };
    const validation = validateLeadFollowUpPayload(payload);

    if (!validation.ok) {
      setError(
        getFirstFieldError(validation.fieldErrors) ||
          "Please fix the form and try again.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/lead-follow-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as {
        draft?: string;
        error?: string;
        fieldErrors?: LeadFollowUpFieldErrors;
      };

      if (!response.ok) {
        setError(
          getFirstFieldError(result.fieldErrors) ||
            result.error ||
            "Unable to generate a follow-up right now. Please try again.",
        );
        return;
      }

      if (!result.draft?.trim()) {
        setError("The AI returned an empty draft. Try adding more lead detail.");
        return;
      }

      setOutput(result.draft.trim());
    } catch {
      setError("Unable to generate a follow-up right now. Please try again.");
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

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft sm:p-6">
        <div className="flex flex-col gap-2 border-b border-zinc-200 pb-5">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            <WandSparkles aria-hidden="true" className="size-4" />
            AI draft mode
          </div>
          <p className="text-sm leading-6 text-zinc-600">
            Build a professional reply from the lead&apos;s inquiry, then edit it
            before sending through your usual email, SMS, or social inbox.
          </p>
        </div>

        <div className="mt-5 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Lead name
              <input
                className={inputClass}
                value={leadName}
                onChange={(event) => setLeadName(event.target.value)}
                placeholder="Jordan"
                maxLength={followUpLeadNameMaxCharacters}
              />
              <span className="text-xs font-normal text-zinc-500">
                {leadName.trim().length}/{followUpLeadNameMaxCharacters}
              </span>
            </label>

            <label className="grid gap-2 text-sm font-medium text-ink">
              Preferred service
              <input
                className={inputClass}
                value={preferredService}
                onChange={(event) => setPreferredService(event.target.value)}
                placeholder="Personal Training"
                maxLength={followUpServiceMaxCharacters}
              />
              <span className="text-xs font-normal text-zinc-500">
                {preferredService.trim().length}/
                {followUpServiceMaxCharacters}
              </span>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Timeline
              <select
                className={inputClass}
                value={timeline}
                onChange={(event) => setTimeline(event.target.value)}
              >
                {followUpTimelineValues.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm font-medium text-ink">
              Channel
              <select
                className={inputClass}
                value={channel}
                onChange={(event) =>
                  setChannel(event.target.value as FollowUpChannel)
                }
              >
                {channelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Tone
            <select
              className={inputClass}
              value={tone}
              onChange={(event) => setTone(event.target.value as FollowUpTone)}
            >
              {toneOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Lead goal
            <textarea
              className={cx(textareaClass, "min-h-28")}
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              placeholder="What does the lead want help with?"
              maxLength={followUpGoalMaxCharacters}
            />
            <span className="text-xs font-normal text-zinc-500">
              {goal.trim().length}/{followUpGoalMaxCharacters}
            </span>
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Message from lead
            <textarea
              className={cx(textareaClass, "min-h-32")}
              value={leadMessage}
              onChange={(event) => setLeadMessage(event.target.value)}
              placeholder="Paste the lead's inquiry or notes here."
              maxLength={followUpMessageMaxCharacters}
            />
            <span className="text-xs font-normal text-zinc-500">
              {leadMessage.trim().length}/{followUpMessageMaxCharacters}
            </span>
          </label>

          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="button"
            onClick={buildMessage}
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <WandSparkles aria-hidden="true" className="size-4" />
            {loading ? "Generating..." : "Generate follow-up"}
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
              Refine the message, then copy it into the owner&apos;s preferred
              channel.
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
              onClick={buildMessage}
              disabled={loading || (!goal.trim() && !leadMessage.trim())}
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
            AI-generated draft. Review and edit before sending.
          </span>
          <textarea
            className="min-h-72 w-full rounded-lg border border-white/20 bg-white/10 px-4 py-4 text-sm leading-7 text-white outline-none transition placeholder:text-zinc-400 focus:border-brand-200 focus:ring-4 focus:ring-white/10"
            value={output}
            onChange={(event) => {
              setOutput(event.target.value);
              setCopied(false);
            }}
            placeholder="Generated follow-up messages will appear here and remain editable."
          />
        </label>

        <div className="mt-5 rounded-lg border border-white/20 bg-white/10 px-4 py-3">
          <p className="flex items-start gap-2 text-sm leading-6 text-zinc-200">
            <ShieldAlert
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-brand-100"
            />
            Review and edit before sending. This draft should not promise
            specific health outcomes, weight loss, pain relief, or guaranteed
            results. Drafts are not medical advice, legal advice, or a
            substitute for the business owner&apos;s judgment.
          </p>
        </div>
      </div>
    </div>
  );
}
