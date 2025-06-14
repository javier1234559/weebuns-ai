import { handleApiError } from "@/lib/utils";
import api from "@/services/baseApi";
import {
  LoginDto,
  RegisterDto,
  RequestResetPasswordDto,
  ResetPasswordDto,
  VerifyResetCodeDto,
} from "@/services/swagger-types";

const authApi = {
  login(form: LoginDto) {
    return api.authControllerLogin(form).then((res) => res.data);
    // .catch((err) => {
    //   handleApiError(err);
    //   throw err.response.data;
    // });
  },
  register(form: RegisterDto) {
    return api
      .authControllerRegister(form)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },

  loginGoogle(accessToken: string) {
    return api
      .authControllerLoginWithGoogle({ accessToken })
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  loginFacebook(accessToken: string) {
    return api
      .authControllerLoginWithFacebook({ accessToken })
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        throw err.response.data;
      });
  },
  getCurrentUser() {
    return api.authControllerMe().catch((err) => {
      throw err.response.data;
    });
  },
  logout() {
    return api.authControllerLogout();
    // .catch((err) => {
    //   handleApiError(err);
    //   return null;
    // });
  },
  refreshToken() {
    return api.authControllerRefreshToken();
    // .catch((err) => {
    //   handleApiError(err);
    //   return null;
    // });
  },
  requestResetPass(data: RequestResetPasswordDto) {
    return api
      .authControllerRequestPasswordReset(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        return null;
      });
  },
  verifyResetPass(data: VerifyResetCodeDto) {
    return api
      .authControllerVerifyResetCode(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        return null;
      });
  },
  resetPassword(data: ResetPasswordDto) {
    return api
      .authControllerResetPassword(data)
      .then((res) => res.data)
      .catch((err) => {
        handleApiError(err);
        return null;
      });
  },
};

export default authApi;
