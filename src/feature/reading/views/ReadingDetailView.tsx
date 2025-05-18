"use client";

import AppError from "@/components/common/app-error";
import { ReadingTest } from "@/feature/reading/components/ReadingTest";
import { useReadingDetail } from "@/feature/reading/hooks/useReadingClient";
import { useConfirmDialog } from "@/components/common/app-confirm-dialog";
import { useCreateReadingSubmission } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import { CreateReadingSubmissionDTO } from "@/services/swagger-types";
import { toast } from "sonner";
import { replaceRouteName, RouteNames } from "@/constraints/route-name";
import { useRouter } from "next/navigation";
import UserPreview from "@/feature/user/components/UserPreview";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import ReadingDetailViewSkeleton from "@/feature/reading/components/ReadingDetailViewSkeleton";

interface ReadingDetailViewProps {
  id: string;
}

export function ReadingDetailView({ id }: ReadingDetailViewProps) {
  const router = useRouter();
  const { data, isLoading, error } = useReadingDetail(id);
  const { openConfirmDialog } = useConfirmDialog();
  const submitReadingMutation = useCreateReadingSubmission();

  const handleSubmit = async (data: CreateReadingSubmissionDTO) => {
    try {
      const submission = await submitReadingMutation.mutateAsync(data);
      const submissionId = submission.data.id;
      console.log("submission", JSON.stringify(submission, null, 2));
      if (submissionId) {
        toast.success(
          "Lesson submitted successfully . Navigate to result page",
        );
        const path = replaceRouteName(RouteNames.ReadingResult, {
          id: id,
        });
        router.push(`${path}?submissionId=${submissionId}`);
      } else {
        toast.error("Lesson submitted failed");
      }
    } catch (error) {
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
    return <ReadingDetailViewSkeleton />;
  }

  if (error) {
    return <AppError error={error} />;
  }

  return (
    <>
      <Card className="flex flex-col gap-4">
        <CardHeader>
          <CardTitle>
            <h2 className="text-2xl font-medium">{data?.data.title}</h2>
            <div className="mt-4 rounded-lg border-2 border-muted">
              <p className="text-[18px] font-light leading-relaxed">
                {data?.data.description}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {data?.data.createdBy && (
                <UserPreview
                  user={{
                    id: data?.data.createdBy.id,
                    name: data?.data.createdBy.username ?? "",
                    avatar: data?.data.createdBy.profilePicture ?? "",
                    bio: data?.data.createdBy.bio ?? "",
                    role: data?.data.createdBy.role,
                  }}
                />
              )}
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <div className="mt-4">
        <ReadingTest
          content={data?.data.content?.text ?? ""}
          questions={data?.data.content?.questions ?? []}
          isPractice={data?.data.lessonType != "test"}
          lessonId={id}
          timeLimit={data?.data.timeLimit ?? 0}
          onSubmit={handleSubmitWithConfirmation}
        />
      </div>
    </>
  );
}
