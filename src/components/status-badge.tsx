import type { LeadStatus } from "@/lib/demo-data";
import { cx } from "@/lib/utils";

const statusStyles: Record<LeadStatus, string> = {
  New: "bg-copper-100 text-copper-600",
  Contacted: "bg-brand-50 text-brand-700",
  Booked: "bg-zinc-100 text-zinc-700",
  Won: "bg-ink text-white",
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  return (
    <span
      className={cx(
        "inline-flex min-h-7 items-center rounded-full px-3 text-xs font-semibold",
        statusStyles[status],
      )}
    >
      {status}
    </span>
  );
}
