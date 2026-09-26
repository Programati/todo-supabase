import { queryOptions } from "@tanstack/react-query";
import { getTasks } from "@/task/api/task.api";

export const tasksQueryOptions = () =>
  queryOptions({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
