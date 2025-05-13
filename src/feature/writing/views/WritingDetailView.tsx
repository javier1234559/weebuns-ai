"use client";

import AppError from "@/components/common/app-error";
import WritingAgentLayout from "@/feature/writing/components/WritingAgentLayout";
import { useWritingDetail } from "@/feature/writing/hooks/useWritingClient";
import { useCreateWritingSubmission } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import { CreateWritingSubmissionDTO } from "@/services/swagger-types";
import { toast } from "sonner";
import { replaceRouteName, RouteNames } from "@/constraints/route-name";
import { useRouter } from "next/navigation";
import WritingDetailSkeleton from "@/feature/writing/components/WritingDetailSkeleton";

interface WritingDetailViewProps {
  id: string;
  isReadOnly?: boolean;
}

export function WritingDetailView({
  id,
  isReadOnly = false,
}: WritingDetailViewProps) {
  const router = useRouter();
  const { data, isLoading, error } = useWritingDetail(id);
  const submitWritingMutation = useCreateWritingSubmission();

  const handleSubmit = async (data: CreateWritingSubmissionDTO) => {
    const submission = await submitWritingMutation.mutateAsync(data);
    const submissionId = submission.data.id;
    if (submissionId) {
      toast.success("Lesson submitted successfully. Navigate to result page");
      const path = replaceRouteName(RouteNames.WritingResult, {
        id: id,
      });
      router.push(`${path}?submissionId=${submissionId}`);
    } else {
      toast.error("Lesson submission failed");
    }
  };

  const handleSubmitWithConfirmation = (data: CreateWritingSubmissionDTO) => {
    handleSubmit(data);
  };

  if (isLoading) {
    return <WritingDetailSkeleton />;
  }

  if (error) {
    return <AppError error={error} />;
  }

  return (
    <WritingAgentLayout
      topic={data?.data.title ?? ""}
      isReadOnly={isReadOnly}
      onSubmit={handleSubmitWithConfirmation}
      content={data?.data.content ?? undefined}
      lessonId={id}
      createdBy={data?.data.createdBy}
    />
  );
}
