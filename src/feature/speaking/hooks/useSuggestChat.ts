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
  const { data, refetch, isLoading } = useRecommendAnswer(
    sessionId,
    isResultView,
  );

  console.log("suggest chat", JSON.stringify(data, null, 2));

  return {
    suggestedResponses: data?.suggestedResponses,
    firstGreeting,
    setFirstGreeting,
    refetchRecommend: refetch,
    isLoading,
  };
};
