import { useQuery } from "@tanstack/react-query";
import { userMetricsQueryOptions } from "@/admin/queries/admin.queries";

export function useUserMetrics() {
  return useQuery(userMetricsQueryOptions());
}
