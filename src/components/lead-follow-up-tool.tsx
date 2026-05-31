"use client";

import { Clipboard, WandSparkles } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import {
  generateFollowUp,
  type FollowUpChannel,
  type FollowUpStage,
} from "@/lib/generators";

const inputClass =
  "min-h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

export function LeadFollowUpTool() {
  const [leadName, setLeadName] = useState("Jordan");
  const [service, setService] = useState("1:1 Strength Coaching");
  const [goal, setGoal] = useState("building strength without aggravating old shoulder pain");
  const [stage, setStage] = useState<FollowUpStage>("new");
  const [channel, setChannel] = useState<FollowUpChannel>("sms");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function buildMessage() {
    setCopied(false);
    setOutput(
      generateFollowUp({
        leadName,
        service,
        goal,
        stage,
        channel,
        businessName: siteConfig.businessName,
        bookingUrl: siteConfig.bookingUrl,
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
              Lead name
              <input className={inputClass} value={leadName} onChange={(event) => setLeadName(event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Channel
              <select className={inputClass} value={channel} onChange={(event) => setChannel(event.target.value as FollowUpChannel)}>
                <option value="sms">SMS</option>
                <option value="email">Email</option>
              </select>
            </label>
          </div>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Service interest
            <input className={inputClass} value={service} onChange={(event) => setService(event.target.value)} />
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Follow-up stage
            <select className={inputClass} value={stage} onChange={(event) => setStage(event.target.value as FollowUpStage)}>
              <option value="new">New lead</option>
              <option value="missed">Missed call</option>
              <option value="post-consult">After consult</option>
              <option value="inactive">Inactive lead</option>
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-ink">
            Lead goal
            <textarea
              className="min-h-32 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-sm text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            />
          </label>

          <button
            type="button"
            onClick={buildMessage}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700"
          >
            <WandSparkles aria-hidden="true" className="size-4" />
            Generate follow-up
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-zinc-200 bg-ink p-5 text-white shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-100">
            Message
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
          {output || "Generated follow-up messages will appear here."}
        </p>
      </div>
    </div>
  );
}
