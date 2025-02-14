/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ## SOURCE: https://github.com/hunghg255/swagger-typescript-api-es   ##
 * ----------------------------------------------------------------------
 */

export interface TranslateDto {
  /** @example "Hello world" */
  text: string;
  /** @example "English" */
  sourceLanguage: string;
  /** @example "Spanish" */
  targetLanguage: string;
}

export interface TranslateResponseDto {
  /** @example "Hello world" */
  original_text: string;
  /** @example "Hola mundo" */
  translated_text: string;
  /** @example "English" */
  source_language: string;
  /** @example "Spanish" */
  target_language: string;
}

export interface CheckGrammarDto {
  /** @example "This is a sample text with grammer mistakes." */
  text: string;
}

export interface PositionDto {
  /** @example 0 */
  start: number;
  /** @example 5 */
  end: number;
}

export interface CorrectionDto {
  /** @example "grammer" */
  original: string;
  /** @example "grammar" */
  corrected: string;
  explanation: string;
  /** @example "spelling" */
  type: "grammar" | "spelling" | "punctuation" | "style";
  position: PositionDto;
}

export interface CheckGrammarResponseDto {
  corrections: CorrectionDto[];
  /** @example "Found 2 spelling errors and 1 grammar mistake." */
  summary: string;
  /**
   * @min 0
   * @max 100
   * @example 85
   */
  overall_score: number;
}

export interface RecommendTopicsResponseDto {
  topics: string[];
  category: string;
  count: number;
}

export interface VoiceSettingDto {
  stability: number;
  similarity_boost: number;
  style: number;
  use_speaker_boost: boolean;
}

export interface TextToSpeechDto {
  text: string;
  voiceId?: string;
  voiceSettings?: VoiceSettingDto;
}

export interface TextToSpeechResponseDto {
  audioUrl: string;
  text: string;
  voiceId: string;
}

export interface User {
  /** @example "00321d6f-2bcf-4985-9659-92a571275da6" */
  id: string;
  /** @example "johndoe" */
  username: string;
  /** @example "john@example.com" */
  email: string;
  passwordHash: object | null;
  /**
   * User role in the system
   * @example "user"
   */
  role: "user" | "admin" | "teacher";
  /**
   * Authentication provider used
   * @example "local"
   */
  authProvider: "local" | "google" | "facebook";
  authProviderId: object | null;
  /** @example "John" */
  firstName: object | null;
  /** @example "Doe" */
  lastName: object | null;
  /** @example "https://example.com/avatar.jpg" */
  profilePicture: object | null;
  /** @example false */
  isEmailVerified: boolean;
  /**
   * User's native language
   * @example "VIETNAMESE"
   */
  nativeLanguage: "ENGLISH" | "VIETNAMESE";
  lastLogin: object | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** Timestamp when the user was deleted (soft delete) */
  deletedAt: object | null;
}

export interface PaginationOutputDto {
  /**
   * Total number of items
   * @example 100
   */
  totalItems: number;
  /**
   * Current page number
   * @example 1
   */
  currentPage: number;
  /**
   * Total number of pages
   * @example 10
   */
  totalPages: number;
  /**
   * Number of items per page
   * @example 10
   */
  itemsPerPage: number;
  /**
   * Indicates if there is a next page
   * @example true
   */
  hasNextPage: boolean;
  /**
   * Indicates if there is a previous page
   * @example false
   */
  hasPreviousPage: boolean;
}

export interface UsersResponse {
  users: User[];
  pagination: PaginationOutputDto;
}

export interface UserResponse {
  user: object;
}

export interface CreateUserDto {
  last_name: string;
  first_name: string;
  username: string;
  email: string;
  password: string;
  nativeLanguage: string;
  profile_picture: string;
  role: "user" | "admin" | "teacher";
  auth_provider: "local" | "google" | "facebook";
}

export interface CreateUserResponse {
  user: User;
}

export interface UpdateUserDto {
  last_name?: string;
  first_name?: string;
  username?: string;
  email?: string;
  nativeLanguage?: string;
  profile_picture?: string;
  role?: "user" | "admin" | "teacher";
  auth_provider?: "local" | "google" | "facebook";
}

export interface UpdateUserResponse {
  user: User;
}

