import { WritingSubmission } from "@/services/swagger-types";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { writingGradingFormSchema, WritingGradingFormValues } from "./schema";
import { GradingCriteriaForm } from "./GradingCriteriaForm";
import { ContentGradingForm } from "./ContentGradingForm";
import { FeedbackCorrectionsForm } from "./FeedbackCorrectionsForm";
import { OverallFeedbackForm } from "./OverallFeedbackForm";
import { Form } from "@/components/ui/form";

interface WritingGradingFormProps {
  initialData?: WritingSubmission;
}

export default function WritingGradingForm({
  initialData,
}: WritingGradingFormProps) {
  const [selectedText, setSelectedText] = useState<{
    text: string;
    position: number;
  } | null>(null);
  const [focusedCorrectionId, setFocusedCorrectionId] = useState<string>();

  const form = useForm<WritingGradingFormValues>({
    resolver: zodResolver(writingGradingFormSchema),
    defaultValues: {
      content: {
        user_data: {
          instruction: initialData?.content?.user_data?.instruction || "",
          body1: initialData?.content?.user_data?.body1 || "",
          body2: initialData?.content?.user_data?.body2 || "",
          conclusion: initialData?.content?.user_data?.conclusion || "",
        },
        lesson_id: initialData?.content?.lesson_id || "",
        chat_history: initialData?.content?.chat_history || [],
      },
      gradingCriteria: {
        overall_score: initialData?.feedback?.overall_score || 0,
        task_response: initialData?.feedback?.task_response || 0,
        coherence_cohesion: initialData?.feedback?.coherence_cohesion || 0,
        lexical_resource: initialData?.feedback?.lexical_resource || 0,
        grammar: initialData?.feedback?.grammar || 0,
      },
      corrections: initialData?.feedback?.corrections || [],
      overallFeedback: initialData?.feedback?.overall_feedback || "",
    },
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form className="flex w-full flex-col">
          <div className="flex w-full flex-col gap-4 p-4 md:flex-row">
            {/* Left side - Essay and scored criteria */}
            <div className="w-full space-y-4 rounded-lg shadow-lg md:w-3/5">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Student Essay</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ContentGradingForm
                    focusedCorrectionId={focusedCorrectionId}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Grading Criteria</CardTitle>
                </CardHeader>
                <CardContent>
                  <GradingCriteriaForm />
                </CardContent>
              </Card>
            </div>

            {/* Right side - Corrections and feedback */}
            <div className="w-full rounded-lg shadow-lg md:w-2/5">
              <Card className="h-full shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle>Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="corrections" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="corrections">
                        Text Corrections
                      </TabsTrigger>
                      <TabsTrigger value="feedback">
                        Overall Feedback
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent
                      value="corrections"
                      className=" space-y-4 rounded-lg bg-muted p-4"
                    >
                      <FeedbackCorrectionsForm />
                    </TabsContent>

                    <TabsContent
                      value="feedback"
                      className="rounded-lg bg-muted p-4"
                    >
                      <OverallFeedbackForm />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
}
