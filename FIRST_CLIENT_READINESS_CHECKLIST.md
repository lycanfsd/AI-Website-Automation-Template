# First Client Readiness Checklist

Use this checklist before selling or launching the first beta ClientFlow AI Setup.

## Honest Readiness Status

The template is ready for a first beta client if the offer is positioned as a starter setup, not a guaranteed marketing machine.

It is strongest as:

- A mobile-first lead capture website setup
- A simple lead tracker
- A basic owner notification system
- A starter admin dashboard
- AI-assisted draft tools for review responses and lead follow-up
- A beginner-friendly local business website foundation

It is not yet a full agency platform, full CRM, marketing automation suite, or advanced compliance product.

## Must Complete Before Selling The First Beta

- [ ] Define the beta offer clearly.
- [ ] Set one fixed starter scope.
- [ ] Set one included revision round.
- [ ] Use the service scope document before payment.
- [ ] Use the intake form before starting.
- [ ] Explain that AI tools create drafts only.
- [ ] Explain that no leads, sales, rankings, or health outcomes are guaranteed.
- [ ] Explain that automatic DMs, SMS, paid ads, and full SEO campaigns are not included.
- [ ] Decide whether the beta includes monthly maintenance or only launch handoff.
- [ ] Decide how you will securely deliver admin credentials.

## Must Complete Before Building A Client Version

- [ ] Duplicate the template into a separate client repo or folder.
- [ ] Update `src/config/client.ts`.
- [ ] Choose or edit the correct niche preset in `src/config/client-presets.ts`.
- [ ] Replace PeakForm Coaching demo details.
- [ ] Replace demo services with real client services.
- [ ] Replace demo testimonials with approved testimonials, or remove/soften testimonial claims.
- [ ] Replace demo FAQs with client-specific FAQs.
- [ ] Update privacy policy and terms/disclaimer reminders.
- [ ] Add client logo or confirm text logo.
- [ ] Review brand colors in `tailwind.config.ts`.
- [ ] Update SEO title, description, city, service area, and production URL.
- [ ] Confirm all service claims are compliant for the client's industry.

## Must Complete Before Launch

- [ ] Run `npm run lint`.
- [ ] Run `npm run typecheck`.
- [ ] Run `npm run build`.
- [ ] Set Vercel environment variables.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final production URL.
- [ ] Set `ADMIN_PASSWORD`.
- [ ] Set `ADMIN_SESSION_SECRET`.
- [ ] Create the client Supabase project.
- [ ] Run `supabase/schema.sql`.
- [ ] Set `SUPABASE_URL`.
- [ ] Set `SUPABASE_SERVICE_ROLE_KEY`.
- [ ] Configure Resend or the chosen email provider.
- [ ] Set owner notification email variables.
- [ ] Verify email sending domain if using a client domain.
- [ ] Set `OPENAI_API_KEY`.
- [ ] Confirm the configured OpenAI model works in production.
- [ ] Deploy to Vercel.
- [ ] Submit a real test lead.
- [ ] Confirm the test lead appears in Supabase.
- [ ] Confirm the test lead appears in the dashboard.
- [ ] Confirm owner email notification arrives.
- [ ] Test review response generator.
- [ ] Test lead follow-up generator.
- [ ] Test logout.
- [ ] Confirm protected pages redirect when logged out.
- [ ] Test homepage, services page, and contact page on a real phone.
- [ ] Open `/sitemap.xml`.
- [ ] Open `/robots.txt`.
- [ ] Review privacy and terms pages with the client.

## Manual Test Script

Use this exact flow before launch:

1. Open the homepage on mobile.
2. Tap the main CTA.
3. Submit an invalid form and confirm validation appears.
4. Submit a valid test lead.
5. Confirm success message appears.
6. Confirm owner email arrives.
7. Log in to `/dashboard`.
8. Find the test lead.
9. Change the lead status.
10. Add internal notes.
11. Save and refresh.
12. Open `/review-generator`.
13. Generate a positive review response.
14. Generate a negative review response.
15. Open `/follow-up-generator`.
16. Generate an email follow-up.
17. Generate an SMS or Instagram DM style follow-up.
18. Log out.
19. Open `/dashboard` again and confirm it redirects.
20. Check mobile layout one last time.

