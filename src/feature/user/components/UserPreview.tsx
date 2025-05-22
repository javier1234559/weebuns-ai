"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { replaceRouteName, RouteNames } from "@/constraints/route-name";
import Link from "next/link";

interface UserPreviewProps {
  user: {
    id: string;
    name: string;
    username: string;
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
}: UserPreviewProps) {

  return (
    <div
      className={`flex items-start gap-4 rounded-lg bg-transparent p-0 ${className}`}
      style={{ minHeight: 40 }}
    >
      <Avatar className="size-12">
        <AvatarImage
          src={user.avatar}
          alt={user.name}
          className="size-full object-cover"
        />
      </Avatar>
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2">
        <Link
          href={`/profile/${user.username}`}
          className="truncate text-sm font-medium text-foreground"
        >
          {user.name}
        </Link>
        {user.role !== "user" && user.bio && (
          <span className="truncate text-xs text-muted-foreground">
            {user.bio}
          </span>
        )}
      </div>
    </div>
  );
}
