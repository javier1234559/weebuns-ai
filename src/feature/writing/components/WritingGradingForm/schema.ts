import { z } from "zod";

export const userDataSchema = z.object({
  instruction: z.string(),
  body1: z.string(),
  body2: z.string(),
  conclusion: z.string(),
});

export const contentWritingSubmissionSchema = z.object({
  user_data: userDataSchema,
  lesson_id: z.string(),
  chat_history: z.array(
    z.object({
      role: z.string(),
      content: z.string(),
    }),
  ),
});

export const correctionSchema = z.object({
  id: z.string(),
  sentence: z.string(),
  error: z.string(),
  suggestion: z.string(),
  reason: z.string(),
  position: z.number(),
});

export const gradingCriteriaSchema = z.object({
  overall_score: z.number().min(0).max(9),
  task_response: z.number().min(0).max(9),
  coherence_cohesion: z.number().min(0).max(9),
  lexical_resource: z.number().min(0).max(9),
  grammar: z.number().min(0).max(9),
});

export const writingGradingFormSchema = z.object({
  content: contentWritingSubmissionSchema,
  gradingCriteria: gradingCriteriaSchema,
  corrections: z.array(correctionSchema),
  overallFeedback: z.string(),
});

export type UserData = z.infer<typeof userDataSchema>;
export type ContentWritingSubmission = z.infer<
  typeof contentWritingSubmissionSchema
>;
export type Correction = z.infer<typeof correctionSchema>;
export type GradingCriteria = z.infer<typeof gradingCriteriaSchema>;
export type WritingGradingFormValues = z.infer<typeof writingGradingFormSchema>;

export const defaultValues: WritingGradingFormValues = {
  content: {
    user_data: {
      instruction:
        "Relocating for work is common and offers more benefits than challenges.",
      body1:
        "There are some drawbacks when people move for better job opportunities.",
      body2:
        "However, the benefits, especially in career prospects and personal growth, outweigh the negatives.",
      conclusion:
        "Although relocating may cause issues, the personal and professional gains are far more significant.",
    },
    lesson_id: "1",
    chat_history: [],
  },
  gradingCriteria: {
    overall_score: 7,
    task_response: 6,
    coherence_cohesion: 8,
    lexical_resource: 7,
    grammar: 6,
  },
  corrections: [],
  overallFeedback:
    "Bài viết có cấu trúc rõ ràng, có điểm mạnh và điểm yếu. Tuy nhiên, cần cải thiện độ trong sáng và cấu trúc của bài viết.",
};
