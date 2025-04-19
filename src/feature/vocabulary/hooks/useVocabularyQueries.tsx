"use client";

import { VocabularyQueryParams } from "@/feature/vocabulary/services/vocabularyApi";
import { vocabularies } from "@/feature/vocabulary/data";
import { useQuery } from "@tanstack/react-query";

export const VOCABULARY_KEY_FACTORY = {
  all: ["vocabulary"] as const,
  lists: () => [...VOCABULARY_KEY_FACTORY.all, "list"] as const,
  list: (params: VocabularyQueryParams) =>
    [...VOCABULARY_KEY_FACTORY.lists(), params] as const,
  details: () => [...VOCABULARY_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...VOCABULARY_KEY_FACTORY.details(), id] as const,
};

export const useVocabularies = (
  params: VocabularyQueryParams,
  options?: unknown,
) => {
  return useQuery({
    queryKey: VOCABULARY_KEY_FACTORY.list(params),
    queryFn: () => ({
      data: vocabularies,
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
