"use client";

import { LessonQueryParams } from "@/feature/lesson/services/lessonApi";
import lessonApi from "@/feature/lesson/services/lessonApi";
import { detailReading } from "@/feature/reading/data";
import { LessonsResponse } from "@/services/swagger-types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const READING_KEY_FACTORY = {
  all: ["reading"] as const,
  lists: () => [...READING_KEY_FACTORY.all, "list"] as const,
  list: (params: any) => [...READING_KEY_FACTORY.lists(), params] as const,
  details: () => [...READING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...READING_KEY_FACTORY.details(), id] as const,
};

export const useReadingList = (
  params: LessonQueryParams,
  options?: UseQueryOptions<LessonsResponse>,
) => {
  return useQuery({
    queryKey: READING_KEY_FACTORY.list(params),
    queryFn: () => lessonApi.getAllLessons(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: true,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useReadingDetail = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: READING_KEY_FACTORY.detail(id),
    queryFn: () => lessonApi.getReadingById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};
