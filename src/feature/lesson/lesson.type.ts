import { Lesson as LessonType } from "@/services/swagger-types";
import { RouteNames } from "@/constraints/route-name";

export const lessonPaths = {
  [RouteNames.Lesson]: "Bài Học",
  [RouteNames.Writing]: "Viết",
  [RouteNames.Speaking]: "Nói",
  [RouteNames.Reading]: "Đọc",
  [RouteNames.Listening]: "Nghe",
} as const;

export type ContentStatus = "draft" | "published" | "archived";

export interface Lesson extends LessonType {}

export type LevelType = "beginner" | "intermediate" | "advanced";
