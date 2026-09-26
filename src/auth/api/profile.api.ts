import { supabase } from "@/lib/supabase";
import type { Tables } from "@/types/database-helpers";

export type Profile = Tables<"profiles">;

export async function getMyProfile(): Promise<Profile> {
  const { data: sessionData } = await supabase.auth.getSession();
  const userId = sessionData.session?.user.id;

  if (!userId) throw new Error("No hay sesión activa");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}
