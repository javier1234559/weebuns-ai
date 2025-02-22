"use client";

import { SAMPLE_DATA } from "@/feature/vocabulary/data";
import React, { useState, useCallback } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  useInteractions,
  useClick,
  useDismiss,
} from "@floating-ui/react";
import { splitTextPreserveHtml } from "@/lib/text";
import { cn } from "@/lib/utils";
import VocabularyCard from "@/feature/vocabulary/components/VocabularyCard";

interface WordStatus {
  isKnown: boolean;
  level: number; // 0-5
}

interface ReadingVocabularyViewProps {
  content: string; // HTML content
  wordStatuses: Record<string, WordStatus>;
  className?: string;
}

const getHighlightClassName = (status: WordStatus | undefined): string => {
  if (!status) return "hover:border-b-primary hover:border-b-4 rounded-none";

  if (status.isKnown) {
    return "bg-success/20 hover:bg-success/30";
  }

  // Map level 0-5 to opacity
  switch (status.level) {
    case 0:
      return "bg-primary/10 hover:bg-primary/20";
    case 1:
      return "bg-primary/20 hover:bg-primary/30";
    case 2:
      return "bg-primary/30 hover:bg-primary/40";
    case 3:
      return "bg-primary/40 hover:bg-primary/50";
    case 4:
      return "bg-primary/50 hover:bg-primary/60";
    case 5:
      return "bg-primary/60 hover:bg-primary/70";
    default:
      return "";
  }
};

const ReadingVocabularyView = ({
  content,
  wordStatuses,
  className,
}: ReadingVocabularyViewProps) => {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isPopoverOpen,
    onOpenChange: setIsPopoverOpen,
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const handleWordClick = useCallback(
    (e: React.MouseEvent, word: string) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLElement;
      refs.setReference(target);
      setSelectedWord(word);
      setIsPopoverOpen(true);
    },
    [refs],
  );

  const processContent = useCallback(() => {
    const words = splitTextPreserveHtml(content);

    return words.map((item, index) => {
      if (!item.isWord) {
        return <span key={`text-${index}`}>{item.text}</span>;
      }

      const normalizedWord = item.text.toLowerCase();
      const status = wordStatuses[normalizedWord];

      return (
        <span
          key={`word-${index}`}
          {...getReferenceProps()}
          className={cn(
            "cursor-pointer rounded transition-all duration-200",
            getHighlightClassName(status),
          )}
          onClick={(e) => handleWordClick(e, item.text)}
        >
          {item.text}
        </span>
      );
    });
  }, [content, wordStatuses, handleWordClick, getReferenceProps]);

  return (
    <div className={cn("relative", className)}>
      <article className="prose prose-sm max-w-none dark:prose-invert md:prose-base lg:prose-lg prose-headings:mb-3 prose-p:mb-2">
        {processContent()}
      </article>

      {isPopoverOpen && selectedWord && (
        <div
          ref={refs.setFloating}
          {...getFloatingProps()}
          style={{
            ...floatingStyles,
            aspectRatio: "4/3",
            maxHeight: "400px",
          }}
          className={cn(
            "bg-card text-card-foreground",
            "rounded-lg border border-border shadow-lg",
            "thin-scrollbar overflow-y-auto",
            "w-[calc(100vw-2rem)] max-w-[400px] sm:w-[400px]",
          )}
        >
          <div className="sticky top-0 flex items-center border-b border-border bg-card p-3">
            <h3 className="font-semibold">{selectedWord}</h3>
          </div>

          <div className="p-3">
            <VocabularyCard
              data={{
                ...SAMPLE_DATA,
                value: selectedWord,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadingVocabularyView;
