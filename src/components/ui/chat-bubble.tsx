import React from "react";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps {
  message: string;
  role: "user" | "assistant";
}

export function ChatBubble({ message, role }: ChatBubbleProps) {
  return (
    <div className={`flex ${role === "user" ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[320px] rounded-lg p-3 ${
          role === "user"
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        } whitespace-pre-wrap`}
      >
        <ReactMarkdown>{message}</ReactMarkdown>
      </div>
    </div>
  );
}
