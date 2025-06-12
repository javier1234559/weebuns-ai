"use client";

import { Card, CardContent } from "@/components/ui/card";
import MainChat from "./SpeakingChat/MainChat";
import { StartSpeakingSessionButton } from "./StartSpeakingSessionButton";
import { ContentSpeakingDTO } from "@/services/swagger-types";
import { useAuthStore } from "@/store/auth-store";
import { useCheckSpeakingSession } from "@/feature/ai/hooks/useAi";
import { useRouter, useSearchParams } from "next/navigation";
import AppLoading from "@/components/common/app-loading/page";
import { Button } from "@/components/ui/button";

interface SpeakingSessionManagerProps {
  lessonId: string;
  lessonData: ContentSpeakingDTO | undefined;
}

export function SpeakingSessionManager({
  lessonId,
  lessonData,
}: SpeakingSessionManagerProps) {
  const { user } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const { data: sessionValid, isLoading } = useCheckSpeakingSession(
    sessionId ?? "",
  );

  if (!sessionId) {
    return (
      <Card>
        <CardContent className="mt-4 flex flex-col items-center justify-center p-6">
          <h3 className="mb-4 text-lg font-medium">
            Start Your Speaking Practice
          </h3>
          <StartSpeakingSessionButton
            lessonId={lessonId}
            userId={user?.id ?? ""}
            promptText={
              lessonData?.promptText || "Let's practice speaking English"
            }
            topicText={lessonData?.topicText || ""}
            followupExamples={lessonData?.followupExamples || []}
            backgroundKnowledge={lessonData?.backgroundKnowledge || ""}
            onSuccess={(response) => {
              router.push(`?sessionId=${response.sessionId}`);
            }}
            requiredTokens={10}
            variant="default"
          />
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return <AppLoading />;
  }

  if (!sessionValid?.status) {
    return (
      <Card>
        <CardContent className="mt-4 flex flex-col items-center justify-center p-6">
          <h3 className="mb-4 text-lg text-red-400 dark:text-red-500">
            Session hết hạn hoặc không tồn tại, vui lòng bắt đầu mới
          </h3>

          <Button
            variant="default"
            onClick={() => router.push(window.location.pathname)}
          >
            Bắt đầu mới
          </Button>
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
          sessionId={sessionId}
          savedChatHistory={sessionValid?.history?.map((item: any) => ({
            id: item.id,
            text: item.content,
            role: item.role,
            createdAt: item.createdAt,
          }))}
        />
      </CardContent>
    </Card>
  );
}
