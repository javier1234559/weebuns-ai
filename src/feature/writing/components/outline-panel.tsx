import { Button } from "@/shared/components/ui/button";
import { useScrollToBottom } from "@/shared/hooks/useScrollToBottom";
import { useEffect, useState } from "react";

interface Outline {
  id: number;
  points: { title: string; subpoints: string[] }[];
}

interface OutlinePanelProps {
  topic: string;
  content: string;
}

export function OutlinePanel({ topic, content }: OutlinePanelProps) {
  const [history, setHistory] = useState<Outline[]>([]);

  const generateOutline = () => {
    const newOutline = {
      id: Date.now(),
      points: [
        {
          title: "I. Introduction",
          subpoints: ["A. Hook", "B. Background", "C. Thesis"],
        },
        {
          title: "II. Main Point 1",
          subpoints: ["A. Evidence", "B. Analysis"],
        },
        {
          title: "III. Main Point 2",
          subpoints: ["A. Evidence", "B. Analysis"],
        },
        {
          title: "IV. Conclusion",
          subpoints: [
            "A. Restate thesis",
            "B. Summarize main points",
            "C. Closing thought",
          ],
        },
      ],
    };
    setHistory([...history, newOutline]);
  };

  const { ref, scrollToBottom } = useScrollToBottom<HTMLDivElement>();

  useEffect(() => {
    scrollToBottom();
  }, [history, scrollToBottom]);

  return (
    <div className="space-y-4">
      <Button onClick={generateOutline} className="w-full">
        Generate New Outline
      </Button>

      <div
        ref={ref}
        className="flex flex-col gap-4 overflow-y-auto bg-background p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-300"
        style={{ height: "730px" }}
      >
        {history.map((outline, index) => (
          <div key={outline.id} className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Outline {index + 1}</h3>
            {outline.points.map((point, pointIndex) => (
              <div key={pointIndex} className="mb-2">
                <div className="font-medium">{point.title}</div>
                <ul className="list-disc pl-5">
                  {point.subpoints.map((subpoint, subIndex) => (
                    <li key={subIndex} className="text-sm">
                      {subpoint}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
