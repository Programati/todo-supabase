import { supabase } from "@/lib/supabase";
import type { Tables } from "@/types/database-helpers";

export type Profile = Tables<"profiles">;

export async function getProfile(userId: string): Promise<Profile> {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) throw error;
  return data;
}
