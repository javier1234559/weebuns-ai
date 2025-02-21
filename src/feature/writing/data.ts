import { Lesson } from "@/feature/lesson/types/lesson";

export const detailWriting: Lesson = {
  id: "1",
  skill: "writing",
  skill_type: "academic",
  title: "IELTS Writing Task 2: Opinion Essays Masterclass",
  image_url: "/images/lessons/thumbnail.png",
  description:
    "Learn how to write a well-structured opinion essay for IELTS Writing Task 2. Master argument development, paragraph organization, and advanced vocabulary usage.",
  lesson_type: "Tutorial",
  level: "intermediate",
  topic: "academic_writing",
  time_limit: 60,
  content: {
    topics: ["Essay structure", "Opinion language", "Common question types"],
    practice: ["Sample essays", "Vocabulary exercises"],
  },
  status: "published",
  created_by: "67890-user-id",
  created_at: new Date("2024-02-15"),
  updated_at: new Date("2024-02-15"),
};
