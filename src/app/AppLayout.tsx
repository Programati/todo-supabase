import { Outlet, useNavigation } from "react-router";
import { Navbar } from "@/app/components/Navbar";

export const AppLayout = () => {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {isNavigating && (
        <div className="fixed inset-x-0 top-0 z-50 h-0.5 animate-pulse bg-primary" />
      )}
      <Navbar />
      <Outlet />
    </div>
  );
};
