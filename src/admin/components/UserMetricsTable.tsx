import { useFetcher } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { UserMetrics } from "@/admin/api/admin.api";

type UserMetricsTableProps = {
  users: UserMetrics[];
};

export const UserMetricsTable = ({ users }: UserMetricsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Usuario</TableHead>
          <TableHead>Rol</TableHead>
          <TableHead className="text-right">Creadas</TableHead>
          <TableHead className="text-right">Completadas</TableHead>
          <TableHead className="text-right">% completado</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <UserMetricsRow key={user.user_id} user={user} />
        ))}
      </TableBody>
    </Table>
  );
};

const UserMetricsRow = ({ user }: { user: UserMetrics }) => {
  const fetcher = useFetcher();

  const pendingRole = fetcher.formData?.get("role") as string | undefined;
  const displayedRole = pendingRole ?? user.role;

  const rate =
    user.tasks_created === 0
      ? 0
      : Math.round((user.tasks_completed / user.tasks_created) * 100);

  return (
    <TableRow>
      <TableCell>{user.full_name || user.email}</TableCell>
      <TableCell>
        <Select
          value={displayedRole}
          onValueChange={(role) =>
            fetcher.submit(
              { intent: "set-role", userId: user.user_id, role },
              { method: "post" },
            )
          }
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="user">user</SelectItem>
            <SelectItem value="admin">admin</SelectItem>
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell className="text-right">{user.tasks_created}</TableCell>
      <TableCell className="text-right">{user.tasks_completed}</TableCell>
      <TableCell className="text-right">{rate}%</TableCell>
    </TableRow>
  );
};
