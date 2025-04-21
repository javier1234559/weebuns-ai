"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Star, BookOpen } from "lucide-react";
import { OriginalTab } from "./result/OriginalTab";
import { EvaluationTab } from "./result/EvaluationTab";
import { SampleTab } from "./result/SampleTab";
import { useMemo, useState } from "react";
import { SampleEssayDTO, WritingSubmission } from "@/services/swagger-types";
import { UserDataDTO } from "@/feature/writing/schema";

interface WritingSubmittedAndFeedBackProps {
  data: WritingSubmission;
  exampleEssay: SampleEssayDTO;
}

export default function WritingSubmittedAndFeedBack({
  data,
  exampleEssay,
}: WritingSubmittedAndFeedBackProps) {
  const [selectedTab, setSelectedTab] = useState<string>("original");

  const mergeContent = useMemo(() => {
    return (data: UserDataDTO | SampleEssayDTO) => {
      const { instruction, body1, body2, conclusion } = data;
      return [instruction, body1, body2, conclusion]
        .filter(Boolean)
        .join("\n\n");
    };
  }, []);

  const tabs = [
    {
      value: "original",
      label: "Original Essay",
      icon: Clock,
      component: (
        <OriginalTab
          data={mergeContent(
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
      component: <SampleTab data={mergeContent(exampleEssay)} />,
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
