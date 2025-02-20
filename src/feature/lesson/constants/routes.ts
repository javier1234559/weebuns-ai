import { RouteNames } from "@/constraints/route-name";

export const lessonPaths = {
  [RouteNames.Lesson]: "Bài Học",
  [RouteNames.Writing]: "Viết",
  [RouteNames.Speaking]: "Nói",
  [RouteNames.Reading]: "Đọc",
  [RouteNames.Listening]: "Nghe",
} as const;
