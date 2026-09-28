import { useEffect, useRef } from "react";
import { Form, useNavigation } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const CreateTaskForm = () => {
  const navigation = useNavigation();
  const formRef = useRef<HTMLFormElement>(null);

  const isCreating =
    navigation.state === "submitting" &&
    navigation.formData?.get("intent") === "create";

  useEffect(() => {
    if (navigation.state === "idle") {
      formRef.current?.reset();
    }
  }, [navigation.state]);

  return (
    <Form
      ref={formRef}
      method="post"
      className="fixed inset-x-0 bottom-0 z-10 flex gap-2 border-t bg-background p-4 md:static md:mt-4 md:border-t-0 md:bg-transparent md:p-0"
    >
      <input type="hidden" name="intent" value="create" />
      <Input name="title" placeholder="Nueva tarea..." required />
      <Button type="submit" disabled={isCreating}>
        {isCreating ? "Agregando..." : "Agregar"}
      </Button>
    </Form>
  );
};
