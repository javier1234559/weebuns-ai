import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  DeleteLessonResponse,
  LessonsResponse,
  LessonType,
  ListeningResponse,
  ReadingResponse,
  SkillType,
} from "@/services/swagger-types";
import { ContentStatus } from "@/services/swagger-types";

export interface LessonQueryParams {
  page?: number;
  perPage?: number;
  skill?: SkillType;
  lessonType?: LessonType;
  topic?: string;
  search?: string;
  status?: ContentStatus;
  level?: string;
  tags?: string;
}

const lessonApi = {
  //global
  getAllLessons(params: LessonQueryParams) {
    return api
      .lessonControllerFindAll(params)
      .then((res: any) => res.data as LessonsResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  removeLesson(id: string) {
    return api
      .lessonControllerRemove(id)
      .then((res: any) => res.data as DeleteLessonResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  //reading
  getReadingById(id: string) {
    return api
      .lessonControllerFindOneReading(id)
      .then((res: any) => res.data as ReadingResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  createReading(data: any) {
    return api
      .lessonControllerCreateReading(data)
      .then((res: any) => res.data as ReadingResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  updateReading(id: string, data: any) {
    return api
      .lessonControllerUpdateReading(id, data)
      .then((res: any) => res.data as ReadingResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  //listening
  getListeningById(id: string) {
    return api
      .lessonControllerFindOneListening(id)
      .then((res: any) => res.data as ListeningResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  createListening(data: any) {
    return api
      .lessonControllerCreateListening(data)
      .then((res: any) => res.data as ListeningResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  updateListening(id: string, data: any) {
    return api
      .lessonControllerUpdateListening(id, data)
      .then((res: any) => res.data as ListeningResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default lessonApi;
