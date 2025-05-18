import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WritingGradingFormValues, Correction } from "./schema";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const ERROR_TYPES = [
  { value: "grammar", label: "Ngữ pháp" },
  { value: "vocabulary", label: "Từ vựng / Dùng từ" },
  { value: "punctuation", label: "Dấu câu" },
  { value: "spelling", label: "Chính tả" },
  { value: "cohesion", label: "Liên kết và mạch lạc" },
  { value: "sentence_structure", label: "Cấu trúc câu" },
  { value: "tone", label: "Giọng điệu / Mức độ trang trọng" },
  { value: "other", label: "Khác" },
] as const;

interface FeedbackCorrectionsFormProps {
  selectedText: { text: string; position: number } | null;
  onAddCorrection: (correction: Omit<Correction, "id">) => void;
  onEditCorrection: (id: string, correction: Partial<Correction>) => void;
  onDeleteCorrection: (id: string) => void;
  onFocusCorrection?: (id: string) => void;
  focusedCorrectionId?: string;
}

export function FeedbackCorrectionsForm({
  selectedText,
  onAddCorrection,
  onEditCorrection,
  onDeleteCorrection,
  onFocusCorrection,
  focusedCorrectionId,
}: FeedbackCorrectionsFormProps) {
  const form = useFormContext<WritingGradingFormValues>();
  const corrections = form.watch("corrections");
  const [newCorrection, setNewCorrection] = useState({
    error: "grammar",
    suggestion: "The correct version of the text",
    reason: "The text is grammatically incorrect",
  });

  const handleAddCorrection = () => {
    if (selectedText) {
      onAddCorrection({
        ...newCorrection,
        sentence: selectedText.text,
        position: selectedText.position,
      });
      setNewCorrection({
        error: "",
        suggestion: "",
        reason: "",
      });
    }
  };

  return (
    <div className="space-y-4">
      {selectedText && (
        <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
          <div className="mb-2">
            <p className="text-sm font-medium text-primary">Selected Text:</p>
            <div className="mt-1 space-y-2">
              <div className="correction-original">
                <p className="mb-1 text-xs font-medium">Original:</p>
                <p className="text-sm italic line-through">
                  &quot;{selectedText.text}&quot;
                </p>
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3">
            <div>
              <label className="text-xs font-medium">Error Type</label>
              <Select
                value={newCorrection.error}
                onValueChange={(value) =>
                  setNewCorrection({ ...newCorrection, error: value })
                }
              >
                <SelectTrigger className="mt-1 w-full">
                  <SelectValue placeholder="Select error type" />
                </SelectTrigger>
                <SelectContent>
                  {ERROR_TYPES.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium">
                Suggested Correction
              </label>
              <Input
                value={newCorrection.suggestion}
                onChange={(e) =>
                  setNewCorrection({
                    ...newCorrection,
                    suggestion: e.target.value,
                  })
                }
                placeholder="Corrected version of the text"
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-medium">Reason</label>
              <Input
                value={newCorrection.reason}
                onChange={(e) =>
                  setNewCorrection({ ...newCorrection, reason: e.target.value })
                }
                placeholder="Explanation for the correction"
                className="mt-1"
              />
            </div>

            <Button onClick={handleAddCorrection} className="w-full">
              Add Correction
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {corrections.map((correction) => (
          <div
            key={correction.id}
            className={`correction-card ${focusedCorrectionId === correction.id ? "focused" : ""}`}
            onClick={() => onFocusCorrection?.(correction.id)}
          >
            <div className="flex justify-between">
              <span className="text-sm font-medium">{correction.error}</span>
            </div>
            <div className="mt-2 space-y-2">
              <div className="correction-original">
                <p className="mb-1 text-xs font-medium">Original:</p>
                <p className="text-sm italic line-through">
                  &quot;{correction.sentence}&quot;
                </p>
              </div>
              <div className="correction-suggestion">
                <p className="mb-1 text-xs font-medium">Correction:</p>
                <p className="text-sm font-medium">
                  &quot;{correction.suggestion}&quot;
                </p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm">
                <span className="font-medium">Reason:</span> {correction.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
