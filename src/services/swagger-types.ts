/* eslint-disable */
/*
 * ----------------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API-ES            ##
 * ## SOURCE: https://github.com/hunghg255/swagger-typescript-api-es   ##
 * ----------------------------------------------------------------------
 */

export interface ChatMessageDto {
  /**
   * Role of the message sender (user or assistant)
   * @example "user"
   */
  role: string;
  /**
   * Content of the message
   * @example "Tell me about the benefits of learning a new language"
   */
  content: string;
}

export interface CheckSessionResponseDto {
  status: boolean;
  history?: ChatMessageDto[];
  systemPrompt?: string;
}

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

export interface ChatRequestDto {
  /**
   * The message from the user
   * @example "Tell me about the benefits of learning a new language"
   */
  message: string;
  /**
   * Session ID to maintain conversation context
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  sessionId?: string;
  /**
   * System prompt to maintain conversation context
   * @example "You are a helpful assistant"
   */
  systemPrompt?: string;
}

export interface ChatResponseDto {
  /**
   * The response from the AI assistant
   * @example "Learning a new language offers numerous cognitive, social, and professional benefits..."
   */
  message: string;
  /**
   * Session ID to maintain conversation context
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  sessionId: string;
  /** Full conversation history */
  history: ChatMessageDto[];
}

export interface StartSpeakingDto {
  lessonId: string;
  userId: string;
  promptText: string;
  topicText: string;
  followupExamples: string[];
  backgroundKnowledge: string;
}

export interface StartSpeakingResponseDto {
  sessionId: string;
  topicText?: string;
  submissionId: string;
}

export interface SpeakingDto {
  /**
   * Session ID for continuing the conversation
   * @example "123e4567-e89b-12d3-a456-426614174000"
   */
  sessionId: string;
  /**
   * User message
   * @example "Hi, I'm ready."
   */
  message: string;
}

export interface EvaluateEssayDto {
  /** The essay topic or prompt */
  topic: string;
  /** The user's essay content to evaluate */
  user_content: string;
  /** Optional teacher prompt for AI to guide the evaluation */
  teacher_prompt?: string;
}

export interface CorrectionDTO {
  id: string;
  sentence: string;
  error: string;
  suggestion: string;
  reason: string;
  position: string;
}

export interface EvaluateEssayResponseDto {
  overall_score: number;
  task_response: number;
  coherence_cohesion: number;
  lexical_resource: number;
  grammar: number;
  corrections: CorrectionDTO[];
  overall_feedback: string;
}

export interface RecommendAnswerResponseDto {
  /** The recommended answers */
  suggestedResponses: string[];
  /** Session ID for continuing the conversation */
  sessionId: string;
}

export enum UserRole {
  User = "user",
  Admin = "admin",
  Teacher = "teacher",
}

export enum AuthProvider {
  Local = "local",
  Google = "google",
  Facebook = "facebook",
}

export interface TeacherProfileEntity {
  id: string;
  userId: string;
  longBio: string | null;
  introVideoUrlEmbed: string | null;
  certifications: string | null;
  teachingExperience: string | null;
  bankingqr_image_url: string | null;
  other: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string | null;
}

export interface StudentProfileEntity {
  id: string;
  userId: string;
  targetStudyDuration: number | null;
  targetReading: number | null;
  targetListening: number | null;
  targetWriting: number | null;
  targetSpeaking: number | null;
  /** @format date-time */
  nextExamDate: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string | null;
}

export interface UserDto {
  /** @example "00321d6f-2bcf-4985-9659-92a571275da6" */
  id: string;
  /** @example "johndoe" */
  username: string;
  /** @example "john@example.com" */
  email: string;
  /**
   * User role in the system
   * @example "user"
   */
  role: UserRole;
  bio: string | null;
  /**
   * Authentication provider used
   * @example "local"
   */
  authProvider: AuthProvider;
  authProviderId: string | null;
  /** @example "John" */
  firstName: string | null;
  /** @example "Doe" */
  lastName: string | null;
  /** @example "https://example.com/avatar.jpg" */
  profilePicture: string | null;
  /** @example false */
  isEmailVerified: boolean;
  /** @format date-time */
  lastLogin: string | null;
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  updatedAt: string;
  /**
   * Timestamp when the user was deleted (soft delete)
   * @format date-time
   */
  deletedAt: string | null;
  teacherProfile: TeacherProfileEntity | null;
  studentProfile: StudentProfileEntity | null;
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
  /** List of users */
  data: UserDto[];
  /** Pagination details */
  pagination: PaginationOutputDto;
}

export interface UserResponse {
  /** User object */
  user: UserDto;
}

export interface CreateUserDto {
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  bio?: string;
  /** @default "user" */
  role: "user" | "admin" | "teacher";
}

export interface TeacherDto {
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  longBio?: string;
  introVideoUrlEmbed?: string;
  certifications?: string;
  teachingExperience?: string;
  bankingqr_image_url?: string;
  other?: string;
}

export interface UpdateProfileTeacherDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  profilePicture: string;
  longBio: string;
  introVideoUrlEmbed: string;
  certifications: string;
  teachingExperience: string;
  bankingqr_image_url: string;
  other: string;
}

export interface ProfileDto {
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  longBio?: string;
  introVideoUrlEmbed?: string;
  certifications?: string;
  teachingExperience?: string;
  bankingqr_image_url?: string;
  other?: string;
  targetStudyDuration?: number;
  targetReading?: number;
  targetListening?: number;
  targetWriting?: number;
  targetSpeaking?: number;
  /** @format date-time */
  nextExamDate?: string;
}

export interface DeleteUserResponse {
  message: string;
}

export interface UpdateUserDto {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  bio?: string;
  /** @default "user" */
  role?: "user" | "admin" | "teacher";
}

