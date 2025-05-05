import { Vocabulary } from "@/services/swagger-types";
import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface VocabState {
  checkedVocabs: Vocabulary[];
  setCheckedVocabs: (vocabs: Vocabulary[]) => void;
  toggleVocab: (vocab: Vocabulary) => void;
  toggleAllVocabs: (vocabs: Vocabulary[], checked: boolean) => void;
  updateVocab: (vocab: { id: string; repetitionLevel: number }) => void;
}

const persistVocabMiddleware = (
  config: StateCreator<VocabState, [], [["zustand/persist", VocabState]]>,
) => {
  return persist(config, {
    name: "vocab",
    storage: createJSONStorage(() => localStorage),
    onRehydrateStorage: () => (state) => {
      console.log("hydrated state:", state);
    },
  });
};

export const useVocabStore = create<VocabState>()(
  persistVocabMiddleware((set) => ({
    checkedVocabs: [],
    setCheckedVocabs: (vocabs) => set({ checkedVocabs: vocabs }),
    toggleVocab: (vocab) =>
      set((state) => {
        const exists = state.checkedVocabs.some((v) => v.id === vocab.id);
        if (exists) {
          return {
            checkedVocabs: state.checkedVocabs.filter((v) => v.id !== vocab.id),
          };
        }
        return {
          checkedVocabs: [...state.checkedVocabs, vocab],
        };
      }),
    toggleAllVocabs: (vocabs, checked) =>
      set({ checkedVocabs: checked ? [...vocabs] : [] }),
    updateVocab: (vocab) =>
      set((state) => {
        const index = state.checkedVocabs.findIndex((v) => v.id === vocab.id);
        if (index !== -1) {
          const newCheckedVocabs = [...state.checkedVocabs];
          newCheckedVocabs[index] = {
            ...newCheckedVocabs[index],
            repetitionLevel: vocab.repetitionLevel,
          };
          return { checkedVocabs: newCheckedVocabs };
        }
        return state;
      }),
  })),
);
