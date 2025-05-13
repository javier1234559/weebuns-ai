import { TokenProtectedButton } from "@/feature/token/components/TokenProtectedButton";
import { PlayIcon } from "lucide-react";
import { useStartSpeaking } from "@/feature/ai/hooks/useAi";
import { StartSpeakingDto } from "@/services/swagger-types";

interface StartSpeakingSessionButtonProps {
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
      promptText,
      topicText,
      followupExamples,
      backgroundKnowledge,
    };

    startSpeaking(data, {
      onSuccess: (response) => {
        onSuccess?.(response);
      },
    });
  };

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
