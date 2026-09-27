import { useQuery } from "@tanstack/react-query";
import { profileQueryOptions } from "@/auth/queries/profile.queries";
import { useSessionStore } from "@/stores/session.store";

export function useProfile() {
  const userId = useSessionStore((s) => s.userId);

  return useQuery({
    ...profileQueryOptions(userId ?? ""),
    enabled: !!userId, // no corre la query hasta tener un id real
  });
}
