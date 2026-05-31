# ClientFlow AI Template

A reusable Next.js client template for local fitness and wellness businesses. The demo brand is **PeakForm Coaching**, but the copy, services, contact details, and offer are intentionally easy to customize for personal trainers, gyms, med spas, chiropractors, physical therapy clinics, yoga studios, Pilates studios, nutrition coaches, and wellness coaches.

## What is included

- Mobile-first homepage with premium lead-booking positioning
- Services page
- Contact and booking form page
- Admin lead dashboard mockup
- Review response generator
- Lead follow-up generator
- Settings and customization preview
- Privacy policy template
- Terms and disclaimer template
- Tailwind CSS design system and reusable components

The AI-assisted tools use local template logic by default, so the app works without a paid AI dependency. A live AI provider can be added later where the TODO comments indicate.

## Tech stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Lucide React icons

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Useful scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```

The `dev`, `build`, and `start` scripts preload `scripts/normalize-readlink.cjs`, a small Windows/Node 24 compatibility shim for Next.js file resolution. It is safe to leave in place on other environments.

## Environment variables

Copy `.env.example` to `.env.local` and update the values for each client.

```bash
NEXT_PUBLIC_CLIENT_BUSINESS_NAME="PeakForm Coaching"
NEXT_PUBLIC_CLIENT_PHONE="(555) 014-2048"
NEXT_PUBLIC_CLIENT_EMAIL="hello@peakform.test"
NEXT_PUBLIC_CLIENT_ADDRESS="418 Summit Ave, Austin, TX"
NEXT_PUBLIC_BOOKING_URL=""
SUPABASE_URL=""
SUPABASE_SERVICE_ROLE_KEY=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
RESEND_API_KEY=""
LEAD_NOTIFICATION_FROM_EMAIL="PeakForm Coaching <leads@example.com>"
LEAD_NOTIFICATION_TO_EMAIL="owner@example.com"
LEAD_CONFIRMATION_EMAIL_ENABLED="false"
OPENAI_API_KEY=""
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only. Do not prefix it with `NEXT_PUBLIC_`, do not import it into client components, and do not expose it in browser code. `NEXT_PUBLIC_SUPABASE_ANON_KEY` is optional for future client-side reads once RLS policies are designed.

`RESEND_API_KEY` is also server-only. The lead notification utility sends from the server API route after Supabase saves the lead. Set `LEAD_CONFIRMATION_EMAIL_ENABLED="true"` only when the client wants automatic confirmation emails sent to leads.

`OPENAI_API_KEY` is optional and unused by the default template. It is documented for future live AI integrations.

## Supabase Lead Storage

The contact form posts to `/api/leads`, validates the payload on the server, checks for very recent duplicate submissions, and inserts valid leads into Supabase with `status = "new"`.

Setup:

1. Create a Supabase project for the client.
2. Open the Supabase SQL editor.
3. Run [supabase/schema.sql](supabase/schema.sql) to create the `public.leads` table and indexes.
4. Copy the project URL into `SUPABASE_URL`.
5. Copy the service role key into `SUPABASE_SERVICE_ROLE_KEY`.
6. Restart `npm run dev` after changing environment variables.

The schema enables row level security. The server API route uses the service role key and can insert without public insert policies. Before building a client-facing dashboard that reads from Supabase in the browser, add proper authentication and RLS policies for the business owner.

## Email Notifications

New leads can trigger owner email notifications through Resend. The email is sent only after Supabase successfully saves a new lead. If email delivery fails, the form still returns a success response because the lead record has already been captured.

Setup:

1. Create or open a Resend account.
2. Verify the client's sending domain in Resend.
3. Create a Resend API key.
4. Set `RESEND_API_KEY` in the server environment.
5. Set `LEAD_NOTIFICATION_FROM_EMAIL` to a verified sender, for example `PeakForm Coaching <leads@clientdomain.com>`.
6. Set `LEAD_NOTIFICATION_TO_EMAIL` to the business owner's inbox.
7. Optional: set `LEAD_CONFIRMATION_EMAIL_ENABLED="true"` to send a confirmation email to the lead.
8. Restart `npm run dev` or redeploy after changing environment variables.

The owner notification includes lead name, email, phone, preferred service, goal, timeline, message, submission time, lead ID, and source page. Email errors are logged without API keys or secret values.

## Manual Email Testing Checklist

- Submit the contact form with valid Supabase and Resend env vars.
- Confirm a new row appears in the `public.leads` table with `status = "new"`.
- Confirm the owner receives a new lead email at `LEAD_NOTIFICATION_TO_EMAIL`.
- Confirm the email includes name, email, phone, service, goal, timeline, message, and submission time.
- Submit the same lead twice within 90 seconds and confirm only one new row/email is produced.
- Temporarily set an invalid `RESEND_API_KEY`, submit a valid lead, and confirm the form still succeeds while the email error is logged safely.
- If `LEAD_CONFIRMATION_EMAIL_ENABLED="true"`, confirm the lead receives the confirmation email.
- If confirmation emails are disabled, confirm only the owner notification sends.

## Customization checklist

- Update client details in `.env.local` and `src/config/site.ts`
- Replace service copy in `src/lib/demo-data.ts`
- Replace `public/images/peakform-hero.png` with a client-specific hero image
- Configure Supabase env vars and run `supabase/schema.sql` for lead storage
- Configure Resend sender, owner inbox, and optional lead confirmation email
- Add authentication before using `src/app/admin/leads/page.tsx` with live client data
- Review `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` with legal counsel for each client

## Routes

- `/`
- `/services`
- `/contact`
- `/admin/leads`
- `/tools/review-response`
- `/tools/lead-follow-up`
- `/settings`
- `/privacy`
- `/terms`
