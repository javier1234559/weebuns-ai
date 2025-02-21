"use client";

import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface TimerProps {
  startTime: string; // ISO string time
  onEnd?: () => void;
  size?: "small" | "medium" | "large";
}

export function Timer({ startTime, onEnd, size = "medium" }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const end = new Date(startTime).getTime();
    const now = new Date().getTime();
    return Math.max(0, Math.floor((end - now) / 1000));
  });

  useEffect(() => {
    if (timeLeft === 0) {
      onEnd?.();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (newTime === 0) {
          onEnd?.();
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onEnd]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getSizeClass = () => {
    switch (size) {
      case "small":
        return "text-xs";
      case "medium":
        return "text-base";
      case "large":
        return "text-xl";
      default:
        return "text-base";
    }
  };

  return (
    <div className="flex items-center font-medium text-muted-foreground">
      <Clock
        className={cn(
          "mr-2",
          size === "small" && "h-3 w-3",
          size === "medium" && "h-4 w-4",
          size === "large" && "h-5 w-5",
        )}
      />
      <span className={getSizeClass()}>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
