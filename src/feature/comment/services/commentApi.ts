import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  CreateCommentDto,
  AddReactionDto,
  CommentsResponse,
  CreateCommentResponse,
  DeleteCommentResponse,
  AddReactionResponse,
} from "@/services/swagger-types";

export interface CommentQueryParams {
  page?: number;
  perPage?: number;
  identifierId: string;
}

export interface FindRepliesParams {
  page?: number;
  perPage?: number;
  commentId: string;
}

const commentApi = {
  create(data: CreateCommentDto): Promise<CreateCommentResponse> {
    return api
      .commentControllerCreate(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  findAll(params: CommentQueryParams): Promise<CommentsResponse> {
    return api
      .commentControllerFindAll(params)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  findReplies(params: FindRepliesParams): Promise<CommentsResponse> {
    return api
      .commentControllerFindReplies(params)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  addReaction(id: string, data: AddReactionDto): Promise<AddReactionResponse> {
    return api
      .commentControllerAddReaction(id, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  delete(id: string): Promise<DeleteCommentResponse> {
    return api
      .commentControllerDelete(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default commentApi;
