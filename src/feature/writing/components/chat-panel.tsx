"use client";

import { useChat } from "ai/react";
import { ChatBubble } from "@/components/ui/chat/chat-bubble";
import { CornerDownLeft, Loader2 } from "lucide-react";
import { ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatBubbleAvatar } from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { TOKEN_COSTS } from "@/feature/token/constants";
import { TokenProtectedButton } from "@/feature/token/components/TokenProtectedButton";
import { toast } from "@/hooks/use-toast";

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

  const handleChatSubmit = async () => {
    try {
      await handleSubmit();
      toast({
        title: "Message Sent",
        description: "Your message has been sent successfully.",
      });
    } catch (error) {
      toast({
        title: "Failed to Send",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="flex flex-col bg-background" style={{ height: "1000px" }}>
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
                className="bg-card shadow-lg"
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
            <TokenProtectedButton
              requiredTokens={TOKEN_COSTS.CHAT}
              onAction={handleChatSubmit}
              className="ml-auto gap-1.5"
            >
              {messages.length > 0 &&
              messages[messages.length - 1].role === "user" ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message ({TOKEN_COSTS.CHAT} Tokens)
                  <CornerDownLeft className="size-3.5" />
                </>
              )}
            </TokenProtectedButton>
          </div>
        </form>
      </div>
    </div>
  );
}
