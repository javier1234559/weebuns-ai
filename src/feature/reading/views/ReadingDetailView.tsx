"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import { ReadingTest } from "@/feature/reading/components/ReadingTest";
import { sampleReading } from "@/feature/reading/data";
import { useReadingDetail } from "@/feature/reading/hooks/useReadingQueries";

interface ReadingDetailViewProps {
  id: string;
}

export function ReadingDetailView({ id }: ReadingDetailViewProps) {
  const { data, isLoading, error } = useReadingDetail(id);

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
      content={sampleReading.content ?? ""}
      questions={sampleReading.questions ?? []}
    />
  );
}
