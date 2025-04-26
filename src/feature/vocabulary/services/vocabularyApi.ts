import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  CreateVocabularyDto,
  UpdateVocabularyDto,
  UpdateVocabularyReviewDto,
  VocabularyResponseDto,
  VocabulariesResponse,
  DeleteVocabularyResponse,
} from "@/services/swagger-types";

export interface VocabularyQueryParams {
  page?: number;
  perPage?: number;
  search?: string;
  tags?: string[];
  repetitionLevel?: number;
}

const vocabularyApi = {
  create(data: CreateVocabularyDto): Promise<VocabularyResponseDto> {
    return api
      .vocabularyControllerCreate(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  findAll(query: VocabularyQueryParams): Promise<VocabulariesResponse> {
    return api
      .vocabularyControllerFindAll(query)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  findOne(id: string): Promise<VocabularyResponseDto> {
    return api
      .vocabularyControllerFindOne(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  update(
    id: string,
    data: UpdateVocabularyDto,
  ): Promise<VocabularyResponseDto> {
    return api
      .vocabularyControllerUpdate(id, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  updateReviewStatus(
    id: string,
    data: UpdateVocabularyReviewDto,
  ): Promise<VocabularyResponseDto> {
    return api
      .vocabularyControllerUpdateReviewStatus(id, data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  delete(id: string): Promise<DeleteVocabularyResponse> {
    return api
      .vocabularyControllerRemove(id)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default vocabularyApi;
