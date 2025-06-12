import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LessonSubmission, SubmissionStatus } from "@/services/swagger-types";

interface LessonCardListProps {
  data: LessonSubmission[];
}

export function LessonCardList({ data }: LessonCardListProps) {
  // Map skill to a theme-compatible color class
  const getSkillColor = (skill: string) => {
    switch (skill.toLowerCase()) {
      case "writing":
        return "bg-primary/10 text-primary";
      case "speaking":
        return "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400";
      case "reading":
        return "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20 dark:text-purple-400";
      case "listening":
        return "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Map status to theme-compatible color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500/10 text-green-500 dark:bg-green-500/20 dark:text-green-400";
      case "draft":
        return "bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-400";
      case "deleted":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  // Format level text
  const formatLevel = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "Beginner";
      case "intermediate":
        return "Intermediate";
      case "advanced":
        return "Advanced";
      default:
        return level;
    }
  };

  // Generate URL based on skill
  const getLessonUrl = (item: LessonSubmission, status: SubmissionStatus) => {
    let buildUrl = "";

    const skill = item.lesson?.skill?.toLowerCase() || "";
    if (skill === "speaking" && status === SubmissionStatus.Draft) {
      buildUrl = `/lesson/speaking/${item.lessonId}?sessionId=${item.id}`;
    } else {
      buildUrl = `/lesson/${skill}/${item.lessonId}/result?submissionId=${item.id}`;
    }

    return buildUrl;
  };

  return (
    <div className="overflow-hidden rounded-md border">
      <div className="divide-y">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 p-3 transition-colors hover:bg-muted/50 sm:flex-row sm:items-center"
          >
            <div className="shrink-0 sm:w-24">
              <div className="relative h-16 w-full overflow-hidden rounded-md">
                <Image
                  src={item.lesson?.thumbnailUrl || "/placeholder-lesson.jpg"}
                  alt={item.lesson?.title || ""}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-1.5">
                <Badge
                  className={cn(
                    "text-xs capitalize",
                    getSkillColor(item.lesson?.skill || ""),
                  )}
                >
                  {item.lesson?.skill}
                </Badge>
                <Badge variant="outline" className="text-xs capitalize">
                  {item.lesson?.topic}
                </Badge>
                <Badge
                  className={cn(
                    "text-xs capitalize",
                    getStatusColor(item.status),
                  )}
                >
                  {item.status}
                </Badge>
              </div>

              <h3 className="truncate text-sm font-medium">
                {item.lesson?.title}
              </h3>

              <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <BookOpen className="size-3" />
                  <span className="capitalize">
                    {formatLevel(item.lesson?.level || "")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="size-3" />
                  <span>{item.lesson?.timeLimit} min</span>
                </div>
              </div>
            </div>

            <div className="self-end sm:self-center">
              <Button
                size="icon"
                variant="ghost"
                className="size-8"
                onClick={() =>
                  window.open(getLessonUrl(item, item.status), "_blank")
                }
                title="Open in new tab"
              >
                <ExternalLink className="size-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
