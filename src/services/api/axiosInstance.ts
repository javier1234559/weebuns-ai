import axios from "axios";

import { globalConfig } from "@/config";
import { Api } from "@/services/api/api-axios";

export const axiosInstance = axios.create({
  baseURL: globalConfig.API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Header injection for auth
const injectHeaders = async (headers: Record<string, string | undefined>) => {
  const token = "";

  // Safe check for Content-Type
  const contentType = headers?.["Content-Type"];
  const isFormData =
    contentType &&
    typeof contentType === "string" &&
    contentType.includes("multipart/form-data");

  if (isFormData) {
    return {
      ...headers,
      Authorization: token ? `Bearer ${token}` : undefined,
    };
  }

  return {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
    ...headers,
  };
};

const api = new Api({
  instance: axiosInstance,
  injectHeaders,
});

export default api.api;
