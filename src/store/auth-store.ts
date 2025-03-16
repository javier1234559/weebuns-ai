import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { StateCreator } from "zustand";

interface AuthState {
  id: string | null;
  name: string | null;
  email: string | null;
  avatar_img: string | null;
  accessToken: string | null;
  role: string | null;
  login: (userData: LoginPayload) => void;
  updateProfile: (data: Partial<LoginPayload>) => void;
  logout: () => void;
}

interface LoginPayload {
  id: string;
  name: string;
  email: string;
  avatar_img: string | null;
  accessToken: string;
  role: string;
}

const persistAuthMiddleware = (
  config: StateCreator<AuthState, [], [["zustand/persist", AuthState]]>
) => {
  return persist(config, {
    name: "auth",
    storage: createJSONStorage(() => localStorage),
  });
};

export const useAuthStore = create<AuthState>()(
  persistAuthMiddleware((set) => ({
    id: null,
    name: "Guest",
    email: null,
    avatar_img: null,
    accessToken: null,
    role: null,

    login: (userData) => {
      set({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        avatar_img: userData.avatar_img,
        accessToken: userData.accessToken,
        role: userData.role,
      });
    },

    updateProfile: (data) => {
      set((state) => ({
        ...state,
        name: data.name ?? state.name,
        email: data.email ?? state.email,
        avatar_img: data.avatar_img ?? state.avatar_img,
        role: data.role ?? state.role,
      }));
    },

    logout: () => {
      set({
        id: null,
        name: null,
        email: null,
        avatar_img: null,
        accessToken: null,
        role: null,
      });
    },
  }))
);
