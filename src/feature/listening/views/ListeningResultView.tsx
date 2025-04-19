"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import { useListeningSubmissionDetail } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import { ListeningTest } from "@/feature/listening/components/ListeningTest";

interface ListeningResultViewProps {
  id: string;
  submissionId: string;
}

export function ListeningResultView({
  id,
  submissionId,
}: ListeningResultViewProps) {
  console.log("id", id);
  console.log("submissionId", submissionId);

  const { data, isLoading, error } = useListeningSubmissionDetail(submissionId);

  const handleSubmit = () => {
    console.log("Submit");
  };

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
    <ListeningTest
      lessonId={data?.data.lesson.id ?? ""}
      title={data?.data.lesson.title ?? ""}
      description={data?.data.lesson.description ?? ""}
      audioUrl={(data?.data.lesson.content as any)?.audio_url ?? ""}
      questions={(data?.data.lesson.content as any)?.questions ?? []}
      isPractice={(data?.data as any)?.lessonType === "test"}
      onSubmit={handleSubmit}
      isResultView={true}
      resultListeningData={{
        feedback: {
          accuracy: (data?.data as any)?.feedback?.accuracy ?? 0,
          correctAnswers: (data?.data as any)?.feedback?.correctAnswers ?? 0,
          totalQuestions: (data?.data as any)?.feedback?.totalQuestions ?? 0,
          incorrectAnswers:
            (data?.data as any)?.feedback?.incorrectAnswers ?? 0,
        },
        selectedAnswers: (data?.data as any)?.content?.answers?.reduce(
          (acc: Record<string, string>, curr: any) => {
            acc[curr.questionId] = curr.answerId;
            return acc;
          },
          {},
        ),
      }}
    />
  );
}
