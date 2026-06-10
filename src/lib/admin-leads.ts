export const leadStatuses = ["new", "contacted", "booked", "closed", "lost"] as const;

export type LeadStatus = (typeof leadStatuses)[number];

export type LeadRecord = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  preferred_service: string;
  primary_goal: string;
  timeline: string;
  message: string | null;
  source_page: string;
  status: LeadStatus;
  notes: string | null;
};

export const leadStatusLabels: Record<LeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  booked: "Booked",
  closed: "Closed",
  lost: "Lost",
};

export const leadStatusOptions = leadStatuses.map((status) => ({
  value: status,
  label: leadStatusLabels[status],
}));

export function isLeadStatus(value: string): value is LeadStatus {
  return leadStatuses.includes(value as LeadStatus);
}

export function formatLeadDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}
