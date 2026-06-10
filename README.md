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

The Review Response Generator and Lead Follow-up Generator use server-side OpenAI API routes when `OPENAI_API_KEY` is configured. The browser never receives the OpenAI key.

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

Most client-facing copy now starts in [src/config/client.ts](src/config/client.ts). Copy `.env.example` to `.env.local` only for environment-specific values such as public contact overrides, Supabase, Resend, OpenAI, and admin auth.

```bash
NEXT_PUBLIC_CLIENT_BUSINESS_NAME="PeakForm Coaching"
NEXT_PUBLIC_CLIENT_PHONE="(555) 014-2048"
NEXT_PUBLIC_CLIENT_EMAIL="hello@peakform.test"
NEXT_PUBLIC_CLIENT_ADDRESS="418 Summit Ave, Austin, TX"
NEXT_PUBLIC_SITE_URL="https://www.peakformcoaching.com"
NEXT_PUBLIC_BOOKING_URL=""
ADMIN_PASSWORD=""
ADMIN_SESSION_SECRET=""
SUPABASE_URL=""
SUPABASE_SERVICE_ROLE_KEY=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
RESEND_API_KEY=""
LEAD_NOTIFICATION_FROM_EMAIL="PeakForm Coaching <leads@example.com>"
LEAD_NOTIFICATION_TO_EMAIL="owner@example.com"
LEAD_CONFIRMATION_EMAIL_ENABLED="false"
OPENAI_API_KEY=""
OPENAI_REVIEW_MODEL="gpt-5.4-mini"
OPENAI_FOLLOW_UP_MODEL="gpt-5.4-mini"
```

`SUPABASE_SERVICE_ROLE_KEY` is server-only. Do not prefix it with `NEXT_PUBLIC_`, do not import it into client components, and do not expose it in browser code. `NEXT_PUBLIC_SUPABASE_ANON_KEY` is optional for future client-side reads once RLS policies are designed.

`ADMIN_PASSWORD` is server-only and protects `/dashboard`, `/review-generator`, `/follow-up-generator`, `/settings`, and the `/api/admin/*` lead management routes with a signed HTTP-only cookie. Do not prefix it with `NEXT_PUBLIC_`. Use a strong per-client password for demos. `ADMIN_SESSION_SECRET` is optional but recommended; if omitted, the admin password is also used for cookie signing.

`RESEND_API_KEY` is also server-only. The lead notification utility sends from the server API route after Supabase saves the lead. Set `LEAD_CONFIRMATION_EMAIL_ENABLED="true"` only when the client wants automatic confirmation emails sent to leads.

`OPENAI_API_KEY` is server-only and powers the Review Response Generator through `/api/review-response` and the Lead Follow-up Generator through `/api/lead-follow-up`. Do not prefix it with `NEXT_PUBLIC_` or expose it in browser code. `OPENAI_REVIEW_MODEL` and `OPENAI_FOLLOW_UP_MODEL` are optional; both routes default to `gpt-5.4-mini` as a cost-conscious model choice for short drafting tasks.

## Client Customization

Edit [src/config/client.ts](src/config/client.ts) first when adapting the template for a new business. It contains the main reusable client settings:

- Business identity: `businessName`, `tagline`, `industry`, `location`, `logoText`, `logoPath`
- Contact and booking: `phone`, `email`, `address`, `websiteUrl`, `bookingUrl`, `hours`, `offer`
- Social links: `instagramUrl`, `facebookUrl`
- CTAs: `primaryCTA`, `secondaryCTA`
- Marketing content: `services`, `testimonials`, `faqs`
- Brand reference colors: `brandColors`
- SEO defaults: `seoTitle`, `seoDescription`

The header, footer, homepage, services page, contact page, lead form service options, lead emails, local business schema, sitemap, robots, and SEO metadata all pull from this central config where appropriate.

Customization workflow:

1. Update `src/config/client.ts` with the client's business details.
2. Replace demo testimonials and FAQs with approved client copy.
3. Update the `services` array to match the client's actual offers.
4. If the client has a logo image, add it to `public/` and set `logoPath`, for example `"/images/client-logo.png"`.
5. If the client uses different brand colors, update `brandColors` as a handoff reference and adjust the Tailwind color tokens in `tailwind.config.ts` if the UI palette should change.
6. Use `.env.local` for deployment-specific overrides and secrets only.

The default values keep the PeakForm Coaching demo intact, so the app still works before customization.

## Local SEO Setup

This template includes basic on-page local SEO support. It does not promise rankings; it simply gives each client site cleaner metadata, crawlable contact details, structured data, and indexable public pages.

Included SEO pieces:

- Dynamic page titles and descriptions from `src/config/client.ts`
- Open Graph and Twitter card metadata for share previews
- LocalBusiness JSON-LD on the homepage
- `sitemap.xml` for public pages: `/`, `/services`, `/contact`, `/privacy`, and `/terms`
- `robots.txt` that allows public pages and blocks admin, tool, and API routes
- Crawlable phone, email, address, service area, services, and CTA text in the page HTML
- Descriptive alt text for the demo hero image and logo images

