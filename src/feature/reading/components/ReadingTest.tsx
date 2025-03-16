"use client";

import { useState } from "react";
import { Pane, SplitPane } from "@/components/feature/SplitLayout";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MultipleChoiceQuiz } from "@/components/feature/MultipleChoiceQuiz";
import QuestionSheet from "@/components/feature/QuestionSheet";
import { Timer } from "@/components/feature/Timer";
import ReadingViewer from "@/feature/reading/components/ReadingViewer";

interface ReadingTestProps {
  title: string;
  description: string;
  content: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    answer: string;
  }[];
}

export function ReadingTest({
  title,
  description,
  content,
  questions,
}: ReadingTestProps) {
  const isMobile = useIsMobile();
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(
    null,
  );
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<string>>(
    new Set(),
  );

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleTimeUp = () => {
    console.log("Time up");
  };

  const handleQuestionSelect = (id: string) => {
    setCurrentQuestionId(id);
    const element = document.getElementById(`question-${id}`);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  };

  return (
    <div>
      <div className="mb-2 flex w-full items-center justify-between p-4">
        <h1 className="text-4xl font-bold">Chi tiết bài đọc</h1>
        <div className="flex items-center justify-end gap-8">
          <Timer
            startTime={new Date(Date.now() + 1000 * 60 * 2).toISOString()}
            onEnd={handleTimeUp}
            size="large"
          />
          <QuestionSheet
            questions={questions}
            selectedAnswers={selectedAnswers}
            currentQuestionId={currentQuestionId ?? undefined}
            showCorrectAnswers={showCorrectAnswers}
            bookmarkedQuestions={bookmarkedQuestions}
            onQuestionSelect={handleQuestionSelect}
            onBookmarkToggle={(id) => {
              setBookmarkedQuestions((prev) => {
                const next = new Set(prev);
                if (next.has(id)) {
                  next.delete(id);
                } else {
                  next.add(id);
                }
                return next;
              });
            }}
          />
        </div>
      </div>
      <div className="h-[800px] rounded-lg bg-card p-2 shadow-lg">
        <SplitPane
          minSize={40}
          maxSize={70}
          defaultSize={50}
          direction={isMobile ? "horizontal" : "vertical"}
        >
          <Pane className="p-2">
            <ReadingViewer
              title={title}
              description={description}
              content={content}
              className="thin-scrollbar h-full overflow-y-auto rounded-md bg-background p-4"
            />
          </Pane>
          <Pane className="p-2">
            <div className="thin-scrollbar h-full overflow-y-auto rounded-md bg-background p-4">
              <MultipleChoiceQuiz
                questions={questions}
                selectedAnswers={selectedAnswers}
                onAnswerSelect={handleAnswerSelect}
                bookmarkedQuestions={bookmarkedQuestions}
                onBookmarkToggle={(id) => {
                  setBookmarkedQuestions((prev) => {
                    const next = new Set(prev);
                    if (next.has(id)) {
                      next.delete(id);
                    } else {
                      next.add(id);
                    }
                    return next;
                  });
                }}
              />
            </div>
          </Pane>
        </SplitPane>
      </div>
    </div>
  );
}
