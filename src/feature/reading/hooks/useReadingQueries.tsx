"use client";

import { detailReading } from "@/feature/reading/data";
import { useQuery } from "@tanstack/react-query";

export const READING_KEY_FACTORY = {
  all: ["reading"] as const,
  lists: () => [...READING_KEY_FACTORY.all, "list"] as const,
  list: (params: any) => [...READING_KEY_FACTORY.lists(), params] as const,
  details: () => [...READING_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...READING_KEY_FACTORY.details(), id] as const,
};

export const useReadingDetail = (id: string, options?: unknown) => {
  return useQuery({
    queryKey: READING_KEY_FACTORY.detail(id),
    queryFn: () => ({
      data: detailReading,
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
