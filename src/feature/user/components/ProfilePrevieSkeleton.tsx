import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePreviewSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full">
        {/* Header Section Skeleton */}
        <header className="mb-8 rounded-lg bg-card shadow-sm">
          <div className="flex flex-col items-center p-6">
            <div className="mb-4 flex flex-col items-center">
              {/* Avatar Skeleton */}
              <Skeleton className="mb-4 size-24 rounded-full md:size-28" />

              {/* Name and Bio Skeletons */}
              <Skeleton className="mb-2 h-8 w-48" />
              <Skeleton className="mb-2 h-4 w-72" />
              <Skeleton className="mb-4 h-4 w-24" />

              {/* Follow Button Skeleton */}
              <Skeleton className="h-10 w-32" />

              {/* Social Links Skeleton */}
              <div className="mt-4 flex space-x-4">
                <Skeleton className="size-6" />
                <Skeleton className="size-6" />
                <Skeleton className="size-6" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Skeleton */}
        <main className="rounded-lg bg-card p-6 shadow-sm">
          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="mb-6 w-full justify-center border-b bg-muted/50">
              <TabsTrigger value="lessons" disabled className="px-6 py-3">
                Lessons
              </TabsTrigger>
              <TabsTrigger value="about" disabled className="px-6 py-3">
                About
              </TabsTrigger>
              <TabsTrigger value="stats" disabled className="px-6 py-3">
                Stats
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lessons">
              {/* Search and Filter Skeletons */}
              <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                <Skeleton className="h-12 w-full md:w-1/2" />
                <Skeleton className="h-10 w-full md:w-40" />
              </div>

              {/* Featured Lessons Skeleton */}
              <div className="mb-12">
                <Skeleton className="mb-4 h-6 w-48" />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="h-48 w-full" />
                      <CardContent className="p-4">
                        <Skeleton className="mb-2 h-6 w-full" />
                        <div className="flex gap-2">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Lessons Skeleton */}
              <div>
                <Skeleton className="mb-4 h-6 w-32" />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="h-48 w-full" />
                      <CardContent className="p-4">
                        <Skeleton className="mb-2 h-6 w-full" />
                        <div className="flex gap-2">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-16" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
