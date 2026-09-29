import type { ActionFunctionArgs } from "react-router";
import { toast } from "sonner";
import { createUserAsAdmin, setUserRole } from "@/admin/api/admin.api";
import { queryClient } from "@/lib/query-client";

export async function adminDashboardAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  try {
    switch (intent) {
      case "set-role": {
        const targetUserId = String(formData.get("userId"));
        const newRole = String(formData.get("role")) as "admin" | "user";
        await setUserRole(targetUserId, newRole);
        break;
      }
      case "create-user": {
        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");
        const fullName = String(formData.get("fullName") ?? "").trim();

        if (!email || password.length < 6) {
          toast.error(
            "Completá un email válido y una contraseña de al menos 6 caracteres",
          );
          return null;
        }

        await createUserAsAdmin(email, password, fullName || undefined);
        toast.success(`Usuario ${email} creado`);
        break;
      }
      default:
        throw new Error(`Intent desconocido: ${String(intent)}`);
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Ocurrió un error");
    return null;
  }

  await queryClient.invalidateQueries({ queryKey: ["admin", "user-metrics"] });
  return null;
}
