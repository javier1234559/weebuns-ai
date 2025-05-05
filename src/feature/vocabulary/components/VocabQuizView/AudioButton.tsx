import { Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type LANG = "en-US" | "vi-VN";

const speak = (text: string, lang: LANG) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }
};

interface AudioButtonProps {
  text: string;
  size?: "sm" | "default" | "lg";
  className?: string;
  lang?: LANG;
}

const AudioButton = ({
  text,
  size = "default",
  className,
  lang = "en-US",
}: AudioButtonProps) => (
  <Button
    variant="ghost"
    size={size}
    onClick={(e) => {
      e.stopPropagation();
      speak(text, lang);
    }}
    className={cn("text-primary hover:bg-muted", className)}
  >
    <Volume2
      className={cn(
        size === "sm" && "size-4",
        size === "default" && "size-5",
        size === "lg" && "size-6",
      )}
    />
  </Button>
);

AudioButton.displayName = "AudioButton";
export default AudioButton;
