import { Card, CardContent } from "@/components/ui/card";

interface SpeakingFeedbackDto {
  accuracy: number;
  totalMessages: number;
  userMessages: number;
  botMessages: number;
}

interface ResultSpeakingData {
  feedback: SpeakingFeedbackDto;
}

interface SpeakingResultFeedbackProps {
  isResultView: boolean;
  resultSpeakingData: ResultSpeakingData | null;
}

export function SpeakingResultFeedback({
  isResultView,
  resultSpeakingData,
}: SpeakingResultFeedbackProps) {
  if (!isResultView || !resultSpeakingData) return null;

  return (
    <div className="mb-4 flex justify-center">
      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 rounded-lg bg-card/50 p-6 shadow-md sm:grid-cols-2 md:grid-cols-4">
        <StatCard
          label="Accuracy"
          value={`${resultSpeakingData.feedback.accuracy}%`}
          valueClassName="text-primary"
        />
        <StatCard
          label="Total Messages"
          value={resultSpeakingData.feedback.totalMessages.toString()}
          valueClassName="text-primary"
        />
        <StatCard
          label="Your Messages"
          value={resultSpeakingData.feedback.userMessages.toString()}
          valueClassName="text-emerald-500"
        />
        <StatCard
          label="Bot Messages"
          value={resultSpeakingData.feedback.botMessages.toString()}
          valueClassName="text-destructive"
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  valueClassName?: string;
}

function StatCard({
  label,
  value,
  valueClassName = "text-primary",
}: StatCardProps) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="flex flex-col items-center justify-center p-4 text-center">
        <span className="text-sm font-medium text-muted-foreground">
          {label}
        </span>
        <span className={`mt-1 text-3xl font-bold ${valueClassName}`}>
          {value}
        </span>
      </CardContent>
    </Card>
  );
}
