"use client";

import vocabularyApi, {
  VocabularyQueryParams,
} from "@/feature/vocabulary/services/vocabularyApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateVocabularyDto,
  UpdateVocabularyReviewDto,
} from "@/services/swagger-types";

export const VOCABULARY_KEY_FACTORY = {
  all: ["vocabulary"] as const,
  lists: () => [...VOCABULARY_KEY_FACTORY.all, "list"] as const,
  list: (params: VocabularyQueryParams) =>
    [...VOCABULARY_KEY_FACTORY.lists(), params] as const,
  details: () => [...VOCABULARY_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...VOCABULARY_KEY_FACTORY.details(), id] as const,
};

export const useVocabularies = (params: VocabularyQueryParams) => {
  return useQuery({
    queryKey: VOCABULARY_KEY_FACTORY.list(params),
    queryFn: () => vocabularyApi.findAll(params),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateVocabulary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVocabularyDto) => vocabularyApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VOCABULARY_KEY_FACTORY.all });
    },
  });
};

export const useUpdateVocabulary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateVocabularyDto }) =>
      vocabularyApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VOCABULARY_KEY_FACTORY.all });
    },
  });
};

export const useDeleteVocabulary = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => vocabularyApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VOCABULARY_KEY_FACTORY.all });
    },
  });
};

export const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateVocabularyReviewDto;
    }) => vocabularyApi.updateReviewStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VOCABULARY_KEY_FACTORY.all });
    },
  });
};
