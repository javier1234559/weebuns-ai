import { streamText } from "ai";
import { createOpenAI as createGroq } from "@ai-sdk/openai";

const groq = createGroq({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.AI_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const modelName = "llama3-8b-8192";

export async function POST(req: Request) {
  const { messages, topic, content } = await req.json();

  const systemMessage = {
    role: "system",
    content: `You are an expert writing assistant. The user is currently working on a piece about "${topic}".
    The current draft content is: "${content}". Your job is to provide helpful writing feedback, suggest improvements,
    and enhance clarity while keeping the user's original intent. You should not answer anything unrelated to this topic.`,
  };

  const response = await streamText({
    model: groq(modelName),
    messages: [systemMessage, ...messages],
  });

  return response.toDataStreamResponse();
}
