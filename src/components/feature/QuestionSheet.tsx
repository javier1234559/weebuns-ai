"use client";

import { Question } from "@/components/feature/MultipleChoiceQuiz";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CircleHelp } from "lucide-react";
import { memo } from "react";

interface QuestionSheetProps {
  questions: Question[];
  selectedAnswers: Record<string, string>;
  currentQuestionId?: string;
  showCorrectAnswers?: boolean;
  bookmarkedQuestions?: Set<string>;
  onQuestionSelect: (questionId: string) => void;
  onBookmarkToggle?: (questionId: string) => void;
}

function QuestionSheet({
  questions,
  selectedAnswers,
  currentQuestionId,
  showCorrectAnswers = false,
  bookmarkedQuestions = new Set(),
  onQuestionSelect,
  onBookmarkToggle,
}: QuestionSheetProps) {
  const getQuestionStatus = (question: Question) => {
    if (!selectedAnswers[question.id]) return "unanswered";
    if (!showCorrectAnswers) return "answered";
    return selectedAnswers[question.id] === question.answer
      ? "correct"
      : "incorrect";
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "correct":
        return "bg-success/20 hover:bg-success/30 text-success-foreground";
      case "incorrect":
        return "bg-destructive/20 hover:bg-destructive/30 text-destructive-foreground";
      case "answered":
        return "bg-primary/20 hover:bg-primary/30 text-primary-foreground";
      default:
        return "bg-muted hover:bg-muted/80";
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <CircleHelp className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Danh sách câu hỏi</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-2">
            {questions.map((question, index) => {
              const status = getQuestionStatus(question);
              const isBookmarked = bookmarkedQuestions.has(question.id);
              const isCurrent = currentQuestionId === question.id;

              return (
                <Button
                  key={question.id}
                  variant="outline"
                  className={cn(
                    "relative h-12 w-full hover:text-muted-foreground hover:!bg-primary/10",
                    getStatusStyle(status),
                    isCurrent && "ring-2 ring-primary ring-offset-0",
                    isBookmarked && "border-yellow-500 dark:border-yellow-400",
                  )}
                  onClick={() => onQuestionSelect(question.id)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    onBookmarkToggle?.(question.id);
                  }}
                >
                  {index + 1}
                  {isBookmarked && (
                    <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-yellow-500" />
                  )}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded bg-muted border" /> Chưa làm
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded bg-primary/20 border" /> Đã làm
          </div>
          {showCorrectAnswers && (
            <>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded bg-success/20" /> Đúng
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded bg-destructive/20" /> Sai
              </div>
            </>
          )}
          <div className="flex items-center gap-2 text-sm">
            <div className="h-3 w-3 rounded border border-yellow-500" /> Đánh
            dấu xem sau
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default memo(QuestionSheet);