export interface RegisterDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserRegisterResponse {
  access_token: string;
  user: UserDto;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface UserLoginResponse {
  access_token: string;
  user: UserDto;
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
  /**
   * Status message
   * @example "Logged out successfully"
   */
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

export interface TokenWallet {
  id: string;
  userId: string;
  balance: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  deletedAt?: object;
}

export interface TokenWalletResponse {
  wallet: TokenWallet;
}

export interface TokenPackage {
  id: string;
  pricePerToken: number;
  oldPricePerToken: number;
  message: string;
  popular: boolean;
  code: string;
  name: string;
  tokens: number;
  price: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface TokenPackagesResponse {
  packages: TokenPackage[];
}

export interface CreateTransactionDto {
  packageCode: string;
  paymentType: "bank" | "momo" | "zalopay" | "internal";
}

export interface PaymentUrlResponse {
  paymentUrl: string;
}

export interface User {
  /** @example "00321d6f-2bcf-4985-9659-92a571275da6" */
  id: string;
  /** @example "johndoe" */
  username: string;
  /** @example "john@example.com" */
  email: string;
  /** @example "$2b$10$sOToCWV4/2hJjVo7TJSqOuUbRq8ZRxM6EdfXq1/cIfmBF.5z8L5MK" */
  passwordHash: string;
  /**
   * User role in the system
   * @example "user"
   */
  role: UserRole;
  /**
   * Authentication provider used
   * @example "local"
   */
  authProvider: AuthProvider;
  authProviderId: string | null;
  /** @example "John" */
  firstName: string | null;
  /** @example "Doe" */
  lastName: string | null;
  /** @example "https://example.com/avatar.jpg" */
  profilePicture: string | null;
  bio: string | null;
  /** @example false */
  isEmailVerified: boolean;
  /** @format date-time */
  lastLogin: string | null;
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  createdAt: string;
  /**
   * @format date-time
   * @example "2024-01-01T00:00:00.000Z"
   */
  updatedAt: string;
  /**
   * Timestamp when the user was deleted (soft delete)
   * @format date-time
   */
  deletedAt: string | null;
  teacherProfile: TeacherProfileEntity | null;
  studentProfile: StudentProfileEntity | null;
}

export interface Transaction {
  id: string;
  transactionId: string;
  userId: string;
  packageId: object;
  currency: string;
  amount: number;
  tokenAmount: number;
  paymentType: "bank" | "momo" | "zalopay" | "internal";
  status: "pending" | "completed" | "failed" | "refunded";
  /** @format date-time */
  paymentDate: string;
  type: "TOKEN_PURCHASE" | "TOKEN_USE" | "TOKEN_EARN" | "TOKEN_WITHDRAW";
  reason?: object;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  package?: TokenPackage;
  user?: User;
}

export interface TransactionsResponse {
  data: Transaction[];
  pagination: PaginationOutputDto;
}

export interface UseTokensDto {
  tokenAmount: number;
  reason?: string;
}

export interface TransactionResponse {
  transaction: Transaction;
}

export interface WithdrawTokensDto {
  tokenAmount: number;
}

export interface TransactionWithUserResponse {
  transaction: Transaction;
  user: User;
}

export interface CreateNotificationDto {
  userId?: string;
  type: "system" | "advertisement" | "submission" | "comment_reply" | "comment_mention";
  title: string;
  content: string;
  thumbnailUrl?: string;
  actionUrl?: string;
  /** @default false */
  isGlobal: boolean;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  content: string;
  thumbnailUrl: string | null;
  actionUrl: string | null;
  isGlobal: boolean;
  userId: object;
  isRead: boolean;
  createdById: string;
  /** @format date-time */
  createdAt: string;
  expiresAt: object;
}

export interface NotificationResponse {
  data: Notification[];
  pagination: PaginationOutputDto;
}

export type DeleteResponseDto = object;

export enum SkillType {
  Listening = "listening",
  Reading = "reading",
  Writing = "writing",
  Speaking = "speaking",
}

export enum LessonType {
  Practice = "practice",
  Test = "test",
}

export enum ContentStatus {
  Draft = "draft",
  Published = "published",
  Private = "private",
  Deleted = "deleted",
  Pending = "pending",
}

export enum SubmissionStatus {
  Draft = "draft",
  Submitted = "submitted",
  Taken = "taken",
  Scored = "scored",
}

export interface LessonSubmission {
  id: string;
  userId: string;
  lessonId: string;
  submissionType: SkillType;
  status: SubmissionStatus;
  content: object | null;
  feedback: object | null;
  /** @format int32 */
  tokensUsed: number;
  /** @format date-time */
  submittedAt: string | null;
  /** @format date-time */
  gradedAt: string | null;
  gradedById: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  user?: User;
  lesson?: Lesson;
  gradedBy?: User | null;
  /** @format date-time */
  deletedAt: string | null;
}

export interface ReferenceData {
  id: string;
  type: string;
  code: string;
  name: string;
  metadata: object | null;
  isActive: boolean;
  /** @format int32 */
  orderIndex: number;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  skill: SkillType;
  title: string;
  description: string | null;
  lessonType: LessonType;
  level: string;
  topic: string;
  /** @format int32 */
  timeLimit: number | null;
  content: object | null;
  tags: string[];
  thumbnailUrl: string | null;
  status: ContentStatus;
  createdById: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string | null;
  createdBy?: User;
  submissions?: LessonSubmission[];
  levelRef?: ReferenceData;
}

export interface LessonsResponse {
  data: Lesson[];
  pagination: PaginationOutputDto;
}

export interface UpdateLessonDTO {
  title?: string;
  description?: string;
  level?: string;
  topic?: string;
  thumbnailUrl?: string;
  status?: string;
}

export interface DeleteLessonResponse {
  message: string;
}

export interface AnswerDTO {
  answer: string;
}

export interface QuestionDTO {
  id: string;
  question: string;
  right_answer: string;
  answer_list: AnswerDTO[];
}

export interface ContentReadingDTO {
  text: string;
  /** YouTube embed URL for solution/explanation video */
  youtube_embed_url?: string | null;
  questions: QuestionDTO[];
}

export interface ReadingLesson {
  id: string;
  skill: SkillType;
  title: string;
  description: string | null;
  lessonType: LessonType;
  level: string;
  topic: string;
  /** @format int32 */
  timeLimit: number | null;
  content: ContentReadingDTO | null;
  tags: string[];
  thumbnailUrl: string | null;
  status: ContentStatus;
  createdById: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string | null;
  createdBy?: User;
  submissions?: LessonSubmission[];
  levelRef?: ReferenceData;
}

export interface ReadingResponse {
  data: ReadingLesson;
}

export interface CreateReadingDTO {
  title: string;
  description: string;
  lessonType: "practice" | "test";
  level: string;
  topic: string;
  timeLimit: number;
  tags: string[];
  thumbnailUrl: string;
  status: "draft" | "published" | "private" | "deleted" | "pending";
  createdById?: string;
  content: ContentReadingDTO;
}

export interface UpdateReadingDTO {
  title: string;
  description: string;
  lessonType: "practice" | "test";
  level: string;
  topic: string;
  timeLimit: number;
  tags: string[];
  thumbnailUrl: string;
  status: "draft" | "published" | "private" | "deleted" | "pending";
  createdById?: string;
  content?: ContentReadingDTO;
}

export interface ContentListeningDTO {
  audio_url: string;
  /** YouTube embed URL for solution/explanation video */
  youtube_embed_url?: string | null;
  questions: QuestionDTO[];
}

export interface ListeningLesson {
  id: string;
  skill: SkillType;
  title: string;
  description: string | null;
  lessonType: LessonType;
  level: string;
  topic: string;
  /** @format int32 */
  timeLimit: number | null;
  content: ContentListeningDTO | null;
  tags: string[];
  thumbnailUrl: string | null;
  status: ContentStatus;
  createdById: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string | null;
  createdBy?: User;
  submissions?: LessonSubmission[];
  levelRef?: ReferenceData;
}

export interface ListeningResponse {
  data: ListeningLesson;
}

export interface CreateListeningDTO {
  title: string;
  description: string;
  lessonType: "practice" | "test";
  level: string;
  topic: string;
  timeLimit: number;
  tags: string[];
  thumbnailUrl: string;
  status: "draft" | "published" | "private" | "deleted" | "pending";
  createdById?: string;
  content: ContentListeningDTO;
}

export interface UpdateListeningDTO {
  title: string;
  description: string;
  lessonType: "practice" | "test";
  level: string;
  topic: string;
  timeLimit: number;
  tags: string[];
  thumbnailUrl: string;
  status: "draft" | "published" | "private" | "deleted" | "pending";
  createdById?: string;
  content?: ContentListeningDTO;
}

export interface SampleEssayDTO {
  /** Instructions for the sample essay */
  instruction: string;
  /** First body paragraph of the sample essay */
  body1: string;
  /** Second body paragraph of the sample essay */
  body2: string;
  /** Conclusion of the sample essay */
  conclusion: string;
}

export interface ResourcesDTO {
  /** Guide for analyzing the writing task */
  analysis_guide: string;
  /** Sample essay for reference */
  sample_essay: SampleEssayDTO;
}

export interface VocabularyItemDTO {
  /** Vocabulary term */
  term: string;
  /** Meanings of the vocabulary term */
  meaning: string[];
  /** Example sentence using the vocabulary term */
  example_sentence: string;
  /** URL to an image related to the vocabulary term */
  image_url: string;
  /** Reference link for the vocabulary term */
  reference_link: string;
  /** Name of the reference for the vocabulary term */
  reference_name: string;
  /** Tags associated with the vocabulary term */
  tags: string[];
  /** Repetition level of the vocabulary term */
  repetition_level: number;
}

export interface ContentWritingDTO {
  /** AI prompt for generating writing content */
  ai_prompt: string;
  /** Writing task description */
  task: string;
  /** Resources for the writing task */
  resources: ResourcesDTO;
  /** List of vocabulary items for the writing task */
  vocabulary_list: VocabularyItemDTO[];
}

export interface WritingLesson {
  id: string;
  skill: SkillType;
  title: string;
  description: string | null;
  lessonType: LessonType;
  level: string;
  topic: string;
  /** @format int32 */
  timeLimit: number | null;
  content: ContentWritingDTO | null;
  tags: string[];
  thumbnailUrl: string | null;
  status: ContentStatus;
  createdById: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string | null;
  createdBy?: User;
  submissions?: LessonSubmission[];
  levelRef?: ReferenceData;
}

export interface WritingResponse {
  data: WritingLesson;
}

export interface CreateWritingDTO {
  title: string;
  description: string;
  lessonType: "practice" | "test";
  level: string;
  topic: string;
  timeLimit: number;
  tags: string[];
  thumbnailUrl: string;
  status: "draft" | "published" | "private" | "deleted" | "pending";
  createdById?: string;
  content: ContentWritingDTO;
}

export interface UpdateWritingDTO {
  title: string;
  description: string;
  lessonType: "practice" | "test";
  level: string;
  topic: string;
  timeLimit: number;
  tags: string[];
  thumbnailUrl: string;
  status: "draft" | "published" | "private" | "deleted" | "pending";
  createdById?: string;
  content?: ContentWritingDTO;
}

export interface ContentSpeakingDTO {
  /**
   * The main topic text for the speaking lesson
   * @example "Travel and Tourism"
   */
  topicText: string;
  /**
   * The prompt text to guide the speaking practice
   * @example "Let's practice speaking English"
   */
  promptText: string;
  /**
   * Example follow-up questions for the speaking practice
   * @example ["What places have you visited?","How was your last trip?","Do you prefer traveling alone or with friends?","What country would you like to visit next and why?"]
   */
  followupExamples: string[];
  /**
   * Background knowledge and context for the speaking topic
   * @example "Focus on travel experiences, cultural differences, and common travel vocabulary such as 'hotel', 'sightseeing', 'itinerary', 'passport'."
   */
  backgroundKnowledge: string;
}

export interface SpeakingLesson {
  id: string;
  skill: SkillType;
  title: string;
  description: string | null;
  lessonType: LessonType;
  level: string;
  topic: string;
  /** @format int32 */
  timeLimit: number | null;
  content: ContentSpeakingDTO | null;
  tags: string[];
  thumbnailUrl: string | null;
  status: ContentStatus;
  createdById: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string | null;
  createdBy?: User;
  submissions?: LessonSubmission[];
  levelRef?: ReferenceData;
}

export interface SpeakingResponse {
  data: SpeakingLesson;
}

export interface CreateSpeakingDTO {
  title: string;
  description: string;
  lessonType: "practice" | "test";
  level: string;
  topic: string;
  timeLimit: number;
  tags: string[];
  thumbnailUrl: string;
  status: "draft" | "published" | "private" | "deleted" | "pending";
  createdById?: string;
  content: ContentSpeakingDTO;
}

export interface UpdateSpeakingDTO {
  title: string;
  description: string;
  lessonType: "practice" | "test";
  level: string;
  topic: string;
  timeLimit: number;
  tags: string[];
  thumbnailUrl: string;
  status: "draft" | "published" | "private" | "deleted" | "pending";
  createdById?: string;
  content?: ContentSpeakingDTO;
}

export interface CreateCommentDto {
  /** Identifier to group comments (e.g. writing-all, writing-detail-123) */
  identifierId: string;
  /** Content of the comment */
  content: string;
  /** Action link of the comment */
  actionLink: string;
  /** Parent comment ID if this is a reply */
  parentId?: string;
}

export interface CommentUserResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  role: "user" | "admin" | "teacher";
}

export interface CommentReactionResponse {
  id: string;
  userId: string;
  type: "like" | "teacher_heart";
  /** @format date-time */
  createdAt: string;
}

export interface CommentResponse {
  id: string;
  identifierId: string;
  userId: string;
  content: string;
  parentId: object;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  deletedAt: object;
  lessonSubmissionId: object;
  actionLink: object;
  user: CommentUserResponse;
  reactions: CommentReactionResponse[];
  _count: object;
  likesCount: number;
  lovesCount: number;
  hasReplies: boolean;
  userReaction: "like" | "teacher_heart" | null;
}

export interface CreateCommentResponse {
  comment: CommentResponse;
}

export interface CommentsResponse {
  data: CommentResponse[];
  pagination: PaginationOutputDto;
}

export interface AddReactionDto {
  /** Type of reaction (like, teacher_heart) */
  type: "like" | "teacher_heart";
}

export interface AddReactionResponse {
  message: string;
}

export interface DeleteCommentResponse {
  message: string;
}

export interface LessonSubmissionsResponse {
  data: LessonSubmission[];
  pagination: PaginationOutputDto;
}

export interface DeleteLessonSubmissionResponse {
  message: string;
}

export interface ContentReadingSubmissionDTO {
  text: string;
  /** YouTube embed URL for solution/explanation video */
  youtube_embed_url?: string | null;
  questions: QuestionDTO[];
}

export interface ReadingFeedbackDto {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  /** YouTube embed URL for solution/explanation video */
  youtube_embed_url?: string | null;
}

export interface ReadingSubmission {
  id: string;
  userId: string;
  lessonId: string;
  submissionType: SkillType;
  status: SubmissionStatus;
  content: ContentReadingSubmissionDTO | null;
  feedback: ReadingFeedbackDto | null;
  /** @format int32 */
  tokensUsed: number;
  /** @format date-time */
  submittedAt: string | null;
  /** @format date-time */
  gradedAt: string | null;
  gradedById: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  user?: User;
  lesson?: Lesson;
  gradedBy?: User | null;
  /** @format date-time */
  deletedAt: string | null;
}

export interface ReadingSubmissionResponse {
  data: ReadingSubmission;
}

export interface CreateReadingSubmissionDTO {
  lessonId: string;
  submissionType: "listening" | "reading" | "writing" | "speaking";
  tokensUsed: number;
  content: ContentReadingSubmissionDTO;
}

export interface ContentListeningSubmissionDTO {
  audio_url: string;
  /** YouTube embed URL for solution/explanation video */
  youtube_embed_url?: string | null;
  question_list: QuestionDTO[];
}

export interface ListeningFeedbackDto {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  /** YouTube embed URL for solution/explanation video */
  youtube_embed_url?: string | null;
}

export interface ListeningSubmission {
  id: string;
  userId: string;
  lessonId: string;
  submissionType: SkillType;
  status: SubmissionStatus;
  content: ContentListeningSubmissionDTO | null;
  feedback: ListeningFeedbackDto | null;
  /** @format int32 */
  tokensUsed: number;
  /** @format date-time */
  submittedAt: string | null;
  /** @format date-time */
  gradedAt: string | null;
  gradedById: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  user?: User;
  lesson?: Lesson;
  gradedBy?: User | null;
  /** @format date-time */
  deletedAt: string | null;
}

export interface ListeningSubmissionResponse {
  data: ListeningSubmission;
}

export interface CreateListeningSubmissionDTO {
  lessonId: string;
  submissionType: "listening" | "reading" | "writing" | "speaking";
  tokensUsed: number;
  content: ContentListeningSubmissionDTO;
}

export interface ChatMessageDTO {
  id: string;
  role: "bot" | "user";
  text: string;
  audio_url?: string;
  timestamp: string;
  recommend_answer?: string[];
}

export interface ContentSpeakingSubmissionDTO {
  topic_text: string;
  prompt_text: string;
  chat_history: ChatMessageDTO[];
}

export interface SpeakingSubmission {
  id: string;
  userId: string;
  lessonId: string;
  submissionType: SkillType;
  status: SubmissionStatus;
  content: ContentSpeakingSubmissionDTO | null;
  feedback: object | null;
  /** @format int32 */
  tokensUsed: number;
  /** @format date-time */
  submittedAt: string | null;
  /** @format date-time */
  gradedAt: string | null;
  gradedById: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  user?: User;
  lesson?: Lesson;
  gradedBy?: User | null;
  /** @format date-time */
  deletedAt: string | null;
}

export interface SpeakingSubmissionResponse {
  data: SpeakingSubmission;
}

export interface UpdateSpeakingSubmissionDTO {
  lessonId: string;
  submissionType: "listening" | "reading" | "writing" | "speaking";
  tokensUsed: number;
  status?: string;
  content?: ContentSpeakingSubmissionDTO;
}

export interface UserDataDTO {
  instruction: string;
  body1: string;
  body2: string;
  conclusion: string;
}

export interface ContentWritingSubmissionDTO {
  user_data: UserDataDTO;
  lesson_id: string;
  chat_history: ChatMessageDTO[];
}

export interface WritingFeedbackDTO {
  overall_score: number;
  task_response: number;
  coherence_cohesion: number;
  lexical_resource: number;
  grammar: number;
  corrections: CorrectionDTO[];
  overall_feedback: string;
}

export interface WritingSubmission {
  id: string;
  userId: string;
  lessonId: string;
  submissionType: SkillType;
  status: SubmissionStatus;
  content: ContentWritingSubmissionDTO | null;
  feedback: WritingFeedbackDTO | null;
  /** @format int32 */
  tokensUsed: number;
  /** @format date-time */
  submittedAt: string | null;
  /** @format date-time */
  gradedAt: string | null;
  gradedById: string | null;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  user?: User;
  lesson?: Lesson;
  gradedBy?: User | null;
  /** @format date-time */
  deletedAt: string | null;
}

export interface WritingSubmissionResultResponse {
  data: WritingSubmission;
  exampleEssay: SampleEssayDTO;
}

export interface CreateWritingSubmissionDTO {
  lessonId: string;
  submissionType: "listening" | "reading" | "writing" | "speaking";
  tokensUsed: number;
  status?: string;
  content: ContentWritingSubmissionDTO;
}

export interface WritingSubmissionResponse {
  data: WritingSubmission;
}

export interface UpdateWritingSubmissionDTO {
  lessonId: string;
  submissionType: "listening" | "reading" | "writing" | "speaking";
  tokensUsed: number;
  content?: ContentWritingSubmissionDTO;
  feedback?: WritingFeedbackDTO;
}

export interface CreateVocabularyDto {
  term: string;
  meaning: string[];
  exampleSentence?: string;
  imageUrl?: string;
  referenceLink?: string;
  referenceName?: string;
  /**
   * Repetition level from 0 to 6
   * @example 1
   */
  repetitionLevel?: number;
  /** @format date-time */
  nextReview?: string;
}

export interface VocabularyPractice {
  id: string;
  userId: string;
  vocabularyId: string;
  /** @format float */
  successRate: number | null;
  /** @format date-time */
  lastPracticed: string | null;
  /** @format date-time */
  nextReview: string | null;
  /** @format date-time */
  createdAt: string;
  user?: User;
  vocabulary?: Vocabulary;
}

export interface Vocabulary {
  id: string;
  term: string;
  meaning: string[];
  exampleSentence: string | null;
  imageUrl: string | null;
  referenceLink: string | null;
  referenceName: string | null;
  /** @format int32 */
  repetitionLevel: number;
  /** @format date-time */
  nextReview: string | null;
  createdById: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  createdBy?: User;
  practices?: VocabularyPractice[];
}

export interface VocabularyResponseDto {
  data: Vocabulary;
}

export interface VocabulariesResponse {
  data: Vocabulary[];
  pagination: PaginationOutputDto;
}

export interface UpdateVocabularyDto {
  term?: string;
  meaning?: string[];
  exampleSentence?: string;
  imageUrl?: string;
  referenceLink?: string;
  referenceName?: string;
  /**
   * Repetition level from 0 to 6
   * @example 1
   */
  repetitionLevel?: number;
  /** @format date-time */
  nextReview?: string;
}

export interface UpdateVocabularyReviewDto {
  /**
   * Repetition level from 0 to 6
   * @example 1
   */
  repetitionLevel: number;
}

export interface DeleteVocabularyResponse {
  message: string;
}

export interface ActivityDataResponse {
  /**
   * Record of activities by date
   * @example {"2025-02-17":{"date":"2025-02-17","reading":2,"listening":1,"writing":0,"speaking":0,"total_time":"3h39m"}}
   */
  data: Record<
    string,
    {
      /** @example "2025-02-17" */
      date?: string;
      /** @example 2 */
      reading?: number;
      /** @example 1 */
      listening?: number;
      /** @example 0 */
      writing?: number;
      /** @example 0 */
      speaking?: number;
      /** @example "3h39m" */
      total_time?: string;
    }
  >;
}

export interface CreateStudyActivityDto {
  /** @example "2024-12-20" */
  date: string;
  /** @example 30 */
  reading: number;
  /** @example 20 */
  listening: number;
  /** @example 15 */
  writing: number;
  /** @example 25 */
  speaking: number;
  /** @example 90 */
  totalMinutes: number;
}

export interface Banner {
  id: string;
  title: string;
  orderIndex: number;
  imageUrl: string;
  actionLink: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface BannerResponse {
  data: Banner[];
  pagination: PaginationOutputDto;
}

export interface SingleBannerResponse {
  data: Banner;
}

export interface CreateBannerDto {
  title: string;
  orderIndex: number;
  imageUrl: string;
  actionLink: string;
}

export interface UpdateBannerDto {
  title: string;
  orderIndex: number;
  imageUrl: string;
  actionLink: string;
}

export interface DeleteBannerResponse {
  message: string;
}

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
     * @tags health
     * @name HealthControllerCheck
     * @request GET:/api/health
     */
    healthControllerCheck: (params: RequestParams = {}) =>
      this.request<
        {
          /** @example "ok" */
          status?: string;
          /** @example {"database":{"status":"up"}} */
          info?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
          /** @example {} */
          error?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
          /** @example {"database":{"status":"up"}} */
          details?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
        },
        {
          /** @example "error" */
          status?: string;
          /** @example {"database":{"status":"up"}} */
          info?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
          /** @example {"redis":{"status":"down","message":"Could not connect"}} */
          error?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
          /** @example {"database":{"status":"up"},"redis":{"status":"down","message":"Could not connect"}} */
          details?: Record<
            string,
            {
              status: string;
              [key: string]: any;
            }
          >;
        }
      >({
        path: `/api/health`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerCheckSession
     * @request POST:/api/ai/check-session/{sessionId}
     */
    aiControllerCheckSession: (sessionId: string, params: RequestParams = {}) =>
      this.request<CheckSessionResponseDto, any>({
        path: `/api/ai/check-session/${sessionId}`,
        method: "POST",
        format: "json",
        ...params,
      }),

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
     * @tags ai
     * @name AiControllerChat
     * @request POST:/api/ai/chat
     */
    aiControllerChat: (data: ChatRequestDto, params: RequestParams = {}) =>
      this.request<ChatResponseDto, any>({
        path: `/api/ai/chat`,
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
     * @name AiControllerChatStreaming
     * @summary Stream chat response
     * @request POST:/api/ai/chat-streaming
     */
    aiControllerChatStreaming: (data: ChatRequestDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/ai/chat-streaming`,
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
     * @name AiControllerStartSpeaking
     * @request POST:/api/ai/speaking/start
     */
    aiControllerStartSpeaking: (data: StartSpeakingDto, params: RequestParams = {}) =>
      this.request<StartSpeakingResponseDto, any>({
        path: `/api/ai/speaking/start`,
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
     * @name AiControllerChatSpeaking
     * @request POST:/api/ai/speaking/chat
     */
    aiControllerChatSpeaking: (data: SpeakingDto, params: RequestParams = {}) =>
      this.request<ChatResponseDto, any>({
        path: `/api/ai/speaking/chat`,
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
     * @name AiControllerEvaluateEssay
     * @request POST:/api/ai/evaluate-essay
     */
    aiControllerEvaluateEssay: (data: EvaluateEssayDto, params: RequestParams = {}) =>
      this.request<EvaluateEssayResponseDto, any>({
        path: `/api/ai/evaluate-essay`,
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
     * @name AiControllerRecommendAnswer
     * @request GET:/api/ai/speaking/recommend-answer/{sessionId}
     */
    aiControllerRecommendAnswer: (sessionId: string, params: RequestParams = {}) =>
      this.request<RecommendAnswerResponseDto, any>({
        path: `/api/ai/speaking/recommend-answer/${sessionId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerChatSpeakingStreaming
     * @summary Stream chat speaking response
     * @request POST:/api/ai/speaking/chat-streaming
     */
    aiControllerChatSpeakingStreaming: (data: SpeakingDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/ai/speaking/chat-streaming`,
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
     * @name AiControllerCheckSpeakingSession
     * @request GET:/api/ai/speaking/check-session/{sessionId}
     */
    aiControllerCheckSpeakingSession: (sessionId: string, params: RequestParams = {}) =>
      this.request<CheckSessionResponseDto, any>({
        path: `/api/ai/speaking/check-session/${sessionId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags ai
     * @name AiControllerClearSpeakingSession
     * @request DELETE:/api/ai/speaking/clear-session/{sessionId}
     */
    aiControllerClearSpeakingSession: (sessionId: string, params: RequestParams = {}) =>
      this.request<DeleteResponseDto, any>({
        path: `/api/ai/speaking/clear-session/${sessionId}`,
        method: "DELETE",
        format: "json",
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
        role?: string;
        username?: string;
        email?: string;
        createdAt?: string;
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
     * @name UserControllerCreateUser
     * @request POST:/api/users
     * @secure
     */
    userControllerCreateUser: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
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
     * @name UserControllerFindById
     * @request GET:/api/users/{id}
     * @secure
     */
    userControllerFindById: (id: string, params: RequestParams = {}) =>
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
     * @tags users
     * @name UserControllerUpdateUser
     * @request PATCH:/api/users/{id}
     * @secure
     */
    userControllerUpdateUser: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
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
     * @name UserControllerFindByUsername
     * @request GET:/api/users/username/{username}
     * @secure
     */
    userControllerFindByUsername: (username: string, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/api/users/username/${username}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags users
     * @name UserControllerCreateTeacher
     * @request POST:/api/users/teachers
     * @secure
     */
    userControllerCreateTeacher: (data: TeacherDto, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/api/users/teachers`,
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
     * @name UserControllerUpdateTeacher
     * @request PATCH:/api/users/teachers/{id}
     * @secure
     */
    userControllerUpdateTeacher: (id: string, data: TeacherDto, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/api/users/teachers/${id}`,
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
     * @name UserControllerUpdateTeacherProfile
     * @request PATCH:/api/users/teachers/{id}/profile
     * @secure
     */
    userControllerUpdateTeacherProfile: (id: string, data: UpdateProfileTeacherDto, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/api/users/teachers/${id}/profile`,
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
     * @name UserControllerUpdateStudentProfile
     * @request PATCH:/api/users/students/{id}/profile
     * @secure
     */
    userControllerUpdateStudentProfile: (id: string, data: ProfileDto, params: RequestParams = {}) =>
      this.request<UserResponse, any>({
        path: `/api/users/students/${id}/profile`,
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
     * @tags auth
     * @name AuthControllerMe
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
     * @tags token
     * @name TokenControllerGetWallet
     * @request GET:/api/token/wallet
     * @secure
     */
    tokenControllerGetWallet: (params: RequestParams = {}) =>
      this.request<TokenWalletResponse, any>({
        path: `/api/token/wallet`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags token
     * @name TokenControllerGetPackages
     * @request GET:/api/token/plans
     * @secure
     */
    tokenControllerGetPackages: (params: RequestParams = {}) =>
      this.request<TokenPackagesResponse, any>({
        path: `/api/token/plans`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags token
     * @name TokenControllerCreateTransaction
     * @request POST:/api/token/charge
     * @secure
     */
    tokenControllerCreateTransaction: (data: CreateTransactionDto, params: RequestParams = {}) =>
      this.request<PaymentUrlResponse, any>({
        path: `/api/token/charge`,
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
     * @tags token
     * @name TokenControllerGetTransactions
     * @request GET:/api/token/transactions
     * @secure
     */
    tokenControllerGetTransactions: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        search?: string;
        paymentType?: string;
        status?: string;
        type?: string;
        from?: string;
        to?: string;
        userId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<TransactionsResponse, any>({
        path: `/api/token/transactions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags token
     * @name TokenControllerGetAdminTransactions
     * @request GET:/api/token/admin/transactions
     * @secure
     */
    tokenControllerGetAdminTransactions: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        search?: string;
        paymentType?: string;
        status?: string;
        type?: string;
        from?: string;
        to?: string;
        userId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<TransactionsResponse, any>({
        path: `/api/token/admin/transactions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags token
     * @name TokenControllerUseTokens
     * @request POST:/api/token/use
     * @secure
     */
    tokenControllerUseTokens: (data: UseTokensDto, params: RequestParams = {}) =>
      this.request<TransactionResponse, any>({
        path: `/api/token/use`,
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
     * @tags token
     * @name TokenControllerWithdrawTokens
     * @request POST:/api/token/withdraw
     * @secure
     */
    tokenControllerWithdrawTokens: (data: WithdrawTokensDto, params: RequestParams = {}) =>
      this.request<TransactionResponse, any>({
        path: `/api/token/withdraw`,
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
     * @tags token
     * @name TokenControllerGetWithdrawalRequests
     * @request GET:/api/token/withdrawal-requests
     * @secure
     */
    tokenControllerGetWithdrawalRequests: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        search?: string;
        paymentType?: string;
        status?: string;
        type?: string;
        from?: string;
        to?: string;
        userId?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<TransactionsResponse, any>({
        path: `/api/token/withdrawal-requests`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags token
     * @name TokenControllerGetWithdrawalRequestDetails
     * @request GET:/api/token/withdrawal-requests/{requestId}
     * @secure
     */
    tokenControllerGetWithdrawalRequestDetails: (requestId: string, params: RequestParams = {}) =>
      this.request<TransactionWithUserResponse, any>({
        path: `/api/token/withdrawal-requests/${requestId}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags token
     * @name TokenControllerApproveWithdrawalRequest
     * @request POST:/api/token/withdrawal-requests/{requestId}/approve
     * @secure
     */
    tokenControllerApproveWithdrawalRequest: (requestId: string, params: RequestParams = {}) =>
      this.request<TransactionResponse, any>({
        path: `/api/token/withdrawal-requests/${requestId}/approve`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags token
     * @name TokenControllerDeclineWithdrawalRequest
     * @request POST:/api/token/withdrawal-requests/{requestId}/decline
     * @secure
     */
    tokenControllerDeclineWithdrawalRequest: (requestId: string, params: RequestParams = {}) =>
      this.request<TransactionResponse, any>({
        path: `/api/token/withdrawal-requests/${requestId}/decline`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags payments
     * @name PaymentControllerHandleCallback
     * @request POST:/api/payments/{provider}/callback
     */
    paymentControllerHandleCallback: (provider: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/payments/${provider}/callback`,
        method: "POST",
        ...params,
      }),

    /**
     * No description
     *
     * @tags notifications
     * @name NotificationControllerSendNotification
     * @request POST:/api/notifications/send
     * @secure
     */
    notificationControllerSendNotification: (data: CreateNotificationDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/notifications/send`,
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
     * @tags notifications
     * @name NotificationControllerGetUserNotifications
     * @request GET:/api/notifications
     * @secure
     */
    notificationControllerGetUserNotifications: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        search?: string;
        userId?: string;
        isGlobal?: boolean;
        type?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<NotificationResponse, any>({
        path: `/api/notifications`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags notifications
     * @name NotificationControllerMarkAsRead
     * @request PATCH:/api/notifications/{id}/read
     * @secure
     */
    notificationControllerMarkAsRead: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/notifications/${id}/read`,
        method: "PATCH",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags notifications
     * @name NotificationControllerDeleteNotification
     * @request DELETE:/api/notifications/{id}
     * @secure
     */
    notificationControllerDeleteNotification: (id: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/notifications/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags notifications
     * @name NotificationGatewayStream
     * @request GET:/api/notifications-sse/stream
     */
    notificationGatewayStream: (
      query: {
        userId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/notifications-sse/stream`,
        method: "GET",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags upload
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
     * @tags upload
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
     * @tags upload
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
     * @tags upload
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

    /**
     * No description
     *
     * @tags lessons
     * @name LessonControllerFindAll
     * @request GET:/api/lessons
     * @secure
     */
    lessonControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        search?: string;
        skill?: string;
        level?: string;
        topic?: string;
        status?: string;
        lessonType?: string;
        tag?: string[];
      },
      params: RequestParams = {},
    ) =>
      this.request<LessonsResponse, any>({
        path: `/api/lessons`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lessons
     * @name LessonControllerUpdateLesson
     * @request PATCH:/api/lessons/{id}
     * @secure
     */
    lessonControllerUpdateLesson: (id: string, data: UpdateLessonDTO, params: RequestParams = {}) =>
      this.request<LessonsResponse, any>({
        path: `/api/lessons/${id}`,
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
     * @tags lessons
     * @name LessonControllerRemove
     * @request DELETE:/api/lessons/{id}
     * @secure
     */
    lessonControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<DeleteLessonResponse, any>({
        path: `/api/lessons/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lessons
     * @name LessonControllerFindOneReading
     * @request GET:/api/lessons/reading/{id}
     * @secure
     */
    lessonControllerFindOneReading: (id: string, params: RequestParams = {}) =>
      this.request<ReadingResponse, any>({
        path: `/api/lessons/reading/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lessons
     * @name LessonControllerUpdateReading
     * @request PATCH:/api/lessons/reading/{id}
     * @secure
     */
    lessonControllerUpdateReading: (id: string, data: UpdateReadingDTO, params: RequestParams = {}) =>
      this.request<ReadingResponse, any>({
        path: `/api/lessons/reading/${id}`,
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
     * @tags lessons
     * @name LessonControllerCreateReading
     * @request POST:/api/lessons/reading
     * @secure
     */
    lessonControllerCreateReading: (data: CreateReadingDTO, params: RequestParams = {}) =>
      this.request<ReadingResponse, any>({
        path: `/api/lessons/reading`,
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
     * @tags lessons
     * @name LessonControllerFindOneListening
     * @request GET:/api/lessons/listening/{id}
     * @secure
     */
    lessonControllerFindOneListening: (id: string, params: RequestParams = {}) =>
      this.request<ListeningResponse, any>({
        path: `/api/lessons/listening/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lessons
     * @name LessonControllerUpdateListening
     * @request PATCH:/api/lessons/listening/{id}
     * @secure
     */
    lessonControllerUpdateListening: (id: string, data: UpdateListeningDTO, params: RequestParams = {}) =>
      this.request<ListeningResponse, any>({
        path: `/api/lessons/listening/${id}`,
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
     * @tags lessons
     * @name LessonControllerCreateListening
     * @request POST:/api/lessons/listening
     * @secure
     */
    lessonControllerCreateListening: (data: CreateListeningDTO, params: RequestParams = {}) =>
      this.request<ListeningResponse, any>({
        path: `/api/lessons/listening`,
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
     * @tags lessons
     * @name LessonControllerFindOneWriting
     * @request GET:/api/lessons/writing/{id}
     * @secure
     */
    lessonControllerFindOneWriting: (id: string, params: RequestParams = {}) =>
      this.request<WritingResponse, any>({
        path: `/api/lessons/writing/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lessons
     * @name LessonControllerUpdateWriting
     * @request PATCH:/api/lessons/writing/{id}
     * @secure
     */
    lessonControllerUpdateWriting: (id: string, data: UpdateWritingDTO, params: RequestParams = {}) =>
      this.request<WritingResponse, any>({
        path: `/api/lessons/writing/${id}`,
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
     * @tags lessons
     * @name LessonControllerCreateWriting
     * @request POST:/api/lessons/writing
     * @secure
     */
    lessonControllerCreateWriting: (data: CreateWritingDTO, params: RequestParams = {}) =>
      this.request<WritingResponse, any>({
        path: `/api/lessons/writing`,
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
     * @tags lessons
     * @name LessonControllerFindOneSpeaking
     * @request GET:/api/lessons/speaking/{id}
     * @secure
     */
    lessonControllerFindOneSpeaking: (id: string, params: RequestParams = {}) =>
      this.request<SpeakingResponse, any>({
        path: `/api/lessons/speaking/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lessons
     * @name LessonControllerUpdateSpeaking
     * @request PATCH:/api/lessons/speaking/{id}
     * @secure
     */
    lessonControllerUpdateSpeaking: (id: string, data: UpdateSpeakingDTO, params: RequestParams = {}) =>
      this.request<SpeakingResponse, any>({
        path: `/api/lessons/speaking/${id}`,
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
     * @tags lessons
     * @name LessonControllerCreateSpeaking
     * @request POST:/api/lessons/speaking
     * @secure
     */
    lessonControllerCreateSpeaking: (data: CreateSpeakingDTO, params: RequestParams = {}) =>
      this.request<SpeakingResponse, any>({
        path: `/api/lessons/speaking`,
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
     * @tags comments
     * @name CommentControllerCreate
     * @request POST:/api/comments
     * @secure
     */
    commentControllerCreate: (data: CreateCommentDto, params: RequestParams = {}) =>
      this.request<CreateCommentResponse, any>({
        path: `/api/comments`,
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
     * @tags comments
     * @name CommentControllerFindAll
     * @request GET:/api/comments
     * @secure
     */
    commentControllerFindAll: (
      query: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        /** Identifier to filter comments (e.g. writing-all, writing-detail-123) */
        identifierId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommentsResponse, any>({
        path: `/api/comments`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name CommentControllerFindReplies
     * @request GET:/api/comments/replies
     * @secure
     */
    commentControllerFindReplies: (
      query: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        /** Comment ID to get replies for */
        commentId: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<CommentsResponse, any>({
        path: `/api/comments/replies`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags comments
     * @name CommentControllerAddReaction
     * @request POST:/api/comments/{id}/reactions
     * @secure
     */
    commentControllerAddReaction: (id: string, data: AddReactionDto, params: RequestParams = {}) =>
      this.request<AddReactionResponse, any>({
        path: `/api/comments/${id}/reactions`,
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
     * @tags comments
     * @name CommentControllerDelete
     * @request DELETE:/api/comments/{id}
     * @secure
     */
    commentControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<DeleteCommentResponse, any>({
        path: `/api/comments/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson-submissions
     * @name LessonSubmissionControllerFindAll
     * @request GET:/api/lesson-submissions
     * @secure
     */
    lessonSubmissionControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        search?: string;
        userId?: string;
        lessonId?: string;
        submissionType?: string;
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<LessonSubmissionsResponse, any>({
        path: `/api/lesson-submissions`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson-submissions
     * @name LessonSubmissionControllerGetAllSubmissionsByUser
     * @request GET:/api/lesson-submissions/user
     * @secure
     */
    lessonSubmissionControllerGetAllSubmissionsByUser: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        search?: string;
        submissionType?: string;
        status?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<LessonSubmissionsResponse, any>({
        path: `/api/lesson-submissions/user`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson-submissions
     * @name LessonSubmissionControllerRemove
     * @request DELETE:/api/lesson-submissions/{id}
     * @secure
     */
    lessonSubmissionControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<DeleteLessonSubmissionResponse, any>({
        path: `/api/lesson-submissions/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson-submissions
     * @name LessonSubmissionControllerFindOneReading
     * @request GET:/api/lesson-submissions/reading/{id}
     * @secure
     */
    lessonSubmissionControllerFindOneReading: (id: string, params: RequestParams = {}) =>
      this.request<ReadingSubmissionResponse, any>({
        path: `/api/lesson-submissions/reading/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson-submissions
     * @name LessonSubmissionControllerCreateReading
     * @request POST:/api/lesson-submissions/reading
     * @secure
     */
    lessonSubmissionControllerCreateReading: (data: CreateReadingSubmissionDTO, params: RequestParams = {}) =>
      this.request<ReadingSubmissionResponse, any>({
        path: `/api/lesson-submissions/reading`,
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
     * @tags lesson-submissions
     * @name LessonSubmissionControllerFindOneListening
     * @request GET:/api/lesson-submissions/listening/{id}
     * @secure
     */
    lessonSubmissionControllerFindOneListening: (id: string, params: RequestParams = {}) =>
      this.request<ListeningSubmissionResponse, any>({
        path: `/api/lesson-submissions/listening/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson-submissions
     * @name LessonSubmissionControllerCreateListening
     * @request POST:/api/lesson-submissions/listening
     * @secure
     */
    lessonSubmissionControllerCreateListening: (data: CreateListeningSubmissionDTO, params: RequestParams = {}) =>
      this.request<ListeningSubmissionResponse, any>({
        path: `/api/lesson-submissions/listening`,
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
     * @tags lesson-submissions
     * @name LessonSubmissionControllerFindOneSpeaking
     * @request GET:/api/lesson-submissions/speaking/{id}
     * @secure
     */
    lessonSubmissionControllerFindOneSpeaking: (id: string, params: RequestParams = {}) =>
      this.request<SpeakingSubmissionResponse, any>({
        path: `/api/lesson-submissions/speaking/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson-submissions
     * @name LessonSubmissionControllerUpdateSpeaking
     * @request POST:/api/lesson-submissions/speaking/{id}
     * @secure
     */
    lessonSubmissionControllerUpdateSpeaking: (
      id: string,
      data: UpdateSpeakingSubmissionDTO,
      params: RequestParams = {},
    ) =>
      this.request<SpeakingSubmissionResponse, any>({
        path: `/api/lesson-submissions/speaking/${id}`,
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
     * @tags lesson-submissions
     * @name LessonSubmissionControllerFindOneWriting
     * @request GET:/api/lesson-submissions/writing/{id}
     * @secure
     */
    lessonSubmissionControllerFindOneWriting: (id: string, params: RequestParams = {}) =>
      this.request<WritingSubmissionResultResponse, any>({
        path: `/api/lesson-submissions/writing/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson-submissions
     * @name LessonSubmissionControllerUpdateWriting
     * @request PATCH:/api/lesson-submissions/writing/{id}
     * @secure
     */
    lessonSubmissionControllerUpdateWriting: (
      id: string,
      data: UpdateWritingSubmissionDTO,
      params: RequestParams = {},
    ) =>
      this.request<WritingSubmissionResponse, any>({
        path: `/api/lesson-submissions/writing/${id}`,
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
     * @tags lesson-submissions
     * @name LessonSubmissionControllerCreateWriting
     * @request POST:/api/lesson-submissions/writing
     * @secure
     */
    lessonSubmissionControllerCreateWriting: (data: CreateWritingSubmissionDTO, params: RequestParams = {}) =>
      this.request<WritingSubmissionResponse, any>({
        path: `/api/lesson-submissions/writing`,
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
     * @tags lesson-submissions
     * @name LessonSubmissionControllerClaimSubmission
     * @request POST:/api/lesson-submissions/writing/claim/{id}
     * @secure
     */
    lessonSubmissionControllerClaimSubmission: (id: string, params: RequestParams = {}) =>
      this.request<WritingSubmissionResponse, any>({
        path: `/api/lesson-submissions/writing/claim/${id}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags lesson-submissions
     * @name LessonSubmissionControllerCancelClaimSubmission
     * @request POST:/api/lesson-submissions/writing/cancel-claim/{id}
     * @secure
     */
    lessonSubmissionControllerCancelClaimSubmission: (id: string, params: RequestParams = {}) =>
      this.request<WritingSubmissionResponse, any>({
        path: `/api/lesson-submissions/writing/cancel-claim/${id}`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vocabularies
     * @name VocabularyControllerCreate
     * @summary Create a new vocabulary
     * @request POST:/api/vocabularies
     * @secure
     */
    vocabularyControllerCreate: (data: CreateVocabularyDto, params: RequestParams = {}) =>
      this.request<VocabularyResponseDto, any>({
        path: `/api/vocabularies`,
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
     * @tags vocabularies
     * @name VocabularyControllerFindAll
     * @summary Get all vocabularies with pagination
     * @request GET:/api/vocabularies
     * @secure
     */
    vocabularyControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        search?: string;
        repetitionLevel?: number;
        dueDate?: boolean;
      },
      params: RequestParams = {},
    ) =>
      this.request<VocabulariesResponse, any>({
        path: `/api/vocabularies`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vocabularies
     * @name VocabularyControllerGetDueVocabularies
     * @summary Get all vocabularies due for review
     * @request GET:/api/vocabularies/due
     * @secure
     */
    vocabularyControllerGetDueVocabularies: (params: RequestParams = {}) =>
      this.request<VocabulariesResponse, any>({
        path: `/api/vocabularies/due`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vocabularies
     * @name VocabularyControllerFindOne
     * @summary Get a vocabulary by id
     * @request GET:/api/vocabularies/{id}
     * @secure
     */
    vocabularyControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<VocabularyResponseDto, any>({
        path: `/api/vocabularies/${id}`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vocabularies
     * @name VocabularyControllerUpdate
     * @summary Update a vocabulary
     * @request PATCH:/api/vocabularies/{id}
     * @secure
     */
    vocabularyControllerUpdate: (id: string, data: UpdateVocabularyDto, params: RequestParams = {}) =>
      this.request<VocabularyResponseDto, any>({
        path: `/api/vocabularies/${id}`,
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
     * @tags vocabularies
     * @name VocabularyControllerRemove
     * @summary Delete a vocabulary
     * @request DELETE:/api/vocabularies/{id}
     * @secure
     */
    vocabularyControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<DeleteVocabularyResponse, any>({
        path: `/api/vocabularies/${id}`,
        method: "DELETE",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags vocabularies
     * @name VocabularyControllerUpdateReviewStatus
     * @summary Update vocabulary review status
     * @request PATCH:/api/vocabularies/{id}/review
     * @secure
     */
    vocabularyControllerUpdateReviewStatus: (id: string, data: UpdateVocabularyReviewDto, params: RequestParams = {}) =>
      this.request<VocabularyResponseDto, any>({
        path: `/api/vocabularies/${id}/review`,
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
     * @tags study-activity
     * @name StudyActivityControllerGetActivitiesByMonth
     * @request GET:/api/study-activity/{userId}
     */
    studyActivityControllerGetActivitiesByMonth: (
      userId: string,
      query: {
        /** @example 2 */
        month: number;
        /** @example 2024 */
        year: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ActivityDataResponse, any>({
        path: `/api/study-activity/${userId}`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags study-activity
     * @name StudyActivityControllerUpsertActivity
     * @request POST:/api/study-activity/{userId}
     */
    studyActivityControllerUpsertActivity: (userId: string, data: CreateStudyActivityDto, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/study-activity/${userId}`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags study-activity
     * @name StudyActivityControllerDeleteActivity
     * @request DELETE:/api/study-activity/{userId}/{date}
     */
    studyActivityControllerDeleteActivity: (userId: string, date: string, params: RequestParams = {}) =>
      this.request<string, any>({
        path: `/api/study-activity/${userId}/${date}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags banner
     * @name BannerControllerFindAll
     * @request GET:/api/banner
     */
    bannerControllerFindAll: (
      query?: {
        /** @default 1 */
        page?: number;
        /** @default 10 */
        perPage?: number;
        search?: string;
        orderIndex?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<BannerResponse, any>({
        path: `/api/banner`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags banner
     * @name BannerControllerCreate
     * @request POST:/api/banner
     */
    bannerControllerCreate: (data: CreateBannerDto, params: RequestParams = {}) =>
      this.request<SingleBannerResponse, any>({
        path: `/api/banner`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags banner
     * @name BannerControllerFindOne
     * @request GET:/api/banner/{id}
     */
    bannerControllerFindOne: (id: string, params: RequestParams = {}) =>
      this.request<SingleBannerResponse, any>({
        path: `/api/banner/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags banner
     * @name BannerControllerUpdate
     * @request PATCH:/api/banner/{id}
     */
    bannerControllerUpdate: (id: string, data: UpdateBannerDto, params: RequestParams = {}) =>
      this.request<SingleBannerResponse, any>({
        path: `/api/banner/${id}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags banner
     * @name BannerControllerRemove
     * @request DELETE:/api/banner/{id}
     */
    bannerControllerRemove: (id: string, params: RequestParams = {}) =>
      this.request<DeleteBannerResponse, any>({
        path: `/api/banner/${id}`,
        method: "DELETE",
        format: "json",
        ...params,
      }),
  };
}
