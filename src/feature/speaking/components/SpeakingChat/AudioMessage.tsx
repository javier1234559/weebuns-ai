import { AudioLines, Pause } from "lucide-react";
import { ChatBubbleAction } from "@/components/ui/chat/chat-bubble";
import { useDeepgram } from "@/hooks/useDeepgram";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import uploadApi from "@/feature/upload/services/uploadApi";

interface AudioMessageProps {
  text: string;
  messageId: string;
  audioUrl?: string;
  onComplete?: (url: string) => void;
}

export default function AudioMessage({
  text,
  messageId,
  audioUrl,
  onComplete,
}: AudioMessageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [url, setUrl] = useState<string | null>(audioUrl ?? null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { textToSpeech } = useDeepgram();

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, []);

  const initAudio = (src: string) => {
    const audio = new Audio(src);
    audioRef.current = audio;

    audio.onended = () => setIsPlaying(false);
    audio.onpause = () => setIsPlaying(false);

    return audio;
  };

  const playAudio = async () => {
    try {
      let audio: HTMLAudioElement;

      if (!url) {
        const blob = await textToSpeech(text);
        if (!blob) throw new Error("No audio returned");

        const file = new File([blob], `${messageId}.mp3`, {
          type: "audio/mpeg",
        });

        toast.success("Upload and generate audio. Please wait ...");
        const result = await uploadApi.uploadFile(file);
        const uploadedUrl = result.data.appUrl;

        setUrl(uploadedUrl);
        onComplete?.(uploadedUrl);

        audio = initAudio(uploadedUrl);
      } else {
        audio = audioRef.current ?? initAudio(url);
      }

      setIsPlaying(true);
      await audio.play();
    } catch (err) {
      console.error("Audio error:", err);
      toast.error("Failed to play audio");
    }
  };

  const handleClick = () => {
    const audio = audioRef.current;

    if (isPlaying && audio) {
      audio.pause();
    } else {
      playAudio();
    }
  };

  return (
    <ChatBubbleAction
      className="size-6"
      icon={
        isPlaying ? (
          <Pause className="size-3" />
        ) : (
          <AudioLines className="size-3" />
        )
      }
      onClick={handleClick}
    />
  );
}
