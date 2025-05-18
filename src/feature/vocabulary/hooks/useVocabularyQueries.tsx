"use client";

import vocabularyApi, {
  VocabularyQueryParams,
} from "@/feature/vocabulary/services/vocabularyApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CreateVocabularyDto,
  UpdateVocabularyReviewDto,
  Vocabulary,
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

    onMutate: async ({ id, data }) => {
      // Get all the existing query keys for vocabulary lists
      const queryKeys = queryClient.getQueriesData<any>({
        queryKey: VOCABULARY_KEY_FACTORY.lists(),
      });

      // Cancel any outgoing refetches for all list queries
      await Promise.all(
        queryKeys.map(([queryKey]) =>
          queryClient.cancelQueries({ queryKey })
        )
      );

      // Store previous data for all affected queries
      const previousDataMap = new Map(
        queryKeys.map(([queryKey, data]) => [queryKey, data])
      );

      // Update all list queries optimistically
      queryKeys.forEach(([queryKey]) => {
        queryClient.setQueryData(queryKey, (old: any) => {
          if (!old) return old;

          return {
            ...old,
            data: old.data.map((item: Vocabulary) =>
              item.id === id
                ? { ...item, repetitionLevel: data.repetitionLevel }
                : item
            ),
          };
        });
      });

      return { previousDataMap };
    },

    onError: (err, { id }, context) => {
      // Rollback all affected queries on error
      if (context?.previousDataMap) {
        context.previousDataMap.forEach((data, queryKey) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
    },

    onSettled: () => {
      // Invalidate all list queries to ensure they're in sync
      queryClient.invalidateQueries({
        queryKey: VOCABULARY_KEY_FACTORY.lists(),
      });
    },
  });
};
