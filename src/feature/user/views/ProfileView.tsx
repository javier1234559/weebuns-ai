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
import Image from "next/image";
import { useFindByUsername } from "../hooks/useUser";
import { HeaderSection } from "../components/HeaderSection";
import { AboutTab } from "../components/AboutTab";
import ProfilePreviewSkeleton from "../components/ProfilePreviewSkeleton";
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

const featuredLessons = [
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

const allLessons = [
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

interface ProfileViewProps {
  username: string;
}

export default function ProfileView({ username }: ProfileViewProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [filter, setFilter] = useState("all");

  const { data: userResponse, isLoading } = useFindByUsername(username);

  if (isLoading || !userResponse) {
    return <ProfilePreviewSkeleton />;
  }

  const user = userResponse.user;

  return (
    <div className="min-h-screen bg-background">
      <Card className="w-full">
        <HeaderSection
          user={user}
          isFollowing={isFollowing}
          onFollowToggle={() => setIsFollowing(!isFollowing)}
        />

        {user.teacherProfile && (
          <AboutTab teacherProfile={user.teacherProfile} />
        )}
      </Card>
    </div>
  );
}
