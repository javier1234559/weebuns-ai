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

import { useState } from "react";

export interface CommentItemProps {
  comment: Comment;
  onReaction: (commentId: string, type: "like" | "teacher_heart") => void;
  onDelete: (commentId: string) => void;
  onToggleReplies: (content: string, parentId: string) => void;
  level?: number;
  currentUser?: {
    name: string;
    image?: string;
  };
}

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
  const INITIAL_REPLIES_DISPLAY = 2;

  const handleAddReply = () => {
    if (!replyContent.trim()) return;
    onToggleReplies(comment.id, replyContent);
    setReplyContent("");
    setIsReplying(false);
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(comment.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm">{comment.content}</p>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${
                comment.userReaction === "like" ? "text-primary" : ""
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
                comment.userReaction === "teacher_heart" ? "text-primary" : ""
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
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4 ml-12">
          {comment.replies
            .slice(0, isExpanded ? undefined : INITIAL_REPLIES_DISPLAY)
            .map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                onReaction={onReaction}
                onDelete={onDelete}
                onToggleReplies={onToggleReplies}
                level={level + 1}
                currentUser={currentUser}
              />
            ))}

          {comment.replies.length > INITIAL_REPLIES_DISPLAY && !isExpanded && (
            <Button
              variant="link"
              className="mt-2"
              onClick={() => setIsExpanded(true)}
            >
              <ChevronDown className="h-4 w-4 mr-1" />
              Show {comment.replies.length - INITIAL_REPLIES_DISPLAY} more
              replies
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
