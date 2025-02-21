"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ChevronDown, Heart, MessageCircle, ThumbsUp } from "lucide-react";
import { memo, useState } from "react";
import { Comment } from "./type";

interface CommentItemProps {
  comment: Comment;
  onReply: (id: string | null) => void;
  activeReplyId: string | null;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  currentUser: { name: string; image?: string };
  onAddReply?: (parentId: string, reply: Comment) => void;
  level?: number;
}

function CommentItem({
  comment,
  onReply,
  activeReplyId,
  setComments,
  isExpanded,
  onToggleExpand,
  currentUser,
  onAddReply,
  level = 1,
}: CommentItemProps) {
  const [liked, setLiked] = useState(false);
  const [specialLiked, setSpecialLiked] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const INITIAL_REPLIES_DISPLAY = 2;

  const handleAddReply = () => {
    if (!replyContent.trim()) return;

    const newReply: Comment = {
      id: Math.random().toString(),
      content: replyContent,
      author: currentUser,
      likes: 0,
      specialLikes: 0,
      createdAt: new Date().toISOString(),
      replyTo: level > 1 ? comment.author.name : undefined,
    };

    setComments((prevComments) => {
      const updateReplies = (comments: Comment[]): Comment[] => {
        return comments.map((c) => {
          if (c.id === comment.id) {
            return {
              ...c,
              replies: [...(c.replies || []), newReply],
            };
          }
          if (c.replies) {
            return {
              ...c,
              replies: updateReplies(c.replies),
            };
          }
          return c;
        });
      };
      return updateReplies(prevComments);
    });

    onAddReply?.(comment.id, newReply);
    setReplyContent("");
    onReply(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className={cn("flex gap-4", level === 2 && "-ml-1")}>
      <Avatar className="w-10 h-10">
        <AvatarImage src={comment.author.image} />
        <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <span className="font-medium">{comment.author.name}</span>
          {comment.author.isAuthor && (
            <span className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded-full">
              Author
            </span>
          )}
          <span className="text-sm text-muted-foreground">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        <p className="text-sm">
          {comment.replyTo && (
            <span className="text-primary font-medium">
              @{comment.replyTo}{" "}
            </span>
          )}
          {comment.content}
        </p>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1", liked && "text-primary")}
            onClick={() => setLiked(!liked)}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{comment.likes + (liked ? 1 : 0)}</span>
          </Button>

          {/* {comment.author.isAuthor && ( */}
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1", specialLiked && "text-yellow-500")}
            onClick={() => setSpecialLiked(!specialLiked)}
          >
            <Heart
              className={cn("gap-1", specialLiked && "text-yellow-500")}
              fill={specialLiked ? "currentColor" : "none"}
            />
            <span>{comment.specialLikes + (specialLiked ? 1 : 0)}</span>
          </Button>
          {/* )} */}

          {level < 2 && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-1"
              onClick={() =>
                onReply(activeReplyId === comment.id ? null : comment.id)
              }
            >
              <MessageCircle className="h-4 w-4" />
              Reply
            </Button>
          )}
        </div>

        {activeReplyId === comment.id && (
          <div className="flex gap-4 mt-4">
            <Avatar className="w-8 h-8">
              <AvatarImage src={currentUser.image} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => onReply(null)}>
                  Cancel
                </Button>
                <Button onClick={handleAddReply}>Reply</Button>
              </div>
            </div>
          </div>
        )}

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="space-y-4 mt-4">
            {comment.replies
              .slice(0, isExpanded ? undefined : INITIAL_REPLIES_DISPLAY)
              .map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  activeReplyId={activeReplyId}
                  setComments={setComments}
                  level={level + 1}
                  isExpanded={isExpanded}
                  onToggleExpand={onToggleExpand}
                  currentUser={currentUser}
                  onAddReply={onAddReply}
                />
              ))}

            {comment.replies.length > INITIAL_REPLIES_DISPLAY &&
              !isExpanded && (
                <Button
                  variant="link"
                  className="mt-2"
                  onClick={() => onToggleExpand(comment.id)}
                >
                  <ChevronDown className="h-4 w-4 mr-1" />
                  Show {comment.replies.length - INITIAL_REPLIES_DISPLAY} more
                  replies
                </Button>
              )}
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(CommentItem);
