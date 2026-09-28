import { redirect, type ActionFunctionArgs } from "react-router";
import { toast } from "sonner";
import {
  createTask,
  deleteCompletedTasks,
  deleteTask,
  setTaskStatus,
} from "@/task/api/task.api";
import { queryClient } from "@/lib/query-client";
import { useSessionStore } from "@/stores/session.store";

export async function homeAction({ request }: ActionFunctionArgs) {
  const userId = useSessionStore.getState().userId;
  if (!userId) throw redirect("/login");

  const formData = await request.formData();
  const intent = formData.get("intent");

  try {
    switch (intent) {
      case "create": {
        const title = String(formData.get("title") ?? "").trim();
        if (!title) {
          toast.error("El título no puede estar vacío");
          return null;
        }
        await createTask(title);
        break;
      }
      case "complete": {
        await setTaskStatus(String(formData.get("id")), "completed");
        break;
      }
      case "reopen": {
        await setTaskStatus(String(formData.get("id")), "pending");
        break;
      }
      case "delete": {
        await deleteTask(String(formData.get("id")));
        break;
      }
      case "delete-completed": {
        await deleteCompletedTasks();
        break;
      }
      default:
        throw new Error(`Intent desconocido: ${String(intent)}`);
    }
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Ocurrió un error");
    return null;
  }

  await queryClient.invalidateQueries({ queryKey: ["tasks", userId] });
  return null;
}
