export const preferredServiceOptions = [
  "Personal Training",
  "Online Coaching",
  "Nutrition Coaching",
  "Transformation Program",
  "General Consultation",
  "Other",
] as const;

export const timelineOptions = [
  "ASAP",
  "This week",
  "This month",
  "Just researching",
] as const;

export type PreferredService = (typeof preferredServiceOptions)[number];
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
  }

  if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (phone.replace(/\D/g, "").length < 10) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!isPreferredService(preferredService)) {
    errors.preferredService = "Choose a preferred service.";
  }

  if (primaryGoal.length < 8) {
    errors.primaryGoal = "Tell us a little more about your primary goal.";
  }

  if (!isTimelineToStart(timelineToStart)) {
    errors.timelineToStart = "Choose a timeline.";
  }

  if (message.length > 1000) {
    errors.message = "Keep your message under 1,000 characters.";
  }

  if (sourcePage.length > 100) {
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
