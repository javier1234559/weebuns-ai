"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import { useSpeakingSubmissionDetail } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import MainChat from "@/feature/speaking/components/SpeakingChat/MainChat";

interface SpeakingResultViewProps {
  id: string;
  submissionId: string;
}

export function SpeakingResultView({
  id,
  submissionId,
}: SpeakingResultViewProps) {
  const { data, isLoading, error } = useSpeakingSubmissionDetail(submissionId);

  if (isLoading) {
    return <AppLoading />;
  }

  if (error) {
    return <AppError error={error} />;
  }

  if (!data || !data?.data.lesson) {
    return <AppError error={error} />;
  }

  return (
    <div className="container mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{data?.data.lesson.title}</h1>
        <p className="text-muted-foreground">{data?.data.lesson.description}</p>
      </div>

      <MainChat
        lessonId={id}
        context={data?.data.content?.prompt_text || ""}
        isResultView={true}
        savedChatHistory={data?.data.content?.chat_history || []}
        sessionId={""}
      />
    </div>
  );
}
