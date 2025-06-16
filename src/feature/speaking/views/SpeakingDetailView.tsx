"use client";

import AppError from "@/components/common/app-error";
import { useSpeakingDetail } from "@/feature/speaking/hooks/useSpeakingClient";
import { SpeakingDetailSkeleton } from "@/feature/speaking/components/SpeakingDetailSkeleton";
import UserPreview from "@/feature/user/components/UserPreview";
import { Card, CardHeader } from "@/components/ui/card";
import { SpeakingSessionManager } from "@/feature/speaking/components/SpeakingSessionManager";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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
          <h2 className="text-2xl font-medium">{data?.data.title}</h2>
          <div className="mt-4 rounded-lg border-2 border-muted">
            <p className="p-2 text-[18px] font-light leading-relaxed">
              <Markdown rehypePlugins={[rehypeRaw]}>
                {data?.data.description}
              </Markdown>
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
                  username: data?.data.createdBy.username ?? "",
                }}
              />
            )}
          </div>
        </CardHeader>
      </Card>
      <SpeakingSessionManager
        lessonId={data?.data.id ?? ""}
        lessonData={data?.data.content ?? undefined}
      />
    </>
  );
}
