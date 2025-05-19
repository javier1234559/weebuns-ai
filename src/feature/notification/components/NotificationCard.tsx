"use client";

import {  NotificationType, TYPE_COLORS } from "@/feature/notification/notification.type";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NotificationCardProps {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  thumbnailUrl?: string;
  actionUrl?: string;
  isGlobal: boolean;
  userId: object;
  isRead: boolean;
  createdAt: string;
  onClick: () => void;
}

const NotificationCard = ({
  title,
  content,
  thumbnailUrl,
  actionUrl,
  isRead,
  createdAt,
  type = "system",
  onClick,
}: NotificationCardProps) => {
  const handleClick = () => {
    if (onClick) onClick();
  };

  const cardContent = (
    <div className="flex items-start justify-between">
      <div className="relative flex items-center gap-4 p-2">
        {thumbnailUrl ? (
          <div className="relative size-16 shrink-0">
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="rounded-md object-cover"
            />
          </div>
        ) : (
          <div className="relative size-16 shrink-0">
            <Image
              src="/default/bell.png"
              alt={title}
              fill
              className="rounded-md object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 line-clamp-1 text-sm font-semibold">{title}</h3>
          <p className="line-clamp-2 text-sm text-muted-foreground">{content}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {new Date(createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
      {!isRead && <div className="bg-primary-500 size-2 rounded-full" />}
    </div>
  );

  if (actionUrl) {
    return (
      <Link
        href={actionUrl}
        className={cn(
          "block w-full hover:opacity-80",
          `cursor-pointer border-b ${TYPE_COLORS[type]} ${
            !isRead ? "bg-primary-50" : ""
          }`
        )}
      >
        {cardContent}
      </Link>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex w-full items-start",
        `cursor-pointer border-b ${TYPE_COLORS[type]} ${
          !isRead ? "bg-primary-50" : ""
        }`
      )}
    >
      {cardContent}
    </div>
  );
};

export default NotificationCard;
