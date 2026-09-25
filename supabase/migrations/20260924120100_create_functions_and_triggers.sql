-- ORDEN DE EJECUCION: 2

-- ============ 1) Crear el profile al registrarse ============
-- security definer: se ejecuta con los permisos de su dueño, no del usuario.
-- Necesario porque un usuario recién registrado aún no puede insertar en profiles.
-- set search_path = '': obliga a usar nombres completos (public.tabla),
-- una defensa estándar contra el secuestro de search_path.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============ 2) completed_at automático ============
create function public.set_completed_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if new.status = 'completed' and old.status is distinct from 'completed' then
    new.completed_at = now();
  elsif new.status <> 'completed' then
    new.completed_at = null;
  end if;
  return new;
end;
$$;

create trigger tasks_set_completed_at
  before update on public.tasks
  for each row execute function public.set_completed_at();

-- ============ 3) Helper: ¿el usuario actual es admin? ============
-- security definer para saltar RLS al consultar profiles y evitar la
-- recursión infinita cuando la use una política de la propia tabla profiles.
create function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;