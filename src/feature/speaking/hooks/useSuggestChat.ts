import { useRecommendAnswer } from "@/feature/ai/hooks/useAi";
import { useState } from "react";

interface SuggestChatProps {
  sessionId: string;
}

export const useSuggestChat = ({ sessionId }: SuggestChatProps) => {
  const [firstGreeting, setFirstGreeting] = useState<string>(
    `Hello! I'm your AI assistant. Let's talk`,
  );
  const { data, refetch } = useRecommendAnswer(sessionId);

  return {
    suggestedResponses: data?.suggestedResponses,
    firstGreeting,
    setFirstGreeting,
    refetchRecommend: refetch,
  };
};
