import { createBrowserRouter, Navigate } from "react-router";
import { TaskLayout } from "./task/layout/TaskLayout";
import { HomePage } from "./task/pages/Home/HomePage";

export const appRouter = createBrowserRouter([
  // Main routes
  {
    path: "/",
    element: <TaskLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },

  // COMODIN
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);
