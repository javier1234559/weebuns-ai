// components/comments/CommentSystem.tsx
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Comment } from "./type";
import { ChevronDown } from "lucide-react";
import CommentItem from "./CommentItem";
interface CommentSystemProps {
  initialComments?: Comment[];
  onAddComment?: (comment: Comment) => void;
  onAddReply?: (parentId: string, reply: Comment) => void;
  currentUser?: {
    name: string;
    image?: string;
  };
}

function CommentSystem({
  initialComments = [],
  onAddComment,
  onAddReply,
  currentUser = {
    name: "Current User",
    image: "/avatars/user.png",
  },
}: CommentSystemProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      content: "This is a great post! Really enjoyed reading it.",
      author: {
        name: "John Doe",
        image: "/avatars/john.png",
        isAuthor: false,
      },
      likes: 5,
      specialLikes: 2,
      createdAt: "2024-03-20T10:00:00Z",
      replies: [
        {
          id: "1-1",
          content: "Thank you for your kind words!",
          author: {
            name: "Post Author",
            image: "/avatars/author.png",
            isAuthor: true,
          },
          likes: 3,
          specialLikes: 1,
          createdAt: "2024-03-20T10:30:00Z",
          replyTo: "1",
        },
      ],
    },
    {
      id: "2",
      content: "Interesting perspective on this topic.",
      author: {
        name: "Jane Smith",
        image: "/avatars/jane.png",
        isAuthor: false,
      },
      likes: 3,
      specialLikes: 0,
      createdAt: "2024-03-20T09:00:00Z",
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set(),
  );

  const INITIAL_DISPLAY_COUNT = 3;

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Math.random().toString(),
      content: newComment,
      author: currentUser,
      likes: 0,
      specialLikes: 0,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setComments([comment, ...comments]);
    setNewComment("");
    onAddComment?.(comment);
  };

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
      {/* Add Comment Section */}
      <div className="flex gap-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src={currentUser.image} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-2">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px] resize-none"
          />
          <div className="flex justify-end">
            <Button onClick={handleAddComment}>Comment</Button>
          </div>
        </div>
      </div>

      {/* Comments List */}
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
              onReply={setActiveReplyId}
              activeReplyId={activeReplyId}
              setComments={setComments}
              isExpanded={expandedComments.has(comment.id)}
              onToggleExpand={toggleExpand}
              currentUser={currentUser}
              onAddReply={onAddReply}
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

export default CommentSystem;
