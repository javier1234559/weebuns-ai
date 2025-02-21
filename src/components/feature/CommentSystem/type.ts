export interface Comment {
  id: string;
  content: string;
  author: {
    name: string;
    image?: string;
    isAuthor?: boolean;
  };
  likes: number;
  specialLikes: number;
  replies?: Comment[];
  createdAt: string;
  replyTo?: string;
}
