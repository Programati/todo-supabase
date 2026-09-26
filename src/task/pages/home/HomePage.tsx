import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { useTasks } from "@/task/hooks/useTasks";

export const HomePage = () => {
  const { data: tasks, isPending, isError, error } = useTasks();

  if (isPending) return <CustomFullScreenLoading />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Mis tareas</h1>
      {tasks.length === 0 ? (
        <p className="text-muted-foreground">No hay tareas todavía.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {tasks.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
