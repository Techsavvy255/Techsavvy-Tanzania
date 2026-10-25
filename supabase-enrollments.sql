-- Course enrollment: members enroll themselves; each member only ever sees their own rows
create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  course_slug text not null
    check (course_slug in ('ai-chatgpt','web-development','graphic-design','networking','cybersecurity','digital-marketing','content-creation','programming','computer-fundamentals')),
  status text not null default 'enrolled' check (status in ('enrolled','completed')),
  created_at timestamptz not null default now(),
  unique (user_id, course_slug)
);

alter table public.enrollments enable row level security;
-- No direct-access policies on purpose: members use the two functions below.

create or replace function public.enroll_in_course(p_course text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'Please log in first';
  end if;

  insert into public.enrollments (user_id, course_slug)
  values (auth.uid(), p_course)
  on conflict (user_id, course_slug) do nothing;

  return true;
end;
$$;

create or replace function public.my_courses()
returns table (course_slug text, status text, enrolled_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select e.course_slug, e.status, e.created_at
  from public.enrollments e
  where e.user_id = auth.uid()
  order by e.created_at desc;
$$;

revoke all on function public.enroll_in_course(text) from public;
revoke all on function public.my_courses() from public;
grant execute on function public.enroll_in_course(text) to authenticated;
grant execute on function public.my_courses() to authenticated;