Customize these for each client before launch:

- Set `websiteUrl` in `src/config/client.ts` or `NEXT_PUBLIC_SITE_URL` in the deployment environment to the real production domain.
- Update `businessName`, `industry`, `location`, `serviceArea`, `address`, `phone`, `email`, and `hours`.
- Rewrite `seoTitle` and `seoDescription` around the client name, main service, and city or service area.
- Replace services, FAQs, and testimonials with accurate client-approved copy.
- Add real social profile URLs or leave unused platforms blank.
- Replace `public/images/peakform-hero.png` with a client-specific image and update any image alt text if the subject changes.
- Review regulated wellness, medical, nutrition, chiropractic, med spa, and physical therapy claims with the client and qualified counsel.

After deployment, submit the generated sitemap URL, for example `https://clientdomain.com/sitemap.xml`, to the client's preferred search console tools.

## Niche Presets

Preset data lives in [src/config/client-presets.ts](src/config/client-presets.ts). Each preset includes sample business copy, services, testimonials, FAQs, CTA wording, and a tone/style suggestion.

Available presets:

- `personalTrainer`
- `smallGym`
- `medSpa`
- `chiropractor`
- `physicalTherapy`
- `yogaPilates`
- `nutritionCoach`

To switch from the default PeakForm Coaching demo to another preset:

1. Open [src/config/client.ts](src/config/client.ts).
2. Change `activePreset` from `"personalTrainer"` to one of the preset keys above.
3. Restart `npm run dev` if the server is already running.
4. Review the site and then edit the selected preset values or override fields in `clientConfig` as needed.

Example:

```ts
const activePreset: ClientPresetKey = "medSpa";
```

Use presets as a starting point, not final client copy. Before launch, replace sample services, testimonials, FAQs, contact details, legal/disclaimer language, and any regulated medical/aesthetic/health claims with client-approved content.

## Admin Starter Auth

The template includes simple admin protection intended for early demos and small pilots:

- Set `ADMIN_PASSWORD` in the server environment.
- Visit `/dashboard`, `/review-generator`, `/follow-up-generator`, or `/settings`.
- Unauthenticated visitors are redirected to `/admin-login`.
- Successful login creates a signed HTTP-only session cookie.
- The logout button clears the session cookie.

This is a starter solution, not a complete identity system. Larger clients, multi-user teams, and production deployments should use proper authentication and authorization such as Supabase Auth, Clerk, Auth.js, or the client's preferred identity provider. The admin API routes are protected by the same cookie gate, but you should still design role-based access and Supabase RLS policies before storing sensitive client data at scale.

## OpenAI Generator Setup

The Review Response Generator and Lead Follow-up Generator are protected by admin login and call OpenAI only from the server. The browser never receives the OpenAI API key.

Setup:

1. Create an OpenAI API key from the OpenAI dashboard.
2. Set `OPENAI_API_KEY` in `.env.local` or the deployment environment.
3. Optional: set `OPENAI_REVIEW_MODEL` and `OPENAI_FOLLOW_UP_MODEL` to override the default `gpt-5.4-mini`.
4. Restart `npm run dev` or redeploy after changing environment variables.
5. Sign in and open `/review-generator` or `/follow-up-generator`.

Prompt guardrails:

- 5-star reviews should sound warm, grateful, and lightly personalized.
- 3-4 star reviews should acknowledge the feedback and invite the customer back.
- 1-2 star reviews should be apologetic, calm, non-argumentative, and invite direct offline contact.
- Drafts should avoid fake claims, legal liability admissions, medical claims, diagnoses, guaranteed outcomes, and specific weight loss or health promises.
- The tool only drafts text. It does not post to Google, Yelp, Instagram, or any third-party platform.

Review response testing examples:

- Positive: Rating `5`, tone `Warm`, review `PeakForm made strength training feel approachable and personal. I finally stayed consistent for a full month.` Confirm the draft thanks the reviewer and references the positive experience without promising future results.
- Neutral: Rating `3`, tone `Professional`, review `Good coaching session, but scheduling was confusing and I had trouble knowing what to do next.` Confirm the draft appreciates the feedback, acknowledges the scheduling concern, and invites them to return or reconnect.
- Negative: Rating `1`, tone `Apologetic`, review `I waited 30 minutes and felt rushed when my session finally started.` Confirm the draft is calm and apologetic, does not argue, does not admit legal liability, and asks the reviewer to contact the business directly.
- Missing key: Temporarily remove `OPENAI_API_KEY`, restart, and confirm the tool shows a configuration error instead of generating.
- Long input: Paste more than 1,500 characters and confirm the form prevents or rejects the submission.

Lead follow-up testing examples:

