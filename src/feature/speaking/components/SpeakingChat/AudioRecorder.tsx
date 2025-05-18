import React, { useRef, useState, useCallback } from "react";
import { Mic, StopCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
}

const AudioRecorder = ({ onRecordingComplete }: AudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUrl, setRecordedUrl] = useState("");
  const audioStream = useRef<MediaStream | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      audioStream.current = stream;
      return stream;
    } catch (error: any) {
      alert(`Microphone access error: ${error.message}`);
      throw error;
    }
  };

  const startRecording = async () => {
    try {
      const stream = await requestPermission();
      if (!stream) return;

      mediaRecorder.current = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        onRecordingComplete(blob);
        chunks.current = [];
      };

      mediaRecorder.current.start(100); // Collect data every 100ms
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      alert("Failed to start recording");
    }
  };

  const cleanup = useCallback(() => {
    if (audioStream.current) {
      audioStream.current.getTracks().forEach((track) => track.stop());
      audioStream.current = null;
    }
    if (recordedUrl) {
      URL.revokeObjectURL(recordedUrl);
    }
  }, [recordedUrl]);

  const stopRecording = () => {
    if (mediaRecorder.current?.state === "recording") {
      mediaRecorder.current.stop();
      cleanup();
      setIsRecording(false);
    }
  };

  const handleReset = () => {
    cleanup();
    setRecordedUrl("");
  };

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      className={`rounded-full bg-primary text-white p-4 ${isRecording ? "animate-pulse" : ""}`}
    >
      {isRecording ? (
        <StopCircle className="size-6" />
      ) : (
        <Mic className="size-6" />
      )}
    </button>
  );
};

export default AudioRecorder;
