import { clientConfig } from "@/config/client";

export const preferredServiceOptions = [
  ...clientConfig.services.map((service) => service.title),
  "General Consultation",
  "Other",
] as string[];

export const timelineOptions = [
  "ASAP",
  "This week",
  "This month",
  "Just researching",
] as const;

export const fullNameMaxCharacters = 120;
export const emailMaxCharacters = 254;
export const phoneMaxCharacters = 40;
export const preferredServiceMaxCharacters = 120;
export const primaryGoalMaxCharacters = 800;
export const leadMessageMaxCharacters = 1000;
export const sourcePageMaxCharacters = 100;

export type PreferredService = string;
export type TimelineToStart = (typeof timelineOptions)[number];

export type LeadFormData = {
  fullName: string;
  email: string;
  phone: string;
  preferredService: PreferredService | "";
  primaryGoal: string;
  timelineToStart: TimelineToStart | "";
  message: string;
  sourcePage: string;
  consent: boolean;
  website: string;
};

export type ValidLeadSubmission = Omit<
  LeadFormData,
  "preferredService" | "timelineToStart"
> & {
  preferredService: PreferredService;
  timelineToStart: TimelineToStart;
};

export type LeadValidationErrors = Partial<
  Record<keyof LeadFormData | "form", string>
>;

type ValidationResult =
  | {
      ok: true;
      data: ValidLeadSubmission;
      isSpam: boolean;
    }
  | {
      ok: false;
      errors: LeadValidationErrors;
    };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sourcePagePattern = /^[a-zA-Z0-9/_#.-]+$/;

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isPreferredService(value: string): value is PreferredService {
  return preferredServiceOptions.includes(value as PreferredService);
}

function isTimelineToStart(value: string): value is TimelineToStart {
  return timelineOptions.includes(value as TimelineToStart);
}

function toRecord(input: unknown): Record<string, unknown> {
  return input && typeof input === "object" ? (input as Record<string, unknown>) : {};
}

export function validateLeadSubmission(input: unknown): ValidationResult {
  const values = toRecord(input);
  const fullName = readString(values.fullName);
  const email = readString(values.email).toLowerCase();
  const phone = readString(values.phone);
  const preferredService = readString(values.preferredService);
  const primaryGoal = readString(values.primaryGoal);
  const timelineToStart = readString(values.timelineToStart);
  const message = readString(values.message);
  const sourcePage = readString(values.sourcePage) || "contact";
  const website = readString(values.website);
  const consent = values.consent === true;
  const errors: LeadValidationErrors = {};

  if (fullName.length < 2) {
    errors.fullName = "Enter your full name.";
  } else if (fullName.length > fullNameMaxCharacters) {
    errors.fullName = `Full name must be ${fullNameMaxCharacters} characters or fewer.`;
  }

  if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  } else if (email.length > emailMaxCharacters) {
    errors.email = `Email must be ${emailMaxCharacters} characters or fewer.`;
  }

  if (phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Enter a valid phone number.";
  } else if (phone.length > phoneMaxCharacters) {
    errors.phone = `Phone must be ${phoneMaxCharacters} characters or fewer.`;
  }

  if (!isPreferredService(preferredService)) {
    errors.preferredService = "Choose a preferred service.";
  } else if (preferredService.length > preferredServiceMaxCharacters) {
    errors.preferredService = `Preferred service must be ${preferredServiceMaxCharacters} characters or fewer.`;
  }

  if (primaryGoal.length < 8) {
    errors.primaryGoal = "Tell us a little more about your primary goal.";
  } else if (primaryGoal.length > primaryGoalMaxCharacters) {
    errors.primaryGoal = `Primary goal must be ${primaryGoalMaxCharacters} characters or fewer.`;
  }

  if (!isTimelineToStart(timelineToStart)) {
    errors.timelineToStart = "Choose a timeline.";
  }

  if (message.length > leadMessageMaxCharacters) {
    errors.message = `Keep your message under ${leadMessageMaxCharacters.toLocaleString()} characters.`;
  }

  if (
    sourcePage.length > sourcePageMaxCharacters ||
    !sourcePagePattern.test(sourcePage)
  ) {
    errors.sourcePage = "Invalid source page.";
  }

  if (!consent) {
    errors.consent = "Please agree to be contacted about your inquiry.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    isSpam: website.length > 0,
    data: {
      fullName,
      email,
      phone,
      preferredService: preferredService as PreferredService,
      primaryGoal,
      timelineToStart: timelineToStart as TimelineToStart,
      message,
      sourcePage,
      consent,
      website,
    },
  };
}
