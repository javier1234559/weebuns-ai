"use client";

import { useState, useRef } from "react";
import { useAuthStore } from "@/store/auth-store";
import { CornerDownLeft } from "lucide-react";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { TokenProtectedButton } from "@/feature/token/components/TokenProtectedButton";
import { TOKEN_COSTS } from "@/feature/token/constants";
import TextTypewriterMD from "@/components/animata/text/text-typewriter-md";

interface ChatPanelProps {
  topic: string;
  content: string;
  messages: any[];
  onSendMessage: (message: string) => void;
  loading?: boolean;
}

const DEFAULT_MESSAGE = "Ok bạn có thể cho tôi một số ý để viết không?";

export default function ChatPanel({
  messages,
  onSendMessage,
  loading = false,
}: ChatPanelProps) {
  const { user } = useAuthStore();
  const [input, setInput] = useState(DEFAULT_MESSAGE);
  const lastMessageIdRef = useRef<number>(0);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    await onSendMessage(input);
    setInput("");
    // Update the last message ID to the current messages length
    // The next AI response will have this ID
    lastMessageIdRef.current = messages.length;
  };

  return (
    <div className="flex flex-col rounded-lg bg-card">
      <div className="flex-1 rounded-lg border bg-background p-4">
        <ChatMessageList className="thin-scrollbar !h-[800px]">
          {messages.length === 0 && !loading && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage>
                <TextTypewriterMD
                  text="Hello! I'm your writing assistant. How can I help you today?"
                  renderMarkdown
                />
              </ChatBubbleMessage>
            </ChatBubble>
          )}

          {messages.map((msg, idx) => (
            <ChatBubble
              key={idx}
              variant={msg.role === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                src={msg.role === "user" ? (user?.profilePicture ?? "") : ""}
                className="shadow-lg"
                fallback={msg.role === "user" ? "US" : "AI"}
              />
              <ChatBubbleMessage>
                <TextTypewriterMD
                  text={msg.content}
                  renderMarkdown
                  typeSpeed={7}
                  skipAnimation={
                    msg.role === "user" ||
                    idx !== messages.length - 1 ||
                    idx <= lastMessageIdRef.current
                  }
                />
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="relative mt-4 rounded-lg border bg-background p-1 focus-within:ring-1 focus-within:ring-ring"
      >
        <ChatInput
          placeholder="Type your message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
          disabled={loading}
        />
        <div className="flex items-center p-3 pt-0">
          <TokenProtectedButton
            requiredTokens={TOKEN_COSTS.CHAT}
            onAction={handleSubmit}
            disabled={loading}
            className="ml-auto gap-1.5"
          >
            Send ({TOKEN_COSTS.CHAT})
            <CornerDownLeft className="size-3.5" />
          </TokenProtectedButton>
        </div>
      </form>
    </div>
  );
}
