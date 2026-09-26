import { redirect } from "react-router";
import { signOut } from "@/auth/api/auth.api";
import { queryClient } from "@/lib/query-client";
import { useSessionStore } from "@/stores/session.store";

export async function logoutAction() {
  await signOut();
  useSessionStore.getState().setUserId(null); // redundante con la suscripción, pero explícito
  queryClient.clear();
  return redirect("/login");
}

export function logoutLoader() {
  return redirect("/");
}
