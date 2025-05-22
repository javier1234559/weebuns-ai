import { useRef, useCallback, useEffect } from "react";
import { useUpsertStudyActivity } from "./useActivity";
import { useAuthStore } from "@/store/auth-store";
import { CountUpTimerRef } from "@/components/feature/CountUpTimer";

interface ActivityTrackingOptions {
  skill: "reading" | "listening" | "writing" | "speaking";
  isPractice?: boolean;
  timeLimit?: number;
  onTimeUp?: () => void;
}

export const useActivityTracking = ({
  skill,
  isPractice = true,
  timeLimit,
  onTimeUp,
}: ActivityTrackingOptions) => {
  const { user } = useAuthStore();
  const { mutate: upsertActivity } = useUpsertStudyActivity();
  const timerRef = useRef<CountUpTimerRef>(null);

  const handleTimeUp = useCallback(() => {
    if (!isPractice && timeLimit) {
      // For test mode, submit with time limit
      const activityData = {
        date: new Date().toISOString().split("T")[0],
        reading: skill === "reading" ? 1 : 0,
        listening: skill === "listening" ? 1 : 0,
        writing: skill === "writing" ? 1 : 0,
        speaking: skill === "speaking" ? 1 : 0,
        totalMinutes: timeLimit,
      };

      upsertActivity({
        userId: user?.id || "",
        data: activityData,
      });

      console.log("upsertActivity", activityData);
      onTimeUp?.();
    }
  }, [isPractice, timeLimit, skill, user?.id, upsertActivity, onTimeUp]);

  const handleSubmit = useCallback(async () => {
    if (isPractice) {
      // For practice mode, submit with actual time spent
      const totalSeconds = timerRef.current?.getSeconds() ?? 0;
      const minutes = Math.ceil(totalSeconds / 60);

      const activityData = {
        date: new Date().toISOString().split("T")[0],
        reading: skill === "reading" ? 1 : 0,
        listening: skill === "listening" ? 1 : 0,
        writing: skill === "writing" ? 1 : 0,
        speaking: skill === "speaking" ? 1 : 0,
        totalMinutes: minutes,
      };

      upsertActivity({
        userId: user?.id || "",
        data: activityData,
      });

      console.log("upsertActivity", activityData);
    }
  }, [isPractice, skill, user?.id, upsertActivity]);

  return {
    timerRef,
    handleTimeUp,
    handleSubmit,
  };
};
