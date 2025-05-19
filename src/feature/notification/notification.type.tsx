
import { Notification } from "@/services/swagger-types";
export type NotificationType =
  | "system"
  | "advertisement"
  | "submission"
  | "comment_reply"
  | "comment_mention";


export const TYPE_COLORS: Record<NotificationType, string> = {
  system: "hover:bg-primary/10",
  advertisement: "hover:bg-primary/10",
  submission: "hover:bg-primary/10",
  comment_reply: "hover:bg-primary/10",
  comment_mention: "hover:bg-primary/10",
};

export interface INotification extends Notification {}