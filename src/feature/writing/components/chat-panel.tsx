"use client";

import { useChat } from "ai/react";
import { useState, useEffect, useMemo } from "react";
import { toast } from "@/hooks/use-toast";
import { AnimatePresence } from "framer-motion";
import { CornerDownLeft, Loader2 } from "lucide-react";

import { TOKEN_COSTS } from "@/feature/token/constants";
import { TokenProtectedButton } from "@/feature/token/components/TokenProtectedButton";
import { simpleInlineMarkdownToHtml } from "@/lib/text";

import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";
import StreamingMessage from "@/components/custom/StreamingMessage";
import { isEqual } from "lodash";

interface ChatPanelProps {
  topic: string;
  content: string;
}

const GREETING = "Hello! I'm your writing assistant. How can I help you today?";

export function ChatPanel({ topic, content }: ChatPanelProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/ai/chat",
      body: { topic, content },
      onError: () => {
        toast({
          title: "Failed to Send",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
      },
    });

  const [displayedMessages, setDisplayedMessages] = useState<typeof messages>(
    [],
  );
  const [pendingMessage, setPendingMessage] = useState<
    (typeof messages)[0] | null
  >(null);

  useEffect(() => {
    const last = messages.at(-1);
    if (!last) {
      setDisplayedMessages([]);
      setPendingMessage(null);
      return;
    }

    const isAssistantReply = last.role === "assistant";
    const baseMessages =
      isAssistantReply && isLoading ? messages.slice(0, -1) : messages;

    if (!isEqual(baseMessages, displayedMessages)) {
      setDisplayedMessages(baseMessages);
    }

    setPendingMessage(isAssistantReply && isLoading ? last : null);
  }, [messages, isLoading]);

  const isStreaming = isLoading && pendingMessage?.role === "assistant";

  const streamingChunks = useMemo(() => {
    const content = pendingMessage?.content ?? "";
    return Array.from({ length: Math.ceil(content.length / 5) }, (_, i) =>
      content.slice(i * 5, (i + 1) * 5),
    );
  }, [pendingMessage?.content]);

  const handleChatSubmit = async () => {
    try {
      await handleSubmit();
    } catch (err) {
      console.error(err);
    }
  };

  const handleStreamingComplete = () => {
    if (pendingMessage) {
      setDisplayedMessages((prev) => [...prev, pendingMessage]);
      setPendingMessage(null);
    }

    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
  };

  return (
    <div className="flex flex-col bg-background" style={{ height: "1000px" }}>
      <div className="thin-scrollbar flex-1 overflow-y-auto py-4">
        <ChatMessageList className="thin-scrollbar">
          {/* Initial Greeting */}
          {displayedMessages.length === 0 && !pendingMessage && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage>{GREETING}</ChatBubbleMessage>
            </ChatBubble>
          )}

          {/* Displayed Messages */}
          {displayedMessages.map((msg) => (
            <ChatBubble
              key={msg.id}
              variant={msg.role === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="bg-card shadow-lg"
                fallback={msg.role === "user" ? "US" : "AI"}
              />
              <ChatBubbleMessage>
                <span
                  dangerouslySetInnerHTML={{
                    __html: simpleInlineMarkdownToHtml(msg.content),
                  }}
                />
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

          {/* Thinking indicator */}
          {isLoading && messages.at(-1)?.role === "user" && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage className="w-1/2">
                <span className="animate-pulse">Thinking...</span>
              </ChatBubbleMessage>
            </ChatBubble>
          )}

          {/* Streaming message */}
          <AnimatePresence>
            {isStreaming && (
              <ChatBubble variant="received">
                <ChatBubbleAvatar fallback="AI" />
                <ChatBubbleMessage>
                  <StreamingMessage
                    parts={streamingChunks}
                    onComplete={handleStreamingComplete}
                  />
                </ChatBubbleMessage>
              </ChatBubble>
            )}
          </AnimatePresence>
        </ChatMessageList>
      </div>

      {/* Chat Input */}
      <div className="border-t bg-card py-4">
        <form
          onSubmit={handleSubmit}
          className="relative rounded-lg border bg-background p-1 focus-within:ring-1 focus-within:ring-ring"
        >
          <ChatInput
            placeholder="Ask for writing help..."
            value={input || "Ok hãy giúp tôi cho 4 ý về chủ đề này đi"}
            onChange={handleInputChange}
            className="min-h-12 resize-none rounded-lg border-0 bg-background p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <TokenProtectedButton
              requiredTokens={TOKEN_COSTS.CHAT}
              onAction={handleChatSubmit}
              className="ml-auto gap-1.5"
            >
              {messages.length > 0 && messages.at(-1)?.role === "user" ? (
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
