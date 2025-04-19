import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { UserDataDTO } from "@/feature/writing/schema";
import {
  EvaluateEssayResponseDto,
  CorrectionDTO,
} from "@/services/swagger-types";

interface EvaluationTabProps {
  data: UserDataDTO;
  evaluation: EvaluateEssayResponseDto;
}

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

function highlightCorrections(text: string, corrections: CorrectionDTO[]) {
  let highlightedText = text;

  corrections.forEach((correction) => {
    const originalText = correction.sentence;
    const highlightedReplacement = `<span class="bg-red-100 dark:bg-red-900/20 line-through">${originalText}</span>
    <span class="bg-green-100 dark:bg-green-900/20">${correction.suggestion}</span>`;
    highlightedText = highlightedText.replace(
      originalText,
      highlightedReplacement,
    );
  });

  return highlightedText;
}

export function EvaluationTab({ data, evaluation }: EvaluationTabProps) {
  const highlightedContent = `
    <h3 class="text-lg font-semibold mb-4">Introduction</h3>
    <div class="mb-6">${highlightCorrections(data.instruction, evaluation.corrections)}</div>

    <h3 class="text-lg font-semibold mb-4">Body Paragraph 1</h3>
    <div class="mb-6">${highlightCorrections(data.body1, evaluation.corrections)}</div>

    <h3 class="text-lg font-semibold mb-4">Body Paragraph 2</h3>
    <div class="mb-6">${highlightCorrections(data.body2, evaluation.corrections)}</div>

    <h3 class="text-lg font-semibold mb-4">Conclusion</h3>
    <div class="mb-6">${highlightCorrections(data.conclusion, evaluation.corrections)}</div>
  `;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr,1fr]">
      <Card>
        <CardContent className="p-6">
          <div
            className="prose prose-sm max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
          />
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Overall Score */}
        <Card className="border-2 border-primary">
          <CardHeader className="p-4">
            <CardTitle className="text-xl font-bold">Overall Score</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold text-primary">
                {evaluation.overall_score}
              </div>
              <Progress
                value={evaluation.overall_score}
                className="h-4 w-1/2"
              />
            </div>
          </CardContent>
        </Card>

        {/* Detailed Scores */}
        <div className="grid gap-4">
          <ScoreCard title="Task Response" score={evaluation.task_response} />
          <ScoreCard
            title="Coherence & Cohesion"
            score={evaluation.coherence_cohesion}
          />
          <ScoreCard
            title="Lexical Resource"
            score={evaluation.lexical_resource}
          />
          <ScoreCard title="Grammar" score={evaluation.grammar} />
        </div>

        {/* Overall Feedback */}
        <Card>
          <CardHeader className="p-4">
            <CardTitle>Overall Feedback</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="whitespace-pre-line text-sm text-muted-foreground">
              {evaluation.overall_feedback}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
