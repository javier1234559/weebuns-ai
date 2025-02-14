import { streamText } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.AI_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const modelName = 'llama3-8b-8192';

export async function POST(req: Request) {
  const { messages, context } = await req.json()

  const systemMessage = {
    role: "system",
    content: `You are a friendly ${context || 'conversation partner'}. Keep responses brief and natural.
    Share relevant experiences based on your role. Always end with an open-ended question to continue the conversation.`
  }

  console.log(messages, context)

  const response = await streamText({
    model: groq(modelName),
    messages: [systemMessage, ...messages],
  })

  return response.toDataStreamResponse();
}
