import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Eye } from "lucide-react";

interface StatsTabProps {
  stats: {
    lessons: number;
    students: number;
    views: number;
  };
}

export const StatsTab: React.FC<StatsTabProps> = ({ stats }) => {
  const statsData = [
    {
      label: "Lessons",
      value: stats.lessons.toString(),
      icon: <BookOpen className="size-5" />,
    },
    {
      label: "Students",
      value: stats.students.toString(),
      icon: <Users className="size-5" />,
    },
    {
      label: "Views",
      value: stats.views.toString(),
      icon: <Eye className="size-5" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {statsData.map((stat, index) => (
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
  );
};
