import { useRef, useEffect, useMemo, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { WritingGradingFormValues } from "./schema";
import Mark from "mark.js";

interface ContentGradingFormProps {
  focusedCorrectionId?: string;
}

export function ContentGradingForm({
  focusedCorrectionId,
}: ContentGradingFormProps) {
  const form = useFormContext<WritingGradingFormValues>();
  const essayDisplayRef = useRef<HTMLDivElement>(null);
  const markInstance = useRef<Mark | null>(null);

  // Initialize mark.js instance
  useEffect(() => {
    if (essayDisplayRef.current) {
      markInstance.current = new Mark(essayDisplayRef.current);
    }
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

  const mergedContent = useMemo(() => {
    const { instruction, body1, body2, conclusion } =
      form.getValues("content.user_data");
    return [instruction, body1, body2, conclusion].filter(Boolean).join("\n\n");
  }, [form]);

  // Update focused correction and scroll to it
  useEffect(() => {
    updateFocusedCorrection(focusedCorrectionId);
    if (focusedCorrectionId) {
      scrollToCorrection(focusedCorrectionId);
    }
  }, [focusedCorrectionId, updateFocusedCorrection, scrollToCorrection]);

  return (
    <div
      ref={essayDisplayRef}
      className="content-editor"
      dangerouslySetInnerHTML={{ __html: mergedContent }}
    />
  );
}
