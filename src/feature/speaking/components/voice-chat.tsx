"use client";

import React, { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import {
  AudioLines,
  Copy,
  CornerDownLeft,
  RefreshCcw,
  Home,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useDeepgram } from "@/hooks/useDeepgram";
import { toast } from "sonner";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import { useSuggestChat } from "@/feature/speaking/hooks/useSuggestChat";
import AudioRecorder from "./audio-recorder";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
  ChatBubbleAction,
} from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";
import WaveAudio from "@/components/feature/WaveAudio";
import { useCreateSpeakingSubmission } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import {
  CreateSpeakingSubmissionDTO,
  ChatMessageDTO,
} from "@/services/swagger-types";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { RouteNames } from "@/constraints/route-name";

interface VoiceChatProps {
  context?: string;
  isResultView?: boolean;
  savedChatHistory?: ChatMessageDTO[];
  lessonId: string;
}

const VoiceChat = ({
  context,
  isResultView = false,
  savedChatHistory,
  lessonId,
}: VoiceChatProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { suggestedResponses, firstGreeting } = useSuggestChat();
  const { ref, scrollToBottom } = useScrollToBottom<HTMLDivElement>();
  const createSpeakingSubmission = useCreateSpeakingSubmission();
  const router = useRouter();

  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      api: "/api/ai/voice-chat",
      body: { context },
      initialMessages:
        isResultView && savedChatHistory
          ? savedChatHistory.map((msg) => ({
              id: msg.id,
              role: msg.role === "user" ? "user" : "assistant",
              content: msg.text,
            }))
          : [],
    });

  const { speechToText, textToSpeech } = useDeepgram();

  const handleRecordingComplete = async (blob: Blob) => {
    try {
      const transcribedText = await speechToText(blob);
      if (transcribedText) {
        setInput(transcribedText);
      } else {
        toast.error("Could not convert speech to text. Please try again.");
      }
    } catch (error) {
      console.error("Error processing audio:", error);
      toast.error(
        "An error occurred while processing audio. Please try again.",
      );
    }
  };

  const handleSendAudio = async (blob: Blob) => {
    try {
      const transcribedText = await speechToText(blob);
      if (transcribedText) {
        setInput(transcribedText);
        handleSubmit(new Event("submit") as any);
      }
    } catch (error) {
      console.error("Error sending audio:", error);
      toast.error("Failed to send audio message");
    }
  };

  const handleTextToSpeech = async (text: string) => {
    try {
      const audioBlob = await textToSpeech(text);
      if (audioBlob && audioRef.current) {
        const audioUrl = URL.createObjectURL(audioBlob);
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
        // Cleanup URL after playing
        audioRef.current.onended = () => URL.revokeObjectURL(audioUrl);
      }
    } catch (error) {
      console.error("Error in text-to-speech:", error);
      toast.error("Failed to play audio");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const actionIcons = [
    { icon: AudioLines, type: "Listen" },
    { icon: Copy, type: "Copy" },
    { icon: RefreshCcw, type: "Regenerate" },
  ];

  const handleSave = async () => {
    try {
      const submissionData: CreateSpeakingSubmissionDTO = {
        lessonId: lessonId as string,
        submissionType: "speaking",
        tokensUsed: 0,
        content: {
          topic_text: context || "",
          prompt_text: context || "",
          chat_history: messages.map((msg) => ({
            id: msg.id,
            role: msg.role === "user" ? "user" : "bot",
            text: msg.content,
            timestamp: new Date().toISOString(),
          })),
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

  return (
    <div className="flex h-screen flex-col rounded-lg bg-card">
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
            disabled={messages.length === 0}
          >
            Save
          </Button>
        )}
      </div>

      <div ref={ref} className="thin-scrollbar flex-1 overflow-y-auto py-4">
        <ChatMessageList>
          {messages.length === 0 && (
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage>{firstGreeting}</ChatBubbleMessage>
            </ChatBubble>
          )}
          {messages.map((message, index) => (
            <ChatBubble
              key={message.id}
              variant={message.role === "user" ? "sent" : "received"}
            >
              <ChatBubbleAvatar
                className="shadow-lg"
                fallback={message.role === "user" ? "US" : "AI"}
              />
              <ChatBubbleMessage>
                {message.content}

                <div className="mt-2 flex items-center gap-2">
                  {actionIcons.map(({ icon: Icon, type }) => (
                    <ChatBubbleAction
                      className="size-6"
                      key={type}
                      icon={<Icon className="size-3" />}
                      onClick={() =>
                        console.log(
                          "Action " + type + " clicked for message " + index,
                        )
                      }
                    />
                  ))}
                </div>
              </ChatBubbleMessage>
            </ChatBubble>
          ))}
        </ChatMessageList>
      </div>

      <div className="mx-2 border-t bg-card p-4 ">
        {messages.length === 0 && !isResultView && (
          <div className="mb-4 space-y-2">
            {suggestedResponses.map((response, index) => (
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
                    handleSubmit(new Event("submit") as any);
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
            <div className="flex flex-col items-center justify-center gap-2 py-2">
              <AudioRecorder onRecordingComplete={handleRecordingComplete} />
              <WaveAudio
                audioUrl="https://utfs.io/f/fkClDhMQd7TEFE6MyrNOBZVRtYmaGTokEgPSMuA5U2jxqwiW"
                onDelete={() => {}}
              />
              <audio ref={audioRef} className="hidden" />
            </div>
            <form
              onSubmit={handleSubmit}
              className="relative rounded-lg border bg-background p-1 focus-within:ring-1 focus-within:ring-ring"
            >
              <ChatInput
                placeholder="Type your message here..."
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
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceChat;
