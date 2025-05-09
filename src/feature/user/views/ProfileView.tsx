"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Youtube,
  Linkedin,
  Twitter,
  Star,
  Users,
  BookOpen,
  Eye,
} from "lucide-react";

// Type definitions
interface Lesson {
  id: number;
  title: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
}

interface TeacherStats {
  label: string;
  value: string;
  icon: React.ReactNode;
}

interface SocialLink {
  name: string;
  icon: React.ReactNode;
}

interface TeacherData {
  name: string;
  avatar: string;
  bio: string;
  followers: string;
  longBio: string;
  certifications: string[];
  stats: TeacherStats[];
  socialLinks: SocialLink[];
}

// Mock data
const teacherData: TeacherData = {
  name: "Ms. Anna",
  avatar: "/images/auth/building.jpg",
  bio: "IELTS coach with 10 years of experience helping students achieve band 7.0+",
  followers: "5.2K",
  longBio:
    "As a dedicated IELTS instructor with over a decade of experience, I've helped more than 1,000 students achieve their target scores. My teaching methodology focuses on practical techniques that work in exam conditions, rather than theoretical knowledge alone. I hold a Master's degree in Applied Linguistics from Oxford University and have been certified by Cambridge English as an official IELTS examiner. My students consistently achieve band scores of 7.0 or higher, with many gaining entry to prestigious universities worldwide. I believe in personalized coaching that addresses each student's unique challenges and learning style.",
  certifications: [
    "Cambridge CELTA Certified",
    "TESOL Certified",
    "Official IELTS Examiner",
    "Master's in Applied Linguistics",
    "British Council Accredited Teacher",
  ],
  stats: [
    { label: "Lessons", value: "108", icon: <BookOpen className="size-5" /> },
    { label: "Students", value: "5.4K", icon: <Users className="size-5" /> },
    { label: "Views", value: "52K", icon: <Eye className="size-5" /> },
  ],
  socialLinks: [
    { name: "YouTube", icon: <Youtube className="size-6" /> },
    { name: "LinkedIn", icon: <Linkedin className="size-6" /> },
    { name: "Twitter", icon: <Twitter className="size-6" /> },
  ],
};

const featuredLessons: Lesson[] = [
  {
    id: 1,
    title: "IELTS Writing Task 2 Masterclass",
    thumbnail: "/images/lessons/thumbnail.png",
    tags: ["Writing", "IELTS", "Task 2"],
    featured: true,
  },
  {
    id: 2,
    title: "Speaking Confidence Builder",
    thumbnail: "/images/lessons/thumbnail.png",
    tags: ["Speaking", "Confidence", "IELTS"],
    featured: true,
  },
  {
    id: 3,
    title: "Reading Strategies for Band 8+",
    thumbnail: "/images/lessons/thumbnail.png",
    tags: ["Reading", "IELTS", "Advanced"],
    featured: true,
  },
];

const allLessons: Lesson[] = [
  ...featuredLessons,
  {
    id: 4,
    title: "Grammar Essentials for IELTS",
    thumbnail: "/images/lessons/thumbnail.png",
    tags: ["Grammar", "Basics", "IELTS"],
  },
  {
    id: 5,
    title: "Vocabulary Expansion Techniques",
    thumbnail: "/images/lessons/thumbnail.png",
    tags: ["Vocabulary", "IELTS"],
  },
  {
    id: 6,
    title: "Listening Practice: Section 3 & 4",
    thumbnail: "/images/lessons/thumbnail.png",
    tags: ["Listening", "IELTS", "Advanced"],
  },
  {
    id: 7,
    title: "Writing Task 1: Data Analysis",
    thumbnail: "/images/lessons/thumbnail.png",
    tags: ["Writing", "Task 1", "IELTS"],
  },
  {
    id: 8,
    title: "Common IELTS Speaking Mistakes",
    thumbnail: "/images/lessons/thumbnail.png",
    tags: ["Speaking", "Mistakes", "IELTS"],
  },
  {
    id: 9,
    title: "Reading: Skimming & Scanning",
    thumbnail: "/images/lessons/thumbnail.png",
    tags: ["Reading", "Techniques", "IELTS"],
  },
];

interface LessonCardProps {
  lesson: Lesson;
  featured?: boolean;
}

