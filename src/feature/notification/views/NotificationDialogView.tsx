import { useAuthStore } from "@/store/auth-store";
import { useNotifications } from "../hooks/useNotificationQueries";
import AppError from "@/components/common/app-error";
import NotificationSkeleton from "../components/NotificationSkeleton";
import { INotification, NotificationType } from "../notification.type";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NotificationCard from "../components/NotificationCard";

interface NotificationDialogViewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDialogView({
  isOpen,
  onClose,
}: NotificationDialogViewProps) {
  const user = useAuthStore((state) => state.user);
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data, isLoading, isError, error } = useNotifications(
    {
      page,
      perPage,
      userId: user?.id || "",
    },
    {
      enabled: isOpen,
    }
  );

  const handleNotificationClick = (notification: INotification) => {
    if (notification.actionUrl) {
      window.open(notification.actionUrl as unknown as string, "_blank");
    }
  };

  const totalPages = data?.pagination?.totalPages || 1;

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Trung tâm thông báo</DialogTitle>
        </DialogHeader>

        <div className="thin-scrollbar max-h-[60vh] overflow-y-auto">
          {isLoading ? (
            <div className="divide-y">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-start gap-3 p-3">
                  <div className="flex-1 space-y-2">
                    <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-1/4 animate-pulse rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : isError ? (
            <AppError error={error} />
          ) : (
            <div className="divide-y">
              {data?.data.map((notification, index) => (
                <NotificationCard
                  key={index}
                  id={notification.id}
                  type={notification.type as NotificationType}
                  title={notification.title}
                  thumbnailUrl={notification.thumbnailUrl as unknown as string}
                  content={notification.content}
                  isGlobal={notification.isGlobal}
                  userId={notification.userId}
                  isRead={notification.isRead}
                  createdAt={notification.createdAt}
                  onClick={() => handleNotificationClick(notification)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            <ChevronLeft className="mr-1 size-4" />
            Trang trước
          </Button>
          <span className="text-sm text-gray-500">
            Trang {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Trang sau
            <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}