import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Star, BookOpen } from "lucide-react";
import { UserDataDTO } from "@/feature/writing/schema";
import {
  EvaluateEssayResponseDto,
  SampleEssayDTO,
} from "@/services/swagger-types";
import { OriginalTab } from "./OriginalTab";
import { EvaluationTab } from "./EvaluationTab";
import { SampleTab } from "./SampleTab";
import { Button } from "@/components/ui/button";
import { mergeHtml } from "@/lib/utils";

interface WritingResultProps {
  userData: UserDataDTO;
  evaluation: EvaluateEssayResponseDto;
  sampleEssay: SampleEssayDTO;
  onNextTab?: () => void;
}

export function WritingResult({
  userData,
  evaluation,
  sampleEssay,
  onNextTab,
}: WritingResultProps) {
  const tabs = [
    {
      value: "original",
      label: "Original Essay",
      icon: FileText,
      component: <OriginalTab data={userData} />,
      rightPanel: onNextTab && (
        <div className="flex justify-end p-4">
          <Button onClick={onNextTab}>View Evaluation →</Button>
        </div>
      ),
    },
    {
      value: "evaluation",
      label: "Evaluation",
      icon: Star,
      component: <EvaluationTab data={userData} evaluation={evaluation} />,
    },
    {
      value: "sample",
      label: "Sample Essay",
      icon: BookOpen,
      component: <SampleTab data={mergeHtml(sampleEssay)} />,
    },
  ];

  return (
    <div className="container mx-auto md:p-0">
      <Card className="min-h-[800px]">
        <CardHeader>
          <CardTitle>Writing Result</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="original" className="w-full">
            <TabsList
              className="grid w-full"
              style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
            >
              {tabs.map(({ value, label, icon: Icon }) => (
                <TabsTrigger key={value} value={value} className="gap-2">
                  <Icon className="size-4" />
                  <span>{label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            {tabs.map(({ value, component, rightPanel }) => (
              <TabsContent key={value} value={value}>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr]">
                  <div>{component}</div>
                  {rightPanel && <div>{rightPanel}</div>}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
