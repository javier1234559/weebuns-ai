"use client";

import { LessonQueryParams } from "@/feature/lesson/services/lessonApi";
import lessonApi from "@/feature/lesson/services/lessonApi";
import { LessonsResponse } from "@/services/swagger-types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const SPEAKING_KEY_FACTORY = {
  all: ["speaking"] as const,
  lists: () => [...SPEAKING_KEY_FACTORY.all, "list"] as const,
  list: (params: LessonQueryParams) =>
    [...SPEAKING_KEY_FACTORY.lists(), params] as const,
  details: () => [...SPEAKING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...SPEAKING_KEY_FACTORY.details(), id] as const,
  submissions: () => [...SPEAKING_KEY_FACTORY.all, "submissions"] as const,
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
    queryFn: () => lessonApi.getSpeakingById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

// export const useSpeakingSubmission = (
//   data: CreateSpeakingSubmissionDTO,
//   options?: unknown,
// ) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: () => submissionApi.createSpeaking(data),
//     onSuccess: () => {
//       // Invalidate all speaking-related queries
//       queryClient.invalidateQueries({
//         queryKey: SPEAKING_KEY_FACTORY.all,
//       });
//     },
//     ...(typeof options === "object" ? options : {}),
//   });
// };
