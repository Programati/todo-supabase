import { queryOptions } from "@tanstack/react-query";
import { getUserMetrics } from "@/admin/api/admin.api";

// Sin userId en la key: a diferencia de "tasks", este dato no depende de
// QUIÉN lo mira — cualquier admin ve exactamente la misma tabla completa.
export const userMetricsQueryOptions = () =>
  queryOptions({
    queryKey: ["admin", "user-metrics"],
    queryFn: getUserMetrics,
  });
