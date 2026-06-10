# Quick Start: Reuse This Template For A New Client

Use this when you already know the process and just need the short checklist.

## 1. Duplicate

Create a new repo or project folder for the client. Do not overwrite the original template.

```bash
npm install
npm run dev
```

Confirm the demo site loads at:

```text
http://localhost:3000
```

## 2. Edit These First

```text
src/config/client.ts
src/config/client-presets.ts
tailwind.config.ts
.env.local
public/images/
```

Most content starts in `src/config/client.ts`.

## 3. Pick A Preset

In `src/config/client.ts`, set:

```ts
const activePreset: ClientPresetKey = "personalTrainer";
```

Options:

```text
personalTrainer
smallGym
medSpa
chiropractor
physicalTherapy
yogaPilates
nutritionCoach
```

## 4. Update Client Content

Update:

- Business name
- Tagline
- Location and service area
- Phone and email
- Address
- Hours
- CTA wording
- Offer
- Services
- Testimonials
- FAQs
- SEO title and description
- Social links

## 5. Brand Setup

Logo:

```text
public/images/client-logo.png
```

Config:

```ts
logoPath: "/images/client-logo.png"
```

Colors:

```text
tailwind.config.ts
```

Update `brand`, `copper`, and `ink` only if the UI palette should change.

## 6. Environment Variables

Copy:

```text
.env.example
```

Create:

```text
.env.local
```

Set:

```bash
NEXT_PUBLIC_SITE_URL="https://www.clientdomain.com"
ADMIN_PASSWORD="strong-password"
ADMIN_SESSION_SECRET="long-random-secret"
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="server-only-service-role-key"
RESEND_API_KEY="server-only-resend-key"
LEAD_NOTIFICATION_FROM_EMAIL="Client Name <leads@clientdomain.com>"
LEAD_NOTIFICATION_TO_EMAIL="owner@clientdomain.com"
OPENAI_API_KEY="server-only-openai-key"
```

Never commit `.env.local`.

Never prefix server secrets with `NEXT_PUBLIC_`.

## 7. Supabase

1. Create a client Supabase project.
2. Run `supabase/schema.sql`.
3. Add `SUPABASE_URL`.
4. Add `SUPABASE_SERVICE_ROLE_KEY`.
5. Test a real lead submission after deployment.

## 8. Email

1. Create or open Resend.
2. Verify the sending domain.
3. Add `RESEND_API_KEY`.
4. Add owner notification emails.
5. Submit a test lead and confirm the email arrives.

## 9. OpenAI

Add:

```text
OPENAI_API_KEY
```

Then test:

- `/review-generator`
- `/follow-up-generator`

AI outputs are drafts only. The client must review before using them.

## 10. Deploy

1. Push to GitHub, GitLab, or Bitbucket.
2. Import into Vercel.
3. Add all environment variables.
4. Build command:

```bash
npm run build
```

5. Deploy.

## 11. Test Before Launch

Run locally:

```bash
npm run lint
npm run typecheck
npm run build
```

Test live:

- Homepage
- Services
- Contact form
- Supabase lead storage
- Owner email notification
- Dashboard login
- Lead status update
- Review generator
- Follow-up generator
- Privacy and terms
- Sitemap and robots
- Mobile layout

## 12. Hand Off

Prepare:

- Website URL
- Admin login URL
- Secure admin password delivery
- `CLIENT_HANDOFF.md`
- `LAUNCH_CHECKLIST.md`
- Maintenance offer
- Support boundaries

Remind the client:

- AI tools do not automatically post or message customers.
- AI drafts must be reviewed before use.
- No leads, sales, SEO rankings, or health results are guaranteed.

## 13. Avoid These Mistakes

- Leaving demo copy live.
- Forgetting `NEXT_PUBLIC_SITE_URL`.
- Committing `.env.local`.
- Exposing service role, Resend, OpenAI, or admin secrets.
- Skipping Supabase schema setup.
- Skipping real test lead submission.
- Skipping mobile testing.
- Promising automatic DMs, SMS, or review posting.
- Offering unlimited revisions by accident.
