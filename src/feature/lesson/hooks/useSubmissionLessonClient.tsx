"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import submissionApi, {
  SubmissionQueryParams,
} from "@/feature/lesson/services/submissionApi";
import {
  CreateReadingSubmissionDTO,
  CreateListeningSubmissionDTO,
  CreateSpeakingSubmissionDTO,
  CreateWritingSubmissionDTO,
  UpdateWritingSubmissionDTO,
  LessonSubmissionsResponse,
} from "@/services/swagger-types";

const SUBMISSION_BASE = ["submission"] as const;

export const SUBMISSION_KEY_FACTORY = {
  all: SUBMISSION_BASE,
  lists: () => [...SUBMISSION_BASE, "list"] as const,
  list: (params: SubmissionQueryParams) =>
    [...SUBMISSION_BASE, "list", params] as const,
  reading: [...SUBMISSION_BASE, "reading"] as const,
  listening: [...SUBMISSION_BASE, "listening"] as const,
  speaking: [...SUBMISSION_BASE, "speaking"] as const,
  writing: [...SUBMISSION_BASE, "writing"] as const,
  submissions: () => [...SUBMISSION_BASE, "submissions"] as const,
} as const;

export const useSubmissionList = (
  params: SubmissionQueryParams,
  options?: UseQueryOptions<LessonSubmissionsResponse>,
) => {
  return useQuery({
    queryKey: SUBMISSION_KEY_FACTORY.list(params),
    queryFn: () => submissionApi.getAllSubmissionsByUser(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: true,
    ...(typeof options === "object" ? options : {}),
  });
};

// Reading submission hooks
export const useReadingSubmissionDetail = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: SUBMISSION_KEY_FACTORY.reading,
    queryFn: () => submissionApi.getReadingById(id),
    staleTime: 0,
    enabled: true,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useCreateReadingSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReadingSubmissionDTO) =>
      submissionApi.createReading(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SUBMISSION_KEY_FACTORY.lists(),
      });
    },
  });
};

// Listening submission hooks
export const useListeningSubmissionDetail = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: SUBMISSION_KEY_FACTORY.listening,
    queryFn: () => submissionApi.getListeningById(id),
    staleTime: 0,
    enabled: true,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useCreateListeningSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateListeningSubmissionDTO) =>
      submissionApi.createListening(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SUBMISSION_KEY_FACTORY.lists(),
      });
    },
  });
};

// Speaking submission hooks
export const useSpeakingSubmissionDetail = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: SUBMISSION_KEY_FACTORY.speaking,
    queryFn: () => submissionApi.getSpeakingById(id),
    staleTime: 0,
    enabled: true,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useCreateSpeakingSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSpeakingSubmissionDTO) =>
      submissionApi.createSpeaking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SUBMISSION_KEY_FACTORY.lists(),
      });
    },
  });
};

// Writing submission hooks
export const useWritingSubmissionDetail = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: SUBMISSION_KEY_FACTORY.writing,
    queryFn: () => submissionApi.getWritingById(id),
    staleTime: 0,
    enabled: true,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useCreateWritingSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWritingSubmissionDTO) =>
      submissionApi.createWriting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SUBMISSION_KEY_FACTORY.lists(),
      });
    },
  });
};

export const useUpdateWritingSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateWritingSubmissionDTO;
    }) => submissionApi.updateWriting(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: SUBMISSION_KEY_FACTORY.lists(),
      });
    },
  });
};
