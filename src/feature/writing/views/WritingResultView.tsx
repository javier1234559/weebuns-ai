"use client";

import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import { useWritingSubmissionDetail } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import WritingSubmittedAndFeedBack from "@/feature/writing/components/WritingSubmittedAndFeedBack";

interface WritingResultViewProps {
  id: string;
  submissionId: string;
}

export function WritingResultView({
  id,
  submissionId,
}: WritingResultViewProps) {
  console.log("id", id);
  console.log("submissionId", submissionId);

  const { data, isLoading, error } = useWritingSubmissionDetail(submissionId);

  if (isLoading) {
    return <AppLoading />;
  }

  data.data.feedback = {
    overall_score: 60,
    task_response: 70,
    coherence_cohesion: 50,
    lexical_resource: 40,
    grammar: 30,
    corrections: [
      {
        id: "uuid1",
        sentence:
          "It has become more common for people to relocate to a new city or country for work.",
        error: "Lack of clear thesis statement",
        suggestion: "Introduce the topic with a clear thesis statement",
        reason: "The essay lacks a clear direction and focus",
      },
      {
        id: "uuid2",
        sentence:
          "Although this trend may present certain challenges, I believe the resultant benefits far outweigh them.",
        error: "Vague language",
        suggestion: "Use specific examples to support the argument",
        reason: "The language used is too general and lacks concrete evidence",
      },
    ],
    overall_feedback:
      "The essay lacks a clear direction and focus. The language used is too general and lacks concrete evidence. The writer should introduce the topic with a clear thesis statement and use specific examples to support the argument.",
  };

  if (error || !data || !data.data.content || !data.data.feedback) {
    return <AppError error={error} />;
  }

  return (
    <WritingSubmittedAndFeedBack
      userData={data?.data.content?.user_data}
      essayExample={data?.exampleEssay}
      feedback={data?.data.feedback}
    />
  );
}
