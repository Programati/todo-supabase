import { requireSession } from "@/lib/auth";
import { profileQueryOptions } from "@/auth/queries/profile.queries";
import { queryClient } from "@/lib/query-client";
import { useSessionStore } from "@/stores/session.store";

export async function appLayoutLoader() {
  const session = await requireSession();

  useSessionStore.getState().setUserId(session.user.id);

  await queryClient.query({
    ...profileQueryOptions(session.user.id),
    staleTime: "static",
  });

  return null;
}
