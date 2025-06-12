"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Markdown, { Components } from "react-markdown";

type TextTypewriterMDProps = {
  text?: string;
  typeSpeed?: number;
  className?: string;
  onComplete?: () => void;
  renderMarkdown?: boolean;
  markdownComponents?: Components;
  skipAnimation?: boolean;
};

export default function TextTypewriterMD({
  text = "",
  typeSpeed = 33,
  onComplete,
  className,
  renderMarkdown,
  markdownComponents,
  skipAnimation,
}: TextTypewriterMDProps) {
  const [displayedText, setDisplayedText] = useState(skipAnimation ? text : "");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const onCompleteRef = useRef(onComplete);
  const hasAnimatedRef = useRef(false);

  // Keep onComplete callback reference up-to-date without causing effect re-runs
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (skipAnimation || hasAnimatedRef.current) {
      setDisplayedText(text);
      return;
    }

    const startTyping = () => {
      let currentIndex = displayedText.length;
      intervalRef.current = setInterval(() => {
        if (currentIndex < text.length) {
          // Only add new characters, do not reset old text
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          hasAnimatedRef.current = true;
          onCompleteRef.current?.();
        }
      }, typeSpeed);
    };

    // If there is new text, start typing animation
    if (text.length > displayedText.length) {
      // Start typing immediately, no need to wait for delay
      startTyping();
    }
    // If targetText decreases or resets, consider handling it自行處理
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, typeSpeed]);

  if (renderMarkdown) {
    return (
      <div className={className}>
        <Markdown components={markdownComponents}>{displayedText}</Markdown>
      </div>
    );
  }

  return (
    <span
      className={cn("whitespace-pre-wrap leading-7", className)}
      dangerouslySetInnerHTML={{ __html: displayedText }}
    />
  );
}
