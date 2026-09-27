import { requireGuest } from "@/lib/auth";

export async function loginLoader() {
  await requireGuest();
  return null;
}
