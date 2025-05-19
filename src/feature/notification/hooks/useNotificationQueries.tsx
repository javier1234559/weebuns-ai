"use client";

import notificationApi, { FindAllNotificationQuery } from "@/feature/notification/services/notificationApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateNotificationDto,
} from "@/services/swagger-types";

export const NOTIFICATION_KEY_FACTORY = {
  all: ["notification"] as const,
  lists: () => [...NOTIFICATION_KEY_FACTORY.all, "list"] as const,
  list: (params: FindAllNotificationQuery) =>
    [...NOTIFICATION_KEY_FACTORY.lists(), params] as const,
};

export const useNotifications = (params: FindAllNotificationQuery, options: { enabled: boolean; }) => {
  return useQuery({
    queryKey: NOTIFICATION_KEY_FACTORY.list(params),
    queryFn: () => notificationApi.getUserNotifications(params),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes,
    ...options
  });
};

export const useSendNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNotificationDto) => notificationApi.sendNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEY_FACTORY.all });
    },
  });
};

export const useMarkAsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEY_FACTORY.all });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationApi.deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_KEY_FACTORY.all });
    },
  });
};
