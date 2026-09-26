import { redirect } from "react-router";
import { supabase } from "@/lib/supabase";

export async function requireSession() {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    throw redirect("/login");
  }

  return data.session;
}
