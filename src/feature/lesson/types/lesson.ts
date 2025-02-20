export type ContentStatus = "draft" | "published" | "archived";

export interface Lesson {
  id: string;
  skill: string;
  skill_type: string;
  title: string;
  image_url: string;
  description: string;
  lesson_type: string;
  level: string;
  topic: string;
  time_limit: number;
  content: any; // You might want to type this based on your skill_type
  status: ContentStatus;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
