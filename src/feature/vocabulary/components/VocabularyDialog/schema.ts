import { z } from "zod";

export const vocabularyDialogSchema = z.object({
  term: z.string().min(1, "Term is required"),
  meaning: z.array(z.string()).min(1, "At least one meaning is required"),
  exampleSentence: z.string().optional(),
  imageUrl: z.string().optional(),
  referenceLink: z.string().optional(),
  referenceName: z.string().optional(),
  tags: z.array(z.string()).default([]),
  repetitionLevel: z.number().min(0).max(6).default(0),
});
