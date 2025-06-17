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
    "<p>Some people believe that being a workaholic is harmful, while others think it can have some positive effects. In my opinion, although working too much can be unhealthy, there are certain benefits that come with being highly dedicated to work.</p>",
  body1:
    "<p>The main negative effect of workaholism is poor health and personal life. People who spend too much time working often do not get enough rest or sleep. This can lead to stress, burnout, and even serious health problems. In addition, they may not have enough time for family, friends, or hobbies, which can hurt their relationships and overall happiness.</p>",
  body2:
    "<p>On the other hand, workaholism can lead to success and personal growth. People who are very focused on their jobs often achieve more in their careers. They may get promoted faster, earn higher salaries, and gain more respect from others. Also, working hard can help them learn new skills, become more disciplined, and build a strong work ethic, which are useful in many areas of life.</p>",
  conclusion:
    "<p>In conclusion, workaholism has both positive and negative sides. While it can harm health and relationships, it can also bring career success and personal development. If a person can manage their time and take care of themselves, the positive effects of hard work can be enjoyed without suffering from the downsides.</p>",
};
