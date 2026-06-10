import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin-login-form";
import { getSafeAdminNextPath } from "@/lib/admin-auth";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Admin Login",
    description: "Sign in to access ClientFlow AI admin tools.",
    path: "/admin-login",
    noIndex: true,
  }),
};

type AdminLoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const nextPath = getSafeAdminNextPath(params.next);

  return (
    <section className="bg-zinc-50 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_24rem] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
            Admin access
          </p>
          <h1 className="mt-3 max-w-2xl text-balance text-4xl font-semibold tracking-normal text-ink sm:text-5xl">
            Sign in to manage leads and AI-assisted tools.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600">
            This starter template uses an environment-variable admin password
            for early demos. Set a strong password on the server and replace it
            with dedicated auth before larger client deployments.
          </p>
        </div>
        <AdminLoginForm nextPath={nextPath} />
      </div>
    </section>
  );
}
