# New Client Setup Guide

Use this guide when reusing the ClientFlow AI template for a new fitness or wellness client.

This assumes the service being delivered is a ClientFlow AI Setup: a mobile-first lead-booking website plus simple AI-assisted tools for lead follow-up and review response drafting.

## 1. Duplicate The Repo Or Project

Recommended workflow:

1. Create a new repository for the client.
2. Copy this template into that repository.
3. Keep the new client project separate from the original template.
4. Install dependencies.
5. Run the app locally before editing client content.

Example:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Before making client edits, confirm the demo site loads.

## 2. Files To Edit First

Start with these files:

```text
src/config/client.ts
src/config/client-presets.ts
tailwind.config.ts
.env.local
public/images/
README.md
CLIENT_HANDOFF.md
LAUNCH_CHECKLIST.md
```

Most client-facing business content comes from:

```text
src/config/client.ts
src/config/client-presets.ts
```

Environment-specific secrets and deployment values go in:

```text
.env.local
Vercel Project Settings > Environment Variables
```

Do not commit `.env.local`.

## 3. Update Client Config

Open:

```text
src/config/client.ts
```

Choose the closest niche preset:

```ts
const activePreset: ClientPresetKey = "personalTrainer";
```

Available presets:

```text
personalTrainer
smallGym
medSpa
chiropractor
physicalTherapy
yogaPilates
nutritionCoach
```

Then update or override the client details:

- `businessName`
- `tagline`
- `industry`
- `location`
- `phone`
- `email`
- `address`
- `websiteUrl`
- `bookingUrl`
- `instagramUrl`
- `facebookUrl`
- `logoText`
- `logoPath`
- `primaryCTA`
- `secondaryCTA`
- `serviceArea`
- `hours`
- `offer`
- `services`
- `testimonials`
- `faqs`
- `seoTitle`
- `seoDescription`

Some values can also be set with `NEXT_PUBLIC_` environment variables. This is useful when the same code needs different production contact values.

## 4. Update Logo And Brand Colors

### Logo Text

For a simple text logo, update:

```ts
logoText: "PC"
```

### Logo Image

Add the logo file to:

```text
public/images/
```

Example:

```text
public/images/client-logo.png
```

Then set:

```ts
logoPath: "/images/client-logo.png"
```

### Brand Colors

Update brand reference values in the client preset:

```ts
brandColors: {
  primary: "#168456",
  secondary: "#c8763c",
  dark: "#17211d",
}
```

Those values are helpful for documentation and handoff.

To change the actual UI colors, edit:

```text
tailwind.config.ts
```

The main color tokens are:

```ts
brand
copper
ink
```

Keep the palette readable, accessible, and professional. After changing colors, check buttons, forms, dark sections, and mobile contrast.

## 5. Update Services

Services are controlled by the active preset in:

```text
src/config/client-presets.ts
```

Each service usually includes:

- `title`
- `description`
- `bestFor`
- `highlights`
- `icon`

Keep service names clear and client-approved.

Good examples:

- 1-on-1 Personal Training
- Nutrition Coaching
- Physical Therapy Evaluation
- New Client Consultation
- Strength and Mobility Program

Avoid medical or guaranteed-result claims unless the client has approved compliant wording.

## 6. Update Testimonials

Testimonials are controlled by the client preset.

Replace demo testimonials with approved client testimonials or reviews.

For each testimonial, confirm:

- The client has permission to use it.
- The attribution is approved.
- The quote does not make unsupported medical, legal, or guaranteed-result claims.
- Any transformation or health claim is compliant for that business type.

If the client does not have testimonials yet, use a softer trust section instead of pretending testimonials exist.

## 7. Update FAQs

FAQs are controlled by the client preset and supporting page data.

Good FAQ topics:

- How consultations work
- What happens after submitting the form
- Who the service is for
- Pricing or starting point, if client wants it public
- Cancellation policy
- Insurance or payment questions, if relevant
- Medical or clinical disclaimers, if relevant

Keep answers short, specific, and plain-English.

## 8. Update SEO Metadata

Start in:

```text
src/config/client.ts
src/config/client-presets.ts
```

Update:

- `seoTitle`
- `seoDescription`
- `websiteUrl`
- `location`
- `serviceArea`
- `businessName`
- `industry`

Also set in environment variables:

```text
NEXT_PUBLIC_SITE_URL="https://www.clientdomain.com"
```

This affects:

- Canonical URLs
- Open Graph URLs
- Sitemap
- Robots file
- Local business schema

Do not promise SEO rankings. This template includes basic on-page SEO foundations only.

## 9. Set Environment Variables

Copy:

```text
.env.example
```

Create:

```text
.env.local
```

Recommended variables:

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

Only variables beginning with `NEXT_PUBLIC_` are safe for browser exposure.

Never expose:

- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `OPENAI_API_KEY`

## 10. Connect Supabase

1. Create a new Supabase project for the client.
2. Open the Supabase SQL editor.
3. Run:

```text
supabase/schema.sql
```

4. Copy the project URL into:

```text
SUPABASE_URL
```

5. Copy the service role key into:

```text
SUPABASE_SERVICE_ROLE_KEY
```

