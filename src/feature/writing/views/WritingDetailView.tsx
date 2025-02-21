"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import WritingAgentLayout from "@/feature/writing/components/WritingAgentLayout";
import { useWritingDetail } from "@/feature/writing/hooks/useWritingQueries";

interface WritingDetailViewProps {
  id: string;
}

export function WritingDetailView({ id }: WritingDetailViewProps) {
  const { data, isLoading, error } = useWritingDetail(id);

  if (isLoading) {
    return <AppLoading />;
  }

  if (error) {
    return <AppError error={error} />;
  }

  return (
    <WritingAgentLayout
      topic={data?.data.title ?? ""}
      description={data?.data.description ?? ""}
    />
  );
}
