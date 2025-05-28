import { useAuthStore } from "@/store/auth-store";

export const useIsLogined = () => {
  const { user } = useAuthStore();

  return !!user;
};
