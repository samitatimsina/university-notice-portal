import { create } from "zustand";
import type { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface AuthState {
  user: User | null;
  loading: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  setLoading: (loading) => set({ loading }),
    logout: async () => {
    await signOut(auth);
    localStorage.removeItem("role");
  },
}));