export interface UpdateProfileUserDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  nativeLanguage: string;
  profilePicture: string;
}

export interface DeleteUserResponse {
  user: User;
}

export interface RegisterDto {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nativeLanguage: string;
}

export interface UserRegisterResponse {
  access_token: string;
  user: User;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  access_token: string;
  user: User;
}

export interface LoginGoogleDto {
  accessToken: string;
}

export interface LoginFacebookDto {
  accessToken: string;
}

export interface UserRefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface LogoutResponse {
  message: string;
}

export interface RequestResetPasswordDto {
  /**
   * Email address of the user
   * @example "user@example.com"
   */
  email: string;
}

export interface RequestResetPasswordResponse {
  /**
   * Status message
   * @example "Reset code sent to email"
   */
  message: string;
}

export interface VerifyResetCodeDto {
  /**
   * Email address of the user
   * @example "user@example.com"
   */
  email: string;
  /**
   * Six-digit verification code sent to email
   * @example "123456"
   */
  code: string;
}

export interface VerifyResetCodeResponse {
  /**
   * Status message
   * @example "Code verified successfully"
   */
  message: string;
}

export interface ResetPasswordDto {
  /**
   * Email address of the user
   * @example "user@example.com"
   */
  email: string;
  /**
   * Verification code for password reset
   * @example "123456"
   */
  code: string;
  /**
   * New password (minimum 6 characters)
   * @example "newPassword123"
   */
  newPassword: string;
}

export interface ResetPasswordResponse {
  /**
   * Status message
   * @example "Password reset successfully"
   */
  message: string;
}

