

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
  id: number;
  username: string;
};

type State = {
  user: User | null;
};

type Actions = {
  setUser: (user: User | null) => void;
  logout: () => void;
};

export const useUserStore = create<State & Actions>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
