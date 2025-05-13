import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ListeningDetailViewSkeleton() {
  return (
    <>
      <Card className="flex flex-col gap-4">
        <CardHeader>
          <CardTitle>
            <Skeleton className="h-8 w-3/4 text-2xl" />
            <div className="mt-4 rounded-lg border-2 border-muted p-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-11/12" />
                <Skeleton className="h-5 w-4/5" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Skeleton className="size-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="mt-4">
        {/* Control Bar Card */}
        <Card className="mb-4 w-full">
          <CardContent className="flex w-full items-center justify-end gap-4 p-4">
            <Skeleton className="h-9 w-32" /> {/* Show answers button */}
            <Skeleton className="h-9 w-20" /> {/* Timer */}
            <Skeleton className="h-9 w-32" /> {/* Question sheet button */}
            <Skeleton className="h-9 w-32" /> {/* Submit button */}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="rounded-lg bg-card p-6 shadow-lg">
          {/* Audio Player */}
          <div className="mb-8 flex items-center justify-center">
            <div className="w-full max-w-3xl space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="size-12 rounded-full" />{" "}
                {/* Play button */}
                <div className="mx-4 flex-1">
                  <Skeleton className="h-16 w-full rounded-lg" />{" "}
                  {/* Waveform */}
                </div>
                <Skeleton className="h-4 w-20" /> {/* Time */}
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="thin-scrollbar max-h-[900px] overflow-y-auto rounded-md bg-background p-6">
            <div className="space-y-12">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="size-6 rounded-full" />
                      </div>
                      <Skeleton className="h-20 w-full" />
                    </div>
                  </div>

                  <div className="ml-8 space-y-4">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <div key={j} className="flex items-center gap-4">
                        <Skeleton className="size-5 rounded-full" />
                        <Skeleton className="h-12 w-full max-w-2xl rounded-lg" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
