import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Define possible user roles
export type UserRole = "owner" | "walker" | null;

// Interface for user store state and actions
interface UserStore {
  role: UserRole;
  setRole: (role: UserRole) => void;
  signOut: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      role: null,
      setRole: (role) => set({ role }),
      signOut: () => set({ role: null })
    }),
    {
      name: "petwalk-user",
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
);
