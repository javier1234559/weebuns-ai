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
          <div className="p-6">
            <Skeleton className="h-[500px] w-full" />
          </div>
        </header>

        {/* Main Content Skeleton */}
      </div>
    </div>
  );
}
