import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router/dom";
import { Toaster } from "@/components/ui/sonner";
import { queryClient } from "@/lib/query-client";
import { appRouter } from "@/app.router";

export const TodoApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-right" />

      <RouterProvider router={appRouter} />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
