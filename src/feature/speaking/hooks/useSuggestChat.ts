import { useRecommendAnswer } from "@/feature/ai/hooks/useAi";
import { useState } from "react";

interface SuggestChatProps {
  sessionId: string;
  isResultView?: boolean;
}

export const useSuggestChat = ({
  sessionId,
  isResultView = false,
}: SuggestChatProps) => {
  const [firstGreeting, setFirstGreeting] = useState<string>(
    `Hello! I'm your AI assistant. Let's talk`,
  );
  const { data, refetch } = useRecommendAnswer(sessionId, isResultView);

  return {
    suggestedResponses: data?.suggestedResponses,
    firstGreeting,
    setFirstGreeting,
    refetchRecommend: refetch,
  };
};
