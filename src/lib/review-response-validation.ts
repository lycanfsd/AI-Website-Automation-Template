import type { ReviewBusinessType, ReviewTone } from "@/lib/generators";

export const reviewMinCharacters = 12;
export const reviewMaxCharacters = 1500;
export const businessNameMaxCharacters = 80;

export const reviewToneValues = [
  "warm",
  "professional",
  "apologetic",
  "enthusiastic",
  "luxury-premium",
  "short-simple",
] as const satisfies ReviewTone[];

export const reviewBusinessTypeValues = [
  "personal-trainer",
  "gym",
  "med-spa",
  "chiropractor",
  "physical-therapy",
  "yoga-pilates",
  "nutrition-coach",
  "other",
] as const satisfies ReviewBusinessType[];

export type ReviewResponseFieldErrors = Partial<
  Record<"review" | "rating" | "tone" | "businessType" | "businessName", string>
>;

export type ValidatedReviewResponseInput = {
  review: string;
  rating: "1" | "2" | "3" | "4" | "5";
  tone: ReviewTone;
  businessType: ReviewBusinessType;
  businessName: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getString(payload: Record<string, unknown>, key: string) {
  const value = payload[key];
  return typeof value === "string" ? value.trim() : "";
}

function isRating(value: string): value is ValidatedReviewResponseInput["rating"] {
  return ["1", "2", "3", "4", "5"].includes(value);
}

function isReviewTone(value: string): value is ReviewTone {
  return reviewToneValues.includes(value as ReviewTone);
}

function isReviewBusinessType(value: string): value is ReviewBusinessType {
  return reviewBusinessTypeValues.includes(value as ReviewBusinessType);
}

export function validateReviewResponsePayload(payload: unknown):
  | { ok: true; data: ValidatedReviewResponseInput }
  | { ok: false; fieldErrors: ReviewResponseFieldErrors } {
  if (!isRecord(payload)) {
    return {
      ok: false,
      fieldErrors: {
        review: "Submit the review details before generating a response.",
      },
    };
  }

  const review = getString(payload, "review");
  const rating = getString(payload, "rating");
  const tone = getString(payload, "tone");
  const businessType = getString(payload, "businessType");
  const businessName = getString(payload, "businessName");
  const fieldErrors: ReviewResponseFieldErrors = {};

  if (review.length < reviewMinCharacters) {
    fieldErrors.review = `Review text must be at least ${reviewMinCharacters} characters.`;
  } else if (review.length > reviewMaxCharacters) {
    fieldErrors.review = `Review text must be ${reviewMaxCharacters} characters or fewer.`;
  }

  if (!isRating(rating)) {
    fieldErrors.rating = "Choose a star rating from 1 to 5.";
  }

  if (!isReviewTone(tone)) {
    fieldErrors.tone = "Choose a supported response tone.";
  }

  if (!isReviewBusinessType(businessType)) {
    fieldErrors.businessType = "Choose a supported business type.";
  }

  if (businessName.length > businessNameMaxCharacters) {
    fieldErrors.businessName = `Business name must be ${businessNameMaxCharacters} characters or fewer.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, fieldErrors };
  }

  return {
    ok: true,
    data: {
      review,
      rating: rating as ValidatedReviewResponseInput["rating"],
      tone: tone as ReviewTone,
      businessType: businessType as ReviewBusinessType,
      businessName,
    },
  };
}
