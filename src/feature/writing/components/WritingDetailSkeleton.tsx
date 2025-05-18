import { Skeleton } from "@/components/ui/skeleton";

export default function WritingDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* Card 1: Title, Description, UserPreview */}
      <div className="p-4">
        <Skeleton className="h-8 w-1/3 rounded" />
        <Skeleton className="mt-4 h-20 w-full rounded-lg border-2" />
        <div className="mt-4 flex items-center gap-3">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        </div>
      </div>

      {/* Card 2: Button group + switch */}
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-[140px] rounded" />
          ))}
          <div className="ml-auto flex items-center gap-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>
        </div>
      </div>

      {/* Tabs and editors */}
      <div className="flex flex-col gap-4 md:flex-row">
        {/* Left pane - Tabs */}
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-1/4 rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded" />
            ))}
          </div>
          <Skeleton className="h-[300px] w-full rounded-lg" />
        </div>

        {/* Right pane - Essay editor */}
        <div className="flex-1 space-y-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              className="min-h-[400px] w-full rounded-lg border-2"
            />
          ))}
          <div className="flex justify-end">
            <Skeleton className="h-10 w-[180px] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