export type DeleteResponseDto = object;

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;

  instance?: AxiosInstance;
  injectHeaders?: (data: any) => any;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;
  private injectHeaders?: (data: any) => any;

  constructor({
    securityWorker,
    secure,
    format,
    instance,
    injectHeaders,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = instance ?? axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
    this.injectHeaders = injectHeaders;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T, _E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    let headers = {
      ...(requestParams.headers || {}),
      ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
    };

    if (this.injectHeaders) {
      headers = await this.injectHeaders(headers);
    }

    return this.instance.request({
      ...requestParams,
      headers,
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Weebuns backend lms api
 * @version 2.0
 * @contact
 *
 * This docs includes all the endpoints of the weebuns lms api
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags ai
     * @name AiControllerTranslate
     * @request POST:/api/ai/translate
     */
    aiControllerTranslate: (data: TranslateDto, params: RequestParams = {}) =>
      this.request<TranslateResponseDto, any>({
        path: `/api/ai/translate`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerCheckGrammar
     * @request POST:/api/ai/check-grammar
     */
    aiControllerCheckGrammar: (data: CheckGrammarDto, params: RequestParams = {}) =>
      this.request<CheckGrammarResponseDto, any>({
        path: `/api/ai/check-grammar`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerRecommendTopics
     * @request GET:/api/ai/recommend-topics
     */
    aiControllerRecommendTopics: (
      query?: {
        category?: string;
        /** @default 5 */
        count?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<RecommendTopicsResponseDto, any>({
        path: `/api/ai/recommend-topics`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerTextToSpeechTest
     * @request GET:/api/ai/tts/test
     */
    aiControllerTextToSpeechTest: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/ai/tts/test`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerTextToSpeech
     * @request POST:/api/ai/tts/convert
     */
    aiControllerTextToSpeech: (data: TextToSpeechDto, params: RequestParams = {}) =>
      this.request<TextToSpeechResponseDto, any>({
        path: `/api/ai/tts/convert`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerTextToSpeechAll
     * @request GET:/api/ai/tts/all
     */
    aiControllerTextToSpeechAll: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/ai/tts/all`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindAll
     * @request GET:/api/users
     * @secure
     */
    userControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<UsersResponse, any>({
        path: `/api/users`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerCreate
     * @request POST:/api/users
     * @secure
     */
    userControllerCreate: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<CreateUserResponse, any>({
        path: `/api/users`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerFindOne
     * @request GET:/api/users/{id}
     * @secure
     */
    userControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/api/users/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdate
     * @request PUT:/api/users/{id}
     * @secure
     */
    userControllerUpdate: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<UpdateUserResponse, any>({
        path: `/api/users/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerUpdateProfile
     * @request PATCH:/api/users/{id}
     * @secure
     */
    userControllerUpdateProfile: (id: string, data: UpdateProfileUserDto, params: RequestParams = {}) =>
      this.request<UpdateUserResponse, any>({
        path: `/api/users/${id}`,
        method: "PATCH",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerRemove
     * @request DELETE:/api/users/{id}
     * @secure
     */
    userControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<DeleteUserResponse, any>({
        path: `/api/users/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerMe
     * @summary Get current user profile
     * @request GET:/api/auth/me
     */
    authControllerMe: (params: RequestParams = {}) =>
      this.request<UserResponse, void>({
        path: `/api/auth/me`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRegister
     * @summary Register new user
     * @request POST:/api/auth/register
     */
    authControllerRegister: (data: RegisterDto, params: RequestParams = {}) =>
      this.request<UserRegisterResponse, void>({
        path: `/api/auth/register`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogin
     * @summary Login with email and password
     * @request POST:/api/auth/login
     */
    authControllerLogin: (data: LoginDto, params: RequestParams = {}) =>
      this.request<UserLoginResponse, void>({
        path: `/api/auth/login`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLoginWithGoogle
     * @summary Login with Google
     * @request POST:/api/auth/login/google
     */
    authControllerLoginWithGoogle: (data: LoginGoogleDto, params: RequestParams = {}) =>
      this.request<UserLoginResponse, void>({
        path: `/api/auth/login/google`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLoginWithFacebook
     * @summary Login with Facebook
     * @request POST:/api/auth/login/facebook
     */
    authControllerLoginWithFacebook: (data: LoginFacebookDto, params: RequestParams = {}) =>
      this.request<UserLoginResponse, void>({
        path: `/api/auth/login/facebook`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRefreshToken
     * @summary Refresh access token
     * @request POST:/api/auth/refresh-token
     */
    authControllerRefreshToken: (params: RequestParams = {}) =>
      this.request<UserRefreshTokenResponse, void>({
        path: `/api/auth/refresh-token`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerLogout
     * @summary Logout user
     * @request POST:/api/auth/logout
     */
    authControllerLogout: (params: RequestParams = {}) =>
      this.request<LogoutResponse, any>({
        path: `/api/auth/logout`,
        method: "POST",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerRequestPasswordReset
     * @summary Request password reset code
     * @request POST:/api/auth/password-reset/request
     */
    authControllerRequestPasswordReset: (data: RequestResetPasswordDto, params: RequestParams = {}) =>
      this.request<RequestResetPasswordResponse, void>({
        path: `/api/auth/password-reset/request`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerVerifyResetCode
     * @summary Verify reset code
     * @request POST:/api/auth/password-reset/verify
     */
    authControllerVerifyResetCode: (data: VerifyResetCodeDto, params: RequestParams = {}) =>
      this.request<VerifyResetCodeResponse, void>({
        path: `/api/auth/password-reset/verify`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthControllerResetPassword
     * @summary Reset password with code
     * @request POST:/api/auth/password-reset/reset
     */
    authControllerResetPassword: (data: ResetPasswordDto, params: RequestParams = {}) =>
      this.request<ResetPasswordResponse, void>({
        path: `/api/auth/password-reset/reset`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerUploadFile
     * @request POST:/api/uploads
     */
    uploadControllerUploadFile: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<DeleteResponseDto, any>({
        path: `/api/uploads`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerUploadMany
     * @request POST:/api/uploads/many
     */
    uploadControllerUploadMany: (
      data: {
        files: File[];
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          key?: string;
          url?: string;
          name?: string;
          size?: number;
        }[],
        any
      >({
        path: `/api/uploads/many`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerUploadVideo
     * @request POST:/api/uploads/video
     */
    uploadControllerUploadVideo: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<DeleteResponseDto, any>({
        path: `/api/uploads/video`,
        method: "POST",
        body: data,
        type: ContentType.FormData,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Upload
     * @name UploadControllerDeleteFile
     * @request DELETE:/api/uploads/{key}
     */
    uploadControllerDeleteFile: (key: string, params: RequestParams = {}) =>
      this.request<DeleteResponseDto, any>({
        path: `/api/uploads/${key}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
}
