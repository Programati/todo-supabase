import { useQuery } from "@tanstack/react-query";
import { tasksQueryOptions } from "@/task/queries/task.queries";
import { useSessionStore } from "@/stores/session.store";

export function useTasks() {
  const userId = useSessionStore((s) => s.userId);

  return useQuery({
    ...tasksQueryOptions(userId ?? ""),
    enabled: !!userId,
  });
}
