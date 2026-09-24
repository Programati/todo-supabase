import { Outlet } from "react-router";

export const TaskLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <h1>Nav</h1>

      {/* body */}
      <Outlet />

      {/* Footer */}
      <h1>Footer</h1>
    </div>
  );
};
