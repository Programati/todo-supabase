import { queryOptions } from "@tanstack/react-query";
import { getProfile } from "@/auth/api/profile.api";

export const profileQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
  });
