import { useState, useRef } from "react";

interface UseStreamingChatProps {
  apiUrl: string;
}

export function useStreamingChat({ apiUrl }: UseStreamingChatProps) {
  const [parts, setParts] = useState<string[]>([]);
  const [fullText, setFullText] = useState("");
  const [loading, setLoading] = useState(false);
  const fullResponseRef = useRef("");

  const sendMessage = async (body: any) => {
    setParts([]);
    setFullText("");
    fullResponseRef.current = "";
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...body,
          streaming: true,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      if (!reader) {
        setLoading(false);
        return;
      }

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const decoded = decoder.decode(value, { stream: true });
        buffer += decoded;
        const partsArr = buffer.split("\n\n");
        buffer = partsArr.pop() || "";

        for (const part of partsArr) {
          if (part.startsWith("data: ")) {
            const text = part.replace("data: ", "");

            if (text === "[DONE]") {
              setFullText(fullResponseRef.current);
              setLoading(false);
              return;
            }

            let processedText = text.replace("^\s*", "!&nbsp;");
            fullResponseRef.current += processedText;

            setParts((prevParts) => [...prevParts, processedText]);
          }
        }
      }

      setFullText(fullResponseRef.current);
    } catch (error) {
      console.error("Error in streaming chat:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { parts, fullText, loading, sendMessage };
}
