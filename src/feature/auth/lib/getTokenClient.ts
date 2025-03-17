"use client";

import { useAuthStore } from "@/store/auth-store";

export const useTokenClient = () => {
  const token = useAuthStore((state) => state.accessToken);
  return token;
};
