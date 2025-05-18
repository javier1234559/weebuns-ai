import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ListeningFeedbackDto } from "@/feature/lesson/lesson.type";
import { XCircle } from "lucide-react";
import { CheckCircle } from "lucide-react";

interface ResultListeningData {
  feedback: ListeningFeedbackDto;
}

interface ListeningResultFeedbackProps {
  isResultView: boolean;
  resultListeningData: ResultListeningData | null;
}

export function ListeningResultFeedback({
  isResultView,
  resultListeningData,
}: ListeningResultFeedbackProps) {
  if (!isResultView || !resultListeningData) return null;

  const feedback = resultListeningData.feedback;

  const getFeedbackMessage = (accuracy: number) => {
    if (accuracy >= 90) return "Xuất sắc! Bạn đã làm rất tốt.";
    if (accuracy >= 80) return "Tuyệt vời! Bạn đã hoàn thành tốt bài kiểm tra.";
    if (accuracy >= 70) return "Khá tốt! Tiếp tục cố gắng nhé.";
    if (accuracy >= 60) return "Đạt yêu cầu. Hãy xem lại những câu sai nhé.";
    return "Cần cố gắng hơn. Hãy xem lại bài học và thử lại.";
  };

  return (
    <div className="mx-auto my-8 w-full rounded-md bg-card shadow-lg">
      <Card className="shadow-sm">
        <CardHeader className="py-3 text-center">
          <CardTitle className="mt-4 text-2xl font-bold">
            Kết Quả Bài Kiểm Tra
          </CardTitle>
          <CardDescription className="pt-1 text-center text-muted-foreground">
            {getFeedbackMessage(feedback.accuracy)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex w-full gap-4">
          <div className="flex w-full flex-col gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {feedback.correctAnswers}/{feedback.totalQuestions}
              </div>
              <p className="text-sm text-muted-foreground">
                Số câu trả lời đúng
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Độ chính xác</span>
                <span className="text-sm font-medium">
                  {feedback.accuracy}%
                </span>
              </div>
              <Progress value={feedback.accuracy} className="h-2.5" />
            </div>
          </div>

          <div className="flex w-full flex-col gap-4">
            <div className="flex items-center rounded-lg bg-green-50 p-2 dark:bg-green-950/30">
              <CheckCircle className="mr-2 size-6 text-green-500" />
              <div className="flex items-center">
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  {feedback.correctAnswers}
                </span>
                <span className="ml-1 text-xs text-muted-foreground">
                  Câu đúng
                </span>
              </div>
            </div>
            <div className="flex items-center rounded-lg bg-red-50 p-2 dark:bg-red-950/30">
              <XCircle className="mr-2 size-6 text-red-500" />
              <div className="flex items-center">
                <span className="text-lg font-bold text-red-600 dark:text-red-400">
                  {feedback.incorrectAnswers}
                </span>
                <span className="ml-1 text-xs text-muted-foreground">
                  Câu sai
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
