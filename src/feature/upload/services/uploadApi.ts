import { DeleteUploadResponse, UploadResponse } from "@/feature/upload/type";
import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";

const uploadApi = {
  /**
   * Accept docs and images
   */
  uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    return api
      .uploadControllerUploadFile(
        { file },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((res) => res.data as UploadResponse)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  uploadMany(files: File[]) {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    return api
      .uploadControllerUploadMany(
        { files },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      .then((res) => res.data as UploadResponse[])
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  deleteFile(key: string) {
    return api
      .uploadControllerDeleteFile(key)
      .then((res) => res.data as DeleteUploadResponse)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
};

export default uploadApi;
