"use client";

import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { ChatBubble } from "@/components/ui/chat/chat-bubble";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import { CornerDownLeft } from "lucide-react";
import { ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatBubbleAvatar } from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";

interface ChatPanelProps {
  topic: string;
  content: string;
}

export function ChatPanel({ topic, content }: ChatPanelProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/ai/chat",
    body: { topic, content },
  });

  const greeting =
    "Hello! I'm your writing assistant. How can I help you today?";

  return (
    <div className="flex flex-col bg-background" style={{ height: "820px" }}>
      <div className="flex-1 overflow-y-auto py-4">
        <ChatMessageList>
          {messages.length === 0 && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage>{greeting}</ChatBubbleMessage>
            </ChatBubble>
          )}
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.role === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="shadow-lg "
                fallback={message.role === "user" ? "US" : "AI"}
              />
              <ChatBubbleMessage>{message.content}</ChatBubbleMessage>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </div>

      <div className="border-t bg-card py-4">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background p-1 focus-within:ring-1 focus-within:ring-ring"
        >
          <ChatInput
            placeholder="Ask for writing help..."
            value={input}
            onChange={handleInputChange}
            className="min-h-12 resize-none rounded-lg border-0 bg-background p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button size="sm" className="ml-auto gap-1.5" type="submit">
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
