import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ChatMessageDTO } from "@/services/swagger-types";
import aiApi from "@/feature/ai/services/aiApi";

interface SpeakingSession {
  sessionId: string;
  lessonId: string;
  topicText: string;
  timestamp: number;
  history: ChatMessageDTO[];
}

interface SpeakingSessionState {
  currentSession: SpeakingSession | null;
  setSession: (session: SpeakingSession) => void;
  clearSession: () => void;
  isSessionValid: () => Promise<boolean>;
  addMessageToHistory: (message: ChatMessageDTO) => void;
  getHistory: () => ChatMessageDTO[];
}

const SESSION_EXPIRY_TIME = 3600000; // 1 hour in milliseconds

export const useSpeakingSessionStore = create<SpeakingSessionState>()(
  persist(
    (set, get) => ({
      currentSession: null,
      setSession: (session: SpeakingSession) => {
        set({ currentSession: session });
      },
      clearSession: () => {
        set({ currentSession: null });
      },
      isSessionValid: async () => {
        const session = get().currentSession;
        if (!session) return false;

        // Check if session is expired locally
        const isExpired = Date.now() - session.timestamp > SESSION_EXPIRY_TIME;
        if (isExpired) {
          get().clearSession();
        }

        // Verify session with backend
        try {
          await aiApi.checkSession(session.sessionId);
          return true;
        } catch (error) {
          get().clearSession();
          return false;
        }
      },
      addMessageToHistory: (message: ChatMessageDTO) => {
        const currentSession = get().currentSession;
        if (!currentSession) return;

        set((state) => ({
          currentSession: {
            ...currentSession,
            history: [...currentSession.history, message],
          },
        }));
      },
      getHistory: () => {
        const currentSession = get().currentSession;
        return currentSession?.history || [];
      },
    }),
    {
      name: "speaking-session",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
