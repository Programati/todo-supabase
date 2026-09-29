import { requireAdmin } from "@/lib/auth";
import { queryClient } from "@/lib/query-client";
import { userMetricsQueryOptions } from "@/admin/queries/admin.queries";

export async function adminDashboardLoader() {
  await requireAdmin();
  // Sin "static": esta pantalla va a mutar sus propios datos
  // (cambiar rol, crear usuario) — misma trampa que en la Fase 6.
  await queryClient.query(userMetricsQueryOptions());
  return null;
}
