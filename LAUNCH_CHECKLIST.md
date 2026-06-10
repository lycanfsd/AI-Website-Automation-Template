# Launch Checklist

Client: [Client Business Name]  
Website: [Website URL]  
Launch date: [Launch Date]  
Prepared by: [Your Name / Agency Name]

## Business Details

- [ ] Business name is correct.
- [ ] Tagline is correct.
- [ ] Industry or niche is correct.
- [ ] Service area or city is correct.
- [ ] Phone number is correct.
- [ ] Email address is correct.
- [ ] Address or service-area description is correct.
- [ ] Hours are correct.
- [ ] Booking link is correct, if used.
- [ ] Instagram URL is correct, if used.
- [ ] Facebook URL is correct, if used.

## Website Pages

- [ ] Homepage reviewed.
- [ ] Services page reviewed.
- [ ] Contact/booking page reviewed.
- [ ] Privacy policy reviewed.
- [ ] Terms/disclaimer page reviewed.
- [ ] Footer contact details reviewed.
- [ ] Header navigation reviewed.
- [ ] Mobile layout reviewed.
- [ ] Desktop layout reviewed.

## Copy and Content

- [ ] Services match the client's actual offers.
- [ ] Testimonials are approved for use.
- [ ] FAQs are accurate.
- [ ] Calls to action are correct.
- [ ] No unapproved medical, legal, weight-loss, health, aesthetic, or guaranteed-result claims.
- [ ] Placeholder demo copy has been removed or approved.
- [ ] Client has reviewed all visible website copy.

## Lead Capture

- [ ] Contact form submits successfully.
- [ ] Required fields validate correctly.
- [ ] Consent checkbox appears on the form.
- [ ] Spam honeypot field is present.
- [ ] Test lead appears in Supabase.
- [ ] Duplicate rapid submissions are handled reasonably.
- [ ] Success message appears after submission.
- [ ] Error message appears if submission fails.

## Admin Dashboard

- [ ] `ADMIN_PASSWORD` is configured.
- [ ] `ADMIN_SESSION_SECRET` is configured.
- [ ] `/dashboard` redirects to login when logged out.
- [ ] Admin login works.
- [ ] Dashboard loads leads.
- [ ] Search works.
- [ ] Status filters work.
- [ ] Lead detail drawer opens.
- [ ] Lead status can be updated.
- [ ] Internal notes can be saved.
- [ ] Logout works.

## Email Notifications

- [ ] Resend API key is configured, if notifications are enabled.
- [ ] From email is verified with the email provider.
- [ ] Owner notification email is correct.
- [ ] Test owner notification is received.
- [ ] Optional lead confirmation email setting is correct.
- [ ] Email failure does not block lead capture.

## AI Tools

- [ ] OpenAI API key is configured, if AI tools are enabled.
- [ ] Review response generator loads only after admin login.
- [ ] Review response generator creates an editable draft.
- [ ] Lead follow-up generator loads only after admin login.
- [ ] Lead follow-up generator creates an editable draft.
- [ ] AI disclaimers are visible.
- [ ] Client understands drafts must be reviewed before use.
- [ ] Client understands AI tools do not automatically post or message customers.

## SEO and Sharing

- [ ] `NEXT_PUBLIC_SITE_URL` is set to the production URL.
- [ ] Page titles and descriptions are reviewed.
- [ ] Open Graph preview is reviewed.
- [ ] Sitemap loads at `/sitemap.xml`.
- [ ] Robots file loads at `/robots.txt`.
- [ ] Local business schema uses correct business details.
- [ ] Contact details are crawlable text on the website.

## Legal and Policy Review

- [ ] Privacy policy reviewed by client.
- [ ] Terms/disclaimer reviewed by client.
- [ ] Client understands templates are not legal advice.
- [ ] Client has been advised to review policies with qualified counsel.
- [ ] Regulated service claims are reviewed by the appropriate professional.
- [ ] Data collection and third-party providers are accurately described.

## Vercel Deployment

- [ ] Repository is connected to Vercel.
- [ ] Build command is `npm run build`.
- [ ] Framework preset is Next.js.
- [ ] Environment variables are added in Vercel.
- [ ] Production domain is connected.
- [ ] HTTPS is active.
- [ ] Deployment build completes successfully.
- [ ] Production smoke test completed.

## Final Handoff

- [ ] Client received website URL.
- [ ] Client received admin login URL.
- [ ] Client received admin password through a secure channel.
- [ ] Client received handoff guide.
- [ ] Client received revision request template.
- [ ] Client knows how to request support.
- [ ] Client understands what is included after launch.
- [ ] Client understands what is not included.

