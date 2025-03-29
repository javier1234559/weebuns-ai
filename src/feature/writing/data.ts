import { Lesson } from "@/feature/lesson/lesson.type";
import { LessonType } from "@/services/swagger-types";
import { SkillType } from "@/services/swagger-types";
import { ContentStatus } from "@/services/swagger-types";

export const detailWriting: Lesson = {
  id: "1",
  title: "IELTS Writing Task 2: Opinion Essays Masterclass",
  description:
    "Learn how to write a well-structured opinion essay for IELTS Writing Task 2. Master argument development, paragraph organization, and advanced vocabulary usage.",
  level: "intermediate",
  topic: "academic_writing",
  content: {
    topics: ["Essay structure", "Opinion language", "Common question types"],
    practice: ["Sample essays", "Vocabulary exercises"],
  },
  skill: SkillType.Listening,
  lessonType: LessonType.Practice,
  timeLimit: null,
  tags: [],
  thumbnailUrl: null,
  status: ContentStatus.Draft,
  createdById: "",
  createdAt: "",
  updatedAt: "",
  deletedAt: null,
};
