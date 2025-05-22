"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import viLocale from "@fullcalendar/core/locales/vi";
import { StreakCalendar } from "@/feature/home/components/StreakCalendar";
import { useStudyActivities } from "@/feature/activity/hooks/useActivity";
import { useAuthStore } from "@/store/auth-store";

interface ActivityData {
  date: string;
  reading: number;
  listening: number;
  writing: number;
  speaking: number;
  total_time: string;
}

const calculateActivityLevel = (activity: ActivityData) => {
  const total =
    activity.reading +
    activity.listening +
    activity.writing +
    activity.speaking;
  if (total === 0) return 0;
  if (total <= 2) return 1;
  if (total <= 4) return 2;
  if (total <= 6) return 3;
  return 4;
};

export const StreakSection = () => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: activities = { data: {} } } = useStudyActivities(
    user?.id || "",
    {
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    },
  );

  const handleChangeMonthAndYear = (month: number, year: number) => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  useEffect(() => {
    if (!calendarRef.current) return;

    const calendar = new Calendar(calendarRef.current, {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: "dayGridWeek",
      height: "auto",
      aspectRatio: 3,
      locale: viLocale,
      headerToolbar: {
        left: "prev",
        center: "title",
        right: "next",
      },
      dayCellContent: (info) => {
        const dateStr = info.date.toISOString().split("T")[0];
        const activity = activities.data[dateStr] as ActivityData | undefined;
        const dayNumber = info.dayNumberText;

        if (activity) {
          const level = calculateActivityLevel(activity);
          const opacity = level * 0.25;

          return {
            html: `
              <div class="day-cell-content" style="background-color: rgba(var(--primary), ${opacity});">
                <div class="day-number">${dayNumber}</div>
                <div class="activity-info">
                  <div class="time">${activity.total_time}</div>
                  <div class="activity-icons">
                    ${activity.reading ? '<span class="activity-icon">📖</span>' : ""}
                    ${activity.listening ? '<span class="activity-icon">🎧</span>' : ""}
                    ${activity.writing ? '<span class="activity-icon">✍️</span>' : ""}
                    ${activity.speaking ? '<span class="activity-icon">🗣️</span>' : ""}
                  </div>
                </div>
              </div>
            `,
          };
        }

        return {
          html: `
            <div class="day-cell-content">
              <div class="day-number">${dayNumber}</div>
            </div>
          `,
        };
      },
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [activities]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6 flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
          <CardTitle className="text-lg font-medium">
            Biểu đồ &quot;chăm chỉ&quot; của bạn
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Mức độ:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className="size-3 rounded bg-primary"
                  style={{ opacity: level * 0.25 }}
                />
              ))}
            </div>
          </div>
        </div>

        <StreakCalendar
          activities={activities.data as Record<string, ActivityData>}
          onChangeMonthAndYear={handleChangeMonthAndYear}
        />
      </CardContent>
    </Card>
  );
};

export default StreakSection;
