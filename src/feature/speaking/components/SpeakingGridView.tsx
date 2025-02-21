import { Lesson } from "@/feature/lesson/types/lesson";
import { Skeleton } from "@/components/ui/skeleton";
import { SpeakingCard } from "./SpeakingCard";

interface SpeakingGridViewProps {
  lessons?: Lesson[];
  isLoading?: boolean;
}

export function SpeakingGridView({
  lessons = [],
  isLoading = false,
}: SpeakingGridViewProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[400px] rounded-lg" />
        ))}
      </div>
    );
  }

  if (lessons.length === 0) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed">
        <div className="text-center">
          <h3 className="mb-2 text-lg font-medium">No speaking tasks found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your filters or search terms
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {lessons.map((lesson) => (
        <SpeakingCard key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
