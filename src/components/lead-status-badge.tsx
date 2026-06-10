import { leadStatusLabels, type LeadStatus } from "@/lib/admin-leads";
import { cx } from "@/lib/utils";

const statusStyles: Record<LeadStatus, string> = {
  new: "bg-copper-100 text-copper-600",
  contacted: "bg-brand-50 text-brand-700",
  booked: "bg-zinc-100 text-zinc-700",
  closed: "bg-ink text-white",
  lost: "bg-red-50 text-red-700",
};

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cx(
        "inline-flex min-h-7 items-center rounded-full px-3 text-xs font-semibold",
        statusStyles[status],
      )}
    >
      {leadStatusLabels[status]}
    </span>
  );
}
