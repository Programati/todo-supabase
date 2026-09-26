import { requireSession } from "@/lib/auth";
import { queryClient } from "@/lib/query-client";
import { tasksQueryOptions } from "@/task/queries/task.queries";

export async function homeLoader() {
  const session = await requireSession();
  await queryClient.query({
    ...tasksQueryOptions(session.user.id),
    staleTime: "static",
  });
  return null;
}
