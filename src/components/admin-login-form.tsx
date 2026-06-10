"use client";

import { useState, type FormEvent } from "react";
import { LockKeyhole } from "lucide-react";

type AdminLoginFormProps = {
  nextPath: string;
};

export function AdminLoginForm({ nextPath }: AdminLoginFormProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin-auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, next: nextPath }),
      });
      const result = (await response.json()) as {
        error?: string;
        next?: string;
      };

      if (!response.ok) {
        setError(result.error || "Unable to sign in.");
        return;
      }

      window.location.assign(result.next || "/dashboard");
    } catch {
      setError("Unable to sign in. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft sm:p-6"
    >
      <label className="text-sm font-semibold text-ink" htmlFor="admin-password">
        Admin password
      </label>
      <div className="mt-2 flex rounded-lg border border-zinc-300 bg-white focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-100">
        <span className="grid w-11 place-items-center text-zinc-400">
          <LockKeyhole aria-hidden="true" className="size-4" />
        </span>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="min-h-12 flex-1 rounded-r-lg border-0 bg-transparent px-3 py-3 text-sm text-ink outline-none"
          required
        />
      </div>
      {error ? (
        <p
          role="alert"
          className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
