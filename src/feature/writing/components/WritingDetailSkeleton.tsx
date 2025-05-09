import { Skeleton } from "@/components/ui/skeleton";

export default function WritingDetailSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 p-4">
        <Skeleton className="h-8 w-1/3 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <div className="mt-2 flex items-center gap-3">
          <Skeleton className="size-12 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
