// import { createBrowserRouter } from "react-router";
// import { LoginPage } from "@/auth/pages/login/LoginPage";
// import { loginAction } from "@/auth/pages/login/login.action";
// import { logoutAction, logoutLoader } from "@/auth/pages/logout/logout.action";
// import { CustomErrorFallback } from "@/components/custom/CustomErrorFallback";
// import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
// import { CustomNotFound } from "@/components/custom/CustomNotFound";
// import { TaskLayout } from "@/task/layout/TaskLayout";
// import { HomePage } from "@/task/pages/home/HomePage";
// import { homeLoader } from "@/task/pages/home/home.loader";

// export const appRouter = createBrowserRouter([
//   {
//     path: "/login",
//     Component: LoginPage,
//     action: loginAction,
//   },
//   {
//     path: "/logout",
//     action: logoutAction,
//     loader: logoutLoader,
//   },
//   {
//     path: "/",
//     Component: TaskLayout,
//     HydrateFallback: CustomFullScreenLoading,
//     ErrorBoundary: CustomErrorFallback,
//     children: [
//       {
//         index: true,
//         Component: HomePage,
//         loader: homeLoader,
//       },
//       {
//         path: "*",
//         Component: CustomNotFound,
//       },
//     ],
//   },
// ]);
import { createBrowserRouter } from "react-router";
import { AppLayout } from "@/app/AppLayout";
import { appLayoutLoader } from "@/app/app-layout.loader";
import { LoginPage } from "@/auth/pages/login/LoginPage";
import { loginAction } from "@/auth/pages/login/login.action";
import { logoutAction, logoutLoader } from "@/auth/pages/logout/logout.action";
import { CustomErrorFallback } from "@/components/custom/CustomErrorFallback";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { CustomNotFound } from "@/components/custom/CustomNotFound";
import { HomePage } from "@/task/pages/home/HomePage";
import { homeLoader } from "@/task/pages/home/home.loader";

export const appRouter = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
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
      { index: true, Component: HomePage, loader: homeLoader },
      { path: "*", Component: CustomNotFound },
    ],
  },
]);
