import type { Database } from "./database.types";

// Tables<"tasks"> = la forma de una fila de la tabla "tasks"
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
