import { useState, useEffect } from "react";
import { Button } from "@/shared/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

interface Vocabulary {
  id: number;
  word: string;
  definition: string;
  example: string;
}

interface VocabularyPanelProps {
  topic: string;
  content: string;
}

export function VocabularyPanel({ topic, content }: VocabularyPanelProps) {
  const [count, setCount] = useState(5);
  const [recommendations, setRecommendations] = useState<Vocabulary[]>([]);

  useEffect(() => {
    // Simulated API call to get recommendations based on topic and count
    const fetchRecommendations = async () => {
      // In a real application, this would be an API call
      const simulatedResponse = Array(count)
        .fill(0)
        .map((_, i) => ({
          id: i,
          word: `Word${i + 1}`,
          definition: `Definition for Word${i + 1} related to ${topic}`,
          example: `Example sentence using Word${
            i + 1
          } in the context of ${topic}.`,
        }));
      setRecommendations(simulatedResponse);
    };

    if (topic) {
      fetchRecommendations();
    }
  }, [topic, count]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Vocabulary Recommendations</h3>
        <Select
          value={count.toString()}
          onValueChange={(value) => setCount(Number.parseInt(value))}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Count" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="15">15</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full" onClick={() => setRecommendations([])}>
        Refresh Recommendations
      </Button>
      <div
        className="thin-scrollbar flex flex-col gap-2 overflow-y-auto bg-background p-4"
        style={{ height: "660px" }}
      >
        {recommendations.map((item, index) => (
          <div key={index} className="rounded-lg border p-3">
            <div className="font-medium text-primary">{item.word}</div>
            <div className="text-sm text-muted-foreground">
              {item.definition}
            </div>
            <div className="mt-1 text-sm italic">{item.example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
