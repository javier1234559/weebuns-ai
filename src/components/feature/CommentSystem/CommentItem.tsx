"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageSquare,
  ThumbsUp,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Comment } from "./type";
import usePaginationUrl from "@/hooks/usePaginationUrl";
import { useCommentReplies } from "@/feature/comment/hooks/useComment";
import { formatDistanceToNow } from "date-fns";
import { CommentResponse } from "@/services/swagger-types";

export interface CommentItemProps {
  comment: Comment;
  onReaction: (commentId: string, type: "like" | "teacher_heart") => void;
  onDelete: (commentId: string) => void;
  onToggleReplies: (content: string, parentId: string) => void;
  level?: number;
  currentUser?: {
    id: string;
    name: string;
    image?: string;
  };
}

const formatComment = (comment: CommentResponse): Comment => ({
  id: comment.id,
  content: comment.content,
  author: {
    name: comment.user.username,
    image: comment.user.profilePicture,
  },
  likes: comment.likesCount,
  specialLikes: comment.lovesCount,
  createdAt: formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  }),
  hasReplies: comment.hasReplies,
  userReaction: comment.userReaction || null,
  reactions: comment.reactions,
});

const hasUserReacted = (
  reactions: any[],
  userId: string,
  type: "like" | "teacher_heart",
) => {
  return reactions?.some(
    (reaction) => reaction.userId === userId && reaction.type === type,
  );
};

export default function CommentItem({
  comment,
  onReaction,
  onDelete,
  onToggleReplies,
  level = 1,
  currentUser,
}: CommentItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const { page, perPage } = usePaginationUrl();
  const {
    data: replies,
    isLoading: isLoadingReplies,
    error: repliesError,
  } = useCommentReplies(
    {
      commentId: comment.id,
      page,
      perPage,
    },
    {
      enabled: isExpanded,
    },
  );

  const formattedReplies =
    replies?.data.map((reply) =>
      formatComment(reply as unknown as CommentResponse),
    ) || [];

  const handleAddReply = () => {
    if (!replyContent.trim()) return;
    onToggleReplies(replyContent, comment.id);
    setReplyContent("");
    setIsReplying(false);
  };

  const handleToggleReplies = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={comment.author.image} />
          <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-medium">{comment.author.name}</span>
              <span className="text-sm text-muted-foreground">
                {comment.createdAt}
              </span>
            </div>
            {comment.author.isAuthor && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(comment.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${
                hasUserReacted(comment.reactions, currentUser?.id || "", "like")
                  ? "text-primary"
                  : ""
              }`}
              onClick={() => onReaction(comment.id, "like")}
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{comment.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${
                hasUserReacted(
                  comment.reactions,
                  currentUser?.id || "",
                  "teacher_heart",
                )
                  ? "text-primary"
                  : ""
              }`}
              onClick={() => onReaction(comment.id, "teacher_heart")}
            >
              <Heart className="h-4 w-4" />
              <span>{comment.specialLikes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => setIsReplying(true)}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Reply</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className="flex gap-4 ml-12">
          <Avatar className="w-10 h-10">
            <AvatarImage src={currentUser?.image} />
            <AvatarFallback>{currentUser?.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder="Write a reply..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              className="min-h-[80px] resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsReplying(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddReply}>Reply</Button>
            </div>
          </div>
        </div>
      )}

      {/* Replies Section */}
      {comment.hasReplies && (
        <div className="space-y-4 ml-12">
          {isExpanded ? (
            <>
              {isLoadingReplies ? (
                <div className="text-center">Loading replies...</div>
              ) : repliesError ? (
                <div className="text-red-500">Failed to load replies</div>
              ) : (
                formattedReplies.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    onReaction={onReaction}
                    onDelete={onDelete}
                    onToggleReplies={onToggleReplies}
                    level={level + 1}
                    currentUser={currentUser}
                  />
                ))
              )}
            </>
          ) : null}

          <Button variant="link" className="mt-2" onClick={handleToggleReplies}>
            <ChevronDown className="h-4 w-4 mr-1" />
            {isExpanded ? "Hide replies" : "Show replies"}
          </Button>
        </div>
      )}
    </div>
  );
}
