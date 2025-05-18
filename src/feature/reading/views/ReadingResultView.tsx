"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import { useReadingSubmissionDetail } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import { ReadingTest } from "@/feature/reading/components/ReadingTest";
import { QuestionDTO } from "@/services/swagger-types";

interface ReadingResultViewProps {
  id: string;
  submissionId: string;
}

export function ReadingResultView({
  id,
  submissionId,
}: ReadingResultViewProps) {
  console.log("id", id);
  console.log("submissionId", submissionId);

  const { data, isLoading, error } = useReadingSubmissionDetail(submissionId);

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
    return <AppError error="Không tìm thấy bài học" />;
  }

  return (
    <ReadingTest
      lessonId={data?.data.lesson.id ?? ""}
      content={(data?.data.lesson.content as any)?.text ?? ""}
      questions={(data?.data.lesson.content as any)?.questions ?? []}
      isPractice={(data?.data as any)?.lessonType === "test"}
      timeLimit={(data?.data as any)?.timeLimit ?? 0}
      onSubmit={handleSubmit}
      isResultView
      resultReadingData={{
        feedback: {
          accuracy: (data?.data as any)?.feedback?.accuracy ?? 0,
          correctAnswers: (data?.data as any)?.feedback?.correctAnswers ?? 0,
          totalQuestions: (data?.data as any)?.feedback?.totalQuestions ?? 0,
          incorrectAnswers:
            (data?.data as any)?.feedback?.incorrectAnswers ?? 0,
        },
        selectedAnswers: data?.data?.content?.questions.reduce(
          (acc: Record<string, string>, curr: any) => {
            acc[curr.id] = curr.selected_answer;
            return acc;
          },
          {},
        ),
      }}
    />
  );
}
