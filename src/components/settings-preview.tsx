"use client";

import { Save } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/config/site";

const inputClass =
  "min-h-12 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

export function SettingsPreview() {
  const [settings, setSettings] = useState({
    businessName: siteConfig.businessName,
    phone: siteConfig.phone,
    email: siteConfig.email,
    address: siteConfig.address,
    offer: siteConfig.offer,
    primaryCta: siteConfig.primaryCta,
  });
  const [saved, setSaved] = useState(false);

  function updateSetting(key: keyof typeof settings, value: string) {
    setSaved(false);
    setSettings((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <form
        className="rounded-lg border border-zinc-200 bg-white p-5 shadow-soft"
        onSubmit={(event) => {
          event.preventDefault();
          // TODO: Persist client customization to a database or deployment-specific config.
          setSaved(true);
        }}
      >
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-ink">
            Business name
            <input className={inputClass} value={settings.businessName} onChange={(event) => updateSetting("businessName", event.target.value)} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-ink">
              Phone
              <input className={inputClass} value={settings.phone} onChange={(event) => updateSetting("phone", event.target.value)} />
            </label>
            <label className="grid gap-2 text-sm font-medium text-ink">
              Email
              <input className={inputClass} value={settings.email} onChange={(event) => updateSetting("email", event.target.value)} />
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Address
            <input className={inputClass} value={settings.address} onChange={(event) => updateSetting("address", event.target.value)} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            New lead offer
            <input className={inputClass} value={settings.offer} onChange={(event) => updateSetting("offer", event.target.value)} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-ink">
            Primary CTA
            <input className={inputClass} value={settings.primaryCta} onChange={(event) => updateSetting("primaryCta", event.target.value)} />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 sm:w-auto"
          >
            <Save aria-hidden="true" className="size-4" />
            Save demo settings
          </button>
          {saved ? (
            <p className="rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700">
              Demo settings saved in the current browser session state.
            </p>
          ) : null}
        </div>
      </form>

      <div className="rounded-lg border border-zinc-200 bg-ink p-6 text-white shadow-soft">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-100">
          Live preview
        </p>
        <h3 className="mt-4 text-3xl font-semibold tracking-normal">
          {settings.businessName}
        </h3>
        <p className="mt-3 max-w-xl text-zinc-200">
          {settings.offer}
        </p>
        <div className="mt-6 grid gap-3 text-sm text-zinc-300">
          <p>{settings.phone}</p>
          <p>{settings.email}</p>
          <p>{settings.address}</p>
        </div>
        <button
          type="button"
          className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-ink sm:w-auto"
        >
          {settings.primaryCta}
        </button>
      </div>
    </div>
  );
}
