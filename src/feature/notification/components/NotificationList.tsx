import { Card, CardContent } from "@/components/ui/card";
import { INotification, NotificationType } from "@/feature/notification/notification.type";
import NotificationCard from "./NotificationCard";
import { BellRing } from "lucide-react";
import NotificationShowMore from "./NotificationShowMore";

interface NotificationListProps {
  notifications: INotification[];
  handleNotificationClick: (notification: INotification) => void;
}

export default function NotificationList({
  notifications,
  handleNotificationClick,
}: NotificationListProps) {
  return (
    <Card className="md:aspect-none relative aspect-square w-full sm:aspect-video md:w-1/3">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <BellRing className="size-4 text-gray-500" />
          <h2 className="font-medium">Trung tâm thông báo</h2>
        </div>
        <NotificationShowMore />
      </div>
      <CardContent className="thin-scrollbar max-h-[224px] overflow-y-auto rounded-lg p-1">
        <div className="divide-y">
          {notifications.map((notification, index) => (
            <NotificationCard
              key={index}
              id={notification.id}
              type={notification.type as NotificationType}
              title={notification.title}
              content={notification.content}
              thumbnailUrl={notification.thumbnailUrl ?? undefined}
              actionUrl={notification.actionUrl ?? undefined}
              isGlobal={notification.isGlobal}
              userId={notification.userId}
              isRead={notification.isRead}
              createdAt={notification.createdAt}
              onClick={() => {
                handleNotificationClick(notification);
              }}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
