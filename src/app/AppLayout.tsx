import { Outlet } from "react-router";
import { Navbar } from "@/app/components/Navbar";

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Outlet />
    </div>
  );
};
