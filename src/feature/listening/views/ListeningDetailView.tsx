"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import { ListeningTest } from "@/feature/listening/components/ListeningTest";
import { useListeningDetail } from "@/feature/listening/hooks/useListeningClient";
import { useConfirmDialog } from "@/components/common/app-confirm-dialog";
import { useCreateListeningSubmission } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import { CreateListeningSubmissionDTO } from "@/services/swagger-types";
import { toast } from "sonner";
import { replaceRouteName, RouteNames } from "@/constraints/route-name";
import { useRouter } from "next/navigation";

interface ListeningDetailViewProps {
  id: string;
}

export function ListeningDetailView({ id }: ListeningDetailViewProps) {
  const router = useRouter();
  const { data, isLoading, error } = useListeningDetail(id);
  const { openConfirmDialog } = useConfirmDialog();
  const submitListeningMutation = useCreateListeningSubmission();

  const handleSubmit = async (data: CreateListeningSubmissionDTO) => {
    const submission = await submitListeningMutation.mutateAsync(data);
    const submissionId = submission.data.id;
    if (submissionId) {
      toast.success("Lesson submitted successfully. Navigate to result page");
      const path = replaceRouteName(RouteNames.ListeningResult, {
        id: id,
      });
      router.push(`${path}?submissionId=${submissionId}`);
    } else {
      toast.error("Lesson submission failed");
    }
  };

  const handleSubmitWithConfirmation = (data: CreateListeningSubmissionDTO) => {
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
    <ListeningTest
      title={data?.data.title ?? ""}
      description={data?.data.description ?? ""}
      audioUrl={data?.data.content?.audio_url ?? ""}
      questions={data?.data.content?.questions ?? []}
      isPractice={data?.data.lessonType === "test"}
      lessonId={id}
      onSubmit={handleSubmitWithConfirmation}
    />
  );
}
