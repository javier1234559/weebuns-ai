"use client";

import { useCallback, useMemo, useState } from "react";
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
import WritingTableHistory from "@/feature/writing/components/WritingTableHistory";

type MainTabType = "writing" | "reading" | "listening" | "speaking";
type SubTabType = "by-name" | "by-question";

export function TestHistoryTabs() {
  const [activeMainTab, setActiveMainTab] = useState<MainTabType>("writing");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("by-name");

  const handleStartExercise = useCallback(() => {
    console.log("Starting exercise...");
  }, []);

  const contentTabs = useMemo(
    () => [
      {
        id: "writing",
        label: "Writing",
        icon: <Pencil className="size-4" />,
        subTabs: [
          {
            id: "by-name",
            label: "Theo bài luyện tập",
            content: <WritingTableHistory />,
          },
          {
            id: "by-question",
            label: "Theo bài thi",
            content: (
              <EmptyState
                description="Bạn hiện chưa làm bài tập nào! Hãy chọn dạng phù hợp và luyện tập ngay nào!"
                onAction={handleStartExercise}
                actionText="Tiến hành làm bài tập ngay"
              />
            ),
          },
        ],
      },
      {
        id: "reading",
        label: "Reading",
        icon: <BookOpen className="size-4" />,
        subTabs: [
          {
            id: "by-name",
            label: "Theo bài luyện tập",
            content: (
              <EmptyState
                description="Bạn hiện chưa làm bài tập nào! Hãy chọn dạng phù hợp và luyện tập ngay nào!"
                onAction={handleStartExercise}
                actionText="Tiến hành làm bài tập ngay"
              />
            ),
          },
          {
            id: "by-question",
            label: "Theo bài thi",
            content: (
              <EmptyState
                description="Bạn hiện chưa làm bài tập nào! Hãy chọn dạng phù hợp và luyện tập ngay nào!"
                onAction={handleStartExercise}
                actionText="Tiến hành làm bài tập ngay"
              />
            ),
          },
        ],
      },
      {
        id: "listening",
        label: "Listening",
        icon: <Ear className="size-4" />,
        subTabs: [
          {
            id: "by-name",
            label: "Theo bài luyện tập",
            content: (
              <EmptyState
                description="Bạn hiện chưa làm bài tập nào! Hãy chọn dạng phù hợp và luyện tập ngay nào!"
                onAction={handleStartExercise}
                actionText="Tiến hành làm bài tập ngay"
              />
            ),
          },
          {
            id: "by-question",
            label: "Theo bài thi",
            content: (
              <EmptyState
                description="Bạn hiện chưa làm bài tập nào! Hãy chọn dạng phù hợp và luyện tập ngay nào!"
                onAction={handleStartExercise}
                actionText="Tiến hành làm bài tập ngay"
              />
            ),
          },
        ],
      },
      {
        id: "speaking",
        label: "Speaking",
        icon: <MessageCircle className="size-4" />,
        subTabs: [
          {
            id: "by-name",
            label: "Theo bài luyện tập",
            content: (
              <EmptyState
                description="Bạn hiện chưa làm bài tập nào! Hãy chọn dạng phù hợp và luyện tập ngay nào!"
                onAction={handleStartExercise}
                actionText="Tiến hành làm bài tập ngay"
              />
            ),
          },
          {
            id: "by-question",
            label: "Theo bài thi",
            content: (
              <EmptyState
                description="Bạn hiện chưa làm bài tập nào! Hãy chọn dạng phù hợp và luyện tập ngay nào!"
                onAction={handleStartExercise}
                actionText="Tiến hành làm bài tập ngay"
              />
            ),
          },
        ],
      },
    ],
    [handleStartExercise]
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lịch sử làm bài</CardTitle>
        <CardDescription>Xem lại các bài tập đã hoàn thành</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs
          value={activeMainTab}
          onValueChange={(value) => setActiveMainTab(value as MainTabType)}
        >
          <TabsList className="mb-4 grid grid-cols-4 gap-1 bg-background/50">
            {contentTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
              >
                {tab.icon}
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {contentTabs.map((mainTab) => (
            <TabsContent key={mainTab.id} value={mainTab.id}>
              <Tabs
                value={activeSubTab}
                onValueChange={(value) => setActiveSubTab(value as SubTabType)}
                className="w-full"
              >
                <TabsList className="mb-6 w-full">
                  {mainTab.subTabs.map((subTab) => (
                    <TabsTrigger
                      key={subTab.id}
                      value={subTab.id}
                      className="flex flex-1 items-center gap-2 rounded-xl data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                    >
                      {subTab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {mainTab.subTabs.map((subTab) => (
                  <TabsContent key={subTab.id} value={subTab.id}>
                    {subTab.content}
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
