import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { StateCreator } from "zustand";

interface AuthState {
  id: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
  authProvider: string | null;
  authProviderId: string | null;
  firstName: string | null;
  lastName: string | null;
  profilePicture: string | null;
  isEmailVerified: boolean | null;
  lastLogin: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
  accessToken: string | null;
  login: (userData: LoginPayload) => void;
  updateProfile: (data: Partial<LoginPayload>) => void;
  logout: () => void;
}

interface LoginPayload {
  access_token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    authProvider: string;
    authProviderId: string | null;
    firstName: string;
    lastName: string;
    profilePicture: string | null;
    isEmailVerified: boolean;
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
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
    username: null,
    email: null,
    role: null,
    authProvider: null,
    authProviderId: null,
    firstName: null,
    lastName: null,
    profilePicture: null,
    isEmailVerified: null,
    lastLogin: null,
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
    accessToken: null,

    login: (userData) => {
      set({
        id: userData.user.id,
        username: userData.user.username,
        email: userData.user.email,
        role: userData.user.role,
        authProvider: userData.user.authProvider,
        authProviderId: userData.user.authProviderId,
        firstName: userData.user.firstName,
        lastName: userData.user.lastName,
        profilePicture: userData.user.profilePicture,
        isEmailVerified: userData.user.isEmailVerified,
        lastLogin: userData.user.lastLogin,
        createdAt: userData.user.createdAt,
        updatedAt: userData.user.updatedAt,
        deletedAt: userData.user.deletedAt,
        accessToken: userData.access_token,
      });
    },

    updateProfile: (data) => {
      set((state) => ({
        ...state,
        username: data.user?.username ?? state.username,
        email: data.user?.email ?? state.email,
        firstName: data.user?.firstName ?? state.firstName,
        lastName: data.user?.lastName ?? state.lastName,
        profilePicture: data.user?.profilePicture ?? state.profilePicture,
        role: data.user?.role ?? state.role,
        isEmailVerified: data.user?.isEmailVerified ?? state.isEmailVerified,
        lastLogin: data.user?.lastLogin ?? state.lastLogin,
        updatedAt: data.user?.updatedAt ?? state.updatedAt,
      }));
    },

    logout: () => {
      set({
        id: null,
        username: null,
        email: null,
        role: null,
        authProvider: null,
        authProviderId: null,
        firstName: null,
        lastName: null,
        profilePicture: null,
        isEmailVerified: null,
        lastLogin: null,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
        accessToken: null,
      });
    },
  }))
);
