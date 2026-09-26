import { Form } from "react-router";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/auth/hooks/useProfile";
import { useSessionStore } from "@/stores/session.store";

export const Navbar = () => {
  const userId = useSessionStore((s) => s.userId);
  const { data: profile } = useProfile();

  return (
    <header className="flex items-center justify-between border-b p-4">
      <span className="text-sm text-muted-foreground">
        {profile?.full_name || profile?.email}
      </span>

      {userId && (
        <Form method="post" action="/logout">
          <Button type="submit" variant="outline" size="sm">
            Cerrar sesión
          </Button>
        </Form>
      )}
    </header>
  );
};
