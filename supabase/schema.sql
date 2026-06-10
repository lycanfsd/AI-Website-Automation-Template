-- ClientFlow AI leads table for PeakForm Coaching.
-- Run this in the Supabase SQL editor for each client project.
-- The app writes from a server-only API route using SUPABASE_SERVICE_ROLE_KEY.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  preferred_service text not null,
  primary_goal text not null,
  timeline text not null,
  message text,
  source_page text not null default 'contact',
  status text not null default 'new',
  notes text,
  constraint leads_timeline_check check (
    timeline in ('ASAP', 'This week', 'This month', 'Just researching')
  ),
  constraint leads_status_check check (
    status in ('new', 'contacted', 'booked', 'closed', 'lost')
  )
);

alter table public.leads
  drop constraint if exists leads_preferred_service_check;

alter table public.leads
  drop constraint if exists leads_status_check;

update public.leads
set status = 'closed'
where status = 'won';

alter table public.leads
  add constraint leads_status_check check (
    status in ('new', 'contacted', 'booked', 'closed', 'lost')
  );

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

create index if not exists leads_status_idx
  on public.leads (status);

create index if not exists leads_recent_duplicate_idx
  on public.leads (email, phone, preferred_service, created_at desc);

alter table public.leads enable row level security;

comment on table public.leads is
  'Lead capture submissions from ClientFlow AI websites. Configure dashboard access policies before exposing this table to client-side reads.';

comment on column public.leads.status is
  'Default is new. Update to contacted, booked, closed, or lost as the lead moves through the pipeline.';
