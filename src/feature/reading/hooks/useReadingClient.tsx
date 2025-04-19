"use client";

import { LessonQueryParams } from "@/feature/lesson/services/lessonApi";
import lessonApi from "@/feature/lesson/services/lessonApi";
import submissionApi from "@/feature/lesson/services/submissionApi";
import {
  CreateReadingSubmissionDTO,
  LessonsResponse,
} from "@/services/swagger-types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const READING_KEY_FACTORY = {
  all: ["reading"] as const,
  lists: () => [...READING_KEY_FACTORY.all, "list"] as const,
  list: (params: LessonQueryParams) =>
    [...READING_KEY_FACTORY.lists(), params] as const,
  details: () => [...READING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...READING_KEY_FACTORY.details(), id] as const,
  submissions: () => [...READING_KEY_FACTORY.all, "submissions"] as const,
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

export const useReadingSubmission = (
  data: CreateReadingSubmissionDTO,
  options?: unknown,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => submissionApi.createReading(data),
    ...(typeof options === "object" ? options : {}),
  });
};
