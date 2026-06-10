import {
  BadgeCheck,
  CalendarCheck,
  Clock3,
  HeartHandshake,
  MapPin,
  MessageSquareText,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
} from "lucide-react";
import { clientConfig } from "@/config/client";

// TODO: Customize these homepage sections for each client's offer, audience, and service model.
export const trustIndicators = [
  { label: `${clientConfig.location}-based coaching studio`, icon: MapPin },
  { label: clientConfig.offer, icon: CalendarCheck },
  { label: "Personal plan before you commit", icon: ShieldCheck },
];

export const localProof = [
  "Private and small-group coaching",
  "Morning, lunch, and evening consults",
  "Clear next steps within one business day",
  "Built for real local schedules",
];

export const problemSolution = [
  {
    problem: "You are busy, inconsistent, and tired of guessing what to do next.",
    solution:
      `${clientConfig.businessName} starts with a consult, then maps strength, mobility, and habit work around your week.`,
  },
  {
    problem: "Big gyms can feel crowded, rushed, or impersonal.",
    solution:
      "You get focused coaching, simple benchmarks, and sessions designed for your body and goals.",
  },
  {
    problem: "It is hard to know whether a program is the right fit before paying.",
    solution:
      "The free assessment gives you a clear recommendation before you choose a plan.",
  },
];

export const benefits = [
  {
    title: "Move with more confidence",
    description:
      "Build strength and mobility with coaching that respects your starting point.",
    icon: TrendingUp,
  },
  {
    title: "Stay accountable between visits",
    description:
      "Simple check-ins keep your plan visible even when the week gets full.",
    icon: RefreshCw,
  },
  {
    title: "Feel known, not processed",
    description:
      "Every lead, consult, and client conversation gets timely follow-up.",
    icon: HeartHandshake,
  },
  {
    title: "Book without pressure",
    description:
      "The first step is a practical fit assessment, not a hard sell.",
    icon: BadgeCheck,
  },
];

export const consultationSteps = [
  {
    title: "Share your goal",
    description:
      "Tell us what you want to improve, what has not worked, and when you prefer to train.",
  },
  {
    title: "Meet for a free consult",
    description:
      "A coach reviews your movement, schedule, and priorities in a focused 20-minute conversation.",
  },
  {
    title: "Get a clear recommendation",
    description:
      "Leave with the service, cadence, and first-week plan that best matches your needs.",
  },
];

export const testimonials = clientConfig.testimonials;

export const aiReputationBenefits = [
  {
    title: "New leads get a faster reply",
    description:
      "ClientFlow AI keeps inquiry details organized so the business can respond while interest is fresh.",
    icon: Clock3,
  },
  {
    title: "Follow-up stays personal",
    description:
      "Drafted email, SMS, and DM replies use the lead's goal, service interest, timeline, and message.",
    icon: MessageSquareText,
  },
  {
    title: "Reviews strengthen local trust",
    description:
      "Review response drafts help the business sound grateful, calm, and consistent online.",
    icon: Star,
  },
  {
    title: "Human approval stays in control",
    description:
      "AI assists the workflow, but the local business reviews messages before sending.",
    icon: Sparkles,
  },
];

export const faqs = clientConfig.faqs;

export const conversionHighlights = [
  "No-pressure fit assessment",
  "Clear plan options",
  "Premium local coaching experience",
  "Fast follow-up from a real team",
];
