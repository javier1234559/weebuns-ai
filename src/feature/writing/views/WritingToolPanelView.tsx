"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, BookOpen, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useStreamingChatWithHistory } from "@/hooks/useStreamingChatWithHistory";
import ChatPanel from "@/feature/writing/components/chat-panel";
import { VocabularyPanel } from "@/feature/writing/components/vocabulary-panel";
import { AnalysisGuidePanel } from "@/feature/writing/components/analyst-guide-panel";
import { EvaluationPanel } from "@/feature/writing/components/evaluation-panel";
import {
  ContentWritingDTO,
  EvaluateEssayResponseDto,
  VocabularyItemDTO,
} from "@/services/swagger-types";
import { useEvaluateEssay } from "@/feature/writing/hooks/useWritingClient";
import { toast } from "@/hooks/use-toast";
import { useCreateVocabulary } from "@/feature/vocabulary/hooks/useVocabularyQueries";

interface WritingToolPanelViewProps {
  topic: string;
  content?: ContentWritingDTO;
  getFullContent: () => string;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

export default function WritingToolPanelView({
  topic,
  content,
  getFullContent,
  selectedTab,
  setSelectedTab,
}: WritingToolPanelViewProps) {
  // Chat state management
  const {
    messages,
    loading: chatLoading,
    sendMessage,
  } = useStreamingChatWithHistory({
    apiUrl: "/api/ai/chat",
  });

  // Evaluation state management
  const [evaluationResult, setEvaluationResult] =
    useState<EvaluateEssayResponseDto | null>(null);
  const { mutate: evaluateEssay, isPending: evaluationLoading } =
    useEvaluateEssay();

  // Vocabulary state management
  const [savedVocabs, setSavedVocabs] = useState<number[]>([]);
  const createVocabularyMutation = useCreateVocabulary();

  const handleSendMessage = async (message: string) => {
    await sendMessage({
      content: message,
      extraBody: { topic, content: getFullContent() },
    });
  };

  const handleEvaluate = async () => {
    evaluateEssay(
      {
        topic,
        user_content: getFullContent(),
      },
      {
        onSuccess: (response) => {
          setEvaluationResult(response);
          console.log(JSON.stringify(response, null, 2));
          toast({
            title: "Evaluation Complete",
            description: "Your essay has been evaluated successfully.",
          });
        },
        onError: () => {
          toast({
            title: "Evaluation Failed",
            description: "Failed to evaluate essay. Please try again.",
            variant: "destructive",
          });
        },
      },
    );
  };

  const handleSaveVocabulary = async (
    vocab: VocabularyItemDTO,
    index: number,
  ) => {
    try {
      await createVocabularyMutation.mutateAsync({
        term: vocab.term,
        meaning: vocab.meaning,
        exampleSentence: vocab.example_sentence,
        imageUrl: vocab.image_url,
        referenceLink: vocab.reference_link,
        referenceName: vocab.reference_name,
        repetitionLevel: 1, // Start with level 1
      });

      setSavedVocabs((prev) => [...prev, index]);
      toast({
        title: "Success",
        description: "Từ vựng đã được thêm vào danh sách của bạn",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Không thể thêm từ vựng: " + error.message,
        variant: "destructive",
      });
    }
  };

  const tabs = [
    {
      value: "chat",
      icon: MessageSquare,
      label: "Chat với AI",
    },
    {
      value: "vocabulary_list",
      icon: BookOpen,
      label: "Từ vựng",
    },
    {
      value: "analysis_guide",
      icon: Check,
      label: "Hướng dẫn phân tích",
    },
    {
      value: "evaluate",
      icon: Star,
      label: "Đánh giá bài viết",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="text-lg font-medium">Công cụ hỗ trợ</div>
          <p className="text-sm font-normal text-muted-foreground">
            Công cụ hỗ trợ viết bài của bạn.
          </p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chat" value={selectedTab} className="w-full">
          <TabsList
            className="grid w-full gap-2 rounded-lg bg-background p-1"
            style={{
              gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
            }}
          >
            {tabs.map(({ value, icon: Icon, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                onClick={() => setSelectedTab(value)}
                className={cn(
                  "gap-2 rounded-md px-3 py-1.5 text-sm transition-all",
                  "data-[state=active]:bg-card data-[state=active]:shadow-sm",
                  "data-[state=inactive]:text-muted-foreground",
                )}
              >
                <Icon className="size-4" />
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="chat">
            <ChatPanel
              topic={topic}
              content={getFullContent()}
              messages={messages}
              onSendMessage={handleSendMessage}
              loading={chatLoading}
            />
          </TabsContent>
          <TabsContent value="vocabulary_list">
            <VocabularyPanel
              vocabulary_list={content?.vocabulary_list ?? []}
              savedVocabs={savedVocabs}
              onSaveVocabulary={handleSaveVocabulary}
              isSaving={createVocabularyMutation.isPending}
            />
          </TabsContent>
          <TabsContent value="analysis_guide">
            <AnalysisGuidePanel
              analysis_guide={content?.resources?.analysis_guide ?? ""}
            />
          </TabsContent>
          <TabsContent value="evaluate">
            <EvaluationPanel
              topic={topic}
              content={getFullContent()}
              onSendMessage={handleEvaluate}
              loading={evaluationLoading}
              result={evaluationResult}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
