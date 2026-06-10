import type { ValidLeadSubmission } from "@/lib/lead-validation";
import { siteConfig } from "@/config/site";

type EmailSendResult = {
  ownerEmailSent: boolean;
  confirmationEmailSent: boolean;
};

type ResendEmailPayload = {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  reply_to?: string[];
};

type LeadEmailContext = {
  lead: ValidLeadSubmission;
  submittedAt: string;
  leadId: string;
};

const resendEndpoint = "https://api.resend.com/emails";

function getEmailConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY,
    fromEmail: process.env.LEAD_NOTIFICATION_FROM_EMAIL,
    toEmail: process.env.LEAD_NOTIFICATION_TO_EMAIL,
    confirmationEnabled:
      process.env.LEAD_CONFIRMATION_EMAIL_ENABLED?.toLowerCase() === "true",
  };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatSubmittedAt(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function buildOwnerEmail({ lead, submittedAt, leadId }: LeadEmailContext) {
  const submittedLabel = formatSubmittedAt(submittedAt);
  const rows = [
    ["Lead name", lead.fullName],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Preferred service", lead.preferredService],
    ["Goal", lead.primaryGoal],
    ["Timeline", lead.timelineToStart],
    ["Message", lead.message || "No extra message provided."],
    ["Submission time", submittedLabel],
  ];

  const text = [
    `New lead from ${siteConfig.businessName}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    `Lead ID: ${leadId}`,
    `Source page: ${lead.sourcePage}`,
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; font-weight: 700; color: #17211d; width: 180px;">${escapeHtml(label)}</td>
          <td style="padding: 10px 14px; border-bottom: 1px solid #e5e7eb; color: #3f3f46;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #17211d; line-height: 1.6;">
      <h1 style="font-size: 24px; margin: 0 0 8px;">New lead from ${escapeHtml(siteConfig.businessName)}</h1>
      <p style="margin: 0 0 20px; color: #52525b;">A new consultation request was saved to Supabase.</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 680px; border: 1px solid #e5e7eb;">
        ${htmlRows}
      </table>
      <p style="margin-top: 20px; color: #71717a; font-size: 13px;">Lead ID: ${escapeHtml(leadId)}<br />Source page: ${escapeHtml(lead.sourcePage)}</p>
    </div>`;

  return {
    subject: `New lead: ${lead.fullName} - ${lead.preferredService}`,
    text,
    html,
  };
}

function buildConfirmationEmail({ lead }: LeadEmailContext) {
  const text = [
    `Hi ${lead.fullName},`,
    "",
    `Thanks for reaching out to ${siteConfig.businessName}. Your inquiry has been received, and the team will review your goals and follow up with the best next step.`,
    "",
    `Preferred service: ${lead.preferredService}`,
    `Timeline: ${lead.timelineToStart}`,
    "",
    "Talk soon,",
    siteConfig.businessName,
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; color: #17211d; line-height: 1.6;">
      <h1 style="font-size: 22px; margin: 0 0 12px;">We received your inquiry</h1>
      <p>Hi ${escapeHtml(lead.fullName)},</p>
      <p>Thanks for reaching out to ${escapeHtml(siteConfig.businessName)}. Your inquiry has been received, and the team will review your goals and follow up with the best next step.</p>
      <p><strong>Preferred service:</strong> ${escapeHtml(lead.preferredService)}<br />
      <strong>Timeline:</strong> ${escapeHtml(lead.timelineToStart)}</p>
      <p>Talk soon,<br />${escapeHtml(siteConfig.businessName)}</p>
    </div>`;

  return {
    subject: `${siteConfig.businessName} received your inquiry`,
    text,
    html,
  };
}

async function sendResendEmail(apiKey: string, payload: ResendEmailPayload) {
  const response = await fetch(resendEndpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    let message = response.statusText;

    try {
      const error = (await response.json()) as { message?: string; name?: string };
      message = error.message || error.name || response.statusText;
    } catch {
      message = response.statusText;
    }

    throw new Error(`Resend email failed with status ${response.status}: ${message}`);
  }
}

function logSafeEmailError(scope: string, error: unknown) {
  const message = error instanceof Error ? error.message : "Unknown email error";
  console.error(`Lead email error (${scope})`, message);
}

export async function sendLeadEmails(
  context: LeadEmailContext,
): Promise<EmailSendResult> {
  const config = getEmailConfig();
  const result: EmailSendResult = {
    ownerEmailSent: false,
    confirmationEmailSent: false,
  };

  if (!config.apiKey || !config.fromEmail || !config.toEmail) {
    console.warn(
      "Lead email notification skipped: configure RESEND_API_KEY, LEAD_NOTIFICATION_FROM_EMAIL, and LEAD_NOTIFICATION_TO_EMAIL.",
    );
    return result;
  }

  const ownerEmail = buildOwnerEmail(context);

  try {
    await sendResendEmail(config.apiKey, {
      from: config.fromEmail,
      to: [config.toEmail],
      reply_to: [context.lead.email],
      subject: ownerEmail.subject,
      text: ownerEmail.text,
      html: ownerEmail.html,
    });
    result.ownerEmailSent = true;
  } catch (error) {
    logSafeEmailError("owner notification", error);
  }

  if (config.confirmationEnabled) {
    const confirmationEmail = buildConfirmationEmail(context);

    try {
      await sendResendEmail(config.apiKey, {
        from: config.fromEmail,
        to: [context.lead.email],
        subject: confirmationEmail.subject,
        text: confirmationEmail.text,
        html: confirmationEmail.html,
      });
      result.confirmationEmailSent = true;
    } catch (error) {
      logSafeEmailError("lead confirmation", error);
    }
  }

  return result;
}
