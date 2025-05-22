"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CountUpTimerRef {
  getSeconds: () => number;
  reset: () => void;
}

interface CountUpTimerProps {
  size?: "small" | "medium" | "large";
}

export const CountUpTimer = forwardRef<CountUpTimerRef, CountUpTimerProps>(
  ({ size = "medium" }, ref) => {
    const [elapsed, setElapsed] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      intervalRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, []);

    useImperativeHandle(ref, () => ({
      getSeconds: () => elapsed,
      reset: () => setElapsed(0),
    }));

    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;

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
);

CountUpTimer.displayName = "CountUpTimer";
