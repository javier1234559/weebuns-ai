import { TokenProtectedButton } from "@/feature/token/components/TokenProtectedButton";
import { PlayIcon } from "lucide-react";
import { useStartSpeaking } from "@/feature/ai/hooks/useAi";
import { StartSpeakingDto } from "@/services/swagger-types";
import { useActivityTracking } from "@/feature/activity/hooks/useActivityTracking";

interface StartSpeakingSessionButtonProps {
  lessonId: string;
  userId: string;
  promptText: string;
  topicText: string;
  followupExamples: string[];
  backgroundKnowledge: string;
  onSuccess?: (response: { sessionId: string; topicText: string }) => void;
  requiredTokens?: number;
  variant?: "default" | "outline";
  className?: string;
}

export function StartSpeakingSessionButton({
  lessonId,
  userId,
  promptText,
  topicText,
  followupExamples,
  backgroundKnowledge,
  onSuccess,
  requiredTokens = 10,
  variant = "outline",
  className,
}: StartSpeakingSessionButtonProps) {
  const { mutate: startSpeaking } = useStartSpeaking();

  const handleStartSpeaking = async () => {
    const data: StartSpeakingDto = {
      lessonId,
      userId,
      promptText,
      topicText,
      followupExamples,
      backgroundKnowledge,
    };

    startSpeaking(data, {
      onSuccess: (response) => {
        onSuccess?.(response as { sessionId: string; topicText: string });
      },
    });
    handleSubmitActivity();
  };

  const {
    handleSubmit: handleSubmitActivity,
  } = useActivityTracking({
    skill: "speaking",
    isPractice: true,
  });

  return (
    <TokenProtectedButton
      variant={variant}
      onAction={handleStartSpeaking}
      requiredTokens={requiredTokens}
      className={className}
    >
      <PlayIcon className="mr-2 size-4" />
      Start Speaking Session ({requiredTokens} tokens)
    </TokenProtectedButton>
  );
}
