import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function CommentSkeleton() {
  return (
    <div className="mx-auto mt-10 w-full max-w-3xl space-y-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex gap-4">
          <Avatar className="size-10">
            <AvatarFallback>
              <Skeleton className="size-10 rounded-full" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-20 w-full" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
