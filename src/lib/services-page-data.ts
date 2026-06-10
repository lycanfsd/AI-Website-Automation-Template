import {
  Activity,
  Apple,
  CalendarCheck,
  CheckCircle2,
  Dumbbell,
  Laptop,
  MessageCircleHeart,
  RefreshCw,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import { clientConfig } from "@/config/client";

// TODO: Customize these services, outcomes, and FAQs for each client niche.
const serviceIcons = [Dumbbell, Laptop, Apple, Trophy, Activity, MessageCircleHeart];

export const serviceCards = clientConfig.services.map((service, index) => ({
  ...service,
  icon: serviceIcons[index] || Dumbbell,
}));

export const audienceFit = [
  "You want coaching that feels personal, not crowded or rushed.",
  "You are returning to fitness and want a clear, safe starting point.",
  "You have specific goals but need help turning them into a weekly plan.",
  "You care about strength, mobility, energy, and long-term consistency.",
  "You want a premium local coaching experience before committing to a plan.",
  "You need accountability from a real coach who understands your schedule.",
];

export const serviceProcess = [
  {
    title: "Tell us what you want to improve",
    description:
      "Submit a short consult request with your goals, preferred schedule, and the type of coaching you are considering.",
    icon: Target,
  },
  {
    title: "Meet for a free fit assessment",
    description:
      "A coach reviews your starting point, movement needs, timeline, and service fit in a focused consultation.",
    icon: CalendarCheck,
  },
  {
    title: "Choose the right coaching path",
    description:
      "You leave with a practical recommendation for training, nutrition, accountability, or a combined program.",
    icon: CheckCircle2,
  },
  {
    title: "Review progress and adjust",
    description:
      "Your plan evolves through regular check-ins, clear benchmarks, and adjustments that keep momentum realistic.",
    icon: RefreshCw,
  },
];

export const servicesFaqs = [
  {
    question: "Which service should I choose first?",
    answer:
      `Start with the free consultation. ${clientConfig.businessName} will recommend the best option based on your goals, schedule, training history, and preferred level of support.`,
  },
  {
    question: "Do I need experience before starting personal training?",
    answer:
      "No. Coaching is adapted to your current ability, comfort level, and movement background.",
  },
  {
    question: "Can online coaching work if I train at home?",
    answer:
      "Yes. Programming can be built around home equipment, a gym setup, or a hybrid routine.",
  },
  {
    question: "Is nutrition guidance a meal plan?",
    answer:
      `${clientConfig.businessName} uses practical habit guidance by default. A client-specific nutrition scope should be reviewed before launch, especially for licensed or clinical services.`,
  },
  {
    question: "How soon will someone follow up after I book?",
    answer:
      "The demo expectation is within one business day. Replace this with the client's real response standard before launch.",
  },
];

export const serviceHeroStats = [
  { value: "20 min", label: "free fit assessment" },
  { value: String(clientConfig.services.length), label: "coaching paths" },
  { value: "1:1", label: "personalized next step" },
];

export const serviceTrustPoints = [
  { label: "Local coaching team", icon: Users },
  { label: "No-pressure consultation", icon: CalendarCheck },
  { label: "Plan matched to your goals", icon: Target },
];
