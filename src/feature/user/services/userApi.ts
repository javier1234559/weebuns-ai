import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  TeacherDto,
  ProfileDto,
  UpdateUserDto,
  UpdateProfileTeacherDto,
} from "@/services/swagger-types";

export interface FindAllUserQuery {
  search?: string;
  page?: number;
  perPage?: number;
  role?: string;
}

const userApi = {
  updateUser: (id: string, data: UpdateUserDto) =>
    api
      .userControllerUpdateUser(id, data)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi cập nhật thông tin",
        );
      }),

  findByUserName: (username: string) =>
    api
      .userControllerFindByUsername(username)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi lấy thông tin người dùng",
        );
      }),

  updateProfile: (id: string, data: any) =>
    api
      .userControllerUpdateTeacherProfile(id, data)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi cập nhật thông tin",
        );
      }),

  findAll: (params: FindAllUserQuery) =>
    api
      .userControllerFindAll(params)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi lấy danh sách người dùng",
        );
      }),

  findById: (id: string) =>
    api
      .userControllerFindById(id)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi lấy thông tin người dùng",
        );
      }),

  createTeacher: (data: TeacherDto) =>
    api
      .userControllerCreateTeacher(data)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error || "Đã xảy ra lỗi khi tạo giáo viên",
        );
      }),

  updateTeacher: (id: string, data: TeacherDto) =>
    api
      .userControllerUpdateTeacher(id, data)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi cập nhật giáo viên",
        );
      }),

  updateTeacherProfile: (id: string, data: UpdateProfileTeacherDto) =>
    api
      .userControllerUpdateTeacherProfile(id, data)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi cập nhật thông tin giáo viên",
        );
      }),

  updateStudentProfile: (id: string, data: ProfileDto) =>
    api
      .userControllerUpdateStudentProfile(id, data)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error ||
            "Đã xảy ra lỗi khi cập nhật thông tin học viên",
        );
      }),

  remove: (id: string) =>
    api
      .userControllerRemove(id)
      .then((res) => res.data)
      .catch((error) => {
        handleApiError(error?.response?.data);
        throw new Error(
          error?.response?.data?.error || "Đã xảy ra lỗi khi xóa người dùng",
        );
      }),
};

export default userApi;
