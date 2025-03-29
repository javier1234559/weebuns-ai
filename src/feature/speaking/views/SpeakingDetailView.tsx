"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import VoiceChat from "@/feature/speaking/components/voice-chat";
import { useSpeakingDetail } from "@/feature/speaking/hooks/useSpeakingClient";

interface SpeakingDetailViewProps {
  id: string;
}

export function SpeakingDetailView({ id }: SpeakingDetailViewProps) {
  const { data, isLoading, error } = useSpeakingDetail(id);

  if (isLoading) {
    return <AppLoading />;
  }

  if (error) {
    return <AppError error={error} />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 p-4">
        <h1 className="text-2xl font-bold">{data?.data.title}</h1>
        <p className="text-sm text-gray-500">{data?.data.description}</p>
      </div>
      <VoiceChat context={data?.data.content?.prompt_text} />
    </div>
  );
}
