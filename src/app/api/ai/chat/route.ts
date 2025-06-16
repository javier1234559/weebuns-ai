import { streamText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.AI_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, topic, content, teacherPrompt } = await req.json();
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
        Hướng dẫn từ giáo viên: "${teacherPrompt}"
        Hãy tuân thủ nghiêm ngặt các hướng dẫn và yêu cầu của giáo viên ở trên.
        Topic: "${topic}"
        User draft: "${content}"

        IMPORTANT:
        Luôn trả lời và giải thích bằng "tiếng Việt" trừ những ý về tiếng Anh.
        Tập trung đúng nhu cầu người học và các yêu cầu cụ thể từ giáo viên.
        Nếu giáo viên có đưa ra các quy tắc hay yêu cầu đặc biệt, hãy ưu tiên tuân thủ các yêu cầu đó.
        Nếu người học hỏi ngoài phạm vi bài viết, hãy vẫn hỗ trợ tận tình theo đúng tinh thần giúp học viết tốt hơn, nhưng vẫn trong khuôn khổ các quy tắc của giáo viên đề ra.`,
      },
      ...messages,
    ],
  });

  return response.toDataStreamResponse();
}
