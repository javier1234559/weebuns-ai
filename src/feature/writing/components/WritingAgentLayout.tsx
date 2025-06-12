"use client";

import { SplitPane, Pane } from "@/components/feature/SplitLayout";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageSquare,
  BookOpen,
  Check,
  Star,
  Globe,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  ContentWritingDTO,
  CreateWritingSubmissionDTO,
  SampleEssayDTO,
  SubmissionStatus,
  User,
} from "@/services/swagger-types";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import {
  UserDataDTO,
  defaultValues,
  userDataSchema,
} from "@/feature/writing/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TipTapEditor from "@/components/feature/editor/TipTapEditor";
import { toast } from "@/hooks/use-toast";
import { TokenProtectedForm } from "@/feature/token/components/TokenProtectedForm";
import { TOKEN_COSTS } from "@/feature/token/constants";
import UserPreview from "@/feature/user/components/UserPreview";
import { cn } from "@/lib/utils";
import { CountUpTimer } from "@/components/feature/CountUpTimer";
import { useActivityTracking } from "@/feature/activity/hooks/useActivityTracking";
import { Timer } from "@/components/feature/Timer";
import { useIsLogined } from "@/hooks/useIsLogined";
import WritingToolPanelView from "@/feature/writing/views/WritingToolPanelView";

interface WritingAgentLayoutProps {
  topic: string;
  isReadOnly?: boolean;
  onSubmit?: (data: CreateWritingSubmissionDTO) => void;
  onSave?: (data: CreateWritingSubmissionDTO) => void;
  content?: ContentWritingDTO;
  lessonId?: string;
  createdBy?: User;
  isPractice?: boolean;
  timeLimit?: number;
}

export default function WritingAgentLayout({
  topic,
  isReadOnly = false,
  onSubmit,
  onSave,
  content,
  lessonId,
  createdBy,
  isPractice,
  timeLimit,
}: WritingAgentLayoutProps) {
  const isMobile = useIsMobile();
  const isLogined = useIsLogined();
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
        tokensUsed: TOKEN_COSTS.SUBMIT_ESSAY,
        status: SubmissionStatus.Submitted,
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

  const handleFormSubmitTimeUp = () => {
    const data = form.getValues();
    console.log(JSON.stringify(data, null, 2));
    handleFormSubmit(data);
  };

  const { handleTimeUp: handleActivityTimeUp } = useActivityTracking({
    skill: "writing",
    isPractice,
    timeLimit,
    onTimeUp: handleFormSubmitTimeUp,
  });

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

  const handleChat = () => {
    setSelectedTab("chat");
  };

  const handleGenerateOutline = () => {
    setSelectedTab("analysis_guide");
  };

  const handleGenerateVocabulary = () => {
    setSelectedTab("vocabulary_list");
  };

  const handleEvaluateEssay = () => {
    setSelectedTab("evaluate");
  };

  const handleSave = () => {
    if (onSave && lessonId) {
      const data = form.getValues();
      const dataToSubmit: CreateWritingSubmissionDTO = {
        lessonId,
        submissionType: "writing",
        tokensUsed: 0,
        status: SubmissionStatus.Draft,
        content: {
          user_data: data,
          lesson_id: lessonId,
          chat_history: chatHistory,
        },
      };
      onSave(dataToSubmit);
    }
  };

  const handleFormError = (errors: any) => {
    toast({
      title: "Error",
      description: "Please fill in all fields",
    });
    console.log(errors);
  };

  return (
    <TokenProtectedForm
      requiredTokens={TOKEN_COSTS.SUBMIT_ESSAY}
      form={form}
      onSubmit={handleFormSubmit}
      onError={handleFormError}
      className="h-full"
    >
      {/* Card 1: Title, Description, UserPreview */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>
            <h2 className="text-xl font-medium">{topic}</h2>
            <div className="mt-4 rounded-lg border-2 border-muted">
              <p className="text-[18px] font-light leading-relaxed">
                {content?.task}
              </p>
            </div>
            <div className="mt-4 flex items-center gap-2">
              {createdBy && (
                <UserPreview
                  user={{
                    id: createdBy.id,
                    name: createdBy.username ?? "",
                    avatar: createdBy.profilePicture ?? "",
                    bio: createdBy.bio ?? "",
                    role: createdBy.role,
                    username: createdBy.username ?? "",
                  }}
                />
              )}
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="mb-4">
        <CardContent className="flex flex-wrap items-center gap-2 py-4">
          <Button type="button" variant="outline" onClick={handleChat}>
            <MessageSquare className="mr-2 size-4" />
            Chat với AI
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerateVocabulary}
          >
            <BookOpen className="mr-2 size-4" />
            Từ vựng
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleGenerateOutline}
          >
            <Check className="mr-2 size-4" />
            Hướng dẫn phân tích
          </Button>
          <Button type="button" variant="outline" onClick={handleEvaluateEssay}>
            <Star className="mr-2 size-4" />
            Đánh giá bài viết
          </Button>
          <div className="ml-auto flex items-center gap-2">
            <div className="mr-4 flex items-center gap-2">
              {timeLimit && !isPractice && (
                <Timer
                  startTime={new Date(
                    Date.now() + 1000 * 60 * timeLimit,
                  ).toISOString()}
                  onEnd={handleActivityTimeUp}
                  size="large"
                />
              )}
              {isPractice && <CountUpTimer />}
            </div>
            <Label htmlFor="show-examples">Hiện ví dụ</Label>
            <Switch
              id="show-examples"
              checked={isShowExamples}
              onCheckedChange={toggleExamples}
            />
          </div>
        </CardContent>
      </Card>

      <SplitPane
        minSize={30}
        maxSize={70}
        defaultSize={50}
        direction={isMobile ? "horizontal" : "vertical"}
      >
        <Pane>
          <WritingToolPanelView
            topic={topic}
            content={content}
            selectedTab={selectedTab}
            getFullContent={getFullContent}
            setSelectedTab={setSelectedTab}
          />
        </Pane>
        <Pane>
          <Card className="h-full">
            <CardContent className="flex h-full flex-col overflow-y-auto p-4">
              <div className="flex-1 space-y-6 overflow-y-auto">
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
              {!isLogined ? (
                <div className="mt-4 flex justify-end gap-2 text-sm text-muted-foreground">
                  Đăng nhập để nộp bài hoặc lưu bài viết
                </div>
              ) : (
                <div className="mt-6 flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleSave}>
                    <Save className="mr-2 size-4" />
                    Lưu
                  </Button>
                  {!isReadOnly && (
                    <Button type="submit">
                      <Globe className="mr-2 size-4" />
                      Nộp bài ({TOKEN_COSTS.SUBMIT_ESSAY} Tokens)
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </Pane>
      </SplitPane>
    </TokenProtectedForm>
  );
}
