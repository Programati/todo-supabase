create function public.get_user_task_metrics()
returns table (
  user_id uuid,
  email text,
  full_name text,
  role public.app_role,
  tasks_created bigint,
  tasks_completed bigint
)
language sql
security invoker
stable
set search_path = ''
as $$
  select
    p.id as user_id,
    p.email,
    p.full_name,
    p.role,
    count(t.id) as tasks_created,
    count(t.id) filter (where t.status = 'completed') as tasks_completed
  from public.profiles p
  left join public.tasks t on t.user_id = p.id
  group by p.id, p.email, p.full_name, p.role
  order by p.email;
$$;

revoke execute on function public.get_user_task_metrics() from public;
grant execute on function public.get_user_task_metrics() to authenticated;