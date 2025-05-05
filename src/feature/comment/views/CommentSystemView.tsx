"use client";
import { CommentSystem } from "@/components/feature/CommentSystem";
import {
  useComments,
  useCreateComment,
  useAddReaction,
  useDeleteComment,
} from "@/feature/comment/hooks/useComment";
import { CommentSkeleton } from "../components/CommentSkeleton";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import usePaginationUrl from "@/hooks/usePaginationUrl";
import { useAuthStore } from "@/store/auth-store";
import { CommentResponse } from "@/services/swagger-types";

interface CommentSystemViewProps {
  identifierId: string;
}

export default function CommentSystemView({
  identifierId,
}: CommentSystemViewProps) {
  const { page, perPage } = usePaginationUrl();
  const { user } = useAuthStore();

  const {
    data: commentsData,
    isLoading,
    error,
  } = useComments({
    identifierId,
    page,
    perPage,
  });

  const { mutate: createComment } = useCreateComment();
  const { mutate: addReaction } = useAddReaction();
  const { mutate: deleteComment } = useDeleteComment();

  const handleAddComment = (content: string) => {
    createComment(
      {
        identifierId,
        content,
      },
      {
        onSuccess: () => {
          toast.success("Comment added successfully");
        },
        onError: (error) => {
          toast.error("Failed to add comment");
        },
      },
    );
  };

  const handleAddReply = (content: string, parentId: string) => {
    createComment(
      {
        identifierId,
        content,
        parentId,
      },
      {
        onSuccess: () => {
          toast.success("Comment added successfully");
        },
        onError: (error) => {
          toast.error("Failed to add comment");
        },
      },
    );
  };

  const handleAddReaction = (
    commentId: string,
    type: "like" | "teacher_heart",
  ) => {
    addReaction(
      {
        id: commentId,
        data: { type },
      },
      {
        onError: (error) => {
          toast.error("Failed to add reaction");
        },
      },
    );
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId, {
      onSuccess: () => {
        toast.success("Comment deleted successfully");
      },
      onError: (error) => {
        toast.error("Failed to delete comment");
      },
    });
  };

  if (isLoading) {
    return <CommentSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Failed to load comments. Please try again later.
      </div>
    );
  }

  if (!user?.id) {
    return (
      <div className="text-center text-muted-foreground">
        Please login to comment
      </div>
    );
  }

  const formattedComments =
    commentsData?.data.map((comment: CommentResponse) => ({
      id: comment.id,
      content: comment.content,
      author: {
        id: comment.user.id,
        name: comment.user.username,
        image: comment.user.profilePicture,
      },
      likes: comment.likesCount,
      specialLikes: comment.lovesCount,
      createdAt: formatDistanceToNow(new Date(comment.createdAt), {
        addSuffix: true,
      }),
      hasReplies: comment.hasReplies,
      userReaction: comment.userReaction,
      reactions: comment.reactions,
    })) || [];

  return (
    <div>
      <CommentSystem
        comments={formattedComments}
        onAddComment={handleAddComment}
        onAddReaction={handleAddReaction}
        onDeleteComment={handleDeleteComment}
        onAddReply={handleAddReply}
        currentUser={{
          id: user?.id || "",
          name: user?.username || "",
          image: user?.profilePicture || "",
        }}
      />
    </div>
  );
}
