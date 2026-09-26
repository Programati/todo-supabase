// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";

// export const HomePage = () => {
//   return (
//     <main className="grid min-h-screen place-items-center bg-background text-foreground">
//       <Button onClick={() => toast.success("Setup correcto")}>
//         Probar setup
//       </Button>
//     </main>
//   );
// };

import { useTasks } from "@/task/hooks/useTasks";

// export default function HomePage() {
export const HomePage = () => {
  const { data: tasks, isPending, isError, error } = useTasks();

  if (isPending) return <p>Cargando tareas...</p>;
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
