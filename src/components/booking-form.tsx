"use client";

import { AlertCircle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useState,
} from "react";
import {
  preferredServiceOptions,
  timelineOptions,
  type LeadFormData,
  type LeadValidationErrors,
  validateLeadSubmission,
} from "@/lib/lead-validation";
import { cx } from "@/lib/utils";

const initialFormData: LeadFormData = {
  fullName: "",
  email: "",
  phone: "",
  preferredService: "",
  primaryGoal: "",
  timelineToStart: "",
  message: "",
  sourcePage: "contact",
  consent: false,
  website: "",
};

type TextLeadField = Exclude<
  keyof LeadFormData,
  "consent" | "preferredService" | "timelineToStart"
>;

type SubmissionState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

type LeadApiResponse = {
  ok: boolean;
  message?: string;
  errors?: LeadValidationErrors;
};

const inputClass =
  "min-h-12 w-full rounded-lg border bg-white px-3 text-sm text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

const textareaClass =
  "min-h-28 w-full rounded-lg border bg-white px-3 py-3 text-sm text-ink outline-none transition placeholder:text-zinc-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-100";

function fieldClass(hasError: boolean, extra?: string) {
  return cx(
    inputClass,
    hasError ? "border-red-300" : "border-zinc-300",
    extra,
  );
}

function fieldDescriptionId(field: keyof LeadFormData) {
  return `${field}-error`;
}

