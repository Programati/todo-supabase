import { create } from "zustand";
import { supabase } from "@/lib/supabase";

type SessionState = {
  userId: string | null;
  setUserId: (userId: string | null) => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  userId: null,
  setUserId: (userId) => set({ userId }),
}));

// Mantiene el store al día ante cambios de sesión que no pasan por
// nuestros propios actions (ej: cerrás sesión en otra pestaña).
supabase.auth.onAuthStateChange((_event, session) => {
  useSessionStore.getState().setUserId(session?.user.id ?? null);
});
