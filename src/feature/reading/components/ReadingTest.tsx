"use client";

import { useState } from "react";
import { Pane, SplitPane } from "@/components/feature/SplitLayout";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { MultipleChoiceQuiz } from "@/components/feature/MultipleChoiceQuiz";
import QuestionSheet from "@/components/feature/QuestionSheet";
import { Timer } from "@/components/feature/Timer";
import ReadingViewer from "@/feature/reading/components/ReadingViewer";
import {
  CreateReadingSubmissionDTO,
  QuestionDTO,
} from "@/services/swagger-types";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, Eye, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReadingResultFeedback } from "@/feature/reading/components/ReadingResultFeedback";
import { RouteNames } from "@/constraints/route-name";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useActivityTracking } from "@/feature/activity/hooks/useActivityTracking";
import { CountUpTimer } from "@/components/feature/CountUpTimer";

interface ReadingFeedback {
  accuracy: number;
  correctAnswers: number;
  totalQuestions: number;
  incorrectAnswers: number;
}

interface ReadingTestProps {
  content: string;
  questions: QuestionDTO[];
  isPractice?: boolean;
  lessonId: string;
  timeLimit: number;
  onSubmit?: (data: CreateReadingSubmissionDTO) => void;
  isResultView?: boolean;
  resultReadingData?: {
    feedback: ReadingFeedback;
    selectedAnswers?: Record<string, string>;
  };
}

export function ReadingTest({
  content,
  questions,
  isPractice = true,
  lessonId,
  onSubmit,
  isResultView = false,
  resultReadingData,
  timeLimit,
}: ReadingTestProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
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

  const handleSubmit = () => {
    const submissionData: CreateReadingSubmissionDTO = {
      lessonId: lessonId,
      submissionType: "reading",
      tokensUsed: 0,
      content: {
        text: content,
        questions: questions.map((q) => ({
          id: q.id,
          question: q.question,
          right_answer: q.right_answer,
          answer_list: q.answer_list,
          selected_answer: selectedAnswers[q.id],
          bookmarked: bookmarkedQuestions.has(q.id),
        })),
      },
    };
    onSubmit?.(submissionData);
    handleSubmitActivity();
  };

  const {
    timerRef,
    handleTimeUp: handleActivityTimeUp,
    handleSubmit: handleSubmitActivity,
  } = useActivityTracking({
    skill: "reading",
    isPractice,
    timeLimit,
    onTimeUp: handleSubmit,
  });

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
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

  const handleShowAnswers = () => {
    setShowCorrectAnswers(!showCorrectAnswers);
  };

  const handleBookmark = (id: string) => {
    setBookmarkedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleBackToHome = () => {
    router.push(RouteNames.Home);
  };

  return (
    <div>
      <Card className="mb-4 w-full">
        <CardContent className="flex w-full items-center justify-end gap-4 p-4">
          {isPractice && !isResultView && (
            <Button variant="outline" onClick={handleShowAnswers}>
              <Eye className="mr-2 size-2" />
              {showCorrectAnswers ? "Hide answers" : "Show answers"}
            </Button>
          )}

          {!isResultView && timeLimit && !isPractice && (
            <Timer
              startTime={new Date(
                Date.now() + 1000 * 60 * timeLimit,
              ).toISOString()}
              onEnd={handleActivityTimeUp}
              size="large"
            />
          )}

          {isPractice && !isResultView && (
            <CountUpTimer ref={timerRef} />
          )}

          <QuestionSheet
            questions={questions}
            selectedAnswers={
              isResultView && resultReadingData?.selectedAnswers
                ? resultReadingData.selectedAnswers
                : selectedAnswers
            }
            currentQuestionId={currentQuestionId ?? undefined}
            showCorrectAnswers={isResultView || showCorrectAnswers}
            bookmarkedQuestions={bookmarkedQuestions}
            onQuestionSelect={handleQuestionSelect}
            onBookmarkToggle={handleBookmark}
          />

          {!isResultView && (
            <Button variant="outline" size="sm" onClick={handleSubmit}>
              <CircleCheckBig className="mr-2 size-2" />
              Nộp bài
            </Button>
          )}

          {isResultView && (
            <Button variant="outline" onClick={handleBackToHome}>
              <Home className="mr-2 size-2" />
              Back to Home
            </Button>
          )}
        </CardContent>
      </Card>

      <ReadingResultFeedback
        isResultView={isResultView}
        resultReadingData={resultReadingData || null}
      />

      <div className="h-[800px] rounded-lg bg-card p-2 shadow-lg">
        <SplitPane
          minSize={40}
          maxSize={70}
          defaultSize={50}
          direction={isMobile ? "horizontal" : "vertical"}
        >
          <Pane className="p-2">
            <ReadingViewer
              content={content}
              className="thin-scrollbar h-full overflow-y-auto rounded-md bg-background p-4"
            />
          </Pane>
          <Pane className="p-2">
            <div className="thin-scrollbar h-full overflow-y-auto rounded-md bg-background p-4">
              <MultipleChoiceQuiz
                questions={questions}
                showCorrectAnswers={isResultView || showCorrectAnswers}
                selectedAnswers={
                  isResultView && resultReadingData?.selectedAnswers
                    ? resultReadingData.selectedAnswers
                    : selectedAnswers
                }
                onAnswerSelect={handleAnswerSelect}
                bookmarkedQuestions={bookmarkedQuestions}
                onBookmarkToggle={handleBookmark}
              />
            </div>
          </Pane>
        </SplitPane>
      </div>
    </div>
  );
}

ReadingTest.displayName = "ReadingTest";
