-- ============ PREPARACION ============
-- Antes de hacer los TEST vamos a cargar manualmente los USUARIOS
-- 1_ Crea tres usuarios de prueba en Authentication → Users → Add user → Create new user. Si aparece la casilla Auto Confirm User, márcala:
--     ana@example.com, la que será admin
--     beto@example.com
--     carla@example.com
--     Usa contraseñas de prueba y no reutilices ninguna real.
-- ============ VERIFICACION DE USUARIOS CREADOS ============
-- 2_ Vuelve a Table Editor → profiles. Deben haber aparecido 3 filas automáticamente, todas con rol user. Eso confirma que el trigger funciona, porque tú no insertaste nada ahí.
-- ============ CONVERTIR UN USUARIO EN ADMIN ============
--     Convierte a Ana en admin. En el SQL Editor ejecuta:
update public.profiles set role = 'admin' where email = 'ana@example.com';

-- ============ CREAR TAREA DE PRUEBA ============
-- Prueba el trigger de completed_at. Ejecuta este bloque completo:
-- Crea una tarea para Beto (en el editor no hay usuario logueado, por eso indicamos user_id)
insert into public.tasks (user_id, title)
select id, 'Mi primera tarea' from public.profiles where email = 'beto@example.com';

-- Complétala
update public.tasks set status = 'completed' where title = 'Mi primera tarea';

select title, status, created_at, completed_at from public.tasks;
-- completed_at debe traer una fecha.
update public.tasks set status = 'pending' where title = 'Mi primera tarea';
select title, status, completed_at from public.tasks;
-- Ahora reábrela y verifica que vuelve a null






-- ============ PROBAR QUE RLS FUNCIONA DE VERDAD ============
-- Consigue los UUID de tus usuarios de prueba
select id, email, role from public.profiles order by email;



-- El patrón de simulación VIZUALIZAR autenticacion manual
begin;
  select set_config('request.jwt.claims', json_build_object(
    'sub', '<UUID_DEL_USUARIO>',
    'role', 'authenticated'
  )::text, true);
  set local role authenticated;

rollback;



-- ============ BATERIA DE PRUEBAS============
-- Test 1 — Sin sesión (rol anon), no debe ver nada:
-- Esperado: 0 filas, sin error. Confirma que nuestras políticas dicen to authenticated, y anon no tiene ninguna puerta abierta.
begin;
  set local role anon;
  select * from public.tasks;
rollback;


-- Test 2 — Beto crea su propia tarea (debe funcionar):
-- Esperado: la consulta muestra tareas de Beto anterires y esta nueva: COMPRAR CAFE.
begin;
  select set_config('request.jwt.claims', json_build_object(
    'sub', '<BETO_ID>', 'role', 'authenticated'
  )::text, true);
  set local role authenticated;

  insert into public.tasks (user_id, title) values ('<BETO_ID>', 'Comprar café');
  select id, title, user_id from public.tasks;
commit;


-- Test 3 — Beto intenta crear una tarea a nombre de Carla (debe fallar):
-- Esperado: error new row violates row-level security policy for table "tasks"
begin;
  select set_config('request.jwt.claims', json_build_object(
    'sub', '<BETO_ID>', 'role', 'authenticated'
  )::text, true);
  set local role authenticated;

  insert into public.tasks (user_id, title) values ('<CARLA_ID>', 'Tarea ajena');
rollback;

-- Test 4 — Beto ve solo sus tareas, no las de Carla:
-- Esperado: solo las tareas de Beto. Ninguna de otro usuario, aunque existan en la tabla.
begin;
  select set_config('request.jwt.claims', json_build_object(
    'sub', '<BETO_ID>', 'role', 'authenticated'
  )::text, true);
  set local role authenticated;

  select id, title, user_id from public.tasks;
rollback;

-- Test 5 — Beto intenta autoascenderse a admin (debe fallar):
-- Esperado: error permission denied for column role (o similar)
begin;
  select set_config('request.jwt.claims', json_build_object(
    'sub', '<BETO_ID>', 'role', 'authenticated'
  )::text, true);
  set local role authenticated;

  update public.profiles set role = 'admin' where id = '<BETO_ID>';
rollback;


-- Test 6 — Ana (admin) ve las tareas de todos:
-- Esperado: todas las tareas, gracias al or public.is_admin() en la política de select.
begin;
  select set_config('request.jwt.claims', json_build_object(
    'sub', '<ANA_ID>', 'role', 'authenticated'
  )::text, true);
  set local role authenticated;

  select id, title, user_id from public.tasks;
rollback;

