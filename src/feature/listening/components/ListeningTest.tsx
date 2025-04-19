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

interface ListeningTestProps {
  title: string;
  description: string;
  audioUrl: string;
  questions: QuestionDTO[];
  isPractice?: boolean;
  lessonId: string;
  onSubmit?: (data: CreateListeningSubmissionDTO) => void;
  isResultView?: boolean;
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
  title,
  description,
  audioUrl,
  questions,
  isPractice = true,
  lessonId,
  onSubmit,
  isResultView = false,
  resultListeningData,
}: ListeningTestProps) {
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

  const handleSubmit = () => {
    const submissionData: CreateListeningSubmissionDTO = {
      lessonId: lessonId,
      submissionType: "listening",
      tokensUsed: 0,
      content: {
        audio_url: audioUrl,
        question_list: Object.entries(selectedAnswers).map(
          ([questionId, answer]) => ({
            id: questionId,
            question: "",
            right_answer: "",
            answer_list: [],
          }),
        ),
      },
    };

    onSubmit?.(submissionData);
  };

  const handleBackToHome = () => {
    router.push(RouteNames.Home);
  };

  return (
    <div>
      <div className="mb-2 flex w-full items-center justify-between p-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        <div className="flex items-center justify-end gap-4">
          {isPractice && !isResultView && (
            <Button variant="outline" size="sm" onClick={handleShowAnswers}>
              <Eye className="mr-2 size-2" />
              {showCorrectAnswers ? "Hide answers" : "Show answers"}
            </Button>
          )}

          {!isResultView && (
            <Timer
              startTime={new Date(Date.now() + 1000 * 60 * 2).toISOString()}
              onEnd={handleTimeUp}
              size="large"
            />
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
            <Button variant="outline" size="sm" onClick={handleSubmit}>
              <CircleCheckBig className="mr-2 size-2" />
              Nộp bài
            </Button>
          )}

          {isResultView && (
            <Button variant="outline" size="sm" onClick={handleBackToHome}>
              <Home className="mr-2 size-2" />
              Back to Home
            </Button>
          )}
        </div>
      </div>

      {isResultView && resultListeningData && (
        <div className="mx-2 mb-4 rounded-lg bg-card p-4 shadow-lg">
          <h3 className="mb-2 text-lg font-bold">Kết quả bài làm</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-primary/10 p-3 text-center">
              <p className="text-sm text-muted-foreground">Độ chính xác</p>
              <p className="text-2xl font-bold text-primary">
                {resultListeningData.feedback.accuracy}%
              </p>
            </div>
            <div className="rounded-lg bg-green-500/10 p-3 text-center">
              <p className="text-sm text-muted-foreground">Câu đúng</p>
              <p className="text-2xl font-bold text-green-500">
                {resultListeningData.feedback.correctAnswers}
              </p>
            </div>
            <div className="rounded-lg bg-red-500/10 p-3 text-center">
              <p className="text-sm text-muted-foreground">Câu sai</p>
              <p className="text-2xl font-bold text-red-500">
                {resultListeningData.feedback.incorrectAnswers}
              </p>
            </div>
            <div className="rounded-lg bg-amber-500/10 p-3 text-center">
              <p className="text-sm text-muted-foreground">Tổng số câu</p>
              <p className="text-2xl font-bold text-amber-500">
                {resultListeningData.feedback.totalQuestions}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-2 rounded-lg bg-card shadow-lg">
        <div className="p-4">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="mx-2 mt-4 rounded-lg bg-card p-2 shadow-lg">
        <div className="my-6 flex items-center justify-center">
          <WaveAudio audioUrl={audioUrl} />
        </div>
        <div className="thin-scrollbar h-full overflow-y-auto rounded-md bg-background p-4">
          <MultipleChoiceQuiz
            questions={questions}
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
