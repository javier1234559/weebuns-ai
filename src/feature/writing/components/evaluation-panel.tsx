import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2, Lightbulb } from "lucide-react";
import {
  CorrectionDTO,
  EvaluateEssayResponseDto,
} from "@/services/swagger-types";
import { TokenProtectedButton } from "@/feature/token/components/TokenProtectedButton";
import { TOKEN_COSTS } from "@/feature/token/constants";

interface EvaluationPanelProps {
  topic: string;
  content: string;
  onSendMessage: (message: string) => void;
  loading: boolean;
  result: EvaluateEssayResponseDto | null;
}

const CorrectionDetail = ({ correction }: { correction: CorrectionDTO }) => (
  <Card>
    <CardContent className="p-4">
      <div className="space-y-2">
        <p className="rounded bg-red-50 p-2 text-sm line-through dark:bg-red-900/20">
          {correction.sentence}
        </p>

        <p className="rounded bg-green-50 p-2 text-sm dark:bg-green-900/20">
          {correction.suggestion}
        </p>

        <div className="flex items-center gap-2 rounded bg-blue-50 p-2 dark:bg-blue-900/20">
          <Lightbulb className="size-4 text-blue-500" />
          <p className="text-sm">{correction.reason}</p>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ScoreCard = ({ title, score }: { title: string; score: number }) => (
  <Card>
    <CardHeader className="p-4">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <div className="flex items-center gap-4">
        <Progress value={score} className="h-2" />
        <span className="text-sm font-medium">{score}/100</span>
      </div>
    </CardContent>
  </Card>
);

export function EvaluationPanel({
  onSendMessage,
  loading,
  result,
}: EvaluationPanelProps) {
  return (
    <div className="space-y-6">
      <TokenProtectedButton
        requiredTokens={TOKEN_COSTS.EVALUATE_ESSAY}
        onAction={async () => await onSendMessage("")}
        className="w-full py-2"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" />
            Đang đánh giá...
          </>
        ) : (
          `Đánh giá bài viết (${TOKEN_COSTS.EVALUATE_ESSAY} Tokens)`
        )}
      </TokenProtectedButton>

      {result && (
        <div className="space-y-6">
          {/* Overall Score */}
          <Card className="border-2 border-primary">
            <CardHeader className="p-4">
              <CardTitle className="text-xl font-bold">Overall Score</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold text-primary">
                  {result.overall_score}
                </div>
                <Progress value={result.overall_score} className="h-4 w-1/2" />
              </div>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <div className="grid gap-4 md:grid-cols-2">
            <ScoreCard title="Task Response" score={result.task_response} />
            <ScoreCard
              title="Coherence & Cohesion"
              score={result.coherence_cohesion}
            />
            <ScoreCard
              title="Lexical Resource"
              score={result.lexical_resource}
            />
            <ScoreCard title="Grammar" score={result.grammar} />
          </div>

          {/* Overall Feedback */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Overall Feedback</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="whitespace-pre-line text-sm text-muted-foreground">
                {result.overall_feedback}
              </p>
            </CardContent>
          </Card>

          {/* Corrections */}
          <Card>
            <CardHeader className="p-4">
              <CardTitle>Detailed Corrections</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-4">
                {result.corrections.map((correction: CorrectionDTO) => (
                  <CorrectionDetail
                    key={correction.id}
                    correction={correction}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
