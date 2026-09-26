import { Form, Outlet } from "react-router";
import { Button } from "@/components/ui/button";

export const TaskLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Temporal — se convierte en un Navbar real en la Fase 5 */}
      <header className="flex justify-end border-b p-4">
        <Form method="post" action="/logout">
          <Button type="submit" variant="outline" size="sm">
            Cerrar sesión
          </Button>
        </Form>
      </header>
      <Outlet />
    </div>
  );
};
