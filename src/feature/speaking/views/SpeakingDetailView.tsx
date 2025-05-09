"use client";

import AppError from "@/components/common/app-error";
import VoiceChat from "@/feature/speaking/components/voice-chat";
import { useSpeakingDetail } from "@/feature/speaking/hooks/useSpeakingClient";
import { SpeakingDetailSkeleton } from "@/feature/speaking/components/SpeakingDetailSkeleton";
import UserPreview from "@/feature/user/components/UserPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SpeakingDetailViewProps {
  id: string;
}

export function SpeakingDetailView({ id }: SpeakingDetailViewProps) {
  const { data, isLoading, error } = useSpeakingDetail(id);

  if (isLoading) {
    return <SpeakingDetailSkeleton />;
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
                  }}
                />
              )}
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardContent className="mt-4 flex flex-col">
          <VoiceChat
            context={data?.data.content?.prompt_text}
            lessonId={data?.data.id ?? ""}
          />
        </CardContent>
      </Card>
    </>
  );
}
