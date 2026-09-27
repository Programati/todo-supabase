import { supabase } from "@/lib/supabase";
import type { Tables } from "@/types/database-helpers";

export type Task = Tables<"tasks">;

export async function getTasks(): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createTask(title: string): Promise<void> {
  // user_id no se pasa: la columna tiene "default auth.uid()" desde la Fase 1
  const { error } = await supabase.from("tasks").insert({ title });
  if (error) throw error;
}

export async function setTaskStatus(
  id: string,
  status: "pending" | "completed",
): Promise<void> {
  const { error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", id)
    .select()
    .single(); // si RLS filtró la fila, esto convierte el silencio en un error real

  if (error) throw error;
}

export async function deleteTask(id: string): Promise<void> {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
}
