import { useFormContext } from "react-hook-form";
import { WritingGradingFormValues } from "./schema";
import { Check, AlertCircle } from "lucide-react";

export function FeedbackCorrectionsForm() {
  const form = useFormContext<WritingGradingFormValues>();

  return (
    <div className="space-y-3">
      {form.getValues("corrections").map((correction) => (
        <div
          key={correction.id}
          className="rounded-lg border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-3 flex items-center gap-2">
            <AlertCircle className="size-4 text-destructive" />
            <h3 className="text-sm font-semibold text-primary">
              {correction.error}
            </h3>
          </div>

          <div className="space-y-3">
            <div className="rounded bg-muted/50 p-2">
              <div className="mb-1 flex items-center">
                <span className="text-xs font-medium text-muted-foreground">
                  Câu gốc:
                </span>
              </div>
              <p className="text-sm italic text-destructive/90">
                &quot;{correction.sentence}&quot;
              </p>
            </div>

            <div className="rounded bg-success/10 p-2">
              <div className="mb-1 flex items-center">
                <Check className="mr-1 size-3 text-success" />
                <span className="text-xs font-medium text-muted-foreground">
                  Sửa thành:
                </span>
              </div>
              <p className="text-sm font-medium text-success">
                &quot;{correction.suggestion}&quot;
              </p>
            </div>
          </div>

          <div className="mt-3 border-t border-dashed border-border pt-2">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Lý do:</span> {correction.reason}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
