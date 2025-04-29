export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    image?: string;
  };
  likes: number;
  specialLikes: number;
  createdAt: string;
  hasReplies: boolean;
  userReaction: "like" | "teacher_heart" | null;
}
