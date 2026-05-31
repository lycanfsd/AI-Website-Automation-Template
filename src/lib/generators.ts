export type ReviewTone = "warm" | "professional" | "celebratory";
export type FollowUpChannel = "sms" | "email";
export type FollowUpStage = "new" | "missed" | "post-consult" | "inactive";

export function generateReviewResponse({
  customerName,
  rating,
  review,
  service,
  tone,
  businessName,
}: {
  customerName: string;
  rating: string;
  review: string;
  service: string;
  tone: ReviewTone;
  businessName: string;
}) {
  const name = customerName.trim() || "there";
  const serviceLine = service.trim()
    ? ` We are glad the ${service.trim()} experience supported your goals.`
    : "";
  const reviewLine = review.trim()
    ? ` We really appreciate you sharing this feedback: "${review.trim()}"`
    : "";

  if (Number(rating) <= 3) {
    return `Hi ${name}, thank you for taking the time to share this with ${businessName}.${reviewLine} We are sorry the experience did not fully meet expectations. Our team would like to understand what happened and make it right. Please reach out directly so we can review this with care.`;
  }

  if (tone === "celebratory") {
    return `Hi ${name}, this made our day. Thank you for trusting ${businessName} and for sharing such a thoughtful review.${serviceLine} We are cheering you on and look forward to seeing your continued progress.`;
  }

  if (tone === "professional") {
    return `Hi ${name}, thank you for your kind review of ${businessName}.${serviceLine} We appreciate the opportunity to support your wellness goals and look forward to welcoming you back soon.`;
  }

  return `Hi ${name}, thank you so much for the kind words. We are grateful you chose ${businessName}.${serviceLine} It means a lot to know the experience was helpful, and we look forward to supporting your next step.`;
}

export function generateFollowUp({
  leadName,
  service,
  goal,
  stage,
  channel,
  businessName,
  bookingUrl,
}: {
  leadName: string;
  service: string;
  goal: string;
  stage: FollowUpStage;
  channel: FollowUpChannel;
  businessName: string;
  bookingUrl: string;
}) {
  const name = leadName.trim() || "there";
  const serviceText = service.trim() || "coaching";
  const goalText = goal.trim()
    ? ` You mentioned wanting help with ${goal.trim().toLowerCase()}, and that is exactly the kind of plan we can personalize.`
    : "";
  const linkText = bookingUrl
    ? ` You can grab a consult time here: ${bookingUrl}`
    : " Reply with a good day and time, and we will help you get scheduled.";

  const openings: Record<FollowUpStage, string> = {
    new: `Hi ${name}, thanks for reaching out to ${businessName} about ${serviceText}.`,
    missed: `Hi ${name}, sorry we missed you earlier. This is ${businessName} following up on your interest in ${serviceText}.`,
    "post-consult": `Hi ${name}, thanks again for connecting with ${businessName} today about ${serviceText}.`,
    inactive: `Hi ${name}, checking in from ${businessName}. You had asked us about ${serviceText}, and we wanted to make sure you got a clear next step.`,
  };

  const closing =
    stage === "post-consult"
      ? "If you are ready, we can map out your first week and reserve your spot."
      : "A quick consult is the easiest way to see whether the fit is right.";

  const message = `${openings[stage]}${goalText} ${closing}${linkText}`;

  if (channel === "email") {
    return `Subject: Your next step with ${businessName}\n\n${message}\n\nBest,\n${businessName}`;
  }

  return message;
}
