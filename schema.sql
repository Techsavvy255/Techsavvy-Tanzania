-- =====================================================
-- TECHSAVVY TANZANIA — Join Us 2.0 Database Schema
-- Run this once in Supabase: Project > SQL Editor > New query > Run
-- =====================================================

create extension if not exists pgcrypto;

-- 1. APPLICATIONS TABLE
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  application_number text unique,
  category text not null check (category in ('learner','team_member','volunteer','mentor','partner','sponsor')),
  full_name text not null,
  email text not null,
  phone text,
  details jsonb not null default '{}'::jsonb,
  status text not null default 'pending' check (status in ('pending','under_review','interview','approved','rejected')),
  admin_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. STATUS HISTORY TABLE
create table if not exists application_status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references applications(id) on delete cascade,
  old_status text,
  new_status text not null,
  note text,
  changed_by text,
  changed_at timestamptz not null default now()
);

-- 3. ADMIN USERS TABLE (emails allowed to access the dashboard)
create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now()
);

-- 4. AUTO-GENERATE APPLICATION NUMBER (e.g. TS-2026-A1B2C3)
create or replace function generate_application_number()
returns trigger as $$
begin
  new.application_number := 'TS-' || to_char(now(),'YYYY') || '-' || upper(substr(md5(random()::text),1,6));
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_application_number on applications;
create trigger set_application_number
before insert on applications
for each row execute function generate_application_number();

-- 5. AUTO-LOG STATUS CHANGES
create or replace function log_status_change()
returns trigger as $$
begin
  if old.status is distinct from new.status then
    insert into application_status_history(application_id, old_status, new_status, changed_by)
    values (new.id, old.status, new.status, auth.email());
  end if;
  new.updated_at := now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists on_status_change on applications;
create trigger on_status_change
before update on applications
for each row execute function log_status_change();

-- 6. ROW LEVEL SECURITY
alter table applications enable row level security;
alter table application_status_history enable row level security;
alter table admin_users enable row level security;

-- Public (anon) can INSERT a new application, but cannot read the table directly
drop policy if exists "public can submit applications" on applications;
create policy "public can submit applications"
on applications for insert
to anon
with check (true);

-- Admins (logged in, listed in admin_users) can read/update everything
drop policy if exists "admins can read applications" on applications;
create policy "admins can read applications"
on applications for select
to authenticated
using (exists (select 1 from admin_users a where a.email = auth.email()));

drop policy if exists "admins can update applications" on applications;
create policy "admins can update applications"
on applications for update
to authenticated
using (exists (select 1 from admin_users a where a.email = auth.email()))
with check (exists (select 1 from admin_users a where a.email = auth.email()));

drop policy if exists "admins can read history" on application_status_history;
create policy "admins can read history"
on application_status_history for select
to authenticated
using (exists (select 1 from admin_users a where a.email = auth.email()));

drop policy if exists "system can insert history" on application_status_history;
create policy "system can insert history"
on application_status_history for insert
to authenticated
with check (true);

drop policy if exists "admins manage admin_users" on admin_users;
create policy "admins manage admin_users"
on admin_users for select
to authenticated
using (exists (select 1 from admin_users a where a.email = auth.email()));

-- 7. SAFE PUBLIC TRACKING FUNCTION
-- Lets an applicant check their status using ONLY their Application Number,
-- without exposing the full applications table to the public.
create or replace function track_application(p_number text)
returns table(application_number text, category text, full_name text, status text, created_at timestamptz)
language sql
security definer
set search_path = public
as $$
  select application_number, category, full_name, status, created_at
  from applications
  where application_number = p_number;
$$;

grant execute on function track_application(text) to anon;

-- =====================================================
-- AFTER RUNNING THIS SQL:
-- 1. Go to Authentication > Users in Supabase, create your admin login
--    (email + password) manually.
-- 2. Run this (replace with your real admin email):
--    insert into admin_users(email) values ('your-admin-email@example.com');
-- =====================================================
