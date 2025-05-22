import userApi, { FindAllUserQuery } from "@/feature/user/services/userApi";
import {
  TeacherDto,
  ProfileDto,
  UsersResponse,
  UserResponse,
  UpdateUserDto,
  UpdateProfileTeacherDto,
} from "@/services/swagger-types";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export const USER_KEY_FACTORY = {
  all: ["users"] as const,
  lists: () => [...USER_KEY_FACTORY.all, "list"] as const,
  list: (params: FindAllUserQuery) =>
    [...USER_KEY_FACTORY.lists(), params] as const,
  details: () => [...USER_KEY_FACTORY.all, "detail"] as const,
  detail: (id: string) => [...USER_KEY_FACTORY.details(), id] as const,
};

export const useUserList = (
  params: FindAllUserQuery,
  options?: UseQueryOptions<UsersResponse>,
) => {
  return useQuery<UsersResponse>({
    queryKey: USER_KEY_FACTORY.list(params),
    queryFn: () => userApi.findAll(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...(typeof options === "object" ? options : {}),
  });
};

export const useUserDetail = (
  id: string | null,
  options?: UseQueryOptions<UserResponse>,
) => {
  return useQuery({
    queryKey: USER_KEY_FACTORY.detail(id ?? ""),
    queryFn: async () => {
      const response = await userApi.findById(id ?? "");
      return response;
    },
    enabled: !!id,
    ...(typeof options === "object" ? options : {}),
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

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      userApi.updateUser(id, data),
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
    mutationFn: ({ id, data }: { id: string; data: UpdateProfileTeacherDto }) =>
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

export const useRemoveUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_KEY_FACTORY.all });
    },
  });
};

export const useFindByUsername = (username: string) => {
  return useQuery({
    queryKey: USER_KEY_FACTORY.detail(username),
    queryFn: () => userApi.findByUserName(username),
  });
};
