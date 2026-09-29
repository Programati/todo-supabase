import { redirect } from "react-router";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export async function requireSession() {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    throw redirect("/login");
  }

  return data.session;
}

export async function requireGuest() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    throw redirect("/");
  }
}

export async function requireAdmin() {
  const session = await requireSession();

  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", session.user.id)
    .single();

  if (error) throw error;

  if (data.role !== "admin") {
    toast.error("No tenés permisos de administrador");
    throw redirect("/");
  }

  return session;
}
