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
import { simpleInlineMarkdownToHtml } from "@/lib/text";
import { AnimatePresence } from "framer-motion";
import StreamingMessage from "@/components/custom/StreamingMessage";
import { useState, useEffect } from "react";

interface ChatPanelProps {
  topic: string;
  content: string;
}

export function ChatPanel({ topic, content }: ChatPanelProps) {
  const [displayedMessages, setDisplayedMessages] = useState<typeof messages>([]);
  const [pendingMessage, setPendingMessage] = useState<typeof messages[0] | null>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/ai/chat",
      body: { topic, content },
      onError: (error) => {
        toast({
          title: "Failed to Send",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      },
      onFinish: () => {
        // Don't show toast here since we'll show it after animation
      },
    });

  const greeting =
    "Hello! I'm your writing assistant. How can I help you today?";

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "user") {
      // Immediately show user messages
      setDisplayedMessages(messages);
      setPendingMessage(null);
    } else if (lastMessage?.role === "assistant" && isLoading) {
      // For AI messages, set as pending during streaming
      setDisplayedMessages(messages.slice(0, -1));
      setPendingMessage(lastMessage);
    }
  }, [messages, isLoading]);

  const lastMessage = messages[messages.length - 1];
  const isAiResponseLoading = isLoading && lastMessage?.role === "user";
  const isStreaming = Boolean(pendingMessage) && isLoading;

  const handleChatSubmit = async () => {
    try {
      await handleSubmit();
    } catch (error) {
      throw error;
    }
  };

  const handleStreamingComplete = () => {
    // Add the pending message to displayed messages
    if (pendingMessage) {
      setDisplayedMessages(prev => [...prev, pendingMessage]);
      setPendingMessage(null);
    }

    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
  };

  const streamingContent = pendingMessage?.content || "";
  const streamingArray = Array.from(
    { length: Math.ceil(streamingContent.length / 5) },
    (_, i) => streamingContent.slice(i * 5, (i + 1) * 5),
  );

  return (
    <div className="flex flex-col bg-background" style={{ height: "1000px" }}>
      <div className="thin-scrollbar flex-1 overflow-y-auto py-4">
        <ChatMessageList className="thin-scrollbar ">
          {displayedMessages.length === 0 && !pendingMessage && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage>{greeting}</ChatBubbleMessage>
            </ChatBubble>
          )}
          {displayedMessages.map((message) => (
            <ChatBubble
              key={message.id}
              variant={message.role === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="bg-card shadow-lg"
                fallback={message.role === "user" ? "US" : "AI"}
              />
              <ChatBubbleMessage>
                <span
                  dangerouslySetInnerHTML={{
                    __html: simpleInlineMarkdownToHtml(message.content),
                  }}
                />
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
          {isAiResponseLoading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage className="w-1/2">
                <span className="animate-pulse">Thinking...</span>
              </ChatBubbleMessage>
            </ChatBubble>
          )}
          <AnimatePresence>
            {isStreaming && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage>
                  <StreamingMessage
                    parts={streamingArray}
                    onComplete={handleStreamingComplete}
                  />
                </ChatBubbleMessage>
              </ChatBubble>
            )}
          </AnimatePresence>
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
