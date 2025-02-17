"use client";

import React, { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Speaker } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeepgram } from "@/hooks/useDeepgram";
import { toast } from "sonner";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import { useSuggestChat } from "@/feature/speaking/hooks/useSuggestChat";
import AudioRecorder from "./audio-recorder";

interface VoiceChatProps {
  context: string;
}

const VoiceChat = ({ context }: VoiceChatProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { suggestedResponses, firstGreeting } = useSuggestChat();
  const { ref, scrollToBottom } = useScrollToBottom<HTMLDivElement>();

  const { messages, input, handleInputChange, handleSubmit, setInput } =
    useChat({
      api: "/api/ai/voice-chat",
      body: { context },
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

  return (
    <div className="flex h-screen flex-col bg-background">
      <div ref={ref} className="flex-1 space-y-4 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="rounded-lg bg-card p-4 shadow">
                <p className="text-foreground">{firstGreeting}</p>
              </div>

              <div className="space-y-2">
                {suggestedResponses.map((response, index) => (
                  <motion.div
                    key={response}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start"
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
            </motion.div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3/4 rounded-lg p-4 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-card-foreground"
                } shadow`}
              >
                <p>{message.content}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleTextToSpeech(message.content)}
                >
                  <Speaker className="mr-2 size-4" />
                  Listen
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t bg-card p-4">
        <AudioRecorder onRecordingComplete={handleRecordingComplete} />
        <form onSubmit={handleSubmit} className="mt-2 flex items-center gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">Send</Button>
        </form>
        <audio ref={audioRef} className="hidden" />
      </div>
    </div>
  );
};

export default VoiceChat;
