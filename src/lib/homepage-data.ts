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

// TODO: Customize these homepage sections for each client's offer, audience, and service model.
export const trustIndicators = [
  { label: "Austin-based coaching studio", icon: MapPin },
  { label: "Free 20-minute consult", icon: CalendarCheck },
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
      "PeakForm starts with a consult, then maps strength, mobility, and habit work around your week.",
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

export const testimonials = [
  {
    quote:
      "PeakForm helped me rebuild consistency without feeling overwhelmed. The consult alone gave me more clarity than months of trying random plans.",
    name: "Maya R.",
    detail: "Strength coaching client",
  },
  {
    quote:
      "The coaching feels personal and precise. I know what to do, why it matters, and how to fit it into a normal work week.",
    name: "Chris M.",
    detail: "Mobility and recovery client",
  },
  {
    quote:
      "I booked after one conversation because the plan was realistic. No pressure, just a smart path forward.",
    name: "Elena P.",
    detail: "Nutrition habits client",
  },
];

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
      "Drafted SMS and email replies use the lead's goal, service interest, and booking stage.",
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

export const faqs = [
  {
    question: "Is the consultation really free?",
    answer:
      "Yes. The first consult is a short fit assessment so you can understand the recommended service before choosing a plan.",
  },
  {
    question: "Do I need to be in shape before starting?",
    answer:
      "No. PeakForm adapts coaching to your current ability, comfort level, and training history.",
  },
  {
    question: "What happens after I submit the form?",
    answer:
      "The team reviews your goals and follows up with available consult times, usually within one business day.",
  },
  {
    question: "Can I train if I have an old injury or limitation?",
    answer:
      "Tell the team before booking so the consult can focus on appropriate movement, comfort, and whether another provider should be involved.",
  },
];

export const conversionHighlights = [
  "No-pressure fit assessment",
  "Clear plan options",
  "Premium local coaching experience",
  "Fast follow-up from a real team",
];
