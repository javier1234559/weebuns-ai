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
  createdAt: string;
  hasReplies: boolean;
  userReaction: "like" | "teacher_heart" | null;
  replies?: Comment[];
  replyTo?: string;
}

export interface CommentFormProps {
  currentUser: {
    name: string;
    image?: string;
  };
  onSubmit: (content: string) => void;
}

export interface CommentSystemProps {
  comments: Comment[];
  onAddComment: (content: string) => void;
  onAddReaction: (commentId: string, type: "like" | "teacher_heart") => void;
  onDeleteComment: (commentId: string) => void;
  onAddReply: (content: string, parentId: string) => void;
  currentUser?: {
    name: string;
    image?: string;
  };
}
