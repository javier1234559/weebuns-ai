import { Skeleton } from "@/components/ui/skeleton";

export function SpeakingDetailSkeleton() {
  return (
    <div className="flex h-screen flex-col rounded-lg bg-card">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between border-b p-4">
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-9 w-24" />
      </div>

      {/* Title and Description Skeleton */}
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Chat Messages Skeleton */}
      <div className="flex-1 overflow-y-auto py-4">
        <div className="space-y-4 px-4">
          {/* AI Message Skeleton */}
          <div className="flex gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="size-4 w-3/4" />
              <Skeleton className="size-4 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="size-6 rounded-full" />
              </div>
            </div>
          </div>

          {/* User Message Skeleton */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1 space-y-2 text-right">
              <Skeleton className="ml-auto size-4 w-3/4" />
              <Skeleton className="ml-auto size-4 w-1/2" />
              <div className="flex gap-2 justify-end">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="size-6 rounded-full" />
              </div>
            </div>
            <Skeleton className="size-10 rounded-full" />
          </div>
        </div>
      </div>

      {/* Input Area Skeleton */}
      <div className="mx-2 border-t bg-card p-4">
        <div className="flex flex-col items-center justify-center gap-2 py-2">
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="size-16 w-full" />
        </div>
        <div className="relative rounded-lg border bg-background p-1">
          <Skeleton className="size-12 rounded-lg" />
          <div className="flex items-center p-3 pt-0">
            <Skeleton className="ml-auto size-9 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
