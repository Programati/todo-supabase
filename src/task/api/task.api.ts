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
