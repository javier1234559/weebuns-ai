import { Skeleton } from "@/components/ui/skeleton";
import { WritingCard } from "./WritingCard";
import { LessonsResponse } from "@/services/swagger-types";
import AppError from "@/components/common/app-error";

interface WritingGridViewProps {
  lessons?: LessonsResponse;
  isLoading: boolean;
  error: any;
}

export function WritingGridView({
  lessons,
  isLoading = false,
  error,
}: WritingGridViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] rounded-lg" />
        ))}
      </div>
    );
  }

  if (error || !lessons) {
    return <AppError error={error || "Failed to fetch lessons"} />;
  }

  if (lessons.data.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-medium">No reading tasks found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      </div>
    );
  }

  if (lessons?.data.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-medium">No writing tasks found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {lessons.data.map((lesson) => (
        <WritingCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
