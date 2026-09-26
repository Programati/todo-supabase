import { createBrowserRouter } from "react-router";
import { CustomErrorFallback } from "@/components/custom/CustomErrorFallback";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { CustomNotFound } from "@/components/custom/CustomNotFound";
import { TaskLayout } from "@/task/layout/TaskLayout";
import { HomePage } from "@/task/pages/home/HomePage";
import { homeLoader } from "@/task/pages/home/home.loader";

export const appRouter = createBrowserRouter([
  {
    path: "/",
    Component: TaskLayout,
    HydrateFallback: CustomFullScreenLoading,
    ErrorBoundary: CustomErrorFallback,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: homeLoader,
      },
      {
        path: "*",
        Component: CustomNotFound,
      },
    ],
  },
]);
