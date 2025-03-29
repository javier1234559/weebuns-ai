"use client";

import lessonApi, {
  LessonQueryParams,
} from "@/feature/lesson/services/lessonApi";
import { detailWriting } from "@/feature/writing/data";
import { LessonsResponse } from "@/services/swagger-types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const WRITING_KEY_FACTORY = {
  all: ["writing"] as const,
  lists: () => [...WRITING_KEY_FACTORY.all, "list"] as const,
  list: (params: any) => [...WRITING_KEY_FACTORY.lists(), params] as const,
  details: () => [...WRITING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...WRITING_KEY_FACTORY.details(), id] as const,
};

export const useWritingList = (
  params: LessonQueryParams,
  options?: UseQueryOptions<LessonsResponse>,
) => {
  return useQuery({
    queryKey: WRITING_KEY_FACTORY.list(params),
    queryFn: () => lessonApi.getAllLessons(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: true,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useWritingDetail = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: WRITING_KEY_FACTORY.detail(id),
    queryFn: () => lessonApi.getWritingById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};