## What To Include In The First Beta Offer

- Mobile-first landing page or homepage refresh
- Services page
- Contact/booking page
- Lead capture form
- Lead tracker/dashboard
- Owner email notifications
- AI review response generator
- AI lead follow-up generator
- Basic SEO setup
- Privacy and terms/disclaimer templates
- One revision round
- Launch checklist
- Client handoff guide
- Short walkthrough or handoff email

## What Not To Include Yet

- Guaranteed leads or sales
- Guaranteed SEO rankings
- Full SEO campaign
- Paid ads
- Social media management
- Automatic review posting
- Automatic Instagram DMs
- SMS campaigns
- Full custom CRM
- Mobile app
- Multi-user role system
- Advanced analytics dashboard
- Unlimited revisions
- Regulated medical/legal copy approval
- Long-term support unless paid maintenance is included

## Client Promises To Avoid

Do not promise:

- "This will get you leads."
- "This will rank you on Google."
- "This will automate your customer follow-up."
- "This will post review responses for you."
- "This will send Instagram DMs automatically."
- "This will replace your CRM."
- "This will guarantee weight loss, pain relief, or health outcomes."
- "This is legally compliant for your clinic."
- "You can request unlimited changes."

Safer language:

- "This gives you a cleaner lead capture foundation."
- "This helps make the next step clearer for mobile visitors."
- "This helps you respond faster with AI-assisted drafts."
- "This includes basic on-page SEO foundations, not a full SEO campaign."
- "The AI tools create drafts for you to review and use manually."

## $497 Readiness

Before charging `$497`, keep the offer narrow.

Recommended scope:

- One landing page or homepage refresh
- Contact form
- Lead notifications
- Basic lead tracker
- AI draft tools
- Basic SEO
- One revision round
- Handoff guide

Required quality bar:

- All forms tested
- Supabase tested
- Email tested
- Admin login tested
- AI tools tested
- Mobile tested
- Clear exclusions in writing

## $997 Readiness

Before charging `$997`, improve the client experience.

Recommended improvements:

- Stronger onboarding process
- More polished proposal and scope docs
- Better client-specific copy
- Real client testimonials or a testimonial placeholder strategy
- Short walkthrough video
- More thorough launch QA
- Cleaner before/after positioning
- Optional 14-day post-launch support window
- Better maintenance upsell

Do not add major automation yet unless separately scoped.

## $1,500+ Readiness

Before charging `$1,500+`, the offer should feel more complete and less fragile.

Recommended improvements:

- Proper production auth such as Supabase Auth, Clerk, or Auth.js
- Stronger spam prevention such as Turnstile
- Analytics setup and conversion tracking
- Better design customization per client
- More robust CRM or booking integration options
- Automated test coverage for critical flows
- More complete legal/compliance review workflow
- Clear monthly support package
- Optional reporting dashboard or monthly performance email

At this price, clients will expect more confidence, process, and polish.

## Remaining Risk Notes

- Starter admin password auth is acceptable for beta demos, but not ideal for larger teams.
- Supabase service role key must stay server-only.
- Email delivery depends on provider configuration and domain verification.
- AI output quality depends on prompt inputs and model availability.
- The client must review all AI-generated text before use.
- Medical, fitness, nutrition, and wellness claims need careful review.
- A real phone test is still necessary before every launch.

## Final Go/No-Go

Go for first beta only if:

- [ ] Scope is narrow.
- [ ] Price matches the starter nature of the offer.
- [ ] Client understands exclusions.
- [ ] You have tested the live form, dashboard, email, and AI tools.
- [ ] You have a clear revision policy.
- [ ] You have a handoff process.

Do not launch if:

- [ ] Lead form has not been tested.
- [ ] Owner notifications have not been tested.
- [ ] Admin dashboard has not been tested.
- [ ] AI tools have not been tested.
- [ ] Demo copy is still live.
- [ ] Client expects guaranteed results.
- [ ] Client expects automated messaging or posting.
- [ ] Client needs regulated compliance review you cannot provide.