export function BookingForm({ sourcePage = "contact" }: { sourcePage?: string }) {
  const [formData, setFormData] = useState<LeadFormData>({
    ...initialFormData,
    sourcePage,
  });
  const [errors, setErrors] = useState<LeadValidationErrors>({});
  const [submission, setSubmission] = useState<SubmissionState>({
    status: "idle",
  });

  const isSubmitting = submission.status === "submitting";

  function updateField<Field extends keyof LeadFormData>(
    field: Field,
    value: LeadFormData[Field],
  ) {
    setFormData((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      delete next.form;
      return next;
    });

    if (submission.status !== "idle") {
      setSubmission({ status: "idle" });
    }
  }

  function handleTextChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const field = event.target.name as TextLeadField;
    updateField(field, event.target.value);
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const field = event.target.name as "preferredService" | "timelineToStart";
    updateField(field, event.target.value as LeadFormData[typeof field]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmission({ status: "idle" });

    const clientValidation = validateLeadSubmission(formData);

    if (!clientValidation.ok) {
      setErrors(clientValidation.errors);
      setSubmission({
        status: "error",
        message: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    setErrors({});
    setSubmission({ status: "submitting" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const payload = (await response.json()) as LeadApiResponse;

      if (!response.ok || !payload.ok) {
        setErrors(payload.errors || {});
        setSubmission({
          status: "error",
          message:
            payload.errors?.form ||
            "Something went wrong. Please check the form and try again.",
        });
        return;
      }

      setFormData({ ...initialFormData, sourcePage });
      setSubmission({
        status: "success",
        message:
          payload.message ||
          "Thanks. Your consultation request has been received.",
      });
    } catch {
      setSubmission({
        status: "error",
        message:
          "We could not submit the form. Please try again or contact us directly.",
      });
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-2">
        <h2 className="text-xl font-semibold text-ink">Book a free consult</h2>
        <p className="text-sm leading-6 text-zinc-600">
          Share a few details and PeakForm will follow up with the best next
          step for your goals.
        </p>
      </div>

      <div
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={formData.website}
          onChange={handleTextChange}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldErrorWrapper field="fullName" error={errors.fullName}>
          <label htmlFor="fullName" className="grid gap-2 text-sm font-medium text-ink">
            Full name
            <input
              id="fullName"
              name="fullName"
              className={fieldClass(Boolean(errors.fullName))}
              placeholder="Alex Johnson"
              value={formData.fullName}
              onChange={handleTextChange}
              autoComplete="name"
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? fieldDescriptionId("fullName") : undefined}
            />
          </label>
        </FieldErrorWrapper>

        <FieldErrorWrapper field="phone" error={errors.phone}>
          <label htmlFor="phone" className="grid gap-2 text-sm font-medium text-ink">
            Phone
            <input
              id="phone"
              name="phone"
              className={fieldClass(Boolean(errors.phone))}
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={handleTextChange}
              autoComplete="tel"
              inputMode="tel"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? fieldDescriptionId("phone") : undefined}
            />
          </label>
        </FieldErrorWrapper>
      </div>

      <FieldErrorWrapper field="email" error={errors.email}>
        <label htmlFor="email" className="grid gap-2 text-sm font-medium text-ink">
          Email
          <input
            id="email"
            type="email"
            name="email"
            className={fieldClass(Boolean(errors.email))}
            placeholder="alex@example.com"
            value={formData.email}
            onChange={handleTextChange}
            autoComplete="email"
            inputMode="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? fieldDescriptionId("email") : undefined}
          />
        </label>
      </FieldErrorWrapper>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldErrorWrapper field="preferredService" error={errors.preferredService}>
          <label
            htmlFor="preferredService"
            className="grid gap-2 text-sm font-medium text-ink"
          >
            Preferred service
            <select
              id="preferredService"
              name="preferredService"
              className={fieldClass(Boolean(errors.preferredService))}
              value={formData.preferredService}
              onChange={handleSelectChange}
              aria-invalid={Boolean(errors.preferredService)}
              aria-describedby={
                errors.preferredService
                  ? fieldDescriptionId("preferredService")
                  : undefined
              }
            >
              <option value="">Choose a service</option>
              {preferredServiceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </FieldErrorWrapper>

        <FieldErrorWrapper field="timelineToStart" error={errors.timelineToStart}>
          <label
            htmlFor="timelineToStart"
            className="grid gap-2 text-sm font-medium text-ink"
          >
            Timeline to start
            <select
              id="timelineToStart"
              name="timelineToStart"
              className={fieldClass(Boolean(errors.timelineToStart))}
              value={formData.timelineToStart}
              onChange={handleSelectChange}
              aria-invalid={Boolean(errors.timelineToStart)}
              aria-describedby={
                errors.timelineToStart
                  ? fieldDescriptionId("timelineToStart")
                  : undefined
              }
            >
              <option value="">Choose a timeline</option>
              {timelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </FieldErrorWrapper>
      </div>

      <FieldErrorWrapper field="primaryGoal" error={errors.primaryGoal}>
        <label
          htmlFor="primaryGoal"
          className="grid gap-2 text-sm font-medium text-ink"
        >
          Primary goal
          <textarea
            id="primaryGoal"
            name="primaryGoal"
            className={cx(
              textareaClass,
              errors.primaryGoal ? "border-red-300" : "border-zinc-300",
            )}
            placeholder="Example: build strength, improve mobility, lose body fat, or feel more consistent."
            value={formData.primaryGoal}
            onChange={handleTextChange}
            aria-invalid={Boolean(errors.primaryGoal)}
            aria-describedby={
              errors.primaryGoal ? fieldDescriptionId("primaryGoal") : undefined
            }
          />
        </label>
      </FieldErrorWrapper>

      <FieldErrorWrapper field="message" error={errors.message}>
        <label htmlFor="message" className="grid gap-2 text-sm font-medium text-ink">
          Message
          <textarea
            id="message"
            name="message"
            className={cx(
              textareaClass,
              errors.message ? "border-red-300" : "border-zinc-300",
            )}
            placeholder="Anything else we should know before reaching out?"
            value={formData.message}
            onChange={handleTextChange}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? fieldDescriptionId("message") : undefined}
          />
        </label>
      </FieldErrorWrapper>

      <input type="hidden" name="sourcePage" value={formData.sourcePage} readOnly />

      <div className="grid gap-2">
        <label className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            className="mt-1 size-4 rounded border-zinc-300 text-brand-600 focus:ring-brand-600"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? fieldDescriptionId("consent") : undefined}
          />
          <span>
            I agree to be contacted about my inquiry by phone, email, or text.
          </span>
        </label>
        {errors.consent ? (
          <p id={fieldDescriptionId("consent")} className="text-sm text-red-600">
            {errors.consent}
          </p>
        ) : null}
      </div>

      {submission.status === "error" ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {submission.message}
        </p>
      ) : null}

      {submission.status === "success" ? (
        <p
          role="status"
          className="flex items-start gap-2 rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700"
        >
          <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {submission.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
        ) : (
          <Send aria-hidden="true" className="size-4" />
        )}
        {isSubmitting ? "Sending request..." : "Request free consult"}
      </button>

      <p className="text-xs leading-5 text-zinc-500">
        Your information is used only to respond to this inquiry.
      </p>
    </form>
  );
}

function FieldErrorWrapper({
  children,
  error,
  field,
}: {
  children: ReactNode;
  error?: string;
  field: keyof LeadFormData;
}) {
  return (
    <div className="grid gap-2">
      {children}
      {error ? (
        <p id={fieldDescriptionId(field)} className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
