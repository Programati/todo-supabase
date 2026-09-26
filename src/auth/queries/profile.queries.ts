import { queryOptions } from "@tanstack/react-query";
import { getMyProfile } from "@/auth/api/profile.api";

export const myProfileQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ["profile", userId],
    queryFn: getMyProfile,
  });
