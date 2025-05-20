import { z } from "zod";

export const chatMessageSchema = z.object({
  id: z.string(),
  role: z.enum(["bot", "user"]),
  text: z.string(),
  timestamp: z.string(),
});

export const userDataSchema = z.object({
  instruction: z.string(),
  body1: z.string(),
  body2: z.string(),
  conclusion: z.string(),
});

export const contentWritingSubmissionSchema = z.object({
  user_data: userDataSchema,
  lesson_id: z.string(),
  chat_history: z.array(chatMessageSchema),
});

export type ChatMessageDTO = z.infer<typeof chatMessageSchema>;
export type UserDataDTO = z.infer<typeof userDataSchema>;
export type ContentWritingSubmissionDTO = z.infer<
  typeof contentWritingSubmissionSchema
>;

export const defaultValues: UserDataDTO = {
  instruction:
    "<p>Relocating for work is common and offers more benefits than challenges.</p>",
  body1:
    "<p>There are some drawbacks when people move for better job opportunities.</p>",
  body2:
    "<p>However, the benefits, especially in career prospects and personal growth, outweigh the negatives.</p>",
  conclusion:
    "<p>Although relocating may cause issues, the personal and professional gains are far more significant.</p>",
};
