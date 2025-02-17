"use client";

import { MAP_ICONS, NotificationType, TYPE_COLORS } from "@/types/notification";

interface NotificationCardProps {
  title: string;
  link: string;
  dateCreated: string;
  isRead: boolean;
  userData: any;
  type: NotificationType;
  onClick: () => void;
}

const NotificationCard = ({
  title,
  link,
  dateCreated,
  isRead,
  userData,
  type = "system", // Default to system if not specified
  onClick,
}: NotificationCardProps) => {
  const handleClick = () => {
    console.log(
      JSON.stringify(
        {
          title,
          link,
          dateCreated,
          isRead,
          userData,
          type,
        },
        null,
        2,
      ),
    );
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`cursor-pointer border-b p-4 transition-colors ${
        TYPE_COLORS[type]
      } ${!isRead ? "bg-primary-50" : ""}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex shrink-0 items-center gap-2">
          {MAP_ICONS[type]}
          {!isRead && <div className="bg-primary-500 size-2 rounded-full" />}
        </div>
        <div className="grow">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(dateCreated).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
