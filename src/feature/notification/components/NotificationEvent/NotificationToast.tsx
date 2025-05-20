import { NotificationType } from "@/feature/notification/notification.type";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";


export interface NotificationData {
  userId: string;
  type: NotificationType;
  title: string;
  content: string;
  thumbnailUrl?: string;
  actionUrl?: string;
  isGlobal: boolean;
}

interface NotificationToastProps {
  notification: NotificationData;
  className?: string;
  toastId?: string | number;
}

export function NotificationToast({
  notification,
  className,
  toastId,
}: NotificationToastProps) {
  const { title, content, thumbnailUrl, actionUrl } = notification;

  const toastContent = (
    <div className="flex items-start justify-between">
      <div className="relative flex items-center gap-4 p-2">
        {thumbnailUrl && (
          <div className="relative size-16 shrink-0">
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="rounded-md object-cover"
            />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h3 className="mb-1 line-clamp-2 max-w-[240px] text-sm font-semibold">
            {title}
          </h3>
          <p className="line-clamp-2 max-w-[240px] text-sm text-muted-foreground">
            {content}
          </p>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toast.dismiss(toastId);
        }}
        className="mr-2 mt-2 rounded p-1 transition-colors hover:bg-muted"
        aria-label="Đóng thông báo"
      >
        <X className="size-4" />
      </button>
    </div>
  );

  if (actionUrl) {
    console.log("actionUrl", actionUrl);
    return (
      <a
        href={actionUrl}
        target="_blank"
        className={cn(
          "block w-full transition-opacity duration-200 hover:opacity-80",
          className,
        )}
      >
        {toastContent}
      </a>
    );
  }

  return (
    <div className={cn("relative flex w-full items-start p-2", className)}>
      {toastContent}
    </div>
  );
}
