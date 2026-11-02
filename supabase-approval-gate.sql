-- Enrolling in a course needs an APPROVED Learner application.
-- (Admins are exempt, so you can always preview the courses.)

-- 1) Where does this member stand?
--    Returns: approved | interview | under_review | pending | rejected | none
create or replace function public.learner_access()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case
    when auth.uid() is null then 'none'
    when public.is_admin() then 'approved'
    when not exists (
      select 1 from auth.identities i
      where i.user_id = auth.uid() and i.provider = 'google'
    ) then 'none'
    else coalesce((
      select a.status
      from public.applications a
      where a.category = 'learner'
        and lower(a.email) = lower(auth.email())
      order by case a.status
                 when 'approved' then 1
                 when 'interview' then 2
                 when 'under_review' then 3
                 when 'pending' then 4
                 else 5
               end,
               a.created_at desc
      limit 1
    ), 'none')
  end;
$$;

-- 2) Enrolling is refused unless approved
create or replace function public.enroll_in_course(p_course text)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_access text;
begin
  if auth.uid() is null then
    raise exception 'Please log in first';
  end if;

  v_access := public.learner_access();
  if v_access <> 'approved' then
    raise exception 'learner_not_approved:%', v_access;
  end if;

  insert into public.enrollments (user_id, course_slug)
  values (auth.uid(), p_course)
  on conflict (user_id, course_slug) do nothing;

  return true;
end;
$$;

-- 3) Lessons are only available while the member is approved
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
    and public.learner_access() = 'approved'
  order by e.created_at desc;
$$;

revoke all on function public.learner_access() from public;
revoke all on function public.enroll_in_course(text) from public;
revoke all on function public.my_courses() from public;
grant execute on function public.learner_access() to authenticated;
grant execute on function public.enroll_in_course(text) to authenticated;
grant execute on function public.my_courses() to authenticated;

notify pgrst, 'reload schema';
