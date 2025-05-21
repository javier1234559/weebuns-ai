"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil } from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TargetSettingModal,
  TargetFormData,
} from "@/feature/home/modal/TargetSettingModal";
import { useAuthStore } from "@/store/auth-store";
import { useUpdateStudentProfile } from "@/feature/user/hooks/useUser";
import { toast } from "sonner";

interface ScoreDisplayProps {
  label: string;
  score: number;
}

// Separate Score Display Component
const ScoreDisplay = ({ label, score }: ScoreDisplayProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex flex-col items-center rounded-lg bg-secondary/10 p-3 transition-colors"
  >
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-lg font-semibold">{score.toFixed(1)}</span>
  </motion.div>
);

// Separate Overview Card Component
const OverviewCard = ({
  title,
  content,
  className,
}: {
  title: string;
  content: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`rounded-lg p-4 ${className}`}
  >
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{title}</span>
      {content}
    </div>
  </motion.div>
);

export const TargetSettingSection = () => {
  const { user, setUser } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: updateStudentProfile } = useUpdateStudentProfile();

  const calculateOverallScore = () => {
    if (!user?.studentProfile) return "0.0";
    const scores = [
      user.studentProfile.targetReading ?? 0,
      user.studentProfile.targetListening ?? 0,
      user.studentProfile.targetWriting ?? 0,
      user.studentProfile.targetSpeaking ?? 0,
    ];
    return (scores.reduce((a, b) => a + b, 0) / 4).toFixed(1);
  };

  const daysUntilExam = () => {
    if (!user?.studentProfile?.nextExamDate) return 0;
    const today = new Date();
    const examDate = new Date(user.studentProfile.nextExamDate);
    const diffTime = Math.abs(examDate.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = (formData: TargetFormData) => {
    if (!user?.studentProfile?.id) {
      toast.error("Không tìm thấy thông tin học sinh");
      return;
    }

    updateStudentProfile({
      id: user.id,
      data: {
        targetStudyDuration: formData.target_study_duration,
        targetReading: formData.target_reading,
        targetListening: formData.target_listening,
        targetWriting: formData.target_writing,
        targetSpeaking: formData.target_speaking,
        nextExamDate: formData.next_exam_date,
      },
    }, {
      onSuccess: () => {
        if (user.studentProfile) {
          setUser({
            ...user,
            studentProfile: {
              ...user.studentProfile,
              targetStudyDuration: formData.target_study_duration,
              targetReading: formData.target_reading,
              targetListening: formData.target_listening,
              targetWriting: formData.target_writing,
              targetSpeaking: formData.target_speaking,
              nextExamDate: formData.next_exam_date,
            }
          });
        }
        toast.success("Cập nhật thành công");
      },
      onError: () => {
        toast.error("Cập nhật thất bại");
      },
    });
    setIsModalOpen(false);
  };

  if (!user?.studentProfile) {
    return null;
  }

  const { studentProfile } = user;
  const nextExamDate = studentProfile.nextExamDate ?? new Date().toISOString();

  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-medium">
              Đo lường &quot;sự chăm chỉ&quot; của bạn
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsModalOpen(true)}
            >
              <Pencil className="size-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Score Overview */}
            <div className="grid gap-6 md:grid-cols-2">
              <OverviewCard
                title="Overall score"
                content={
                  <span className="text-3xl font-bold text-primary">
                    {calculateOverallScore()}
                  </span>
                }
                className="bg-primary/10"
              />

              <OverviewCard
                title=""
                content={
                  <div className="flex w-full items-center justify-between">
                    <div>
                      <div className="text-sm text-muted-foreground">
                        Ngày dự thi
                      </div>
                      <div className="text-base font-medium">
                        {format(new Date(nextExamDate), "dd/MM/yyyy")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        Số ngày còn lại
                      </div>
                      <div className="text-base font-medium">
                        {daysUntilExam()} ngày
                      </div>
                    </div>
                  </div>
                }
                className="bg-secondary/10"
              />
            </div>

            {/* Individual Scores */}
            <div className="grid grid-cols-4 gap-3">
              <ScoreDisplay label="Reading" score={studentProfile.targetReading ?? 0} />
              <ScoreDisplay label="Listening" score={studentProfile.targetListening ?? 0} />
              <ScoreDisplay label="Writing" score={studentProfile.targetWriting ?? 0} />
              <ScoreDisplay label="Speaking" score={studentProfile.targetSpeaking ?? 0} />
            </div>
          </div>
        </CardContent>
      </Card>

      <TargetSettingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={{
          target_study_duration: studentProfile.targetStudyDuration ?? 6,
          target_reading: studentProfile.targetReading ?? 6,
          target_listening: studentProfile.targetListening ?? 6,
          target_writing: studentProfile.targetWriting ?? 6,
          target_speaking: studentProfile.targetSpeaking ?? 6,
          next_exam_date: nextExamDate,
        }}
      />
    </>
  );
};
