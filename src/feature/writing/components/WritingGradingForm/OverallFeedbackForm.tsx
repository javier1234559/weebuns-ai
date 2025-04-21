import { useFormContext } from "react-hook-form";
import { WritingGradingFormValues } from "./schema";

export function OverallFeedbackForm() {
  const form = useFormContext<WritingGradingFormValues>();

  return (
    <div className="content-editor">
      <div
        dangerouslySetInnerHTML={{
          __html: form.getValues("overallFeedback") || "",
        }}
      />
    </div>
  );
}
