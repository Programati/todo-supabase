import { CreateUserDialog } from "@/admin/components/CreateUserDialog";
import { UserMetricsTable } from "@/admin/components/UserMetricsTable";
import { useUserMetrics } from "@/admin/hooks/useUserMetrics";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";

export const AdminDashboardPage = () => {
  const { data: users, isPending, isError, error } = useUserMetrics();

  if (isPending) return <CustomFullScreenLoading />;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Usuarios</h1>
        <CreateUserDialog />
      </div>

      <UserMetricsTable users={users} />
    </div>
  );
};
