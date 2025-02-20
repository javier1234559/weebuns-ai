import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Lesson } from "@/feature/lesson/types/lesson";

interface LessonCardProps {
  lesson: Lesson;
}

export function LessonCard({ lesson }: LessonCardProps) {
  const {
    id,
    title,
    image_url,
    description,
    skill_type,
    level,
    topic,
    time_limit,
    status,
    lesson_type,
  } = lesson;

  return (
    <Link href={`/lessons/${id}`}>
      <Card className="group flex h-full flex-col overflow-hidden p-4 transition-all duration-200 bg-background hover:bg-[var(--card-hover)] border hover:border-muted-foreground/50">
        {/* Top Content */}
        <div className="flex-1 space-y-4">
          {/* Thumbnail */}
          <div className="flex items-start gap-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
              <Image
                src={image_url || "/placeholder-lesson.jpg"}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Title and Description */}
          <div>
            <h3 className="mb-2 line-clamp-2 text-base font-semibold text-foreground">
              {title}
            </h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{skill_type}</Badge>
            <Badge variant="outline">{level}</Badge>
            <Badge variant="secondary">{topic}</Badge>
            <Badge variant="success">{lesson_type}</Badge>
            <Badge variant="warning">{status}</Badge>
          </div>
        </div>

        {/* Footer - Always at bottom */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="size-4" />
            <span>{time_limit} hours</span>
          </div>
          <span className="capitalize">{level}</span>
        </div>
      </Card>
    </Link>
  );
}
