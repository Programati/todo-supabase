import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/database.types";
import type { Tables } from "@/types/database-helpers";

export type UserMetrics = {
  user_id: string;
  email: string;
  full_name: string | null;
  role: Tables<"profiles">["role"];
  tasks_created: number;
  tasks_completed: number;
};

export async function getUserMetrics(): Promise<UserMetrics[]> {
  const { data, error } = await supabase.rpc("get_user_task_metrics");
  if (error) throw error;
  return data;
}

export async function setUserRole(
  targetUserId: string,
  newRole: "admin" | "user",
) {
  const { error } = await supabase.rpc("set_user_role", {
    target_user_id: targetUserId,
    new_role: newRole,
  });
  if (error) throw error;
}

export async function createUserAsAdmin(email: string, password: string) {
  const tempClient = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );

  const { error } = await tempClient.auth.signUp({ email, password });
  if (error) throw error;
}
