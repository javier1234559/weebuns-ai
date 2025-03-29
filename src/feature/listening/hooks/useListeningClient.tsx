"use client";

import lessonApi from "@/feature/lesson/services/lessonApi";
import { LessonQueryParams } from "@/feature/lesson/services/lessonApi";
import { detailListening } from "@/feature/listening/data";
import { LessonsResponse } from "@/services/swagger-types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const LISTENING_KEY_FACTORY = {
  all: ["listening"] as const,
  lists: () => [...LISTENING_KEY_FACTORY.all, "list"] as const,
  list: (params: any) => [...LISTENING_KEY_FACTORY.lists(), params] as const,
  details: () => [...LISTENING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...LISTENING_KEY_FACTORY.details(), id] as const,
};

export const useListeningList = (
  params: LessonQueryParams,
  options?: UseQueryOptions<LessonsResponse>,
) => {
  return useQuery({
    queryKey: LISTENING_KEY_FACTORY.list(params),
    queryFn: () => lessonApi.getAllLessons(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: true,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useListeningDetail = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: LISTENING_KEY_FACTORY.detail(id),
    queryFn: () => ({
      data: detailListening,
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
