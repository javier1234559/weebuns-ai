"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Highlight {
  id: string;
  text: string;
  startOffset: number;
  endOffset: number;
  color: string;
  createdAt: Date;
}

interface ReadingNotesViewProps {
  content: string;
  initialHighlights?: Highlight[];
  onHighlightChange?: (highlights: Highlight[]) => void;
}

const HIGHLIGHT_COLORS = [
  "rgba(255, 246, 21, 0.4)", // Light yellow
  "rgba(162, 217, 206, 0.4)", // Light mint
  "rgba(255, 198, 208, 0.4)", // Light pink
];

export const ReadingNotesView = ({
  content,
  initialHighlights = [],
  onHighlightChange,
}: ReadingNotesViewProps) => {
  const [highlights, setHighlights] = useState<Highlight[]>(initialHighlights);
  const contentRef = useRef<HTMLDivElement>(null);

  const updateHighlights = useCallback(
    (newHighlights: Highlight[]) => {
      setHighlights(newHighlights);
      onHighlightChange?.(newHighlights);
    },
    [onHighlightChange],
  );

  const wrapTextWithHighlight = (
    text: string,
    color: string,
    highlightId: string,
  ) => {
    const wrapper = document.createElement("span");
    wrapper.className = "relative group inline-block highlight-span";
    wrapper.setAttribute("data-highlight-id", highlightId);
    wrapper.style.backgroundColor = color;

    const textNode = document.createTextNode(text);
    wrapper.appendChild(textNode);

    const removeButton = document.createElement("button");
    removeButton.className =
      "absolute hidden group-hover:flex items-center justify-center -top-6 right-0 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-10";
    removeButton.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 6h18"></path>
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
      </svg>
    `;
    wrapper.appendChild(removeButton);

    return wrapper;
  };

  const createHighlight = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || !contentRef.current) return;

    const range = selection.getRangeAt(0);
    if (!range) return;

    // Get selected text
    const selectedText = selection.toString().trim();
    if (!selectedText) return;

    console.log("Selected text:", selectedText);

    try {
      // Generate highlight ID and color
      const highlightId = uuidv4();
      const color =
        HIGHLIGHT_COLORS[Math.floor(Math.random() * HIGHLIGHT_COLORS.length)];

      // Create new range to wrap text
      const newRange = document.createRange();
      newRange.setStart(range.startContainer, range.startOffset);
      newRange.setEnd(range.endContainer, range.endOffset);

      // Create wrapper with highlight
      const highlightWrapper = wrapTextWithHighlight(
        selectedText,
        color,
        highlightId,
      );

      // Delete old content and insert new wrapped content
      newRange.deleteContents();
      newRange.insertNode(highlightWrapper);

      // Create highlight object
      const newHighlight: Highlight = {
        id: highlightId,
        text: selectedText,
        startOffset: range.startOffset,
        endOffset: range.endOffset,
        color,
        createdAt: new Date(),
      };

      console.log("Created highlight:", newHighlight);

      // Update highlights state
      updateHighlights([...highlights, newHighlight]);

      // Clear selection
      selection.removeAllRanges();
    } catch (error) {
      console.error("Failed to create highlight:", error);
    }
  }, [highlights, updateHighlights]);

  const removeHighlight = useCallback(
    (highlightId: string) => {
      const span = document.querySelector(
        `[data-highlight-id="${highlightId}"]`,
      );
      if (span) {
        const parent = span.parentNode;
        if (parent) {
          const textContent = span.childNodes[0].textContent || "";
          const textNode = document.createTextNode(textContent);
          parent.replaceChild(textNode, span);
          parent.normalize();
        }
      }

      updateHighlights(highlights.filter((h) => h.id !== highlightId));
    },
    [highlights, updateHighlights],
  );

  useEffect(() => {
    const handleRemoveClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const removeButton = target.closest("button");
      if (removeButton) {
        const span = removeButton.parentElement;
        const highlightId = span?.getAttribute("data-highlight-id");
        if (highlightId) {
          e.preventDefault();
          e.stopPropagation();
          removeHighlight(highlightId);
        }
      }
    };

    document.addEventListener("click", handleRemoveClick);
    return () => document.removeEventListener("click", handleRemoveClick);
  }, [removeHighlight]);

  // Add styles
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .highlight-span {
        position: relative;
        display: inline-block;
        transition: background-color 0.2s ease;
        border-radius: 2px;
        padding: 0 1px;
      }
      .highlight-span:hover {
        cursor: pointer;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="thin-scrollbar h-full overflow-y-auto rounded-md bg-background p-4">
      <div
        ref={contentRef}
        onMouseUp={createHighlight}
        className="relative selection:bg-blue-100"
      >
        <article
          className="prose prose-sm max-w-none dark:prose-invert md:prose-base lg:prose-lg prose-headings:mb-3 prose-p:mb-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

export default ReadingNotesView;
