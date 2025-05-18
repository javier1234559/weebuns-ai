"use client";

import React, { useState } from "react";
import { CornerDownLeft, Home, Mic, Type } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import { useSuggestChat } from "@/feature/speaking/hooks/useSuggestChat";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { useCreateSpeakingSubmission } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import {
  CreateSpeakingSubmissionDTO,
  ChatMessageDTO,
} from "@/services/swagger-types";
import { useRouter } from "next/navigation";
import { RouteNames } from "@/constraints/route-name";
import { useStreamingChat } from "@/hooks/useStreamingChat";
import { simpleInlineMarkdownToHtml } from "@/lib/text";
import StreamingMessage from "@/components/custom/StreamingMessage";
import CopyMessage from "@/feature/speaking/components/SpeakingChat/CopyMessage";
import AudioMessage from "@/feature/speaking/components/SpeakingChat/AudioMessage";
import SpeakingSubmit from "./SpeakingSubmit";
import { Switch } from "@/components/ui/switch";
import { globalConfig } from "@/config";
import { useAuthStore } from "@/store/auth-store";

interface MainChatProps {
  context?: string;
  isResultView?: boolean;
  savedChatHistory?: ChatMessageDTO[];
  lessonId: string;
  sessionId: string;
}

const MainChat = ({
  context,
  isResultView = false,
  savedChatHistory = [],
  lessonId,
  sessionId,
}: MainChatProps) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { suggestedResponses, firstGreeting, refetchRecommend } =
    useSuggestChat({
      sessionId,
    });
  const { ref, scrollToBottom } = useScrollToBottom<HTMLDivElement>();
  const createSpeakingSubmission = useCreateSpeakingSubmission();
  const { parts, fullText, sendMessage } = useStreamingChat({
    apiUrl: `${globalConfig.API_URL}/api/ai/speaking/chat-streaming`,
  });

  const [chatHistory, setChatHistory] =
    useState<ChatMessageDTO[]>(savedChatHistory);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [isVoiceMode, setIsVoiceMode] = useState(true);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessageDTO = {
      id: Date.now().toString(),
      role: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };
    setChatHistory((prev) => [...prev, userMessage]);
    setInput("");

    // Start streaming
    setIsStreaming(true);
    await sendMessage({
      message: input,
      sessionId,
    });
  };

  const handleSave = async () => {
    try {
      const submissionData: CreateSpeakingSubmissionDTO = {
        lessonId: lessonId as string,
        submissionType: "speaking",
        tokensUsed: 0,
        content: {
          topic_text: context || "",
          prompt_text: context || "",
          chat_history: chatHistory,
        },
      };

      await createSpeakingSubmission.mutateAsync(submissionData);
      toast.success("Chat history saved successfully!");
    } catch (error) {
      console.error("Error saving chat history:", error);
      toast.error("Failed to save chat history");
    }
  };

  const handleBackToHome = () => {
    router.push(RouteNames.Home);
  };

  const handleStreamingComplete = () => {
    const botMessage: ChatMessageDTO = {
      id: Date.now().toString(),
      role: "bot",
      text: fullText,
      timestamp: new Date().toISOString(),
    };
    setChatHistory((prev) => [...prev, botMessage]);
    setIsStreaming(false);
    refetchRecommend();
  };

  const handleUpdateAudioUrl = (audioUrl: string) => {
    setChatHistory((prev) =>
      prev.map((message) => {
        if (message.id === playingMessageId) {
          return {
            ...message,
            audio_url: audioUrl,
          };
        }
        return message;
      }),
    );
  };

  return (
    <div className="flex flex-col rounded-lg bg-card">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-xl font-semibold">Speaking Practice</h2>
        {isResultView && (
          <Button variant="outline" size="sm" onClick={handleBackToHome}>
            <Home className="mr-2 size-4" />
            Back to Home
          </Button>
        )}
        {!isResultView && (
          <Button
            size="sm"
            variant="outline"
            className="mr-2"
            onClick={handleSave}
            disabled={chatHistory.length === 0}
          >
            Save
          </Button>
        )}
      </div>

      <ChatMessageList
        ref={ref}
        className="thin-scrollbar h-screen flex-1 overflow-y-auto overflow-x-hidden px-8 py-4"
      >
        {chatHistory.length === 0 && (
          <ChatBubble variant="received">
            <ChatBubbleAvatar fallback="AI" />
            <ChatBubbleMessage>{firstGreeting}</ChatBubbleMessage>
          </ChatBubble>
        )}
        {chatHistory.map((message) => (
          <ChatBubble
            key={message.id}
            variant={message.role === "user" ? "sent" : "received"}
          >
            <ChatBubbleAvatar
              src={message.role === "user" ? (user?.profilePicture ?? "") : ""}
              className="shadow-lg"
              fallback={message.role === "user" ? "US" : "AI"}
            />
            <ChatBubbleMessage className="w-1/2">
              <span
                className="animate-fade-in"
                dangerouslySetInnerHTML={{
                  __html: simpleInlineMarkdownToHtml(message.text),
                }}
              />
              <div className="mt-2 flex items-center gap-2">
                <AudioMessage
                  text={message.text}
                  messageId={message.id}
                  audioUrl={message.audio_url}
                  onComplete={handleUpdateAudioUrl}
                />
                <CopyMessage text={message.text} />
              </div>
            </ChatBubbleMessage>
          </ChatBubble>
        ))}
        <AnimatePresence>
          {isStreaming && (
            <StreamingMessage
              key={parts.length}
              parts={parts}
              onComplete={handleStreamingComplete}
            />
          )}
        </AnimatePresence>
      </ChatMessageList>

      <div className="mx-2 border-t bg-card p-4 ">
        {chatHistory.length === 0 && !isResultView && (
          <div className="mb-4 space-y-2">
            {suggestedResponses?.map((response, index) => (
              <motion.div
                key={response}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start text-wrap break-words px-2 py-4 leading-5"
                  onClick={() => {
                    setInput(response);
                    handleSubmit();
                  }}
                >
                  {response}
                </Button>
              </motion.div>
            ))}
          </div>
        )}
        {!isResultView && (
          <>
            <div className="mb-4 flex items-center justify-center gap-2">
              <Type className="size-4" />
              <Switch
                checked={isVoiceMode}
                onCheckedChange={setIsVoiceMode}
                className="data-[state=checked]:bg-primary"
              />
              <Mic className="size-4" />
            </div>

            {isVoiceMode ? (
              <div className="flex flex-col items-center justify-center gap-2 py-2">
                <SpeakingSubmit
                  setValue={setInput}
                  onSubmit={handleSubmit}
                  value={input}
                />
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="relative rounded-lg border bg-background p-1 focus-within:ring-1 focus-within:ring-ring"
              >
                <ChatInput
                  placeholder="Type your message here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="min-h-12 resize-none rounded-lg border-0 bg-background p-3 shadow-none focus-visible:ring-0"
                />
                <div className="flex items-center p-3 pt-0">
                  <Button
                    size="sm"
                    className="ml-auto gap-1.5"
                    type="submit"
                    disabled={isStreaming}
                  >
                    Send Message
                    <CornerDownLeft className="size-3.5" />
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MainChat;
