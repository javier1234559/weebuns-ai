"use client";

import lessonApi from "@/feature/lesson/services/lessonApi";
import { LessonQueryParams } from "@/feature/lesson/services/lessonApi";
import submissionApi from "@/feature/lesson/services/submissionApi";
import {
  CreateListeningSubmissionDTO,
  LessonsResponse,
} from "@/services/swagger-types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const LISTENING_KEY_FACTORY = {
  all: ["listening"] as const,
  lists: () => [...LISTENING_KEY_FACTORY.all, "list"] as const,
  list: (params: LessonQueryParams) =>
    [...LISTENING_KEY_FACTORY.lists(), params] as const,
  details: () => [...LISTENING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...LISTENING_KEY_FACTORY.details(), id] as const,
  submissions: () => [...LISTENING_KEY_FACTORY.all, "submissions"] as const,
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
    queryFn: () => lessonApi.getListeningById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useListeningSubmission = (
  data: CreateListeningSubmissionDTO,
  options?: unknown,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => submissionApi.createListening(data),
    onSuccess: () => {
      // Invalidate all listening-related queries
      queryClient.invalidateQueries({
        queryKey: LISTENING_KEY_FACTORY.all,
      });
    },
    ...(typeof options === "object" ? options : {}),
  });
};
