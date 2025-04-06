"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import { ReadingTest } from "@/feature/reading/components/ReadingTest";
import { useReadingDetail } from "@/feature/reading/hooks/useReadingClient";

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

  const { data, isLoading, error } = useReadingDetail(id);

  const handleSubmit = () => {
    console.log("Submit");
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
      onSubmit={handleSubmit}
    />
  );
}
