import { useAuthStore } from "@/store/auth-store";
import { create } from "zustand";

interface ResetStore {
  resetAllState: () => void;
}

const useResetStore = create<ResetStore>((set) => ({
  resetAllState: () => {
    // Reset auth store state
    useAuthStore.setState({
      user: null,
    });
    // Clear persistent storage
    useAuthStore.persist.clearStorage();
  },
}));

export default useResetStore;
