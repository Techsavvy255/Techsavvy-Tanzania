-- Members only see applications matched to their email when they signed in with Google
-- (Google has already verified that email address, so nobody can read someone else's applications).
create or replace function public.my_applications()
returns table (application_number text, category text, status text, created_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select a.application_number, a.category, a.status, a.created_at
  from public.applications a
  where lower(a.email) = lower(auth.email())
    and exists (
      select 1 from auth.identities i
      where i.user_id = auth.uid() and i.provider = 'google'
    )
  order by a.created_at desc;
$$;

revoke all on function public.my_applications() from public;
grant execute on function public.my_applications() to authenticated;

notify pgrst, 'reload schema';
