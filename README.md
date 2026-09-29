# TodoList-Supabase

Aplicación de gestión de tareas (to-do list) construida como proyecto de práctica para aprender el ecosistema moderno de React junto a Supabase como backend. Implementa autenticación real, seguridad a nivel de fila (Row Level Security) en Postgres, un panel de administración con roles, y una arquitectura pensada para separar claramente el estado del servidor, el estado del cliente y la navegación.

## Stack tecnológico

- **Frontend:** React 19 + TypeScript, inicializado con Vite
- **Enrutamiento:** React Router v7, en **Data Mode** (`createBrowserRouter`, `loader`s y `action`s)
- **Estado del servidor:** TanStack Query (caché, invalidación, sincronización con los loaders del router)
- **Estado del cliente:** Zustand (sesión del usuario, reactiva ante cambios externos vía `onAuthStateChange`)
- **Backend:** Supabase (Postgres, Auth, Row Level Security, funciones RPC)
- **Estilos y UI:** Tailwind CSS v4, shadcn/ui (sobre Base UI), Lucide Icons, Sonner (toasts)
- **Gestor de paquetes:** pnpm
- **Despliegue:** Vercel

## Funcionalidades

**Autenticación**

- Login con email y contraseña
- Rutas protegidas: sin sesión, redirige a `/login`; con sesión, `/login` redirige a `/`
- Logout, con limpieza de la caché de datos al cambiar de usuario

**Tareas**

- Crear, completar/reabrir y borrar tareas propias
- Confirmación antes de borrar (individual y en lote)
- Separadas en dos secciones: **Pendientes** y **Completadas** (ordenadas por fecha de completado)
- Borrado masivo de todas las tareas completadas
- Formulario de carga fijo abajo de la pantalla en mobile
- Actualizaciones optimistas en la interfaz (sin esperar la respuesta del servidor para reflejar el cambio)

**Panel de administración** (solo rol `admin`)

- Listado de todos los usuarios con métricas: tareas creadas, completadas y porcentaje de completado
- Cambio de rol de usuario (`user` ↔ `admin`)
- Alta de usuarios nuevos, con nombre completo opcional

**Seguridad**

- Toda la protección de datos está garantizada por **RLS en Postgres**, no solo por la interfaz — cada usuario únicamente puede leer y modificar sus propias tareas y su propio perfil, sin importar cómo se arme la petición
- Los administradores pueden leer los datos de todos los usuarios, nunca modificar tareas ajenas

## Estructura del proyecto

```
src/
├── admin/          # Panel de administración
├── auth/           # Login, logout, sesión, perfil
├── task/           # CRUD de tareas
├── app/            # Layout autenticado y Navbar (composición de features)
├── components/
│   ├── ui/         # Componentes de shadcn/ui
│   └── custom/     # Componentes propios reutilizables (loading, 404, error)
├── stores/         # Zustand
├── lib/            # Cliente de Supabase, query client, guards de sesión
└── types/          # Tipos generados desde el esquema de Supabase

supabase/
└── migrations/     # Esquema de base de datos, versionado
```

## Requisitos previos

- Node.js 20.19+ o 22.12+
- [pnpm](https://pnpm.io/installation)
- Una cuenta de [Supabase](https://supabase.com) (plan gratuito alcanza)

## Instalación

1. Cloná el repositorio e instalá las dependencias:

```bash
   git clone <url-del-repositorio>
   cd todo-supabase
   pnpm install
```

2. Creá un proyecto nuevo en el [dashboard de Supabase](https://supabase.com/dashboard).

3. En **Project Settings → API**, copiá la **Project URL** y la **Publishable key**.

4. Copiá `.env.example` a `.env.local` y completá con esos valores:

```bash
   cp .env.example .env.local
```

```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxxxxxxx
```

5. En **Authentication → Providers → Email**, desactivá **Confirm email** (recomendado para desarrollo, ya que evita depender del envío de mails de confirmación).

## Base de datos

El esquema completo vive en `supabase/migrations/`, como una serie de archivos SQL ordenados. Elegí **una** de las dos formas siguientes para aplicarlo — no hace falta hacer las dos.

### Opción A — SQL Editor (manual, sin instalar nada)

En el dashboard de Supabase, abrí **SQL Editor** y ejecutá el contenido de cada archivo de `supabase/migrations/`, **uno por uno y en orden** (el orden lo da el prefijo numérico del nombre del archivo).

### Opción B — Supabase CLI (recomendado)

```bash
pnpm exec supabase login
pnpm exec supabase link --project-ref TU_PROJECT_REF
pnpm exec supabase db push
```

El `project-ref` es el subdominio de tu Project URL (la parte antes de `.supabase.co`). Te va a pedir la contraseña de la base de datos que generaste al crear el proyecto. `db push` aplica todas las migraciones pendientes, en orden, y registra cuáles ya se ejecutaron.

Para migraciones futuras, este es el flujo a seguir: `pnpm exec supabase migration new nombre-del-cambio` crea un archivo nuevo, se escribe el SQL adentro, y `pnpm exec supabase db push` lo aplica.

### Crear el primer administrador

Los usuarios nuevos se crean con rol `user` por defecto. No hay registro público — los usuarios se dan de alta desde el panel de administración (Fase 7), lo cual requiere que exista al menos un admin primero. Para el primero, creá un usuario normal (desde **Authentication → Users → Add user**, con "Auto Confirm User" marcado) y asignale el rol a mano, una única vez:

```sql
update public.profiles set role = 'admin' where email = 'tu-email@ejemplo.com';
```

## Ejecutar en desarrollo

```bash
pnpm dev
```

## Build de producción

```bash
pnpm build
```

Genera los archivos estáticos en `dist/`. El proyecto incluye `vercel.json` con la configuración necesaria para que el ruteo del lado del cliente (React Router) funcione correctamente al desplegar en Vercel.

## Generar tipos de TypeScript desde la base de datos

Si modificás el esquema, regenerá los tipos para mantenerlos sincronizados:

```bash
pnpm exec supabase gen types typescript --project-id TU_PROJECT_REF --schema public > src/types/database.types.ts
```
