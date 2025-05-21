"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { WritingGradingFormValues } from "./schema";
import Mark from "mark.js";
import { mergedContentHtml } from "../../utils";

interface ContentGradingFormProps {
  selectionMode: boolean;
  onSelectionChange: (
    selection: { text: string; position: number } | null,
  ) => void;
  focusedCorrectionId?: string;
}

export function ContentGradingForm({
  selectionMode = true,
  onSelectionChange,
  focusedCorrectionId,
}: ContentGradingFormProps) {
  const form = useFormContext<WritingGradingFormValues>();

  const essayDisplayRef = useRef<HTMLDivElement>(null);
  const [tempHighlight, setTempHighlight] = useState<{
    text: string;
    position: number;
  } | null>(null);
  const markInstance = useRef<Mark | null>(null);
  const originalContentRef = useRef<string>("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize mark.js instance and store original content
  useEffect(() => {
    if (essayDisplayRef.current && !isInitialized) {
      markInstance.current = new Mark(essayDisplayRef.current);
      originalContentRef.current = essayDisplayRef.current.innerHTML;
      setIsInitialized(true);
    }
  }, [isInitialized]);

  // Update original content when form data changes
  useEffect(() => {
    if (essayDisplayRef.current) {
      const newContent = mergedContentHtml(form.getValues("content.user_data"));
      if (newContent !== originalContentRef.current) {
        originalContentRef.current = newContent;
        essayDisplayRef.current.innerHTML = newContent;
        if (markInstance.current) {
          applyCorrections();
        }
      }
    }
  }, [form.watch("content.user_data")]);

  const cleanupHighlights = useCallback(() => {
    if (!essayDisplayRef.current || !markInstance.current) return;

    // First unmark all highlights
    markInstance.current.unmark();

    // Then clean up all custom elements
    const customElements = essayDisplayRef.current.querySelectorAll(
      ".correction-suggestion, .correction-wrapper",
    );
    customElements.forEach((element) => {
      element.remove();
    });
  }, []);

  const scrollToCorrection = useCallback((id: string) => {
    if (!essayDisplayRef.current) return;

    const element = essayDisplayRef.current.querySelector(
      `[data-correction-id="${id}"]`,
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  const updateFocusedCorrection = useCallback((id?: string) => {
    if (!essayDisplayRef.current) return;

    const allCorrections = essayDisplayRef.current.querySelectorAll('.correction-wrapper');
    allCorrections.forEach((element) => {
      element.classList.remove('focused');
    });

    if (id) {
      const focusedElement = essayDisplayRef.current.querySelector(
        `[data-correction-id="${id}"]`
      );
      if (focusedElement) {
        focusedElement.classList.add('focused');
      }
    }
  }, []);

  const applyCorrections = useCallback(() => {
    if (!essayDisplayRef.current || !markInstance.current) return;

    // Clean up existing highlights and corrections
    cleanupHighlights();

    // Restore the original content
    essayDisplayRef.current.innerHTML = originalContentRef.current;

    const corrections = form.getValues("corrections");
    if (!corrections || corrections.length === 0) return;

    corrections.forEach((correction: any) => {
      if (!correction.sentence) return;

      // First mark the text with highlight
      markInstance.current?.mark(correction.sentence, {
        className: "correction-highlight",
        acrossElements: true,
        separateWordSearch: false,
        each: (element: any) => {
          // Skip if element already has a suggestion
          if (element.parentElement?.classList.contains("correction-wrapper")) {
            return;
          }

          // Create wrapper for the correction
          const wrapper = document.createElement("span");
          wrapper.className =
            "correction-wrapper bg-yellow-100 px-1 py-0.5 rounded border-b border-yellow-300 transition-all duration-300 hover:bg-yellow-200";
          wrapper.setAttribute("data-correction-id", correction.id);

          if (focusedCorrectionId === correction.id) {
            wrapper.classList.add("focused");
          }

          // Create the original text with strikethrough
          const original = document.createElement("span");
          original.className = "line-through text-gray-500";
          original.innerHTML = correction.sentence;

          // Create the suggestion
          const suggestion = document.createElement("span");
          suggestion.className =
            "text-green-600 font-medium ml-1 bg-green-100 px-1 py-0.5 rounded border-b border-green-300";
          suggestion.innerHTML = correction.suggestion;

          // Assemble the elements
          wrapper.appendChild(original);
          wrapper.appendChild(suggestion);
          element.replaceWith(wrapper);
        },
      });
    });
  }, [form, cleanupHighlights, focusedCorrectionId]);

  const applyTempHighlight = useCallback(() => {
    if (!essayDisplayRef.current || !markInstance.current || !tempHighlight)
      return;

    // Unmark any existing temp highlights first
    markInstance.current.unmark({
      className: "temp-highlight"
    });

    markInstance.current.mark(tempHighlight.text, {
      className:
        "temp-highlight bg-blue-100 px-1 py-0.5 rounded border-b border-blue-300",
      acrossElements: true,
      separateWordSearch: false,
    });
  }, [tempHighlight]);

  const handleTextSelection = () => {
    if (!selectionMode) return;

    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
      const range = selection.getRangeAt(0);
      const position = range.startOffset;
      const selectedText = selection.toString();

      setTempHighlight({
        text: selectedText,
        position: position,
      });

      onSelectionChange({
        text: selectedText,
        position: position,
      });
    }
  };

  // Apply corrections when corrections array changes
  useEffect(() => {
    if (isInitialized) {
      applyCorrections();
    }
  }, [form.watch("corrections"), isInitialized, applyCorrections]);

  // Update focused correction and scroll to it
  useEffect(() => {
    if (isInitialized) {
      updateFocusedCorrection(focusedCorrectionId);
      if (focusedCorrectionId) {
        scrollToCorrection(focusedCorrectionId);
      }
    }
  }, [focusedCorrectionId, isInitialized]);

  // Apply temporary highlight when it changes
  useEffect(() => {
    if (tempHighlight && isInitialized) {
      applyTempHighlight();
    }
  }, [tempHighlight, isInitialized]);

  // Clear temporary highlight when selection mode is turned off
  useEffect(() => {
    if (!selectionMode && isInitialized) {
      setTempHighlight(null);
      if (markInstance.current) {
        markInstance.current.unmark({
          className: "temp-highlight"
        });
      }
    }
  }, [selectionMode, isInitialized]);

  return (
    <div
      ref={essayDisplayRef}
      onMouseUp={handleTextSelection}
      className="content-editor"
      style={{ cursor: selectionMode ? "text" : "default" }}
      dangerouslySetInnerHTML={{ __html: mergedContentHtml(form.getValues("content.user_data")) }}
    />
  );
}
