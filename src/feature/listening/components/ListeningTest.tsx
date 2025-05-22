"use client";

import { useState } from "react";
import { MultipleChoiceQuiz } from "@/components/feature/MultipleChoiceQuiz";
import QuestionSheet from "@/components/feature/QuestionSheet";
import { Timer } from "@/components/feature/Timer";
import WaveAudio from "@/components/feature/WaveAudio";
import {
  QuestionDTO,
  CreateListeningSubmissionDTO,
} from "@/services/swagger-types";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, Eye, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { RouteNames } from "@/constraints/route-name";
import { Card, CardContent } from "@/components/ui/card";
import { ListeningResultFeedback } from "@/feature/listening/components/ListeningResultFeedback";
import { CountUpTimer } from "@/components/feature/CountUpTimer";
import { useActivityTracking } from "@/feature/activity/hooks/useActivityTracking";

interface ListeningTestProps {
  audioUrl: string;
  questions: QuestionDTO[];
  isPractice?: boolean;
  lessonId: string;
  onSubmit?: (data: CreateListeningSubmissionDTO) => void;
  isResultView?: boolean;
  timeLimit?: number;
  resultListeningData?: {
    feedback: {
      accuracy: number;
      correctAnswers: number;
      totalQuestions: number;
      incorrectAnswers: number;
    };
    selectedAnswers?: Record<string, string>;
  };
}

export function ListeningTest({
  audioUrl,
  questions,
  isPractice = true,
  lessonId,
  onSubmit,
  isResultView = false,
  timeLimit = 0,
  resultListeningData,
}: ListeningTestProps) {
  const router = useRouter();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [currentQuestionId, setCurrentQuestionId] = useState<string | null>(null);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Set<string>>(new Set());

  const handleSubmit = () => {
    const submissionData: CreateListeningSubmissionDTO = {
      lessonId: lessonId,
      submissionType: "listening",
      tokensUsed: 0,
      content: {
        audio_url: audioUrl,
        question_list: questions.map((q) => ({
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
    skill: "listening",
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
              <Eye className="size-2" />
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
              isResultView && resultListeningData?.selectedAnswers
                ? resultListeningData.selectedAnswers
                : selectedAnswers
            }
            currentQuestionId={currentQuestionId ?? undefined}
            showCorrectAnswers={isResultView || showCorrectAnswers}
            bookmarkedQuestions={bookmarkedQuestions}
            onQuestionSelect={handleQuestionSelect}
            onBookmarkToggle={handleBookmark}
          />

          {!isResultView && (
            <Button variant="outline" onClick={handleSubmit}>
              <CircleCheckBig className="size-2" />
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

      <ListeningResultFeedback
        isResultView={isResultView}
        resultListeningData={resultListeningData || null}
      />

      <div className="mt-4 rounded-lg bg-card p-2 shadow-xl">
        <div className="my-6 flex items-center justify-center">
          <WaveAudio audioUrl={audioUrl} />
        </div>
        <div className="thin-scrollbar h-full overflow-y-auto rounded-md bg-background p-4">
          <MultipleChoiceQuiz
            questions={questions}
            showCorrectAnswers={isResultView || showCorrectAnswers}
            selectedAnswers={
              isResultView && resultListeningData?.selectedAnswers
                ? resultListeningData.selectedAnswers
                : selectedAnswers
            }
            onAnswerSelect={handleAnswerSelect}
            bookmarkedQuestions={bookmarkedQuestions}
            onBookmarkToggle={handleBookmark}
          />
        </div>
      </div>
    </div>
  );
}
