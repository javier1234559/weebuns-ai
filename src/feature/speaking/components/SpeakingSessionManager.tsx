"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import MainChat from "./SpeakingChat/MainChat";
import { StartSpeakingSessionButton } from "./StartSpeakingSessionButton";
import { useSpeakingSessionStore } from "../store/speaking-session-store";
import { ContentSpeakingDTO } from "@/services/swagger-types";

interface SpeakingSessionManagerProps {
  lessonId: string;
  lessonData: ContentSpeakingDTO | undefined;
}

export function SpeakingSessionManager({
  lessonId,
  lessonData,
}: SpeakingSessionManagerProps) {
  const { currentSession, setSession, isSessionValid } =
    useSpeakingSessionStore();

  // Check session validity on mount
  useEffect(() => {
    isSessionValid();
  }, [isSessionValid]);

  const handleSessionStart = (response: {
    sessionId: string;
    topicText: string;
  }) => {
    setSession({
      sessionId: response.sessionId,
      lessonId,
      topicText: response.topicText,
      timestamp: Date.now(),
      history: [],
    });
  };

  if (!currentSession || currentSession.lessonId !== lessonId) {
    return (
      <Card>
        <CardContent className="mt-4 flex flex-col items-center justify-center p-6">
          <h3 className="mb-4 text-lg font-medium">
            Start Your Speaking Practice
          </h3>
          <StartSpeakingSessionButton
            promptText={
              lessonData?.promptText || "Let's practice speaking English"
            }
            topicText={lessonData?.topicText || ""}
            followupExamples={lessonData?.followupExamples || []}
            backgroundKnowledge={lessonData?.backgroundKnowledge || ""}
            onSuccess={handleSessionStart}
            requiredTokens={10}
            variant="default"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="mt-4 flex flex-col">
        <MainChat
          context={lessonData?.promptText || ""}
          lessonId={lessonId}
          sessionId={currentSession.sessionId}
          savedChatHistory={currentSession.history}
        />
      </CardContent>
    </Card>
  );
}
