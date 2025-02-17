import { Bell, MessageSquare, AtSign, Send, Megaphone } from "lucide-react";

// Define notification types
export type NotificationType =
  | "system"
  | "advertisement"
  | "submission"
  | "comment_reply"
  | "comment_mention";

// Icon mapping with consistent styling
export const MAP_ICONS: Record<NotificationType, React.ReactNode> = {
  system: <Bell className="text-blue-500" size={20} />,
  advertisement: <Megaphone className="text-purple-500" size={20} />,
  submission: <Send className="text-green-500" size={20} />,
  comment_reply: <MessageSquare className="text-orange-500" size={20} />,
  comment_mention: <AtSign className="text-pink-500" size={20} />,
};

// Color mapping for notification backgrounds
export const TYPE_COLORS: Record<NotificationType, string> = {
  system: "hover:bg-primary/10",
  advertisement: "hover:bg-primary/10",
  submission: "hover:bg-primary/10",
  comment_reply: "hover:bg-primary/10",
  comment_mention: "hover:bg-primary/10",
};