// Lesson Card Component
const LessonCard: React.FC<LessonCardProps> = ({
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
        <img
          src={lesson.thumbnail}
          alt={lesson.title}
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

export default function ProfileView() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [filter, setFilter] = useState("all");

  // Filter lessons based on selection
  const filteredLessons = (): Lesson[] => {
    if (filter === "all") return allLessons;
    if (filter === "popular")
      return [...allLessons].sort((a, b) => b.id - a.id);
    return allLessons.filter((lesson) =>
      lesson.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase()),
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <header className="mb-8 rounded-lg bg-card shadow-sm">
          <div className="flex flex-col items-center p-6">
            {/* Avatar and Basic Info */}
            <div className="mb-4 flex flex-col items-center">
              <Avatar className="mb-4 size-24 border-2 border-primary md:size-28">
                <img
                  src={teacherData.avatar}
                  alt={teacherData.name}
                  className="size-full object-cover"
                />
              </Avatar>

              <h1 className="mb-1 text-2xl font-bold text-foreground md:text-3xl">
                {teacherData.name}
              </h1>
              <p className="mb-2 max-w-md text-center text-muted-foreground">
                {teacherData.bio}
              </p>
              <p className="mb-4 text-sm text-muted-foreground">
                {teacherData.followers} followers
              </p>

              <Button
                className={`px-8 py-2 transition-all duration-300 ${
                  isFollowing
                    ? "bg-muted text-muted-foreground hover:bg-muted/80"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                onClick={() => setIsFollowing(!isFollowing)}
              >
                {isFollowing ? "Following" : "Follow"}
              </Button>

              {/* Social Links */}
              <div className="mt-4 flex space-x-4">
                {teacherData.socialLinks.map((link, index) => (
                  <button
                    key={index}
                    className="text-muted-foreground transition-colors duration-300 hover:text-primary"
                  >
                    {link.icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content with Tabs */}
        <main className="rounded-lg bg-card p-6 shadow-sm">
          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="mb-6 w-full justify-center overflow-x-auto border-b bg-muted/50">
              <TabsTrigger value="lessons" className="px-6 py-3">
                Lessons
              </TabsTrigger>
              <TabsTrigger value="about" className="px-6 py-3">
                About
              </TabsTrigger>
              <TabsTrigger value="stats" className="px-6 py-3">
                Stats
              </TabsTrigger>
            </TabsList>

            {/* Lessons Tab Content */}
            <TabsContent
              value="lessons"
              className="mt-4 duration-500 animate-in fade-in-50"
            >
              {/* Search and Filter */}
              <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="relative w-full md:w-1/2">
                  <Search className="absolute left-3 top-3 size-4 text-muted-foreground" />
                  <Input
                    placeholder="Search lessons by Ms. Anna"
                    className="rounded-full bg-muted/50 py-6 pl-10"
                  />
                </div>
                <Select value={filter} onValueChange={setFilter}>
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
            </TabsContent>

            {/* About Tab Content */}
            <TabsContent
              value="about"
              className="duration-500 animate-in fade-in-50"
            >
              <div className="rounded-lg bg-muted/50 p-6">
                <h2 className="mb-4 text-xl font-semibold text-foreground">
                  About Ms. Anna
                </h2>
                <p className="mb-8 leading-relaxed text-muted-foreground">
                  {teacherData.longBio}
                </p>

                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  Intro Video
                </h3>
                <div className="mb-8 flex h-72 w-full items-center justify-center rounded-lg bg-muted md:h-96">
                  <p className="text-muted-foreground">
                    YouTube video embed placeholder
                  </p>
                </div>

                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  Certifications
                </h3>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  {teacherData.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            {/* Stats Tab Content */}
            <TabsContent
              value="stats"
              className="duration-500 animate-in fade-in-50"
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {teacherData.stats.map((stat, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden bg-muted/50 transition-all hover:shadow-md"
                  >
                    <CardContent className="flex flex-col items-center p-6">
                      <div className="mb-4 rounded-full bg-primary/10 p-4 text-primary">
                        {stat.icon}
                      </div>
                      <h3 className="mb-1 text-3xl font-bold text-foreground">
                        {stat.value}
                      </h3>
                      <p className="text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
