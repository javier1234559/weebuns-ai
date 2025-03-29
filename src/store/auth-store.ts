import { User } from "@/services/swagger-types";
import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type IUser = Omit<User, "passwordHash">;

interface AuthState {
  token: string | null;
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  setToken: (token: string | null) => void;
  removeToken: () => void;
  removeUser: () => void;
  setAuth: (auth: { user: IUser | null; token: string | null }) => void;
}

const persistAuthMiddleware = (
  config: StateCreator<AuthState, [], [["zustand/persist", AuthState]]>,
) => {
  return persist(config, {
    name: "auth",
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => (state) => {
      console.log("hydrated state:", state);
    },
  });
};

export const useAuthStore = create<AuthState>()(
  persistAuthMiddleware((set) => ({
    token: null,
    user: null,
    setAuth: (auth) => {
      console.log("setAuth", auth);
      set({ user: auth.user, token: auth.token });
    },
    setUser: (user: IUser | null) => {
      set({ user });
    },
    setToken: (token: string | null) => {
      set({ token });
    },
    removeToken: () => {
      set({ token: null });
    },
    removeUser: () => {
      set({ user: null });
    },
  })),
);
