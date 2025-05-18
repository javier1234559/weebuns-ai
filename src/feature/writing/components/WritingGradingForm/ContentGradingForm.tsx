import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { WritingGradingFormValues } from "./schema";
import Mark from "mark.js";
import { mergeContentHtml } from "@/feature/writing/utils";

interface ContentGradingFormProps {
  selectionMode: boolean;
  onSelectionChange: (
    selection: { text: string; position: number } | null,
  ) => void;
  focusedCorrectionId?: string;
}

export function ContentGradingForm({
  selectionMode,
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

  // Initialize mark.js instance
  useEffect(() => {
    if (essayDisplayRef.current) {
      markInstance.current = new Mark(essayDisplayRef.current);
    }
  }, []);

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

    // Remove focused class from all corrections
    const allCorrections = essayDisplayRef.current.querySelectorAll(
      ".correction-wrapper",
    );
    allCorrections.forEach((element) => {
      element.classList.remove("focused");
    });

    // Add focused class to the selected correction
    if (id) {
      const focusedElement = essayDisplayRef.current.querySelector(
        `[data-correction-id="${id}"]`,
      );
      if (focusedElement) {
        focusedElement.classList.add("focused");
      }
    }
  }, []);

  const applyCorrections = useCallback(() => {
    if (!essayDisplayRef.current || !markInstance.current) return;

    cleanupHighlights();

    const corrections = form.watch("corrections");
    corrections.forEach((correction: any) => {
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
  }, [form, cleanupHighlights]);

  const applyTempHighlight = useCallback(() => {
    if (!essayDisplayRef.current || !markInstance.current || !tempHighlight)
      return;

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

  const mergedContent = useMemo(() => {
    const user_data = form.getValues("content.user_data");
    return mergeContentHtml(user_data);
  }, [form]);

  // Apply corrections when content changes
  useEffect(() => {
    applyCorrections();
  }, [form.watch("corrections")]);

  // Update focused correction and scroll to it
  useEffect(() => {
    updateFocusedCorrection(focusedCorrectionId);
    if (focusedCorrectionId) {
      scrollToCorrection(focusedCorrectionId);
    }
  }, [focusedCorrectionId, updateFocusedCorrection, scrollToCorrection]);

  // Apply temporary highlight when it changes
  useEffect(() => {
    if (tempHighlight) {
      applyTempHighlight();
    }
  }, [tempHighlight, applyTempHighlight]);

  // Clear temporary highlight when selection mode is turned off
  useEffect(() => {
    if (!selectionMode) {
      setTempHighlight(null);
    }
  }, [selectionMode]);

  return (
    <div
      ref={essayDisplayRef}
      onMouseUp={handleTextSelection}
      className="content-editor"
      style={{ cursor: selectionMode ? "text" : "default" }}
      dangerouslySetInnerHTML={{ __html: mergedContent }}
    />
  );
}
