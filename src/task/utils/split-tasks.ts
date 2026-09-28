import type { Task } from "@/task/api/task.api";

const toTime = (iso: string | null) => (iso ? new Date(iso).getTime() : 0);

export function splitTasks(tasks: Task[]) {
  const pending = tasks.filter((t) => t.status === "pending");

  // filter() devuelve un array nuevo, así que sort() no muta la caché de Query.
  const completed = tasks
    .filter((t) => t.status === "completed")
    .sort((a, b) => toTime(b.completed_at) - toTime(a.completed_at)); // la más reciente primero

  return { pending, completed };
}
