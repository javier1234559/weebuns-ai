import { useState } from "react";

const vietnamFoodRecommendations = [
  "What are the most popular Vietnamese dishes?",
  "Can you tell me about the history of Vietnamese cuisine?",
  "What makes Vietnamese food unique?",
  "I'd like to know about street food in Vietnam",
  "Tell me about traditional Vietnamese cooking methods",
];

export const useSuggestChat = () => {
  const [firstGreeting, setFirstGreeting] = useState<string>(
    `Hello! I'm your AI assistant. Let's talk about Vietnamese food!`
  );
  const [suggestedResponses, setSuggestedResponses] = useState<string[]>([
    ...vietnamFoodRecommendations,
  ]);

  return {
    suggestedResponses,
    setSuggestedResponses,
    firstGreeting,
    setFirstGreeting,
  };
};
