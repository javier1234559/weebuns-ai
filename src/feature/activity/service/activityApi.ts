import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  ActivityDataResponse,
  CreateStudyActivityDto,
} from "@/services/swagger-types";
import { AxiosResponse } from "axios";

export interface StudyActivityQueryParams {
  month: number;
  year: number;
}

const activityApi = {
  getActivitiesByMonth(userId: string, params: StudyActivityQueryParams) {
    return api
      .studyActivityControllerGetActivitiesByMonth(userId, params)
      .then((res: AxiosResponse<ActivityDataResponse>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  upsertActivity(userId: string, data: CreateStudyActivityDto) {
    return api
      .studyActivityControllerUpsertActivity(userId, data)
      .then((res: AxiosResponse<string>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  deleteActivity(userId: string, date: string) {
    return api
      .studyActivityControllerDeleteActivity(userId, date)
      .then((res: AxiosResponse<string>) => res.data)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default activityApi;
