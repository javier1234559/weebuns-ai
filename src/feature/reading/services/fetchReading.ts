import lessonApi, {
  LessonQueryParams,
} from "@/feature/lesson/services/lessonApi";
import { SkillType } from "@/services/swagger-types";

// export async function fetchReadingList({
//   page = 1,
//   perPage = 10,
//   tags,
//   topic,
//   level,
//   search,
//   status,
// }: LessonQueryParams) {
//   const response = await lessonApi.getAllLessons({
//     page,
//     perPage,
//     skill: SkillType.Reading,
//     tags,
//     topic,
//     level,
//     search,
//     status,
//   });
//   return response;
// }

import { serverFetch } from "@/services/serverFetch";
import { LessonsResponse } from "@/services/swagger-types";
import { buildQueryString } from "@/lib/utils";

export async function fetchReadingList(
  params: LessonQueryParams,
): Promise<LessonsResponse> {
  return serverFetch(`/api/lessons?${buildQueryString(params)}`);
}
