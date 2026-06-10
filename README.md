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

## Vercel Deployment

This project is ready for Vercel as a standard Next.js App Router deployment. No `vercel.json` is required.

Before deploying:

1. Run `npm run lint` and `npm run build` locally.
2. Confirm `.env.local` is not committed. Local env files are ignored by `.gitignore`.
3. Replace or approve demo copy in `src/config/client.ts` and `src/config/client-presets.ts`.
4. Run `supabase/schema.sql` in the client's Supabase project if lead capture will be live.
5. Verify any Resend sending domain before enabling owner or lead confirmation emails.
6. Choose a strong `ADMIN_PASSWORD` and a separate long random `ADMIN_SESSION_SECRET`.

Vercel project setup:

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New Project** and import the repository.
3. Keep the framework preset as **Next.js**.
4. Use the default install command, or set it to `npm install`.
5. Use `npm run build` as the build command.
6. Leave the output directory blank so Vercel uses Next.js defaults.
7. Add the environment variables below in **Project Settings > Environment Variables** for Production, Preview, and Development as needed.
8. Deploy, then redeploy after changing environment variables.

Recommended Vercel environment variables:

```bash
NEXT_PUBLIC_CLIENT_BUSINESS_NAME="Client Business Name"
NEXT_PUBLIC_CLIENT_PHONE="(555) 000-0000"
NEXT_PUBLIC_CLIENT_EMAIL="hello@clientdomain.com"
NEXT_PUBLIC_CLIENT_ADDRESS="Client address or service area"
NEXT_PUBLIC_SITE_URL="https://www.clientdomain.com"
NEXT_PUBLIC_BOOKING_URL=""
ADMIN_PASSWORD="use-a-strong-password"
ADMIN_SESSION_SECRET="use-a-long-random-secret"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="server-only-service-role-key"
NEXT_PUBLIC_SUPABASE_ANON_KEY=""
RESEND_API_KEY="server-only-resend-key"
LEAD_NOTIFICATION_FROM_EMAIL="Client Name <leads@clientdomain.com>"
LEAD_NOTIFICATION_TO_EMAIL="owner@clientdomain.com"
LEAD_CONFIRMATION_EMAIL_ENABLED="false"
OPENAI_API_KEY="server-only-openai-key"
OPENAI_REVIEW_MODEL="gpt-5.4-mini"
OPENAI_FOLLOW_UP_MODEL="gpt-5.4-mini"
```

Only variables prefixed with `NEXT_PUBLIC_` are intended for browser exposure. Keep `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, and `OPENAI_API_KEY` server-only in Vercel. Do not paste real secrets into `.env.example`, README files, screenshots, issue comments, or client-facing docs.

Production URL configuration:

- Set `NEXT_PUBLIC_SITE_URL` to the final Vercel or custom domain, including `https://`.
- This value controls canonical URLs, Open Graph URLs, `sitemap.xml`, `robots.txt`, and local business schema.
- If Vercel preview deployments show the production domain in metadata, that is expected when `NEXT_PUBLIC_SITE_URL` is set to the production URL.
- There are no hardcoded localhost URLs in the app code. `localhost` appears only in local development instructions.

Post-deployment smoke test:

- Open `/`, `/services`, `/contact`, `/privacy`, and `/terms`.
- Open `/sitemap.xml` and confirm URLs use the configured production domain.
- Open `/robots.txt` and confirm admin, tool, and API routes are disallowed.
- Submit a test lead from `/contact` and confirm it appears in Supabase.
- Confirm owner email notification behavior if Resend is configured.
- Open `/dashboard` while logged out and confirm it redirects to `/admin-login`.
- Log in with `ADMIN_PASSWORD`, then confirm `/dashboard`, `/review-generator`, `/follow-up-generator`, and `/settings` load.
- Generate one review response and one lead follow-up if `OPENAI_API_KEY` is configured.
- Click **Log out** and confirm protected pages redirect again.

Admin and API deployment notes:

- Admin pages are protected by middleware: `/dashboard`, `/review-generator`, `/follow-up-generator`, `/settings`, and legacy admin/tool redirects.
- Admin API routes and AI generator routes are also protected by middleware.
- Public lead submission uses `/api/leads`, validates on the server, stores through the Supabase service role key, and does not expose that key to the browser.
- AI routes call OpenAI from server route handlers only. The browser sends form input to the app API route, not directly to OpenAI.

Demo data safety:

- PeakForm Coaching is fictional demo data.
- Demo phone numbers, emails, testimonials, and URLs are placeholders.
- Replace demo business details, testimonials, FAQs, legal copy, service claims, and social links before launching a real client.
- The template does not include real secrets. Keep production secrets in Vercel environment variables.

## Vercel Troubleshooting

- **Build fails on Vercel:** run `npm run build` locally, commit the fix, and redeploy. Confirm dependencies are installed from `package-lock.json`.
- **Metadata, sitemap, or share previews show the wrong domain:** set `NEXT_PUBLIC_SITE_URL` to the real production URL and redeploy.
- **Lead form says storage is not configured:** add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel, run `supabase/schema.sql`, and redeploy.
- **Leads save but emails do not send:** configure `RESEND_API_KEY`, `LEAD_NOTIFICATION_FROM_EMAIL`, and `LEAD_NOTIFICATION_TO_EMAIL`. Verify the sending domain in Resend.
- **Admin login says it is not configured:** add `ADMIN_PASSWORD` and redeploy. Add `ADMIN_SESSION_SECRET` for a separate cookie signing secret.
- **Admin pages redirect unexpectedly after deploy:** confirm cookies are allowed, the site is served over HTTPS, and `ADMIN_SESSION_SECRET` did not change between deploy attempts.
- **AI generators show a configuration error:** add `OPENAI_API_KEY` as a server-only Vercel environment variable and redeploy.
- **AI generators return rate-limit errors:** wait and retry, or adjust OpenAI project limits and usage controls.
- **A server secret appears in browser code:** remove any `NEXT_PUBLIC_` prefix from server-only secrets, rotate the exposed secret, and redeploy.
- **A route works locally but not in production:** check Vercel Function logs for the specific API route and confirm the matching environment variables are set for the environment you deployed.

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

## Policy and Disclaimer Review

The privacy policy, terms/disclaimer page, and AI tool notices are starter templates. They are meant to explain common lead capture and AI draft workflows in plain English, not to provide legal advice.

Before launching for any client:

- Review [src/app/privacy/page.tsx](src/app/privacy/page.tsx) with the client and qualified counsel.
- Review [src/app/terms/page.tsx](src/app/terms/page.tsx) with the client and qualified counsel.
- Confirm the policy names the client's actual lead data, contact methods, third-party providers, AI usage, data retention, and privacy contact method.
- Confirm the terms/disclaimer match the client's actual services, credentials, payment terms, cancellation policy, and local rules.
- Make sure all AI-generated review responses and lead follow-ups are treated as drafts only.
- Remind the client that the template does not guarantee leads, sales, bookings, reviews, weight loss, health outcomes, pain relief, or fitness results.
- For med spas, chiropractors, physical therapy clinics, nutrition coaches, and other regulated services, confirm medical, health, aesthetic, and advertising claims with qualified professionals before launch.

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
- Drafts should avoid fake claims, legal advice, legal liability admissions, medical advice, medical claims, diagnoses, guaranteed outcomes, and specific weight loss or health promises.
- Drafts are suggestions only. The business owner is responsible for reviewing, editing, approving, and manually sending or posting them.
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
- Review `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, and AI tool disclaimers with the client and qualified counsel before launch

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
