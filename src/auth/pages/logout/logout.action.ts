import { redirect } from "react-router";
import { signOut } from "@/auth/api/auth.api";
import { requireSession } from "@/lib/auth";
import { queryClient } from "@/lib/query-client";
import { useSessionStore } from "@/stores/session.store";

export async function logoutAction() {
  await requireSession(); // sin sesión, corta acá y manda a /login — ni intenta signOut()
  await signOut();
  useSessionStore.getState().setUserId(null); // redundante con la suscripción, pero explícito
  queryClient.clear();
  return redirect("/login");
}

export async function logoutLoader() {
  await requireSession(); // GET a /logout sin sesión → /login, en vez de "/"
  return redirect("/");
}
