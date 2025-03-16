import { useAuthStore } from "@/store/auth-store";
import { create } from "zustand";

interface ResetStore {
  resetAllState: () => void;
}

const useResetStore = create<ResetStore>((set) => ({
  resetAllState: () => {
    useAuthStore.persist.clearStorage();
  },
}));

export default useResetStore;