6. Keep the service role key server-only.
7. Submit a test lead after deployment.
8. Confirm the lead appears in Supabase and in the dashboard.

The app uses the service role key from server API routes. Do not import it into client components.

## 11. Connect Email Notifications

This template supports Resend for owner email notifications.

Steps:

1. Create or open a Resend account.
2. Verify the client's sending domain if using a client domain.
3. Create an API key.
4. Set:

```text
RESEND_API_KEY
LEAD_NOTIFICATION_FROM_EMAIL
LEAD_NOTIFICATION_TO_EMAIL
```

5. Submit a test lead.
6. Confirm the owner email arrives.

Optional confirmation emails:

```text
LEAD_CONFIRMATION_EMAIL_ENABLED="true"
```

Only enable confirmation emails if the client approves the wording and sender address.

## 12. Connect OpenAI API

Set:

```text
OPENAI_API_KEY
```

Optional:

```text
OPENAI_REVIEW_MODEL
OPENAI_FOLLOW_UP_MODEL
```

The Review Response Generator and Lead Follow-up Generator call OpenAI from server API routes only. The browser never receives the OpenAI API key.

Test after deployment:

1. Log in as admin.
2. Open `/review-generator`.
3. Generate a response for a positive review.
4. Generate a response for a negative review.
5. Open `/follow-up-generator`.
6. Generate an email follow-up.
7. Generate an SMS or Instagram DM style follow-up.

Important: AI outputs are drafts only. The client must review and edit before posting or sending.

## 13. Deploy To Vercel

1. Push the client project to a Git repo.
2. Open Vercel.
3. Choose **Add New Project**.
4. Import the repo.
5. Keep the framework preset as Next.js.
6. Use the default install command or `npm install`.
7. Use:

```bash
npm run build
```

8. Add all required environment variables in Vercel.
9. Deploy.
10. Redeploy after changing environment variables.

Before launch, confirm:

- `NEXT_PUBLIC_SITE_URL` uses the final production URL.
- `ADMIN_PASSWORD` is strong.
- `ADMIN_SESSION_SECRET` is set.
- Supabase variables are set.
- Resend variables are set if email notifications are included.
- OpenAI key is set if AI generators are included.

## 14. Test Before Launch

Run locally:

```bash
npm run lint
npm run typecheck
npm run build
```

Then test the deployed site:

- Open `/`
- Open `/services`
- Open `/contact`
- Open `/privacy`
- Open `/terms`
- Open `/sitemap.xml`
- Open `/robots.txt`
- Submit a real test lead
- Confirm Supabase stores the lead
- Confirm owner email notification arrives
- Log in to `/dashboard`
- Confirm the lead appears in the dashboard
- Update lead status
- Add internal notes
- Open `/review-generator`
- Generate and copy a review response
- Open `/follow-up-generator`
- Generate and copy a lead follow-up
- Log out
- Confirm protected pages redirect to `/admin-login`
- Test on a real phone

## 15. Hand Off To Client

Before handoff, prepare:

- Website URL
- Admin login URL
- Admin password delivery method
- Client handoff guide
- Launch checklist
- Privacy policy reminder
- Terms/disclaimer reminder
- AI usage reminder
- Maintenance offer

Useful files:

```text
CLIENT_HANDOFF.md
LAUNCH_CHECKLIST.md
business-docs/LAUNCH_EMAIL.md
business-docs/MONTHLY_MAINTENANCE_OFFER.md
business-docs/SUPPORT_BOUNDARIES.md
business-docs/OFFBOARDING_HANDOFF.md
```

Remind the client:

- AI tools do not automatically post or message anyone.
- AI drafts must be reviewed before use.
- The site does not guarantee leads, sales, rankings, or health outcomes.
- Policies should be reviewed by the client's qualified advisor.

## 16. Common Mistakes To Avoid

Avoid these:

- Editing many page files instead of starting with `src/config/client.ts`.
- Forgetting to update `NEXT_PUBLIC_SITE_URL`.
- Leaving PeakForm Coaching demo copy in a client launch.
- Using fake testimonials.
- Committing `.env.local`.
- Prefixing server secrets with `NEXT_PUBLIC_`.
- Forgetting to run `supabase/schema.sql`.
- Using the Supabase anon key where the service role key is required server-side.
- Forgetting to verify the Resend sending domain.
- Enabling lead confirmation emails before the client approves the copy.
- Promising leads, sales, rankings, weight loss, pain relief, or health outcomes.
- Treating AI-generated messages as final copy.
- Forgetting to test the dashboard while logged out.
- Forgetting to test on a real phone.
- Giving clients unlimited revisions when the package includes one revision round.

## Final Pre-Client Checklist

- [ ] Client config updated.
- [ ] Brand colors reviewed.
- [ ] Logo added or text logo approved.
- [ ] Services updated.
- [ ] Testimonials approved.
- [ ] FAQs updated.
- [ ] SEO metadata updated.
- [ ] `.env.local` created locally.
- [ ] Vercel environment variables set.
- [ ] Supabase schema created.
- [ ] Owner notification email tested.
- [ ] AI generators tested.
- [ ] Admin protection tested.
- [ ] Mobile layout tested.
- [ ] Client handoff docs prepared.
