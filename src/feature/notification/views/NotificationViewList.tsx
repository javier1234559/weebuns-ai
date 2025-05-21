"use client";

import AppError from "@/components/common/app-error";
import { ChevronLeft, ChevronRight } from "lucide-react";
import NotificationCard from "../components/NotificationCard";
import { INotification, NotificationType } from "../notification.type";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNotifications } from "../hooks/useNotificationQueries";
import { useAuthStore } from "@/store/auth-store";


const NotificationSkeleton = () => {
  return (
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
  );
};

interface NotificationViewListProps {
  isOpen: boolean;
}

export default function NotificationViewList({ isOpen }: NotificationViewListProps) {
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

  const renderContent = () => {
    if (isLoading) {
      return <NotificationSkeleton />;
    }

    if (isError) {
      return <AppError error={error} />;
    }

    if (!data?.data || data.data.length === 0) {
      return <div className="my-10 text-center text-sm text-gray-500">Không có thông báo</div>;
    }

    return (
      <>
        {data.data.map((notification, index) => (
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
      </>
    );
  };

  return (
    <>
      <div className="thin-scrollbar max-h-[60vh] overflow-y-auto">
        <div className="divide-y">
          {renderContent()}
        </div>
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
    </>
  );
}
