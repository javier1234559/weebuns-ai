import { useAuthStore } from "@/store/auth-store";
import NotificationList from "../components/NotificationList";
import { useNotifications } from "../hooks/useNotificationQueries";
import AppError from "@/components/common/app-error";
import NotificationSkeleton from "../components/NotificationSkeleton";
import { INotification } from "../notification.type";
import { useEffect } from "react";
import { useState } from "react";

interface NotificationViewProps {
  className?: string;
}
export default function NotificationView({ className }: NotificationViewProps) {
  const [userId, setUserId] = useState<string>("");
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setUserId(user?.id || "");
  }, [user]);

  const { data, isLoading, isError, error } = useNotifications(
    {
      page: 1,
      perPage: 10,
      userId: userId || "",
    },
    {
      enabled: !!userId,
    },
  );

  const handleNotificationClick = (notification: INotification) => {
    if (notification.actionUrl) {
      window.open(notification.actionUrl as unknown as string, "_blank");
    }
  };

  if (isLoading) return <NotificationSkeleton />;
  if (isError) return <AppError error={error} />;

  return (
    <NotificationList
      notifications={data?.data || []}
      handleNotificationClick={handleNotificationClick}
    />
  );
}
