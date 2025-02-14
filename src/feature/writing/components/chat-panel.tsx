"use client";

import { useChat } from "ai/react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Send } from "lucide-react";
import { ChatBubble } from "@/shared/components/ui/chat-bubble";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollToBottom } from "@/shared/hooks/useScrollToBottom";
import { useEffect } from "react";

interface ChatPanelProps {
  topic: string;
  content: string;
}

export function ChatPanel({ topic, content }: ChatPanelProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/ai/chat",
    body: { topic, content },
  });
  const { ref, scrollToBottom } = useScrollToBottom<HTMLDivElement>();

  const isFirstMessage = messages.length === 0;
  const greeting =
    "Hello! I'm your writing assistant. How can I help you today?";

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div
      ref={ref}
      className="bg-background flex flex-col overflow-y-auto p-4 "
      style={{ height: "786px" }}
    >
      <div className="thin-scrollbar flex-1 space-y-4 overflow-auto p-4">
        <AnimatePresence>
          {isFirstMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ChatBubble key={0} message={greeting} role="assistant" />
            </motion.div>
          )}
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <ChatBubble
                message={m.content}
                role={m.role as "user" | "assistant"}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <form className="flex gap-2 pt-4" onSubmit={handleSubmit}>
        <Input
          placeholder="Ask for writing help..."
          value={input}
          onChange={handleInputChange}
        />
        <Button size="icon" type="submit">
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}
