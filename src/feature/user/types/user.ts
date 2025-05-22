import { UserDto } from "@/services/swagger-types";

export interface TeacherProfile {
  id: string;
  userId: string;
  longBio: string;
  introVideoUrlEmbed: string;
  certifications: string;
  teachingExperience: string;
  other: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UserResponse {
  user: UserDto;
}
