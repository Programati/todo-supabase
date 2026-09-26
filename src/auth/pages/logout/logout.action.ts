import { redirect } from "react-router";
import { signOut } from "@/auth/api/auth.api";
import { queryClient } from "@/lib/query-client";

export async function logoutAction() {
  await signOut();
  queryClient.clear();
  return redirect("/login");
}

// Si alguien entra a "/logout" escribiendo la URL (GET, no POST),
// no hay acción que ejecutar — lo mandamos de vuelta al inicio.
export function logoutLoader() {
  return redirect("/");
}
