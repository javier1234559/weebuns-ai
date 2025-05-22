"use client";

import { useEffect, useMemo, useState } from "react";
import { Pencil, BookOpen, Ear, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SkillType } from "@/services/swagger-types";
import { SubmissionStatus } from "@/services/swagger-types";
import { SubmissionLessonHistoryView } from "@/feature/lesson/views/SubmissionLessonHistoryView";
import { cn } from "@/lib/utils";

type MainTabType = "writing" | "reading" | "listening" | "speaking";
type SubTabType = "submitted" | "completed" | "scored" | "draft";

export function TestHistoryTabs() {
  const [activeMainTab, setActiveMainTab] = useState<MainTabType>("writing");
  const [activeSubTab, setActiveSubTab] = useState<SubTabType>("submitted");

  useEffect(() => {
    if (activeMainTab === "writing") {
      setActiveSubTab("submitted");
    } else {
      setActiveSubTab("draft");
    }
  }, [activeMainTab]);

  const contentTabs = useMemo(
    () => [
      {
        id: "writing",
        label: "Writing",
        icon: <Pencil className="size-4" />,
        subTabs: [
          {
            id: "writing-draft",
            value: "draft",
            label: "Đang làm",
            content: (
              <SubmissionLessonHistoryView
                submissionType={SkillType.Writing}
                status={SubmissionStatus.Submitted}
              />
            ),
          },
          {
            id: "writing-submitted",
            value: "submitted",
            label: "Đã nộp",
            content: (
              <SubmissionLessonHistoryView
                submissionType={SkillType.Writing}
                status={SubmissionStatus.Submitted}
              />
            ),
          },
          {
            id: "writing-scored",
            value: "scored",
            label: "Đã chấm điểm",
            content: (
              <SubmissionLessonHistoryView
                submissionType={SkillType.Writing}
                status={SubmissionStatus.Scored}
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
            id: "reading-draft",
            value: "draft",
            label: "Đang làm",
            content: (
              <SubmissionLessonHistoryView
                submissionType={SkillType.Reading}
                status={SubmissionStatus.Draft}
              />
            ),
          },
          {
            id: "reading-submitted",
            value: "submitted",
            label: "Đã nộp",
            content: (
              <SubmissionLessonHistoryView
                submissionType={SkillType.Reading}
                status={SubmissionStatus.Submitted}
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
            id: "listening-draft",
            value: "draft",
            label: "Đang làm",
            content: (
              <SubmissionLessonHistoryView
                submissionType={SkillType.Listening}
                status={SubmissionStatus.Draft}
              />
            ),
          },
          {
            id: "listening-submitted",
            value: "submitted",
            label: "Đã nộp",
            content: (
              <SubmissionLessonHistoryView
                submissionType={SkillType.Listening}
                status={SubmissionStatus.Submitted}
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
            id: "speaking-draft",
            value: "draft",
            label: "Đang làm",
            content: (
              <SubmissionLessonHistoryView
                submissionType={SkillType.Speaking}
                status={SubmissionStatus.Draft}
              />
            ),
          },
          {
            id: "speaking-completed",
            value: "completed",
            label: "Đã làm",
            content: (
              <SubmissionLessonHistoryView
                submissionType={SkillType.Speaking}
                status={SubmissionStatus.Submitted}
              />
            ),
          },
        ],
      },
    ],
    [],
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
          <TabsList className="mb-4 grid grid-cols-4 gap-1 bg-background">
            {contentTabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center gap-2 rounded-md data-[state=active]:bg-primary/80 data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
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
                <TabsList className="mb-6 gap-2 rounded-lg bg-background p-1">
                  {mainTab.subTabs.map((subTab) => (
                    <TabsTrigger
                      key={subTab.id}
                      value={subTab.value}
                      className={cn(
                        "gap-2 rounded-md px-3 py-1.5 text-sm transition-all",
                        "data-[state=active]:bg-card  data-[state=active]:shadow-sm",
                        "data-[state=inactive]:text-muted-foreground",
                      )}
                    >
                      {subTab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {mainTab.subTabs.map((subTab) => (
                  <TabsContent key={subTab.id} value={subTab.value}>
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
