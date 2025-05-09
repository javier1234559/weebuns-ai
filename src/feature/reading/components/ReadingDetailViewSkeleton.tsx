import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { Skeleton } from "@/components/ui/skeleton";

export default function ReadingDetailViewSkeleton() {
  return (
    <>
      <Card className="flex flex-col gap-4">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-3/4" />
            <div className="mt-4 rounded-lg border-2 border-muted p-4">
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
      <div className="mt-4">
        <div className="h-[800px] rounded-lg bg-card p-2 shadow-lg">
          <div className="grid h-full grid-cols-2 gap-4">
            <div className="rounded-md bg-background p-4">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </div>
            <div className="rounded-md bg-background p-4">
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <div className="space-y-1">
                      {Array.from({ length: 4 }).map((_, j) => (
                        <Skeleton key={j} className="h-8 w-full" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
