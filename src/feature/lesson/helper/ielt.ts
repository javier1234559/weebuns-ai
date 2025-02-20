// import { Lesson } from "@/feature/lesson/types/lesson";

// export const LESSON_LEVELS = ["beginner", "intermediate", "advanced"] as const;
// export const LESSON_TYPES = [
//   "Tutorial",
//   "Workshop",
//   "Practice Test",
//   "Course",
// ] as const;
// export const SKILL_TYPES = [
//   "academic",
//   "general",
//   "practice",
//   "theory",
// ] as const;

// export const getSkillColor = (skill: string) => {
//   const colors = {
//     listening: "bg-blue-100 text-blue-800",
//     reading: "bg-green-100 text-green-800",
//     writing: "bg-purple-100 text-purple-800",
//     speaking: "bg-orange-100 text-orange-800",
//     vocabulary: "bg-teal-100 text-teal-800",
//     pronunciation: "bg-rose-100 text-rose-800",
//   };
//   return colors[skill] || "bg-gray-100 text-gray-800";
// };

// export const getLessonTypeIcon = (type: string) => {
//   const icons = {
//     Tutorial: "📚",
//     Workshop: "👥",
//     "Practice Test": "✍️",
//     Course: "🎓",
//   };
//   return icons[type] || "📖";
// };

// export const getSkillIcon = (skill: string) => {
//   const icons = {
//     listening: "👂",
//     reading: "📖",
//     writing: "✍️",
//     speaking: "🗣️",
//     vocabulary: "📚",
//     pronunciation: "🔊",
//   };
//   return icons[skill] || "📝";
// };

// export const getBandScoreLabel = (level: string) => {
//   const bandScores = {
//     beginner: "Band 5-6",
//     intermediate: "Band 6-7",
//     advanced: "Band 7+",
//   };
//   return bandScores[level] || level;
// };

// export const filterIELTSLessons = (
//   lessons: Lesson[],
//   filters: {
//     skill?: string;
//     level?: string;
//     type?: string;
//     topic?: string;
//   },
// ): Lesson[] => {
//   return lessons.filter((lesson) => {
//     return (
//       (!filters.skill || lesson.skill === filters.skill) &&
//       (!filters.level || lesson.level === filters.level) &&
//       (!filters.type || lesson.lesson_type === filters.type) &&
//       (!filters.topic || lesson.topic === filters.topic)
//     );
//   });
// };

// export const groupLessonsBySkill = (lessons: Lesson[]) => {
//   return lessons.reduce(
//     (acc, lesson) => {
//       const skill = lesson.skill;
//       if (!acc[skill]) {
//         acc[skill] = [];
//       }
//       acc[skill].push(lesson);
//       return acc;
//     },
//     {} as Record<string, Lesson[]>,
//   );
// };
