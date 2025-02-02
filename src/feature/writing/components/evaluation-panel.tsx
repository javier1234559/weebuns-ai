import { Button } from "@/shared/components/ui/button";
import { useScrollToBottom } from "@/shared/hooks/useScrollToBottom";
import { useEffect, useState } from "react";

interface Evaluation {
  history: any[];
  onEvaluate: (evaluation: any) => void;
}

interface EvaluationPanelProps {
  topic: string;
  content: string;
}

export function EvaluationPanel({ topic, content }: EvaluationPanelProps) {
  const [history, setHistory] = useState<any[]>([]);

  const evaluateEssay = () => {
    // Simulated essay evaluation
    const newEvaluation = {
      id: Date.now(),
      score: Math.floor(Math.random() * 30) + 70, // Random score between 70 and 100
      feedback: [
        "Good use of topic sentences",
        "Consider adding more supporting evidence",
        "Work on transitions between paragraphs",
      ],
    };
    setHistory([...history, newEvaluation]);
  };

  const { ref, scrollToBottom } = useScrollToBottom<HTMLDivElement>();

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  return (
    <div className="space-y-4">
      <Button onClick={evaluateEssay} className="w-full py-2">
        Evaluate Essay
      </Button>

      <div
        ref={ref}
        className="flex flex-col gap-4 overflow-y-auto bg-background p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-300"
        style={{ height: "730px" }}
      >
        {history.map((evaluation, index) => (
          <div key={evaluation.id} className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Evaluation {index + 1}</h3>
            <div className="mb-2">Score: {evaluation.score}/100</div>
            <ul className="list-disc pl-5">
              {evaluation.feedback.map((point: any, pointIndex: any) => (
                <li key={pointIndex} className="text-sm">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
