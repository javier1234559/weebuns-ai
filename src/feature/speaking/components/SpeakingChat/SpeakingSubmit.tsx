import React, { useState, useEffect } from "react";
import AudioRecorder from "./AudioRecorder";
import WaveAudio from "@/components/feature/WaveAudio";
import { useDeepgram } from "@/hooks/useDeepgram";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash } from "lucide-react";

interface SpeakingSubmitProps {
  value: string;
  setValue: (val: string) => void;
  onCompleteRecord?: (text: string) => void;
  onSubmit: () => void;
}

const SpeakingSubmit = ({
  value,
  setValue,
  onCompleteRecord,
  onSubmit,
}: SpeakingSubmitProps) => {
  const { speechToText } = useDeepgram();
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // Cleanup audio URL when component unmounts or audio changes
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleRecordingComplete = async (blob: Blob) => {
    // Cleanup old URL if exists
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    // Create new blob and URL
    const newBlob = new Blob([blob], { type: "audio/webm" });
    const newUrl = URL.createObjectURL(newBlob);

    setAudioBlob(newBlob);
    setAudioUrl(newUrl);
    setIsLoading(true);

    try {
      const transcribedText = await speechToText(newBlob);
      if (transcribedText) {
        setValue(transcribedText);
        if (onCompleteRecord) onCompleteRecord(transcribedText);
      } else {
        toast.error("Could not convert speech to text. Please try again.");
      }
    } catch (error) {
      console.error("Error processing audio:", error);
      toast.error(
        "An error occurred while processing audio. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioBlob(null);
    setAudioUrl("");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-2">
      {audioUrl && (
        <div className="flex items-center justify-between gap-2">
          <audio controls src={audioUrl} />
          <Button variant="destructive" onClick={handleDeleteAudio} size="sm">
            <Trash className="size-8" />
          </Button>
        </div>
      )}

      <AudioRecorder onRecordingComplete={handleRecordingComplete} />
      <Button
        disabled={isLoading || !audioBlob}
        type="submit"
        className="px-10"
        onClick={onSubmit}
      >
        Gửi
      </Button>
      {value && (
        <div className="border-1 rounded-md border p-4 text-center text-muted-foreground">
          {value}
        </div>
      )}
    </div>
  );
};

export default SpeakingSubmit;
