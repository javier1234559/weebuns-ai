"use client";

import MainEditor from "@/components/feature/MainEditor";
import { SplitPane, Pane } from "@/components/feature/SplitLayout";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  BookOpen,
  Check,
  Star,
  BookOpenCheck,
  Globe,
} from "lucide-react";
import { ChatPanel } from "@/feature/writing/components/chat-panel";
import { VocabularyPanel } from "@/feature/writing/components/vocabulary-panel";
import { AnalysisGuidePanel } from "@/feature/writing/components/analyst-guide-panel";
import { EvaluationPanel } from "@/feature/writing/components/evaluation-panel";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ContentWritingDTO,
  CreateWritingSubmissionDTO,
  SampleEssayDTO,
} from "@/services/swagger-types";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm, FormProvider } from "react-hook-form";
import {
  UserDataDTO,
  defaultValues,
  userDataSchema,
} from "@/feature/writing/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PlateEditor } from "@/components/editor/plate-editor";
import { useCreateEditor } from "@/components/editor/use-create-editor";
import TipTapEditor from "@/components/feature/editor/TipTapEditor";
import { toast } from "@/hooks/use-toast";

interface WritingAgentLayoutProps {
  topic: string;
  isReadOnly?: boolean;
  onSubmit?: (data: CreateWritingSubmissionDTO) => void;
  content?: ContentWritingDTO;
  lessonId?: string;
}