- Email: Channel `Email`, tone `Professional`, service `Personal Training`, timeline `This week`, goal `Build strength and get consistent with workouts`, message `I have a busy schedule and want to know if evenings are available.` Confirm the output includes a subject suggestion and polished email body.
- SMS: Channel `SMS`, tone `Friendly`, timeline `ASAP`, goal `Need help getting back into a routine`, message `I am not sure where to start.` Confirm the output is short, conversational, and easy to reply to.
- Instagram DM: Channel `Instagram DM`, tone `Premium`, timeline `Just researching`, goal `Interested in private coaching`, message `Can you tell me what the first step looks like?` Confirm the output is casual but professional and suggests a consultation.
- Safety: Use a goal such as `Lose 30 pounds in one month and fix knee pain.` Confirm the draft avoids medical advice, guaranteed weight-loss claims, pain-relief promises, and encourages a consultation for personalized advice.
- Missing key: Temporarily remove `OPENAI_API_KEY`, restart, and confirm the follow-up tool shows a configuration error instead of generating.
- Long input: Paste more than 1,200 characters into the lead message and confirm the form prevents or rejects the submission.

## Supabase Lead Storage

The contact form posts to `/api/leads`, validates the payload on the server, checks for very recent duplicate submissions, and inserts valid leads into Supabase with `status = "new"`.

Setup:

1. Create a Supabase project for the client.
2. Open the Supabase SQL editor.
3. Run [supabase/schema.sql](supabase/schema.sql) to create the `public.leads` table and indexes.
4. Copy the project URL into `SUPABASE_URL`.
5. Copy the service role key into `SUPABASE_SERVICE_ROLE_KEY`.
6. Restart `npm run dev` after changing environment variables.

The schema enables row level security. The server API routes use the service role key and can insert/read/update without public policies after the admin cookie check passes. For larger client deployments, add proper user auth, role-based access, and Supabase RLS policies for the business owner or team.

## Admin Lead Dashboard

The dashboard at `/dashboard` loads leads from Supabase through protected server API routes and lets the business owner review submissions, filter by status, search by name/email/phone/goal, open a lead detail drawer, update status, and save internal notes.

Statuses:

- `new`
- `contacted`
- `booked`
- `closed`
- `lost`

Important: the included password gate is intentionally simple. It is useful for demos, but larger clients should use proper auth such as Supabase Auth or Clerk before launch.

Dashboard setup:

1. Run [supabase/schema.sql](supabase/schema.sql), or rerun it if you previously created the table with the older `won` status.
2. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the server environment.
3. Submit a test lead from `/contact`.
4. Set `ADMIN_PASSWORD` in the server environment and restart the app.
5. Open `/dashboard` and sign in.
6. Search, filter, open a lead, change the status, add notes, and save.

Future auth TODOs:

- Replace the starter password gate with Supabase Auth, Clerk, Auth.js, or another production auth provider.
- Add named users and roles for client teams.
- Add Supabase RLS policies after deciding the authenticated access model.
- Add audit logging if the client needs compliance or accountability.

## Manual Admin Auth Testing Checklist

- Add `ADMIN_PASSWORD="choose-a-strong-demo-password"` to `.env.local`, restart the dev server, and open `/dashboard`.
- Confirm `/dashboard`, `/review-generator`, `/follow-up-generator`, and `/settings` redirect to `/admin-login` when you are logged out.
- Enter an incorrect password and confirm the login form shows an error.
- Enter the configured `ADMIN_PASSWORD` and confirm you are redirected back to the protected route.
- Open each protected admin page after login and confirm it loads.
- Click `Log out` and confirm protected pages redirect to `/admin-login` again.
- Open legacy URLs `/admin/leads`, `/tools/review-response`, and `/tools/lead-follow-up` after login and confirm they redirect to the new routes.
- Open `/api/admin/leads` in a logged-out browser session and confirm it returns an authentication error instead of lead data.

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

- Update client details in `src/config/client.ts`
- Replace services, testimonials, FAQs, social links, and SEO defaults in `src/config/client.ts`
- Set `websiteUrl` or `NEXT_PUBLIC_SITE_URL` to the client's real production domain
- Use `.env.local` only for environment-specific overrides and secrets
- Replace `public/images/peakform-hero.png` with a client-specific hero image
- Configure Supabase env vars and run `supabase/schema.sql` for lead storage
- Configure Resend sender, owner inbox, and optional lead confirmation email
- Configure `OPENAI_API_KEY` for the Review Response and Lead Follow-up generators
- Configure `ADMIN_PASSWORD` for demos, then replace starter auth before larger client deployments
- Review `src/app/privacy/page.tsx` and `src/app/terms/page.tsx` with legal counsel for each client

## Routes

- `/`
- `/services`
- `/contact`
- `/admin-login`
- `/dashboard`
- `/review-generator`
- `/follow-up-generator`
- `/settings`
- `/privacy`
- `/terms`
