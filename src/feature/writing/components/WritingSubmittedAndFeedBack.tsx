"use client";

import { SplitPane, Pane } from "@/components/feature/SplitLayout";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Star, BookOpen } from "lucide-react";
import { OriginalTab } from "./result/OriginalTab";
import { EvaluationTab } from "./result/EvaluationTab";
import { SampleTab } from "./result/SampleTab";
import { useState } from "react";
import {
  SampleEssayDTO,
  EvaluateEssayResponseDto,
} from "@/services/swagger-types";
import { UserDataDTO } from "@/feature/writing/schema";

interface WritingSubmittedAndFeedBackProps {
  userData: UserDataDTO;
  essayExample: SampleEssayDTO;
  feedback: EvaluateEssayResponseDto;
}

export default function WritingSubmittedAndFeedBack({
  userData,
  essayExample,
  feedback,
}: WritingSubmittedAndFeedBackProps) {
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState<string>("original");

  const tabs = [
    {
      value: "original",
      label: "Original Essay",
      icon: FileText,
      component: <OriginalTab data={userData} />,
    },
    {
      value: "evaluation",
      label: "Evaluation",
      icon: Star,
      component: <EvaluationTab data={userData} evaluation={feedback} />,
    },
    {
      value: "sample",
      label: "Sample Essay",
      icon: BookOpen,
      component: <SampleTab data={essayExample} />,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Card className="min-h-[800px]">
        <CardHeader>
          <CardTitle>Writing Result</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="original" value={selectedTab} className="w-full">
            <TabsList
              className="grid w-full"
              style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
            >
              {tabs.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  className="gap-2"
                  onClick={() => setSelectedTab(value)}
                >
                  <Icon className="size-4" />
                  <span>{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map(({ value, component }) => (
              <TabsContent key={value} value={value}>
                {component}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
