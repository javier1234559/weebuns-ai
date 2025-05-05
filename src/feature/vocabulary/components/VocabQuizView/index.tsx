"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import VocabQuiz from "@/feature/vocabulary/components/VocabQuizView/VocabQuiz";
import { useVocabStore } from "@/feature/vocabulary/store/vocabStore";
import { useRouter } from "next/navigation";
import { RouteNames } from "@/constraints/route-name";
import LevelButtons from "../LevelButton";
import Image from "next/image";
import EmptyState from "@/components/common/app-empty-state";
import AudioButton from "@/feature/vocabulary/components/VocabQuizView/AudioButton";

export default function VocabQuizView() {
  const router = useRouter();
  const reviewVocabs = useVocabStore((state) => state.checkedVocabs);
  const [progress, setProgress] = useState(0);
  const [showFrontContent, setShowFrontContent] = useState(false);
  const [showBackContent, setShowBackContent] = useState(false);
  const totalWords = reviewVocabs.length;

  const handleCardChange = useCallback(
    (_id: string, index: number) => {
      const progressPercentage = (index / totalWords) * 100;
      setProgress(progressPercentage);
      setShowFrontContent(false);
      setShowBackContent(false);
    },
    [totalWords],
  );

  const toggleShowFront = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowFrontContent(!showFrontContent);
  };

  const formatedReviewData = reviewVocabs.map((vocab, index) => ({
    id: index,
    frontHTML: (
      <Card className="w-full">
        <div className="relative">
          <CardContent
            className={cn(
              "thin-scrollbar h-[400px] p-6",
              showFrontContent ? "overflow-y-auto" : "overflow-hidden",
            )}
          >
            <div className="space-y-4">
              <div className="mt-4 flex items-center justify-center gap-2">
                <h3 className="text-center text-xl font-medium">
                  {vocab.term}
                </h3>
                <AudioButton text={vocab.term} />
              </div>

              {vocab.imageUrl && (
                <div className="relative h-[200px] w-full">
                  <Image
                    src={vocab.imageUrl}
                    alt={vocab.term}
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
              )}

              {vocab.exampleSentence && (
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex items-center gap-2">
                    <AudioButton text={vocab.exampleSentence} size="sm" />
                    <p className="text-sm italic">
                      &quot;{vocab.exampleSentence}&quot;
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          {!showFrontContent && (
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
          )}
          <button
            type="button"
            className="relative z-10 mb-4 w-full"
            onClick={toggleShowFront}
          >
            {showFrontContent ? (
              <p className="text-sm text-muted-foreground">Show less</p>
            ) : (
              <p className="text-sm text-muted-foreground">Show more</p>
            )}
          </button>
        </div>
      </Card>
    ),
    backHTML: (
      <Card className="w-full">
        <div className="relative">
          <CardContent
            className={cn(
              "thin-scrollbar h-[400px] p-6",
              showBackContent ? "overflow-y-auto" : "overflow-hidden",
            )}
          >
            <div className="space-y-4">
              {vocab.meaning.map((mean, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-2 rounded-lg bg-muted p-4"
                >
                  <p className="text-sm">{mean}</p>
                  <AudioButton text={mean} size="sm" lang="vi-VN" />
                </div>
              ))}
            </div>
          </CardContent>

          {!showFrontContent && (
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background to-transparent" />
          )}
          <button
            type="button"
            className="relative z-10 mb-4 w-full"
            onClick={toggleShowFront}
          >
            {showFrontContent ? (
              <p className="text-sm text-muted-foreground">Show less</p>
            ) : (
              <p className="text-sm text-muted-foreground">Show more</p>
            )}
          </button>
        </div>

        <div
          className="flex justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <LevelButtons
            id={vocab.id}
            level={vocab.repetitionLevel}
            isHideDelete
          />
        </div>
      </Card>
    ),
  }));

  if (formatedReviewData.length === 0) {
    return (
      <div className="mt-20 flex h-full items-center justify-center">
        <EmptyState
          description="Vui lòng chọn từ vựng để review"
          onAction={() => router.push(RouteNames.MyVocabulary)}
          actionText="Chọn từ vựng"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full w-[90vw] max-w-[900px] flex-col space-y-4 px-4 pb-4">
      <div className="space-y-4 border-b p-4">
        <h2 className="text-2xl font-bold">Review Vocab</h2>
        <p className="text-muted-foreground">
          There are {totalWords} words to review in this session.
        </p>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Session Progress</p>
            <p className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </p>
          </div>
          <Progress value={progress} />
        </div>
      </div>

      <VocabQuiz data={formatedReviewData} onCardChange={handleCardChange} />
    </div>
  );
}
