-- ORDEN DE EJECUCION: 3
-- POLITICAS DE PERFILES


create policy "profiles: select own or admin"
  on public.profiles for select
  to authenticated
  using (id = (select auth.uid()) or public.is_admin());

create policy "profiles: update own"
  on public.profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- Defensa por columna: cerramos UPDATE por completo y reabrimos
-- solo la columna que un usuario debería poder tocar de sí mismo.
-- Esto es lo que impide "update profiles set role = 'admin' ...".
revoke update on public.profiles from authenticated;
grant update (full_name) on public.profiles to authenticated;