import type { FollowUpChannel, FollowUpTone } from "@/lib/generators";

export const followUpLeadNameMaxCharacters = 80;
export const followUpGoalMaxCharacters = 600;
export const followUpServiceMaxCharacters = 120;
export const followUpMessageMaxCharacters = 1200;

export const followUpToneValues = [
  "friendly",
  "professional",
  "motivational",
  "premium",
  "short-direct",
] as const satisfies FollowUpTone[];

export const followUpChannelValues = [
  "email",
  "sms",
  "instagram-dm",
] as const satisfies FollowUpChannel[];

export const followUpTimelineValues = [
  "ASAP",
  "This week",
  "This month",
  "Just researching",
] as const;

export type FollowUpTimeline = (typeof followUpTimelineValues)[number];

export type LeadFollowUpFieldErrors = Partial<
  Record<
    | "leadName"
    | "goal"
    | "preferredService"
    | "timeline"
    | "leadMessage"
    | "tone"
    | "channel",
    string
  >
>;

export type ValidatedLeadFollowUpInput = {
  leadName: string;
  goal: string;
  preferredService: string;
  timeline: FollowUpTimeline;
  leadMessage: string;
  tone: FollowUpTone;
  channel: FollowUpChannel;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(payload: Record<string, unknown>, key: string) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function isFollowUpTone(value: string): value is FollowUpTone {
  return followUpToneValues.includes(value as FollowUpTone);
}

function isFollowUpChannel(value: string): value is FollowUpChannel {
  return followUpChannelValues.includes(value as FollowUpChannel);
}

function isFollowUpTimeline(value: string): value is FollowUpTimeline {
  return followUpTimelineValues.includes(value as FollowUpTimeline);
}

export function validateLeadFollowUpPayload(payload: unknown):
  | { ok: true; data: ValidatedLeadFollowUpInput }
  | { ok: false; fieldErrors: LeadFollowUpFieldErrors } {
  if (!isRecord(payload)) {
    return {
      ok: false,
      fieldErrors: {
        leadMessage: "Submit the lead details before generating a follow-up.",
      },
    };
  }

  const leadName = getString(payload, "leadName");
  const goal = getString(payload, "goal");
  const preferredService = getString(payload, "preferredService");
  const timeline = getString(payload, "timeline");
  const leadMessage = getString(payload, "leadMessage");
  const tone = getString(payload, "tone");
  const channel = getString(payload, "channel");
  const fieldErrors: LeadFollowUpFieldErrors = {};

  if (leadName.length > followUpLeadNameMaxCharacters) {
    fieldErrors.leadName = `Lead name must be ${followUpLeadNameMaxCharacters} characters or fewer.`;
  }

  if (preferredService.length < 2) {
    fieldErrors.preferredService = "Add the preferred service.";
  } else if (preferredService.length > followUpServiceMaxCharacters) {
    fieldErrors.preferredService = `Preferred service must be ${followUpServiceMaxCharacters} characters or fewer.`;
  }

  if (!goal && !leadMessage) {
    fieldErrors.goal =
      "Add the lead goal or their message so the draft has useful context.";
  } else if (goal.length > followUpGoalMaxCharacters) {
    fieldErrors.goal = `Lead goal must be ${followUpGoalMaxCharacters} characters or fewer.`;
  }

  if (leadMessage.length > followUpMessageMaxCharacters) {
    fieldErrors.leadMessage = `Lead message must be ${followUpMessageMaxCharacters} characters or fewer.`;
  }

  if (!isFollowUpTimeline(timeline)) {
    fieldErrors.timeline = "Choose a supported timeline.";
  }

  if (!isFollowUpTone(tone)) {
    fieldErrors.tone = "Choose a supported tone.";
  }

  if (!isFollowUpChannel(channel)) {
    fieldErrors.channel = "Choose a supported channel.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    data: {
      leadName,
      goal,
      preferredService,
      timeline: timeline as FollowUpTimeline,
      leadMessage,
      tone: tone as FollowUpTone,
      channel: channel as FollowUpChannel,
    },
  };
}
