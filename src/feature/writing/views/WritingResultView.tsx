"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import { useWritingSubmissionDetail } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import WritingSubmittedAndFeedBack from "@/feature/writing/components/WritingSubmittedAndFeedBack";
import { AlarmClock } from "lucide-react";

interface WritingResultViewProps {
  id: string;
  submissionId: string;
}

export const WaitingForFeedback = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
      <div className="relative mb-2">
        <div className="rounded-full bg-gray-50 p-6 dark:bg-gray-800">
          <AlarmClock className="size-12 text-primary" />
        </div>
      </div>
      <div className="max-w-md text-center">
        <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
          Đang chờ phản hồi
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Phản hồi của bạn đang được xử lý và có thể mất từ vài tiếng đến vài
          ngày để hoàn thành. Chúng tôi sẽ thông báo cho bạn ngay khi phản hồi
          sẵn sàng.
        </p>
      </div>
    </div>
  );
};

export function WritingResultView({ submissionId }: WritingResultViewProps) {
  const { data, isLoading, error } = useWritingSubmissionDetail(submissionId);

  if (isLoading) {
    return <AppLoading />;
  }

  if (error || !data || !data.data.content) {
    return <AppError error={error} />;
  }

  if (!data.data.feedback) {
    return <WaitingForFeedback />;
  }

  return (
    <WritingSubmittedAndFeedBack
      data={data.data}
      exampleEssay={data?.exampleEssay}
    />
  );
}
