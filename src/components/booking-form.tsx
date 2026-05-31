"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const fieldClass =
  "min-h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="grid gap-4"
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: Replace this demo handler with the client's CRM, email, or booking integration.
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-ink">
          Name
          <input className={fieldClass} name="name" placeholder="Alex Johnson" required />
        </label>
        <label className="grid gap-2 text-sm font-medium text-ink">
          Phone
          <input className={fieldClass} name="phone" placeholder="(555) 123-4567" required />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-medium text-ink">
        Email
        <input className={fieldClass} type="email" name="email" placeholder="alex@example.com" required />
      </label>

      <label className="grid gap-2 text-sm font-medium text-ink">
        Service interest
        <select className={fieldClass} name="service" defaultValue="1:1 Strength Coaching">
          <option>1:1 Strength Coaching</option>
          <option>Mobility and Recovery</option>
          <option>Small Group Training</option>
          <option>Nutrition Habits</option>
          <option>Wellness Check-ins</option>
        </select>
      </label>

      <label className="grid gap-2 text-sm font-medium text-ink">
        What would you like help with?
        <textarea
          className="min-h-28 w-full rounded-lg border border-zinc-300 bg-white px-3 py-3 text-sm text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100"
          name="message"
          placeholder="Tell us your goals, timeline, and best days to connect."
        />
      </label>

      <button
        type="submit"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <Send aria-hidden="true" className="size-4" />
        Request consult
      </button>

      {submitted ? (
        <p className="rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700">
          Thanks. This demo form captured the request locally. Connect a CRM or
          booking tool before launch.
        </p>
      ) : null}
    </form>
  );
}
