"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { globalConfig } from "@/config";
import { toast } from "sonner";
import { NotificationData, NotificationToast } from "./NotificationToast";

export default function NotificationEvent() {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;

    const eventSource = new EventSource(
      `${globalConfig.API_URL}/api/notifications-sse/stream?userId=${user.id}`
    );

    eventSource.onmessage = (event) => {
      const data: NotificationData = JSON.parse(event.data);

      console.log("data", JSON.stringify(data, null, 2));
      toast.custom(
        (t) => <NotificationToast notification={data} toastId={t} />,
        {
          duration: 5000,
          position: "bottom-right",
          className: "bg-background border rounded-lg shadow-lg mb-6",
        }
      );
    };

    eventSource.onerror = (error) => {
      console.error("SSE error:", JSON.stringify(error));
      eventSource.close();
    };

    // Cleanup khi component unmount
    return () => {
      eventSource.close();
    };
  }, [user]);

  return null;
}
