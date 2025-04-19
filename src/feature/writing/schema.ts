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
  instruction: "",
  body1: "",
  body2: "",
  conclusion: "",
};
