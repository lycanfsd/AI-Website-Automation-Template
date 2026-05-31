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
OPENAI_API_KEY=""
```

`OPENAI_API_KEY` is optional and unused by the default template. It is documented for future live AI integrations.

## Customization checklist

- Update client details in `.env.local` and `src/config/site.ts`
- Replace service copy in `src/lib/demo-data.ts`
- Replace `public/images/peakform-hero.png` with a client-specific hero image
- Connect `src/components/booking-form.tsx` to the client's CRM, email, or booking tool
- Add authentication and database storage before using `src/app/admin/leads/page.tsx` in production
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
