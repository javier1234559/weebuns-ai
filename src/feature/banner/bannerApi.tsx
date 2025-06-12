import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import { BannerResponse } from "@/services/swagger-types";

export interface FindAllBannerQuery {
  page?: number;
  perPage?: number;
  search?: string;
  orderIndex?: number;
}

const bannerApi = {
  getBanners(query: FindAllBannerQuery) {
    return api
      .bannerControllerFindAll(query)
      .then((res: any) => res.data as BannerResponse)
      .catch((err: any) => {
        handleApiError(err);
        throw err.response?.data || err;
      });
  },
};

export default bannerApi;
