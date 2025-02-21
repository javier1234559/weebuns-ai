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
  Shuffle,
} from "lucide-react";
import { ChatPanel } from "@/feature/writing/components/chat-panel";
import { VocabularyPanel } from "@/feature/writing/components/vocabulary-panel";
import { OutlinePanel } from "@/feature/writing/components/outline-panel";
import { ExamplesPanel } from "@/feature/writing/components/examples-panel";
import { EvaluationPanel } from "@/feature/writing/components/evaluation-panel";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface WritingAgentLayoutProps {
  topic: string;
  description: string;
}

export default function WritingAgentLayout({
  topic,
  description,
}: WritingAgentLayoutProps) {
  const isMobile = useIsMobile();
  const [content, setContent] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState<string>("chat");

  const tabs = [
    {
      value: "chat",
      icon: MessageSquare,
      component: <ChatPanel topic={topic} content={content} />,
    },
    {
      value: "vocabulary",
      icon: BookOpen,
      component: <VocabularyPanel topic={topic} content={content} />,
    },
    {
      value: "outline",
      icon: Check,
      component: <OutlinePanel topic={topic} content={content} />,
    },
    {
      value: "examples",
      icon: BookOpenCheck,
      component: <ExamplesPanel topic={topic} content={content} />,
    },
    {
      value: "evaluate",
      icon: Star,
      component: <EvaluationPanel topic={topic} content={content} />,
    },
  ];

  console.log(topic);

  const handleGenerateOutline = () => {
    setSelectedTab("outline");
  };

  const handleGenerateVocabulary = () => {
    setSelectedTab("vocabulary");
  };

  const handleGenerateExample = () => {
    setSelectedTab("examples");
  };

  const handleEvaluateEssay = () => {
    setSelectedTab("evaluate");
  };

  const handlePublishEssay = () => {
    console.log("publish");
  };

  const handleChat = () => {
    setSelectedTab("chat");
  };

  return (
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
              <p className="text-sm font-normal text-muted-foreground">
                {description}
              </p>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex h-full flex-col p-4">
            <div className="flex flex-wrap justify-end gap-2 py-4">
              <Button variant="outline" onClick={handleChat}>
                <MessageSquare className="mr-2 size-4" />
                Chat with AI
              </Button>
              <Button variant="outline" onClick={handleGenerateVocabulary}>
                <BookOpen className="mr-2 size-4" />
                Vocabulary
              </Button>
              <Button variant="outline" onClick={handleGenerateOutline}>
                <Check className="mr-2 size-4" />
                Outline
              </Button>
              <Button variant="outline" onClick={handleGenerateExample}>
                <BookOpenCheck className="mr-2 size-4" />
                Examples
              </Button>
            </div>
            <MainEditor
              value={content}
              onChange={setContent}
              className="my-4 grow"
            />
            <div className="flex justify-end gap-2 py-4">
              <Button variant="outline" onClick={handleEvaluateEssay}>
                <Star className="mr-2 size-4" />
                Evaluate Essay
              </Button>
              <Button onClick={handlePublishEssay}>
                <Globe className="mr-2 size-4" />
                Publish
              </Button>
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
            <Tabs defaultValue="chat" value={selectedTab} className="w-full">
              <TabsList
                className="grid w-full"
                style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}
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
  );
}
