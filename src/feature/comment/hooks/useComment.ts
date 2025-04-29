"use client";

import commentApi, {
  CommentQueryParams,
  FindRepliesParams,
} from "@/feature/comment/services/commentApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateCommentDto, AddReactionDto } from "@/services/swagger-types";

export const COMMENT_KEY_FACTORY = {
  all: ["comment"] as const,
  lists: () => [...COMMENT_KEY_FACTORY.all, "list"] as const,
  list: (params: CommentQueryParams) =>
    [...COMMENT_KEY_FACTORY.lists(), params] as const,
  replies: () => [...COMMENT_KEY_FACTORY.all, "replies"] as const,
  repliesList: (params: FindRepliesParams) =>
    [...COMMENT_KEY_FACTORY.replies(), params] as const,
};

export const useComments = (params: CommentQueryParams) => {
  return useQuery({
    queryKey: COMMENT_KEY_FACTORY.list(params),
    queryFn: () => commentApi.findAll(params),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCommentReplies = (params: FindRepliesParams) => {
  return useQuery({
    queryKey: COMMENT_KEY_FACTORY.repliesList(params),
    queryFn: () => commentApi.findReplies(params),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentDto) => commentApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_KEY_FACTORY.all });
    },
  });
};

export const useAddReaction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddReactionDto }) =>
      commentApi.addReaction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_KEY_FACTORY.all });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => commentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMENT_KEY_FACTORY.all });
    },
  });
};
