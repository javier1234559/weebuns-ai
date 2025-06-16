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
    const actionLink = window.location.href;
    createComment(
      {
        identifierId,
        content,
        actionLink,
      },
      {
        onSuccess: () => {
          toast.success("Comment added successfully");
        },
        onError: (error) => {
          toast.error("Failed to add comment");
          console.log(error);
        },
      },
    );
  };

  const handleAddReply = (content: string, parentId: string) => {
    const actionLink = window.location.href;
    createComment(
      {
        identifierId,
        content,
        parentId,
        actionLink,
      },
      {
        onSuccess: () => {
          toast.success("Comment added successfully");
        },
        onError: (error) => {
          toast.error("Failed to add comment");
          console.log(error);
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
          console.log(error);
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
        console.log(error);
      },
    });
  };

  if (isLoading) {
    return <CommentSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Lỗi khi tải bình luận. Vui lòng thử lại sau.
      </div>
    );
  }

  if (!user?.id) {
    return (
      <div className="text-center text-muted-foreground">
        Hãy đăng nhập để bình luận
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
        role: comment.user.role,
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
    <div className="mt-10">
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
          role: user?.role || "",
        }}
      />
    </div>
  );
}
