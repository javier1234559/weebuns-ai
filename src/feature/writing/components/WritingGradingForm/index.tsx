import { WritingSubmission } from "@/services/swagger-types";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Highlighter, Save, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  defaultValues,
  writingGradingFormSchema,
  WritingGradingFormValues,
} from "./schema";
import { GradingCriteriaForm } from "./GradingCriteriaForm";
import { ContentGradingForm } from "./ContentGradingForm";
import { FeedbackCorrectionsForm } from "./FeedbackCorrectionsForm";
import { OverallFeedbackForm } from "./OverallFeedbackForm";
import { Form } from "@/components/ui/form";
import { v4 as uuidv4 } from "uuid";

interface WritingGradingFormProps {
  initialData?: WritingSubmission;
  onSubmit: (data: WritingGradingFormValues) => void;
  isLoading: boolean;
}

export default function WritingGradingForm({
  initialData,
  onSubmit,
  isLoading,
}: WritingGradingFormProps) {
  const [selectionMode, setSelectionMode] = useState(false);
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
          instruction:
            initialData?.content?.user_data?.instruction ||
            defaultValues.content.user_data.instruction,
          body1:
            initialData?.content?.user_data?.body1 ||
            defaultValues.content.user_data.body1,
          body2:
            initialData?.content?.user_data?.body2 ||
            defaultValues.content.user_data.body2,
          conclusion:
            initialData?.content?.user_data?.conclusion ||
            defaultValues.content.user_data.conclusion,
        },
        lesson_id:
          initialData?.content?.lesson_id || defaultValues.content.lesson_id,
        chat_history:
          initialData?.content?.chat_history ||
          defaultValues.content.chat_history,
      },
      gradingCriteria: {
        overall_score:
          initialData?.feedback?.overall_score ||
          defaultValues.gradingCriteria.overall_score,
        task_response:
          initialData?.feedback?.task_response ||
          defaultValues.gradingCriteria.task_response,
        coherence_cohesion:
          initialData?.feedback?.coherence_cohesion ||
          defaultValues.gradingCriteria.coherence_cohesion,
        lexical_resource:
          initialData?.feedback?.lexical_resource ||
          defaultValues.gradingCriteria.lexical_resource,
        grammar:
          initialData?.feedback?.grammar ||
          defaultValues.gradingCriteria.grammar,
      },
      corrections:
        initialData?.feedback?.corrections.map((c) => ({
          ...c,
          position: Number(c.position),
        })) || defaultValues.corrections,
      overallFeedback:
        initialData?.feedback?.overall_feedback ||
        defaultValues.overallFeedback,
    },
  });

  const handleAddCorrection = (
    correction: Omit<WritingGradingFormValues["corrections"][0], "id">,
  ) => {
    const corrections = form.getValues("corrections");
    form.setValue("corrections", [
      ...corrections,
      { ...correction, id: uuidv4() },
    ]);
    setSelectedText(null);
  };

  const handleEditCorrection = (
    id: string,
    correction: Partial<WritingGradingFormValues["corrections"][0]>,
  ) => {
    const corrections = form.getValues("corrections");
    form.setValue(
      "corrections",
      corrections.map((c) => (c.id === id ? { ...c, ...correction } : c)),
    );
  };

  const handleDeleteCorrection = (id: string) => {
    const corrections = form.getValues("corrections");
    form.setValue(
      "corrections",
      corrections.filter((c) => c.id !== id),
    );
  };

  const handleSubmit = (data: WritingGradingFormValues) => {
    onSubmit({
      ...initialData,
      ...data,
    });
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full flex-col"
        >
          <div className="flex w-full flex-col gap-4 md:flex-row">
            {/* Left side - Essay and scored criteria */}
            <div className="w-full space-y-4 md:w-3/5">
              <Card className="shadow-sm">
                <CardContent className="pt-4">
                  <ContentGradingForm
                    selectionMode={selectionMode}
                    onSelectionChange={setSelectedText}
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
            <div className="w-full md:w-2/5">
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

                    <TabsContent value="corrections" className="space-y-4">
                      <FeedbackCorrectionsForm
                        selectedText={selectedText}
                        onAddCorrection={handleAddCorrection}
                        onEditCorrection={handleEditCorrection}
                        onDeleteCorrection={handleDeleteCorrection}
                        onFocusCorrection={setFocusedCorrectionId}
                        focusedCorrectionId={focusedCorrectionId}
                      />
                    </TabsContent>

                    <TabsContent value="feedback">
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
