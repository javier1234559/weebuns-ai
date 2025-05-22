"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import {
  ActivityDataResponse,
  CreateStudyActivityDto,
} from "@/services/swagger-types";
import activityApi from "../service/activityApi";
import { StudyActivityQueryParams } from "../service/activityApi";

const ACTIVITY_BASE = ["activity"] as const;

export const ACTIVITY_KEY_FACTORY = {
  all: ACTIVITY_BASE,
  lists: () => [...ACTIVITY_BASE, "list"] as const,
  list: (params: StudyActivityQueryParams) =>
    [...ACTIVITY_BASE, "list", params] as const,
  studyActivity: (userId: string, params: StudyActivityQueryParams) =>
    [...ACTIVITY_BASE, "study", userId, params] as const,
} as const;

export const useStudyActivities = (
  userId: string,
  params: StudyActivityQueryParams,
  options?: UseQueryOptions<ActivityDataResponse>,
) => {
  return useQuery({
    queryKey: ACTIVITY_KEY_FACTORY.studyActivity(userId, params),
    queryFn: () => activityApi.getActivitiesByMonth(userId, params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!userId,
    ...(typeof options === "object" ? options : {}),
  });
};

export const useUpsertStudyActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: CreateStudyActivityDto;
    }) => activityApi.upsertActivity(userId, data),
    onSuccess: (_, { userId, data }) => {
      // Invalidate the study activity query for the current month
      const date = new Date(data.date);
      queryClient.invalidateQueries({
        queryKey: ACTIVITY_KEY_FACTORY.studyActivity(userId, {
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        }),
      });
    },
  });
};

export const useDeleteStudyActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, date }: { userId: string; date: string }) =>
      activityApi.deleteActivity(userId, date),
    onSuccess: (_, { userId, date }) => {
      // Invalidate the study activity query for the current month
      const dateObj = new Date(date);
      queryClient.invalidateQueries({
        queryKey: ACTIVITY_KEY_FACTORY.studyActivity(userId, {
          month: dateObj.getMonth() + 1,
          year: dateObj.getFullYear(),
        }),
      });
    },
  });
};
