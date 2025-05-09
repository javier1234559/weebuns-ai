"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface UserPreviewProps {
  user: {
    id: string;
    name: string;
    avatar: string;
    bio?: string;
    role?: string;
  };
  className?: string;
  showFollowButton?: boolean;
}

export default function UserPreview({
  user,
  className = "",
  showFollowButton = true,
}: UserPreviewProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  console.log(user);
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(`User ID: ${user.id}`);
  };

  return (
    <div
      className={`flex items-start gap-4 rounded-lg bg-transparent p-0 ${className}`}
      style={{ minHeight: 40 }}
    >
      <Avatar className="size-12">
        <AvatarImage
          src={"/images/auth/building.jpg"}
          alt={user.name}
          className="size-full object-cover"
        />
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
        <span className="truncate text-sm font-medium text-foreground">
          {user.name}
        </span>
        {user.role !== "user" && user.bio && (
          <span className="truncate text-xs text-muted-foreground">
            {user.bio}
          </span>
        )}
        {showFollowButton && (
          <Button
            size="sm"
            type="button"
            variant={isFollowing ? "outline" : "default"}
            className={`h-7 w-fit px-2 py-1 text-xs font-medium transition-colors duration-300 ${isFollowing ? "border-primary bg-transparent text-primary" : "bg-primary text-white hover:bg-primary/90"}`}
            onClick={handleFollow}
          >
            {isFollowing ? "FOLLOWING" : "FOLLOW"}
          </Button>
        )}
      </div>
    </div>
  );
}
