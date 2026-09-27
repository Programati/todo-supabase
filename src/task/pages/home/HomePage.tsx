import { useEffect, useRef } from "react";
import { Form, useNavigation } from "react-router";
import { Button } from "@/components/ui/button";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { Input } from "@/components/ui/input";
import { TaskItem } from "@/task/components/TaskItem";
import { useTasks } from "@/task/hooks/useTasks";

export const HomePage = () => {
  const { data: tasks, isPending, isError, error } = useTasks();
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  const isCreating =
    navigation.state === "submitting" &&
    navigation.formData?.get("intent") === "create";

  // <Form> no desmonta el componente al enviar, así que el input no se
  // vacía solo. Lo reseteamos a mano cuando la navegación vuelve a "idle".
  useEffect(() => {
    if (navigation.state === "idle") {
      formRef.current?.reset();
    }
  }, [navigation.state]);

  if (isPending) return <CustomFullScreenLoading />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-auto max-w-xl p-8">
      <h1 className="text-2xl font-bold">Mis tareas</h1>

      <Form ref={formRef} method="post" className="mt-4 flex gap-2">
        <input type="hidden" name="intent" value="create" />
        <Input name="title" placeholder="Nueva tarea..." required />
        <Button type="submit" disabled={isCreating}>
          {isCreating ? "Agregando..." : "Agregar"}
        </Button>
      </Form>

      {tasks.length === 0 ? (
        <p className="mt-4 text-muted-foreground">No hay tareas todavía.</p>
      ) : (
        <ul className="mt-4">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
};
