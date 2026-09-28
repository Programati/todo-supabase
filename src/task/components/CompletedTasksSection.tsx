import { Trash2 } from "lucide-react";
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
import type { Task } from "@/task/api/task.api";
import { TaskItem } from "@/task/components/TaskItem";

type CompletedTasksSectionProps = {
  tasks: Task[];
};

export const CompletedTasksSection = ({
  tasks,
}: CompletedTasksSectionProps) => {
  const fetcher = useFetcher();

  // Optimista: mientras se borran, la lista se ve vacía al instante.
  const isClearing = fetcher.formData?.get("intent") === "delete-completed";
  const visibleTasks = isClearing ? [] : tasks;

  const countLabel =
    tasks.length === 1
      ? "1 tarea completada"
      : `${tasks.length} tareas completadas`;

  const handleClearAll = () => {
    fetcher.submit({ intent: "delete-completed" }, { method: "post" });
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Completadas ({visibleTasks.length})
        </h2>

        {tasks.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger
              render={
                <Button type="button" variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                  Borrar todas
                </Button>
              }
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  ¿Borrar todas las completadas?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Vas a eliminar {countLabel}. Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleClearAll}>
                  Borrar todas
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {visibleTasks.length === 0 ? (
        <p className="mt-4 text-muted-foreground">
          Todavía no completaste ninguna tarea.
        </p>
      ) : (
        <ul className="mt-4">
          {visibleTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </section>
  );
};
