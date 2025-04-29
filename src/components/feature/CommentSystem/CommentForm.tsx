"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

interface CommentFormProps {
  currentUser: {
    name: string;
    image?: string;
  };
  onSubmit: (content: string) => void;
}

export function CommentForm({ currentUser, onSubmit }: CommentFormProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    onSubmit(newComment);
    setNewComment("");
  };

  return (
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
          <Button onClick={handleSubmit}>Comment</Button>
        </div>
      </div>
    </div>
  );
}
