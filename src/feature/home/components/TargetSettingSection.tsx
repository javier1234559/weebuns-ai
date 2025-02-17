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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<TargetFormData>({
    target_study_duration: 0,
    target_reading: 7,
    target_listening: 7,
    target_writing: 6,
    target_speaking: 6,
    next_exam_date: new Date("2025-03-06T05:07:00.323Z"),
  });

  const calculateOverallScore = () => {
    const scores = [
      data.target_reading,
      data.target_listening,
      data.target_writing,
      data.target_speaking,
    ];
    return (scores.reduce((a, b) => a + b, 0) / 4).toFixed(1);
  };

  const daysUntilExam = () => {
    const today = new Date();
    const diffTime = Math.abs(data.next_exam_date.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleSubmit = (formData: TargetFormData) => {
    setData(formData);
    setIsModalOpen(false);
  };

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
                        {format(data.next_exam_date, "dd/MM/yyyy")}
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
              <ScoreDisplay label="Reading" score={data.target_reading} />
              <ScoreDisplay label="Listening" score={data.target_listening} />
              <ScoreDisplay label="Writing" score={data.target_writing} />
              <ScoreDisplay label="Speaking" score={data.target_speaking} />
            </div>
          </div>
        </CardContent>
      </Card>

      <TargetSettingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={{
          ...data,
          next_exam_date: data.next_exam_date.toISOString(),
        }}
      />
    </>
  );
};
