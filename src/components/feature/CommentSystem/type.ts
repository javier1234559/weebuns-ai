// export interface Comment {
//   id: string;
//   content: string;
//   author: {
//     name: string;
//     image?: string;
//     isAuthor?: boolean;
//   };
//   likes: number;
//   specialLikes: number;
//   createdAt: string;
//   hasReplies: boolean;
//   userReaction: "like" | "teacher_heart" | null;
// }

import { CommentReactionResponse } from "@/services/swagger-types";

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    image?: string;
    isAuthor?: boolean;
    role: string;
  };
  likes: number;
  specialLikes: number;
  createdAt: string;
  hasReplies: boolean;
  userReaction: "like" | "teacher_heart" | null;
  reactions: CommentReactionResponse[];
  replies?: Comment[];
  replyTo?: string;
}
