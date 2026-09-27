import { useFetcher } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@/task/api/task.api";

type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const fetcher = useFetcher();
  const submittedIntent = fetcher.formData?.get("intent");

  const isDeleting = submittedIntent === "delete";
  const isToggling =
    submittedIntent === "complete" || submittedIntent === "reopen";

  const displayedStatus = isToggling
    ? submittedIntent === "complete"
      ? "completed"
      : "pending"
    : task.status;

  if (isDeleting) return null;

  const handleDelete = () => {
    fetcher.submit({ id: task.id, intent: "delete" }, { method: "post" });
  };

  return (
    <li className="flex items-center gap-3 border-b py-2">
      <Checkbox
        checked={displayedStatus === "completed"}
        onCheckedChange={(checked) =>
          fetcher.submit(
            { id: task.id, intent: checked === true ? "complete" : "reopen" },
            { method: "post" },
          )
        }
      />

      <span
        className={
          displayedStatus === "completed"
            ? "flex-1 text-muted-foreground line-through"
            : "flex-1"
        }
      >
        {task.title}
      </span>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button type="button" variant="ghost" size="sm">
            Borrar
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Borrar esta tarea?</AlertDialogTitle>
            <AlertDialogDescription>
              "{task.title}" se va a eliminar. Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Borrar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  );
};
