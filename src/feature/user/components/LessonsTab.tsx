import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Star } from "lucide-react";
import { LessonCard } from "./LessonCard";

interface Lesson {
  id: number;
  title: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
}

interface LessonsTabProps {
  lessons: Lesson[];
  featuredLessons: Lesson[];
  filter: string;
  onFilterChange: (value: string) => void;
}

export const LessonsTab: React.FC<LessonsTabProps> = ({
  lessons,
  featuredLessons,
  filter,
  onFilterChange,
}) => {
  const filteredLessons = (): Lesson[] => {
    if (filter === "all") return lessons;
    if (filter === "popular")
      return [...lessons].sort((a, b) => b.id - a.id);
    return lessons.filter((lesson) =>
      lesson.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase()),
    );
  };

  return (
    <div className="mt-4 duration-500 animate-in fade-in-50">
      {/* Search and Filter */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="relative w-full md:w-1/2">
          <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
          <Input
            placeholder="Search lessons"
            className="rounded-full bg-muted/50 py-6 pl-10"
          />
        </div>
        <Select value={filter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full bg-muted/50 md:w-40">
            <SelectValue placeholder="Filter by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Lessons</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
            <SelectItem value="writing">Writing</SelectItem>
            <SelectItem value="speaking">Speaking</SelectItem>
            <SelectItem value="reading">Reading</SelectItem>
            <SelectItem value="listening">Listening</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured Lessons Section */}
      <div className="mb-12">
        <h2 className="mb-4 flex items-center text-xl font-semibold text-foreground">
          <Star className="mr-2 size-5 text-warning" /> Featured Lessons
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              featured={true}
            />
          ))}
        </div>
      </div>

      {/* All Lessons Grid */}
      <div>
        <h2 className="mb-4 text-xl font-semibold text-foreground">
          All Lessons
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {filteredLessons()
            .filter((lesson) => !lesson.featured)
            .map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
        </div>
      </div>
    </div>
  );
};
