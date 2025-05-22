import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from "next/image";

interface Lesson {
  id: number;
  title: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
}

interface LessonCardProps {
  lesson: Lesson;
  featured?: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  featured = false,
}) => {
  return (
    <Card
      className={`overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ${
        featured ? "border-2 border-warning" : ""
      }`}
    >
      <div className="relative">
        <Image
          src={lesson.thumbnail}
          alt={lesson.title}
          width={100}
          height={100}
          className="h-48 w-full object-cover"
        />
        {featured && (
          <div className="absolute right-2 top-2 flex items-center rounded-full bg-warning px-2 py-1 text-xs font-semibold text-warning-foreground">
            <Star className="mr-1 size-3" /> Featured
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
          {lesson.title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {lesson.tags.map((tag: string, index: number) => (
            <Badge
              key={index}
              variant="outline"
              className="bg-muted text-muted-foreground hover:bg-muted/80"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
