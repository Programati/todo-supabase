import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/app/AppLayout";
import { appLayoutLoader } from "@/app/app-layout.loader";
import { LoginPage } from "@/auth/pages/login/LoginPage";
import { loginAction } from "@/auth/pages/login/login.action";
import { loginLoader } from "@/auth/pages/login/login.loader";
import { logoutAction, logoutLoader } from "@/auth/pages/logout/logout.action";
import { CustomErrorFallback } from "@/components/custom/CustomErrorFallback";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { CustomNotFound } from "@/components/custom/CustomNotFound";
import { homeAction } from "@/task/pages/home/home.action";
import { HomePage } from "@/task/pages/home/HomePage";
import { homeLoader } from "@/task/pages/home/home.loader";

export const appRouter = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
    loader: loginLoader,
    action: loginAction,
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: logoutLoader,
  },
  {
    path: "/",
    Component: AppLayout,
    loader: appLayoutLoader,
    HydrateFallback: CustomFullScreenLoading,
    ErrorBoundary: CustomErrorFallback,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: homeLoader,
        action: homeAction,
      },
      {
        path: "*",
        Component: CustomNotFound,
      },
    ],
  },
]);
