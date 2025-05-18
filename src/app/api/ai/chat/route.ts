import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.AI_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, topic, content } = await req.json();
  console.log(messages, topic, content);

  const response = await streamText({
    model: groq("llama3-8b-8192"),
    messages: [
      {
        role: "system",
        content: `Bạn là một trợ lý IELTS Writing thân thiện và chuyên nghiệp, luôn hỗ trợ người học viết tốt hơn.
        Bạn có thể:
        - Gợi ý ý tưởng, ví dụ, dàn ý cho topic
        - Giải thích từ vựng, cụm từ, cấu trúc ngữ pháp
        - Đề xuất từ đồng nghĩa, tránh lặp từ
        - Đánh giá bài viết nếu có
        - Gợi ý cách diễn đạt tự nhiên, nâng cao
        Nếu người học hỏi ngoài phạm vi bài viết, hãy vẫn hỗ trợ tận tình theo đúng tinh thần giúp học viết tốt hơn.
        Topic: "${topic}"
        User draft: "${content}"
        Luôn trả lời và giải thích bằng "tiếng Việt" trừ những ý về tiếng Anh, tập trung đúng nhu cầu người học.`

      },
      ...messages,
    ],
  });

  return response.toDataStreamResponse();
}
