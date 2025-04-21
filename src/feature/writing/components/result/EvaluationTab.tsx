import WritingGradingForm from "@/feature/writing/components/WritingGradingForm";
import { WritingSubmission } from "@/services/swagger-types";

interface EvaluationTabProps {
  data: WritingSubmission;
}

export function EvaluationTab({ data }: EvaluationTabProps) {
  return <WritingGradingForm initialData={data} />;
}
