import { LogOut } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

type AdminPageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function AdminPageHeader({
  eyebrow,
  title,
  description,
}: AdminPageHeaderProps) {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="max-w-[21rem] sm:max-w-3xl"
        />
        {/* TODO: Replace this starter password gate with Supabase Auth, Clerk, or the client's preferred identity provider before larger deployments. */}
        <p className="mt-6 max-w-[21rem] rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-medium leading-6 text-brand-800 sm:max-w-3xl">
          Starter admin protection is active. Use this for demos and small
          pilots only; upgrade to full user authentication for production client
          teams.
        </p>
      </div>
      <form action="/api/admin-auth/logout" method="post" className="shrink-0">
        <button
          type="submit"
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-ink transition hover:border-brand-600 hover:text-brand-700 sm:w-auto"
        >
          <LogOut aria-hidden="true" className="size-4" />
          Log out
        </button>
      </form>
    </div>
  );
}
