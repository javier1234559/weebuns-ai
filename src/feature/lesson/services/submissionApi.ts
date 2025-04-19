import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  CreateListeningSubmissionDTO,
  CreateReadingSubmissionDTO,
  CreateSpeakingSubmissionDTO,
  CreateWritingSubmissionDTO,
  DeleteLessonSubmissionResponse,
  LessonSubmissionsResponse,
  ReadingSubmissionResponse,
  ListeningSubmissionResponse,
  SpeakingSubmissionResponse,
  WritingSubmissionResponse,
  SkillType,
  SubmissionStatus,
  UpdateWritingSubmissionDTO,
  WritingSubmissionResultResponse,
} from "@/services/swagger-types";
import { AxiosResponse } from "axios";

export interface SubmissionQueryParams {
  page?: number;
  perPage?: number;
  skill?: SkillType;
  submissionType?: SkillType;
  topic?: string;
  search?: string;
  status?: SubmissionStatus;
  level?: string;
  tags?: string;
}

const submissionApi = {
  // Global
  getAllSubmissionsByUser(params: SubmissionQueryParams) {
    return api
      .lessonSubmissionControllerGetAllSubmissionsByUser(params)
      .then((res: AxiosResponse<LessonSubmissionsResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  removeSubmission(id: string) {
    return api
      .lessonSubmissionControllerRemove(id)
      .then((res: AxiosResponse<DeleteLessonSubmissionResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Reading
  getReadingById(id: string) {
    return api
      .lessonSubmissionControllerFindOneReading(id)
      .then((res: AxiosResponse<ReadingSubmissionResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  createReading(data: CreateReadingSubmissionDTO) {
    return api
      .lessonSubmissionControllerCreateReading(data)
      .then((res: AxiosResponse<ReadingSubmissionResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Listening
  getListeningById(id: string) {
    return api
      .lessonSubmissionControllerFindOneListening(id)
      .then((res: AxiosResponse<ListeningSubmissionResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  createListening(data: CreateListeningSubmissionDTO) {
    return api
      .lessonSubmissionControllerCreateListening(data)
      .then((res: AxiosResponse<ListeningSubmissionResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Writing
  getWritingById(id: string) {
    return api
      .lessonSubmissionControllerFindOneWriting(id)
      .then((res: AxiosResponse<WritingSubmissionResultResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  createWriting(data: CreateWritingSubmissionDTO) {
    return api
      .lessonSubmissionControllerCreateWriting(data)
      .then((res: AxiosResponse<WritingSubmissionResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  updateWriting(id: string, data: UpdateWritingSubmissionDTO) {
    return api
      .lessonSubmissionControllerUpdateWriting(id, data)
      .then((res: AxiosResponse<WritingSubmissionResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  // Speaking
  getSpeakingById(id: string) {
    return api
      .lessonSubmissionControllerFindOneSpeaking(id)
      .then((res: AxiosResponse<SpeakingSubmissionResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  createSpeaking(data: CreateSpeakingSubmissionDTO) {
    return api
      .lessonSubmissionControllerCreateSpeaking(data)
      .then((res: AxiosResponse<SpeakingSubmissionResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default submissionApi;
