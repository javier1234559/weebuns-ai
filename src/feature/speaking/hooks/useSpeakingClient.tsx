"use client";

import { LessonQueryParams } from "@/feature/lesson/services/lessonApi";
import lessonApi from "@/feature/lesson/services/lessonApi";
import { detailSpeaking } from "@/feature/speaking/data";
import { LessonsResponse } from "@/services/swagger-types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const SPEAKING_KEY_FACTORY = {
  all: ["speaking"] as const,
  lists: () => [...SPEAKING_KEY_FACTORY.all, "list"] as const,
  list: (params: any) => [...SPEAKING_KEY_FACTORY.lists(), params] as const,
  details: () => [...SPEAKING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...SPEAKING_KEY_FACTORY.details(), id] as const,
};

export const useSpeakingList = (
  params: LessonQueryParams,
  options?: UseQueryOptions<LessonsResponse>,
) => {
  return useQuery({
    queryKey: SPEAKING_KEY_FACTORY.list(params),
    queryFn: () => lessonApi.getAllLessons(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: true,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useSpeakingDetail = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: SPEAKING_KEY_FACTORY.detail(id),
    queryFn: () => ({
      data: detailSpeaking,
      pagination: {
        totalItems: 1,
        currentPage: 1,
        totalPages: 2,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    }),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};
