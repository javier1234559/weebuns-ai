"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import { ListeningTest } from "@/feature/listening/components/ListeningTest";
import { sampleListening } from "@/feature/listening/data";
import { useListeningDetail } from "@/feature/listening/hooks/useListeningQueries";

interface ListeningDetailViewProps {
  id: string;
}

export function ListeningDetailView({ id }: ListeningDetailViewProps) {
  const { data, isLoading, error } = useListeningDetail(id);

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
      audioUrl={sampleListening.audio_url ?? ""}
      questions={sampleListening.questions ?? []}
    />
  );
}