export default function WritingAgentLayout({
  topic,
  isReadOnly = false,
  onSubmit,
  content,
  lessonId,
}: WritingAgentLayoutProps) {
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState<string>("chat");
  const [isShowExamples, setIsShowExamples] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<any[]>([]);

  const form = useForm<UserDataDTO>({
    resolver: zodResolver(userDataSchema),
    defaultValues,
  });

  // Get sample essay content
  const sampleEssay: SampleEssayDTO | undefined =
    content?.resources?.sample_essay;

  // Toggle example content
  const toggleExamples = () => {
    if (!isShowExamples && sampleEssay) {
      console.log(JSON.stringify(sampleEssay, null, 2));
      form.reset({
        instruction: sampleEssay.instruction,
        body1: sampleEssay.body1,
        body2: sampleEssay.body2,
        conclusion: sampleEssay.conclusion,
      });
    } else {
      form.reset(defaultValues);
    }
    setIsShowExamples(!isShowExamples);
  };

  const handleFormSubmit = (data: UserDataDTO) => {
    if (onSubmit && lessonId) {
      console.log(JSON.stringify(data, null, 2));
      onSubmit({
        lessonId,
        submissionType: "writing",
        tokensUsed: 0,
        content: {
          user_data: {
            instruction: data.instruction,
            body1: data.body1,
            body2: data.body2,
            conclusion: data.conclusion,
          },
          lesson_id: lessonId,
          chat_history: chatHistory,
        },
      });
    }
  };

  // Get full content for submission and evaluation
  const getFullContent = (): string => {
    const values = form.getValues();
    return [
      values.instruction,
      values.body1,
      values.body2,
      values.conclusion,
    ].join("\n\n");
  };

  const tabs = [
    {
      value: "chat",
      icon: MessageSquare,
      component: <ChatPanel topic={topic} content={getFullContent()} />,
    },
    {
      value: "vocabulary_list",
      icon: BookOpen,
      component: (
        <VocabularyPanel vocabulary_list={content?.vocabulary_list ?? []} />
      ),
    },
    {
      value: "analysis_guide",
      icon: Check,
      component: (
        <AnalysisGuidePanel
          analysis_guide={content?.resources?.analysis_guide ?? ""}
        />
      ),
    },
    {
      value: "evaluate",
      icon: Star,
      component: <EvaluationPanel topic={topic} content={getFullContent()} />,
    },
  ];

  const handleGenerateOutline = () => {
    setSelectedTab("analysis_guide");
  };

  const handleGenerateVocabulary = () => {
    setSelectedTab("vocabulary_list");
  };

  const handleEvaluateEssay = () => {
    setSelectedTab("evaluate");
  };

  const handleFormError = (errors: any) => {
    toast({
      title: "Error",
      description: "Please fill in all fields",
    });
    console.log(errors);
  };

  const handleChat = () => {
    setSelectedTab("chat");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit, handleFormError)}
        className="h-full"
      >
        <SplitPane
          minSize={60}
          maxSize={70}
          defaultSize={70}
          direction={isMobile ? "horizontal" : "vertical"}
        >
          <Pane className="p-2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>
                  <div className="text-lg font-medium">{topic}</div>
                  <div className="mt-2 rounded-lg border-2 border-muted p-4">
                    <p className="text-sm font-normal">{content?.task}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex h-full flex-col overflow-y-auto p-4">
                <div className="flex flex-wrap justify-end gap-2 py-4">
                  <Button type="button" variant="outline" onClick={handleChat}>
                    <MessageSquare className="mr-2 size-4" />
                    Chat with AI
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateVocabulary}
                  >
                    <BookOpen className="mr-2 size-4" />
                    Vocabulary
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGenerateOutline}
                  >
                    <Check className="mr-2 size-4" />
                    Analysis Guide
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleEvaluateEssay}
                  >
                    <Star className="mr-2 size-4" />
                    Evaluate Essay
                  </Button>
                </div>

                <div className="flex-1 space-y-6 overflow-y-auto">
                  <div className="flex items-center justify-end space-x-2">
                    <Label htmlFor="show-examples">Show Example</Label>
                    <Switch
                      id="show-examples"
                      checked={isShowExamples}
                      onCheckedChange={toggleExamples}
                    />
                  </div>

                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="instruction"
                      render={({ field }) => (
                        <FormItem className="flex min-h-[400px] flex-col rounded-lg border-2 border-muted p-4">
                          <FormLabel className="text-base font-medium">
                            Introduction{" "}
                          </FormLabel>
                          <FormControl className="min-h-0 flex-1">
                            <TipTapEditor
                              value={field.value || ""}
                              onChange={field.onChange}
                              className="h-full bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="body1"
                      render={({ field }) => (
                        <FormItem className="flex min-h-[400px] flex-col rounded-lg border-2 border-muted p-4">
                          <FormLabel className="text-base font-medium">
                            Body Paragraph 1
                          </FormLabel>
                          <FormControl className="min-h-0 flex-1">
                            <TipTapEditor
                              value={field.value || ""}
                              onChange={field.onChange}
                              className="h-full bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="body2"
                      render={({ field }) => (
                        <FormItem className="flex min-h-[400px] flex-col rounded-lg border-2 border-muted p-4">
                          <FormLabel className="text-base font-medium">
                            Body Paragraph 2
                          </FormLabel>
                          <FormControl className="min-h-0 flex-1">
                            <TipTapEditor
                              value={field.value || ""}
                              onChange={field.onChange}
                              className="h-full bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="conclusion"
                      render={({ field }) => (
                        <FormItem className="flex min-h-[400px] flex-col rounded-lg border-2 border-muted p-4">
                          <FormLabel className="text-base font-medium">
                            Conclusion
                          </FormLabel>
                          <FormControl className="min-h-0 flex-1">
                            <TipTapEditor
                              value={field.value || ""}
                              onChange={field.onChange}
                              className="h-full bg-background"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  {!isReadOnly && (
                    <Button type="submit">
                      <Globe className="mr-2 size-4" />
                      Submit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </Pane>
          <Pane className="p-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="text-lg font-medium">Writing tools</div>
                  <p className="text-sm font-normal text-muted-foreground">
                    Tools to help you write your essay.
                  </p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs
                  defaultValue="chat"
                  value={selectedTab}
                  className="w-full"
                >
                  <TabsList
                    className="grid w-full"
                    style={{
                      gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
                    }}
                  >
                    {tabs.map(({ value, icon: Icon }) => (
                      <TabsTrigger
                        key={value}
                        value={value}
                        onClick={() => setSelectedTab(value)}
                      >
                        <Icon className="size-4" />
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {tabs.map(({ value, component: Component }) => (
                    <TabsContent key={value} value={value}>
                      {Component}
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </Pane>
        </SplitPane>
      </form>
    </FormProvider>
  );
}
