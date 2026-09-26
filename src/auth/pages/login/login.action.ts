import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";
import { signIn } from "@/auth/api/auth.api";
import { queryClient } from "@/lib/query-client";

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));

  try {
    await signIn(email, password);
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "No se pudo iniciar sesión",
    );
    return null;
  }

  // Borramos lo que había en caché, ya que puede ser info sensible de otro usuario.
  queryClient.clear();

  return redirect("/");
}
