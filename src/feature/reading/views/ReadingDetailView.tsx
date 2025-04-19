"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import { ReadingTest } from "@/feature/reading/components/ReadingTest";
import { useReadingDetail } from "@/feature/reading/hooks/useReadingClient";
import { useConfirmDialog } from "@/components/common/app-confirm-dialog";
import { useCreateReadingSubmission } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import { CreateReadingSubmissionDTO } from "@/services/swagger-types";
import { toast } from "sonner";
import { replaceRouteName, RouteNames } from "@/constraints/route-name";
import { useRouter } from "next/navigation";

interface ReadingDetailViewProps {
  id: string;
}

export function ReadingDetailView({ id }: ReadingDetailViewProps) {
  const router = useRouter();
  const { data, isLoading, error } = useReadingDetail(id);
  const { openConfirmDialog } = useConfirmDialog();
  const submitReadingMutation = useCreateReadingSubmission();

  const handleSubmit = async (data: CreateReadingSubmissionDTO) => {
    const submission = await submitReadingMutation.mutateAsync(data);
    const submissionId = submission.data.id;
    if (submissionId) {
      toast.success("Lesson submitted successfully . Navigate to result page");
      const path = replaceRouteName(RouteNames.ReadingResult, {
        id: id,
      });
      router.push(`${path}?submissionId=${submissionId}`);
    } else {
      toast.error("Lesson submitted failed");
    }
  };

  const handleSubmitWithConfirmation = (data: CreateReadingSubmissionDTO) => {
    openConfirmDialog({
      title: "Xác nhận nộp bài",
      description: "Bạn có chắc chắn muốn nộp bài làm của mình không?",
      confirmText: "Nộp bài",
      cancelText: "Hủy",
      onConfirm: () => handleSubmit(data),
    });
  };

  if (isLoading) {
    return <AppLoading />;
  }

  if (error) {
    return <AppError error={error} />;
  }

  return (
    <ReadingTest
      title={data?.data.title ?? ""}
      description={data?.data.description ?? ""}
      content={data?.data.content?.text ?? ""}
      questions={data?.data.content?.questions ?? []}
      isPractice={data?.data.lessonType === "test"}
      lessonId={id}
      onSubmit={handleSubmitWithConfirmation}
    />
  );
}
