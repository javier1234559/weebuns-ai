"use client";

import AppError from "@/components/common/app-error";
import { ListeningTest } from "@/feature/listening/components/ListeningTest";
import { useListeningDetail } from "@/feature/listening/hooks/useListeningClient";
import { useConfirmDialog } from "@/components/common/app-confirm-dialog";
import { useCreateListeningSubmission } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import { CreateListeningSubmissionDTO } from "@/services/swagger-types";
import { toast } from "sonner";
import { replaceRouteName, RouteNames } from "@/constraints/route-name";
import { useRouter } from "next/navigation";
import UserPreview from "@/feature/user/components/UserPreview";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import ListeningDetailViewSkeleton from "@/feature/listening/components/ListeningDetailViewSkeleton";

interface ListeningDetailViewProps {
  id: string;
}

export function ListeningDetailView({ id }: ListeningDetailViewProps) {
  const router = useRouter();
  const { data, isLoading, error } = useListeningDetail(id);
  const { openConfirmDialog } = useConfirmDialog();
  const submitListeningMutation = useCreateListeningSubmission();

  const handleSubmit = async (data: CreateListeningSubmissionDTO) => {
    console.log("data", data);
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
    return <ListeningDetailViewSkeleton />;
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
                    bio: "IELTS coach with 10 years of experience helping students achieve band 7.0+",
                    role: data?.data.createdBy.role,
                    username: data?.data.createdBy.username ?? "",
                  }}
                />
              )}
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <div className="mt-4">
        <ListeningTest
          audioUrl={data?.data.content?.audio_url ?? ""}
          questions={data?.data.content?.questions ?? []}
          isPractice={data?.data.lessonType != "test"}
          timeLimit={data?.data.timeLimit ?? 0}
          lessonId={id}
          onSubmit={handleSubmitWithConfirmation}
        />
      </div>
    </>
  );
}
