-- ORDEN DE EJECUCION: 4 
-- POLITICAS DE LAS TAREAS


create policy "tasks: select own or admin"
  on public.tasks for select
  to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());

create policy "tasks: insert own"
  on public.tasks for insert
  to authenticated
  with check (user_id = (select auth.uid()));

create policy "tasks: update own"
  on public.tasks for update
  to authenticated
  using (user_id = (select auth.uid()))
  with check (user_id = (select auth.uid()));

create policy "tasks: delete own"
  on public.tasks for delete
  to authenticated
  using (user_id = (select auth.uid()));