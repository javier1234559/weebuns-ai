"use client";

import userApi, { FindAllUserQuery } from "@/feature/user/services/userApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileDto, TeacherDto } from "@/services/swagger-types";

export const USER_KEY_FACTORY = {
  all: ["user"] as const,
  lists: () => [...USER_KEY_FACTORY.all, "list"] as const,
  list: (params: FindAllUserQuery) => [...USER_KEY_FACTORY.lists(), params] as const,
  details: () => [...USER_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...USER_KEY_FACTORY.details(), id] as const,
  username: (username: string) => [...USER_KEY_FACTORY.all, "username", username] as const,
};

export const useUsers = (params: FindAllUserQuery) => {
  return useQuery({
    queryKey: USER_KEY_FACTORY.list(params),
    queryFn: () => userApi.findAll(params),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: USER_KEY_FACTORY.detail(id),
    queryFn: () => userApi.findById(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useUserByUsername = (username: string) => {
  return useQuery({
    queryKey: USER_KEY_FACTORY.username(username),
    queryFn: () => userApi.findByUserName(username),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TeacherDto) => userApi.createTeacher(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEY_FACTORY.all });
    },
  });
};

export const useUpdateTeacher = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TeacherDto }) =>
      userApi.updateTeacher(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEY_FACTORY.all });
    },
  });
};

export const useUpdateTeacherProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProfileDto }) =>
      userApi.updateTeacherProfile(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEY_FACTORY.all });
    },
  });
};

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProfileDto }) =>
      userApi.updateStudentProfile(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEY_FACTORY.all });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEY_FACTORY.all });
    },
  });
};
