import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";

interface Example {
  id: number;
  text: string;
}

interface ExamplesPanelProps {
  topic: string;
  content: string;
}

export function ExamplesPanel({ topic, content }: ExamplesPanelProps) {
  const [example, setExample] = useState<Example | null>(null);

  const generateExample = useCallback(() => {
    // Simulated example generation
    setExample({
      id: Date.now(),
      text: `This is an example paragraph related to "${topic}". It demonstrates good writing practices and relevant content to the given topic.`,
    });
  }, [topic]);

  const { ref, scrollToBottom } = useScrollToBottom<HTMLDivElement>();

  useEffect(() => {
    if (topic) {
      generateExample();
    }
  }, [topic, generateExample]);

  useEffect(() => {
    scrollToBottom();
  }, [example, scrollToBottom]);

  return (
    <div className="space-y-4">
      <Button onClick={generateExample} className="w-full">
        Generate New Example
      </Button>

      <div
        ref={ref}
        className="flex flex-col gap-4 overflow-y-auto bg-background p-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-400 hover:scrollbar-thumb-gray-300"
        style={{ height: "730px" }}
      >
        {example && (
          <div className="rounded-lg border p-4">
            <h3 className="mb-2 font-semibold">Example</h3>
            <p className="text-sm">{example.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
