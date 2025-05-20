"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Star, BookOpen } from "lucide-react";
import { OriginalTab } from "./result/OriginalTab";
import { EvaluationTab } from "./result/EvaluationTab";
import { SampleTab } from "./result/SampleTab";
import { useState } from "react";
import { SampleEssayDTO, WritingSubmission } from "@/services/swagger-types";
import { cn } from "@/lib/utils";
import { mergedContentHtml } from "@/feature/writing/utils";

interface WritingSubmittedAndFeedBackProps {
  data: WritingSubmission;
  exampleEssay: SampleEssayDTO;
}

export default function WritingSubmittedAndFeedBack({
  data,
  exampleEssay,
}: WritingSubmittedAndFeedBackProps) {
  const [selectedTab, setSelectedTab] = useState<string>("evaluation");

  const tabs = [
    {
      value: "original",
      label: "Original Essay",
      icon: Clock,
      component: (
        <OriginalTab
          data={mergedContentHtml(
            data.content?.user_data ?? {
              instruction: "",
              body1: "",
              body2: "",
              conclusion: "",
            },
          )}
        />
      ),
    },
    {
      value: "evaluation",
      label: "Evaluation",
      icon: Star,
      component: <EvaluationTab data={data} />,
    },
    {
      value: "sample",
      label: "Sample Essay",
      icon: BookOpen,
      component: <SampleTab data={mergedContentHtml(exampleEssay)} />,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Writing Result</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="original" value={selectedTab}>
            <TabsList className="gap-2 rounded-lg bg-background p-1">
              {tabs.map(({ value, label, icon: Icon }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  onClick={() => setSelectedTab(value)}
                  className={cn(
                    "gap-2 rounded-md px-3 py-1.5 text-sm transition-all",
                    "data-[state=active]:bg-card  data-[state=active]:shadow-sm",
                    "data-[state=inactive]:text-muted-foreground",
                  )}
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
