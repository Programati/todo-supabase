import { useQuery } from "@tanstack/react-query";
import { tasksQueryOptions } from "@/task/queries/task.queries";

export function useTasks() {
  return useQuery(tasksQueryOptions());
}
