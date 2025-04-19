import { useSubmissionList } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import AppLoading from "@/components/common/app-loading/page";
import AppError from "@/components/common/app-error";
import EmptyState from "@/components/common/app-empty-state";
import { SkillType } from "@/services/swagger-types";

export function ReadingSubmissionList() {
  const router = useRouter();
  const { data, isLoading, error } = useSubmissionList({
    skill: "reading" as SkillType,
  });

  if (isLoading) {
    return <AppLoading />;
  }

  if (error) {
    return <AppError error={error} />;
  }

  if (!data || data.data.length === 0) {
    return (
      <EmptyState
        description="Bạn chưa có bài làm nào. Hãy bắt đầu luyện tập ngay!"
        actionText="Bắt đầu luyện tập"
        onAction={() => router.push("/lessons/reading")}
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.data.map((submission) => (
        <Card key={submission.id} className="overflow-hidden">
          <CardHeader className="bg-primary/5 p-4">
            <CardTitle className="line-clamp-2 text-lg">
              {submission.lesson?.title || "Không có tiêu đề"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {format(new Date(submission.createdAt), "dd/MM/yyyy HH:mm")}
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  {(submission.feedback as any)?.accuracy || 0}%
                </div>
              </div>
            </div>
            <div className="mb-4 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Đúng:</span>{" "}
                <span className="font-medium text-green-500">
                  {(submission.feedback as any)?.correctAnswers || 0}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Sai:</span>{" "}
                <span className="font-medium text-red-500">
                  {(submission.feedback as any)?.incorrectAnswers || 0}
                </span>
              </div>
            </div>
            <Button
              className="w-full"
              variant="outline"
              onClick={() =>
                router.push(
                  `/lessons/reading/${submission.lesson?.id || ""}/result?submissionId=${submission.id}`,
                )
              }
            >
              <Eye className="mr-2 size-4" />
              Xem chi tiết
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
