import { queryClient } from "@/lib/query-client";
import { tasksQueryOptions } from "@/task/queries/task.queries";

export async function homeLoader() {
  await queryClient.query({ ...tasksQueryOptions(), staleTime: "static" });
  return null;
}
