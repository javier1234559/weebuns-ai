import { AnswerDTO } from "@/services/swagger-types";

export interface QuestionResultDTO {
  id: string;
  question: string;
  right_answer: string;
  answer_list: AnswerDTO[];
  selected_answer: string;
  bookmarked: boolean;
}
