import { useState, useRef, useCallback } from "react";

export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

interface UseStreamingChatWithHistoryProps {
  apiUrl: string;
  initialMessages?: ChatMessage[];
}

export function useStreamingChatWithHistory({
  apiUrl,
  initialMessages = [],
}: UseStreamingChatWithHistoryProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [streamingParts, setParts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const assistantBufRef = useRef("");

  const sendMessage = useCallback(
    async ({
      content,
      extraBody = {},
    }: {
      content: string;
      extraBody?: Record<string, any>;
    }) => {
      const userMsg: ChatMessage = { role: "user", content: content };
      setMessages((prev) => [...prev, userMsg]);

      setLoading(true);
      setParts([]);
      assistantBufRef.current = "";

      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...extraBody,
            messages: [...messages, userMsg],
            streaming: true,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const reader = res.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        if (!reader) throw new Error("No readable stream");

        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const raw of lines) {
            const line = raw.trim();
            if (!line) continue;

            const [prefix, payload] = line.split(/:(.+)/); // tách 1 lần
            switch (prefix) {
              case "0": {
                // token text
                let token = "";
                try {
                  token = JSON.parse(payload);
                } catch {
                  token = payload.replace(/^"/, "").replace(/"$/, ""); // bỏ dấu ngoặc kép đầu/cuối
                }
                assistantBufRef.current += token;
                setParts((prev) => [...prev, token]);
                break;
              }
              case "e": {
                // end frame
                const assistantMsg: ChatMessage = {
                  role: "assistant",
                  content: assistantBufRef.current,
                };
                setMessages((prev) => [...prev, assistantMsg]);
                setLoading(false);
                return;
              }
              case "f": {
                // frame metadata
                break;
              }
              default:
                break;
            }
          }
        }
      } catch (err) {
        console.error("useStreamingChatWithHistory:", err);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, messages],
  );

  return {
    messages,
    setMessages,
    streamingParts,
    loading,
    sendMessage,
    fullText: assistantBufRef.current,
  };
}
