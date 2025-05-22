"use client";

import React, { useMemo, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  addDays,
  isSameMonth,
  addMonths,
  subMonths,
} from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Constants
const DAYS_OF_WEEK = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];
const MAX_LESSONS_PER_DAY = 10;
const INTENSITY_LEVELS = [20, 40, 60, 80, 100];
const ACTIVITY_ICONS = {
  reading: "📖",
  listening: "🎧",
  writing: "✍️",
  speaking: "🗣️",
} as const;
const BASE_INTENSITY = 0.7;

interface ActivityData {
  date: string;
  reading: number;
  listening: number;
  writing: number;
  speaking: number;
  total_time: string;
}

interface StreakCalendarProps {
  activities?: Record<string, ActivityData>;
  initialDate?: Date;
  onChangeMonthAndYear?: (month: number, year: number) => void;
}

const calculateIntensity = (activity: ActivityData) => {
  const totalLessons =
    activity.reading +
    activity.listening +
    activity.writing +
    activity.speaking;
  return Math.min(totalLessons / MAX_LESSONS_PER_DAY, 1);
};

const DayCell = ({
  day,
  isCurrentMonth,
  className,
}: {
  day: any;
  isCurrentMonth: boolean;
  className?: string;
}) => {
  if (!isCurrentMonth) {
    return (
      <div
        className={cn("flex size-full items-center justify-center", className)}
      >
        <span className="text-muted-foreground/40">{day.dayNumber}</span>
      </div>
    );
  }

  const content = (
    <div
      className={cn(
        "flex size-full flex-col items-center justify-center p-4",
        className,
      )}
      style={
        day.activity
          ? {
              backgroundColor: `hsl(var(--primary) / ${(day.intensity * BASE_INTENSITY).toFixed(2)})`,
            }
          : undefined
      }
    >
      <span className="text-sm">{day.dayNumber}</span>
      {day.activity && (
        <div className="mt-0.5 flex gap-0.5 text-[10px]">
          {day.activity.reading > 0 && <span>{ACTIVITY_ICONS.reading}</span>}
          {day.activity.listening > 0 && (
            <span>{ACTIVITY_ICONS.listening}</span>
          )}
          {day.activity.writing > 0 && <span>{ACTIVITY_ICONS.writing}</span>}
          {day.activity.speaking > 0 && <span>{ACTIVITY_ICONS.speaking}</span>}
        </div>
      )}
    </div>
  );

  if (!day.activity) {
    return (
      <div
        className={cn(
          "size-full rounded-sm transition-colors hover:bg-primary/[0.15]",
        )}
      >
        {content}
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="size-full rounded-sm transition-all hover:brightness-110">
          {content}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-3">
        <div className="space-y-2">
          <div className="border-b pb-2 font-medium">
            {format(day.date, "EEEE, dd/MM/yyyy", { locale: vi })}
          </div>
          <div className="space-y-2 text-sm">
            <p className="font-medium">
              Tổng thời gian: {day.activity.total_time}
            </p>
            {Object.entries(ACTIVITY_ICONS).map(
              ([key, icon]) =>
                day.activity[key as keyof typeof ACTIVITY_ICONS] > 0 && (
                  <div key={key} className="flex items-center gap-2">
                    <span className="text-xs">{icon}</span>
                    <p>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:{" "}
                      {day.activity[key as keyof typeof ACTIVITY_ICONS]} bài
                    </p>
                  </div>
                ),
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const StreakCalendar: React.FC<StreakCalendarProps> = ({
  activities = {},
  initialDate = new Date(),
  onChangeMonthAndYear,
}) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const { weeks, monthYear } = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);

    const weekStarts = eachWeekOfInterval({ start, end }, { weekStartsOn: 1 });

    const weeksData = weekStarts.map((weekStart, weekIndex) => ({
      weekNumber: weekIndex + 1,
      days: Array.from({ length: 7 }, (_, i) => {
        const date = addDays(weekStart, i);
        const dateStr = format(date, "yyyy-MM-dd");
        const activity = activities[dateStr];

        return {
          date,
          dateStr,
          dayNumber: format(date, "d"),
          activity,
          isCurrentMonth: isSameMonth(date, currentDate),
          intensity: activity ? calculateIntensity(activity) : 0,
        };
      }),
    }));

    return {
      weeks: weeksData,
      monthYear: format(currentDate, "MMMM yyyy", { locale: vi }),
    };
  }, [currentDate, activities]);

  const handleNextMonth = () => {
    setCurrentDate((date) => addMonths(date, 1));
    onChangeMonthAndYear?.(
      currentDate.getMonth(),
      currentDate.getFullYear(),
    );
  };

  const handlePrevMonth = () => {
    setCurrentDate((date) => subMonths(date, 1));
    onChangeMonthAndYear?.(
      currentDate.getMonth(),
      currentDate.getFullYear(),
    );
  };

  return (
    <div className="w-full px-6">
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePrevMonth}
          className="hover:bg-primary"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <div className="text-base font-medium">
          Tháng {format(currentDate, "MM / yyyy", { locale: vi })}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleNextMonth}
          className="hover:bg-primary"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>

      <div className="w-full overflow-x-auto">
        {/* Header */}
        <div className="mb-2 grid min-w-[600px] grid-cols-8">
          <div className="pl-4 text-left text-sm text-muted-foreground/80">
            Tuần
          </div>
          {DAYS_OF_WEEK.map((day) => (
            <div key={day} className="text-center text-base">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div>
          {weeks.map((week) => (
            <div
              key={week.weekNumber}
              className="mb-1 grid min-w-[600px] grid-cols-8"
            >
              <div className="pl-4 text-left text-sm text-muted-foreground/80">
                Tuần {week.weekNumber}
              </div>
              {week.days.map((day) => (
                <div
                  key={day.dateStr}
                  className="relative aspect-square transition-colors"
                >
                  <DayCell
                    day={day}
                    isCurrentMonth={day.isCurrentMonth}
                    className="relative aspect-square transition-colors"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-end gap-2">
        <span className="text-sm text-muted-foreground">Số bài học:</span>
        <div className="flex gap-1">
          {INTENSITY_LEVELS.map((intensity) => (
            <div
              key={intensity}
              className="size-3 rounded"
              style={{
                backgroundColor: `rgba(var(--primary), ${intensity * BASE_INTENSITY})`,
              }}
            />
          ))}
        </div>
        <span className="ml-1 text-xs text-muted-foreground">
          {MAX_LESSONS_PER_DAY} bài
        </span>
      </div>
    </div>
  );
};

export default StreakCalendar;
