export type ReviewTone =
  | "warm"
  | "professional"
  | "apologetic"
  | "enthusiastic"
  | "luxury-premium"
  | "short-simple";
export type ReviewBusinessType =
  | "personal-trainer"
  | "gym"
  | "med-spa"
  | "chiropractor"
  | "physical-therapy"
  | "yoga-pilates"
  | "nutrition-coach"
  | "other";
export type FollowUpChannel = "email" | "sms" | "instagram-dm";
export type FollowUpTone =
  | "friendly"
  | "professional"
  | "motivational"
  | "premium"
  | "short-direct";

export function generateReviewResponse({
  rating,
  review,
  tone,
  businessType,
  businessName,
}: {
  rating: string;
  review: string;
  tone: ReviewTone;
  businessType: ReviewBusinessType;
  businessName: string;
}) {
  const name = businessName.trim() || "our team";
  const reviewText = review.trim();
  const reviewSnippet =
    reviewText.length > 90 ? `${reviewText.slice(0, 87).trim()}...` : reviewText;
  const detailLine = reviewSnippet
    ? ` Your note about "${reviewSnippet}" is helpful for our team.`
    : "";
  const numericRating = Number(rating);
  const isNegative = numericRating <= 3;
  const businessContext: Record<ReviewBusinessType, string> = {
    "personal-trainer": "coaching experience",
    gym: "training experience",
    "med-spa": "visit",
    chiropractor: "care experience",
    "physical-therapy": "therapy experience",
    "yoga-pilates": "studio experience",
    "nutrition-coach": "coaching experience",
    other: "experience",
  };
  const context = businessContext[businessType];

  if (isNegative) {
    const opening =
      tone === "short-simple"
        ? `Thank you for sharing this feedback with ${name}.`
        : `Thank you for taking the time to share your feedback with ${name}.`;
    const middle =
      tone === "luxury-premium"
        ? ` We hold ourselves to a high standard and want every ${context} to feel thoughtful, respectful, and well-supported.`
        : ` We are sorry to hear that your ${context} did not meet expectations.`;
    const closing =
      " We would appreciate the opportunity to learn more and discuss this directly. Please contact our team so we can better understand what happened and work toward a thoughtful next step.";

    return `${opening}${detailLine}${middle}${closing}`;
  }

  if (tone === "short-simple") {
    return `Thank you for the kind review. We appreciate you choosing ${name} and are glad your ${context} was a positive one.`;
  }

  if (tone === "professional") {
    return `Thank you for your thoughtful review of ${name}.${detailLine} We appreciate the opportunity to support your health and wellness goals, and we are glad to hear your ${context} was a positive experience.`;
  }

  if (tone === "apologetic") {
    return `Thank you for sharing this feedback with ${name}.${detailLine} We are grateful for your kind words and always want every detail of the ${context} to feel supportive, clear, and helpful. We look forward to welcoming you back.`;
  }

  if (tone === "enthusiastic") {
    return `This means so much to our team.${detailLine} Thank you for choosing ${name} and for sharing such encouraging feedback. We are thrilled to hear your ${context} felt valuable, and we cannot wait to keep cheering on your progress.`;
  }

  if (tone === "luxury-premium") {
    return `Thank you for your generous review of ${name}.${detailLine} We are grateful for the opportunity to provide a thoughtful, personalized ${context}, and we look forward to continuing to support your goals with the same level of care.`;
  }

  return `Thank you so much for the kind words about ${name}.${detailLine} We are grateful you chose us and are glad your ${context} felt supportive. Your feedback means a lot to our team.`;
}

export function generateFollowUp({
  leadName,
  preferredService,
  goal,
  timeline,
  leadMessage,
  tone,
  channel,
  businessName,
  bookingUrl,
}: {
  leadName: string;
  preferredService: string;
  goal: string;
  timeline: string;
  leadMessage: string;
  tone: FollowUpTone;
  channel: FollowUpChannel;
  businessName: string;
  bookingUrl: string;
}) {
  const name = leadName.trim() || "there";
  const serviceText = preferredService.trim() || "coaching";
  const goalText = goal.trim()
    ? ` You mentioned wanting help with ${goal.trim().toLowerCase()}.`
    : "";
  const timelineText = timeline.trim()
    ? ` Since your timeline is ${timeline.trim().toLowerCase()}, the best next step is a quick consult so we can understand what you need and see whether we are a good fit.`
    : " The best next step is a quick consult so we can understand what you need and see whether we are a good fit.";
  const messageText = leadMessage.trim()
    ? ` I also saw your note: "${leadMessage.trim()}"`
    : "";
  const linkText = bookingUrl
    ? ` You can book a time here: ${bookingUrl}`
    : " Reply with a good day and time, and we will help you get scheduled.";

  const toneOpenings: Record<FollowUpTone, string> = {
    friendly: `Hi ${name}, thanks for reaching out to ${businessName} about ${serviceText}.`,
    professional: `Hi ${name}, thank you for contacting ${businessName} about ${serviceText}.`,
    motivational: `Hi ${name}, thanks for reaching out to ${businessName}. It is a strong first step to ask about ${serviceText}.`,
    premium: `Hi ${name}, thank you for your interest in ${businessName}. We would be glad to learn more about what you are looking for with ${serviceText}.`,
    "short-direct": `Hi ${name}, thanks for reaching out about ${serviceText}.`,
  };

  const toneClosings: Record<FollowUpTone, string> = {
    friendly: "We would love to learn a little more and point you toward the right next step.",
    professional:
      "We can review your goals, answer questions, and recommend the most appropriate next step.",
    motivational:
      "We can help you create a clear, realistic starting point without overcomplicating the process.",
    premium:
      "We will keep the conversation thoughtful, personalized, and focused on what makes sense for you.",
    "short-direct": "A quick consult is the easiest next step.",
  };

  const body = `${toneOpenings[tone]}${goalText}${messageText}${timelineText} ${toneClosings[tone]}${linkText}`;

  if (channel === "email") {
    return `Subject: Your next step with ${businessName}\n\n${body}\n\nBest,\n${businessName}`;
  }

  if (channel === "instagram-dm") {
    return `${body}\n\nFeel free to DM us back here with any questions.`;
  }

  return body;
}
