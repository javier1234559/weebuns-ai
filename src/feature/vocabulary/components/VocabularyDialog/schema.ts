import { z } from "zod";

export const vocabularyDialogSchema = z.object({
  term: z.string().min(1, "Term is required"),
  meaning: z.array(z.string()).min(1, "At least one meaning is required"),
  exampleSentence: z.string().optional(),
  imageUrl: z.string().optional(),
  referenceLink: z.string().optional(),
  referenceName: z.string().optional(),
  repetitionLevel: z.number().min(0).max(6).default(0),
});


export const vocabularyDefaultValues = {
  term: "Hello",
  meaning: ["Xin chào", "Chào hỏi", "Chào bạn"],
  exampleSentence: "Hello, how are you?",
  imageUrl: "",
  referenceLink: "",
  referenceName: "",
  repetitionLevel: 0,
}