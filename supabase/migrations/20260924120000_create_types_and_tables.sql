-- ORDEN DE EJECUCION: 1

-- ============ TIPOS ============
create type public.app_role as enum ('admin', 'user');
create type public.task_status as enum ('pending', 'completed');

-- ============ TABLAS ============
create table public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  full_name   text,
  role        public.app_role not null default 'user',
  created_at  timestamptz not null default now()
);

create table public.tasks (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null default auth.uid()
                  references public.profiles (id) on delete cascade,
  title         text not null check (char_length(title) between 1 and 200),
  description   text,
  status        public.task_status not null default 'pending',
  created_at    timestamptz not null default now(),
  completed_at  timestamptz
);

create index tasks_user_id_idx on public.tasks (user_id);

-- ============ SEGURIDAD ============
-- RLS activado y SIN políticas = nadie (vía API) puede leer ni escribir.
-- Las políticas se agregan en la Parte B.
alter table public.profiles enable row level security;
alter table public.tasks    enable row level security;