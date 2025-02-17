"use client";

import { Pencil, BookOpen, Ear, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EmptyState from "@/components/common/app-empty-state";

const mainTabs = [
  {
    id: "writing",
    label: "Writing",
    icon: <Pencil className="size-4" />,
  },
  {
    id: "reading",
    label: "Reading",
    icon: <BookOpen className="size-4" />,
  },
  {
    id: "listening",
    label: "Listening",
    icon: <Ear className="size-4" />,
  },
  {
    id: "speaking",
    label: "Speaking",
    icon: <MessageCircle className="size-4" />,
  },
];

const subTabs = [
  {
    id: "by-name",
    label: "Theo bài luyện tập",
  },
  {
    id: "by-question",
    label: "Theo bài thi",
  },
];

export function TestHistoryTabs() {
  const handleStartExercise = () => {
    console.log("Starting exercise...");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lịch sử làm bài</CardTitle>
        <CardDescription>Xem lại các bài tập đã hoàn thành</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="writing">
          <TabsList className="mb-4 grid grid-cols-4">
            {mainTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {mainTabs.map((mainTab) => (
            <TabsContent key={mainTab.id} value={mainTab.id}>
              <Tabs defaultValue="by-name" className="w-full">
                <TabsList className="mb-6 w-full">
                  {subTabs.map((subTab) => (
                    <TabsTrigger
                      key={subTab.id}
                      value={subTab.id}
                      className="flex-1"
                    >
                      {subTab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {subTabs.map((subTab) => (
                  <TabsContent key={subTab.id} value={subTab.id}>
                    <EmptyState
                      description="Bạn hiện chưa làm bài tập nào! Hãy chọn dạng phù hợp và luyện tập ngay nào!"
                      onAction={handleStartExercise}
                      actionText="Tiến hành làm bài tập ngay"
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
