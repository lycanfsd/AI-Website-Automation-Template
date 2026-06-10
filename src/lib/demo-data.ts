import {
  Activity,
  HeartPulse,
  MessageCircleHeart,
  NotebookPen,
  Sparkles,
  Users,
} from "lucide-react";
import { clientConfig } from "@/config/client";

const serviceIcons = [Activity, HeartPulse, Users, NotebookPen, MessageCircleHeart, Sparkles];
const serviceAccents = ["brand", "copper", "brand", "copper", "brand", "copper"] as const;

export const services = clientConfig.services.map((service, index) => ({
  title: service.title,
  description: service.shortDescription,
  icon: serviceIcons[index] || Activity,
  accent: serviceAccents[index] || "brand",
}));

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
