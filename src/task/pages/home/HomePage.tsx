import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { CompletedTasksSection } from "@/task/components/CompletedTasksSection";
import { CreateTaskForm } from "@/task/components/CreateTaskForm";
import { TaskItem } from "@/task/components/TaskItem";
import { useTasks } from "@/task/hooks/useTasks";
import { splitTasks } from "@/task/utils/split-tasks";

export const HomePage = () => {
  const { data: tasks, isPending, isError, error } = useTasks();

  if (isPending) return <CustomFullScreenLoading />;
  if (isError) return <p>Error: {error.message}</p>;

  const { pending, completed } = splitTasks(tasks);

  return (
    // pb-28 en celular: deja lugar para que la barra fija no tape la última tarea
    <div className="mx-auto max-w-xl space-y-8 p-8 pb-28 md:pb-8">
      <h1 className="text-2xl font-bold">Mis tareas</h1>

      <section>
        <h2 className="text-xl font-semibold">Pendientes ({pending.length})</h2>
        <CreateTaskForm />

        {pending.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            No tenés tareas pendientes.
          </p>
        ) : (
          <ul className="mt-4">
            {pending.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        )}
      </section>

      <CompletedTasksSection tasks={completed} />
    </div>
  );
};
