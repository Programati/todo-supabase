import { queryOptions } from "@tanstack/react-query";
import { getTasks } from "@/task/api/task.api";

export const tasksQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["tasks", userId],
    queryFn: getTasks,
  });
