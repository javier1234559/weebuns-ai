"use client";

import bannerApi, { FindAllBannerQuery } from "./bannerApi";
import { BannerResponse } from "@/services/swagger-types";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export const BANNER_KEY_FACTORY = {
  all: ["banner"],
  list: (params?: FindAllBannerQuery) =>
    [...BANNER_KEY_FACTORY.all, "list", params] as const,
  detail: (id: string) => [...BANNER_KEY_FACTORY.all, "detail", id] as const,
};

export const useBanners = (
  query?: FindAllBannerQuery,
  options?: UseQueryOptions<BannerResponse>,
) => {
  return useQuery({
    queryKey: BANNER_KEY_FACTORY.list(query),
    queryFn: () => bannerApi.getBanners(query || {}),
    staleTime: 1000 * 60 * 5,
    ...(typeof options === "object" ? options : {}),
  });
};
