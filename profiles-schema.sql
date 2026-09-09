-- =====================================================
-- TECHSAVVY TANZANIA — Member Accounts (Profiles)
-- Run this in Supabase SQL Editor (after the main schema.sql)
-- =====================================================

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

drop policy if exists "users can view own profile" on profiles;
create policy "users can view own profile"
on profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "users can update own profile" on profiles;
create policy "users can update own profile"
on profiles for update
to authenticated
using (auth.uid() = id);

-- Auto-create a profile row whenever someone signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Let logged-in members see their OWN applications (matched by email)
drop policy if exists "members can view own applications" on applications;
create policy "members can view own applications"
on applications for select
to authenticated
using (email = auth.email());
