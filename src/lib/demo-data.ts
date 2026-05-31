import {
  Activity,
  HeartPulse,
  MessageCircleHeart,
  NotebookPen,
  Sparkles,
  Users,
} from "lucide-react";

export const services = [
  {
    title: "1:1 Strength Coaching",
    description:
      "Personal sessions built around goals, movement quality, and weekly accountability.",
    icon: Activity,
    accent: "brand",
  },
  {
    title: "Mobility and Recovery",
    description:
      "Guided routines that help clients move better, feel better, and stay consistent.",
    icon: HeartPulse,
    accent: "copper",
  },
  {
    title: "Small Group Training",
    description:
      "High-touch coaching in a focused setting for friends, partners, and small teams.",
    icon: Users,
    accent: "brand",
  },
  {
    title: "Nutrition Habits",
    description:
      "Simple, sustainable nutrition coaching matched to real schedules and preferences.",
    icon: NotebookPen,
    accent: "copper",
  },
  {
    title: "Wellness Check-ins",
    description:
      "Weekly review touchpoints that keep goals visible and next steps clear.",
    icon: MessageCircleHeart,
    accent: "brand",
  },
  {
    title: "ClientFlow AI Setup",
    description:
      "Lead capture, response templates, and review management customized for the business.",
    icon: Sparkles,
    accent: "copper",
  },
];

export type LeadStatus = "New" | "Contacted" | "Booked" | "Won";

export const demoLeads: Array<{
  name: string;
  service: string;
  source: string;
  status: LeadStatus;
  urgency: "High" | "Medium" | "Low";
  received: string;
  notes: string;
}> = [
  {
    name: "Jordan Lee",
    service: "1:1 Strength Coaching",
    source: "Homepage form",
    status: "New",
    urgency: "High",
    received: "12 min ago",
    notes: "Wants early morning sessions before work.",
  },
  {
    name: "Maya Patel",
    service: "Mobility and Recovery",
    source: "Google Business Profile",
    status: "Contacted",
    urgency: "Medium",
    received: "1 hr ago",
    notes: "Asked about neck and shoulder mobility support.",
  },
  {
    name: "Chris Morgan",
    service: "Small Group Training",
    source: "Referral",
    status: "Booked",
    urgency: "Medium",
    received: "Yesterday",
    notes: "Group of three coworkers. Consult booked Friday.",
  },
  {
    name: "Elena Ruiz",
    service: "Nutrition Habits",
    source: "Instagram",
    status: "Won",
    urgency: "Low",
    received: "2 days ago",
    notes: "Started 8-week coaching plan.",
  },
];

export const leadStats = [
  { label: "New leads", value: "18", helper: "+22% this week" },
  { label: "Avg response", value: "9m", helper: "Target under 15m" },
  { label: "Consults booked", value: "11", helper: "61% booking rate" },
  { label: "Reviews pending", value: "7", helper: "Ready for replies" },
];

export const proofPoints = [
  "24-hour lead capture",
  "Consult-first booking flow",
  "Review-ready response templates",
  "Mobile-first local SEO structure",
];
