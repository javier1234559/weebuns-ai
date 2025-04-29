// components/comments/CommentSystem.tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommentItem from "./CommentItem";
import { CommentForm } from "./CommentForm";
import { CommentSystemProps } from "./types";

export function CommentSystem({
  comments = [],
  onAddComment,
  onAddReaction,
  onDeleteComment,
  onAddReply,
  currentUser = {
    name: "Current User",
    image: "/avatars/user.png",
  },
}: CommentSystemProps) {
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set(),
  );

  const INITIAL_DISPLAY_COUNT = 3;

  const toggleExpand = (commentId: string) => {
    setExpandedComments((prev) => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
      }
      return next;
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <CommentForm currentUser={currentUser} onSubmit={onAddComment} />

      <div className="space-y-6">
        {comments
          .slice(
            0,
            expandedComments.has("root") ? undefined : INITIAL_DISPLAY_COUNT,
          )
          .map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReaction={onAddReaction}
              onDelete={onDeleteComment}
              onToggleReplies={onAddReply}
              currentUser={currentUser}
            />
          ))}

        {comments.length > INITIAL_DISPLAY_COUNT &&
          !expandedComments.has("root") && (
            <Button
              variant="link"
              className="mt-2"
              onClick={() => toggleExpand("root")}
            >
              <ChevronDown className="h-4 w-4 mr-1" />
              Show more comments ({comments.length - INITIAL_DISPLAY_COUNT})
            </Button>
          )}
      </div>
    </div>
  );
}
