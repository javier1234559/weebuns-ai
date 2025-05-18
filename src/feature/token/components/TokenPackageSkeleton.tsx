import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export default function TokenPackageSkeleton() {
  return (
    <div className="mx-auto w-full space-y-8 bg-card p-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-72" />
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className={cn(
              "relative flex min-w-[280px] max-w-[320px] grow flex-col justify-between rounded-xl p-6",
              "border-2 border-transparent",
              "bg-card",
            )}
            style={{ minHeight: 200 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <Skeleton className="size-5 rounded-full" />
              <Skeleton className="h-6 w-32" />
            </div>

            <div className="mb-2 flex items-end justify-between">
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>

            <div className="mb-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="mt-1 h-4 w-24" />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 flex justify-start">
        <Skeleton className="h-10 w-[180px]" />
      </div>
    </div>
  );
}
