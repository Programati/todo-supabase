import { Home, ListTodo, LogOut, Shield, Users } from "lucide-react";
import { Form, NavLink } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProfile } from "@/auth/hooks/useProfile";
import { useSessionStore } from "@/stores/session.store";
import { Link } from "react-router";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
  }`;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-accent text-accent-foreground"
      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
  }`;

export const Navbar = () => {
  const userId = useSessionStore((s) => s.userId);
  const { data: profile } = useProfile();

  return (
    <header className="flex items-center justify-between gap-4 border-b px-4 py-3 sm:px-6">
      <div className="flex items-center gap-6">
        <NavLink to="/" end className="flex items-center gap-2 font-semibold">
          <ListTodo className="h-5 w-5" />
          <span className="hidden sm:inline">Todo App</span>
        </NavLink>

        <nav className="flex items-center gap-1">
          <NavLink to="/" end className={navLinkClass}>
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Inicio</span>
          </NavLink>
          {profile?.role === "admin" && (
            <NavLink to="/admin" className={navLinkClass}>
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Usuarios</span>
            </NavLink>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {profile?.role === "admin" && (
          <Badge variant="secondary" className="hidden gap-1 sm:flex">
            <Shield className="h-3 w-3" />
            Admin
          </Badge>
        )}

        <span className="hidden text-sm text-muted-foreground md:inline">
          {profile?.full_name || profile?.email}
        </span>

        {userId && (
          <Form method="post" action="/logout">
            <Button type="submit" variant="outline" size="sm">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </Form>
        )}
      </div>
    </header>
  );
};
