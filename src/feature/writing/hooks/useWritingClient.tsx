"use client";

import aiApi from "@/feature/ai/services/aiApi";
import lessonApi, {
  LessonQueryParams,
} from "@/feature/lesson/services/lessonApi";
import submissionApi from "@/feature/lesson/services/submissionApi";
import {
  CreateWritingSubmissionDTO,
  EvaluateEssayDto,
  LessonsResponse,
  UpdateWritingSubmissionDTO,
} from "@/services/swagger-types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const WRITING_KEY_FACTORY = {
  all: ["writing"] as const,
  lists: () => [...WRITING_KEY_FACTORY.all, "list"] as const,
  list: (params: LessonQueryParams) =>
    [...WRITING_KEY_FACTORY.lists(), params] as const,
  details: () => [...WRITING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...WRITING_KEY_FACTORY.details(), id] as const,
  submissions: () => [...WRITING_KEY_FACTORY.all, "submissions"] as const,
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

export const useWritingSubmission = (
  data: CreateWritingSubmissionDTO,
  options?: unknown,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => submissionApi.createWriting(data),
    onSuccess: () => {
      // Invalidate all writing-related queries
      queryClient.invalidateQueries({
        queryKey: WRITING_KEY_FACTORY.all,
      });
    },
    ...(typeof options === "object" ? options : {}),
  });
};

export const useUpdateWritingSubmission = (
  id: string,
  data: UpdateWritingSubmissionDTO,
  options?: unknown,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => submissionApi.updateWriting(id, data),
    onSuccess: () => {
      // Invalidate all writing-related queries
      queryClient.invalidateQueries({
        queryKey: WRITING_KEY_FACTORY.all,
      });
    },
    ...(typeof options === "object" ? options : {}),
  });
};

export const useEvaluateEssay = () => {
  return useMutation({
    mutationFn: (data: EvaluateEssayDto) => aiApi.evaluateEssay(data),
  });
};
