import { format, formatDistanceToNow, isBefore, parseISO } from "date-fns";
import { vi } from "date-fns/locale";

export const formatDate = (date: Date, pattern = "dd/MM/yyyy") => {
  return format(date, pattern);
};

export const getRelativeTime = (date: string | Date) => {
  const parsedDate = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(parsedDate, {
    addSuffix: true,
    locale: vi,
  });
};

export const isOverdue = (dueDate: Date | string) => {
  const parsedDate = typeof dueDate === "string" ? parseISO(dueDate) : dueDate;
  return isBefore(parsedDate, new Date());
};
