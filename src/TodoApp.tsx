import { RouterProvider } from "react-router";
import { appRouter } from "./app.router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "@/components/ui/sonner";

// Create a client
const queryClient = new QueryClient();

export const TodoApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position="top-right" />

        <RouterProvider router={appRouter} />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};
