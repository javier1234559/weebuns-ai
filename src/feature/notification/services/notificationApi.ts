import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  CreateNotificationDto,
  NotificationResponse,
} from "@/services/swagger-types";

export interface FindAllNotificationQuery {
  page?: number;
  perPage?: number;
  userId?: string;
  isGlobal?: boolean;
  type?: string;
}

const notificationApi = {
  sendNotification(data: CreateNotificationDto): Promise<string> {
    return api
      .notificationControllerSendNotification(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  getUserNotifications(
    query: FindAllNotificationQuery,
  ): Promise<NotificationResponse> {
    return api
      .notificationControllerGetUserNotifications(query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  markAsRead(id: string): Promise<string> {
    return api
      .notificationControllerMarkAsRead(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  deleteNotification(id: string): Promise<string> {
    return api
      .notificationControllerDeleteNotification(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default notificationApi;
