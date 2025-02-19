"use client";

import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RepetitionLevel } from "@/feature/vocabulary/types/vocabulary";
import ConfirmDialog from "@/components/feature/ConfirmDiaLog";
import { useState } from "react";
import { toast } from "sonner";

interface LevelButtonProps {
  level: number;
  id: string;
  isHideDelete?: boolean;
}

export default function LevelButton({
  id,
  level,
  isHideDelete,
}: LevelButtonProps) {
  // const updateMutation = useUpdateVocabulary();
  // const deleteMutation = useDeleteVocabulary();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // const handleDelete = async () => {
  //   try {
  //     await deleteMutation.mutateAsync(id);
  //     toast.success("Vocabulary deleted successfully");
  //     setShowDeleteDialog(false);
  //   } catch (error: any) {
  //     toast.error(`Failed to delete vocabulary: ${error.message}`);
  //   }
  // };

  // const updateLevel = (newLevel: RepetitionLevel) => {
  //   const originalNextReview = new Date().toISOString();
  //   const nextReview = calculateNextReview(newLevel);
  //   const updateData = {
  //     repetitionLevel: newLevel,
  //     nextReview,
  //   };

  //   // Optimistic update
  //   dispatch(
  //     updateSelectedVocab({
  //       id,
  //       data: updateData,
  //     }),
  //   );

  //   updateMutation.mutate(
  //     {
  //       id,
  //       data: updateData,
  //     },
  //     {
  //       onError: (error: any) => {
  //         // Rollback on error
  //         dispatch(
  //           updateSelectedVocab({
  //             id,
  //             data: {
  //               repetitionLevel: level,
  //               nextReview: originalNextReview,
  //             },
  //           }),
  //         );
  //         toast.error(`Failed to update vocabulary level: ${error.message}`);
  //       },
  //     },
  //   );
  // };

  const updateLevel = (newLevel: RepetitionLevel) => {
    console.log("update", newLevel);
    toast.success("Vocabulary updated successfully Level: " + newLevel);
  };

  const handleDelete = () => {
    console.log("delete");
    toast.success("Vocabulary deleted successfully");
  };

  const levelButton = [
    RepetitionLevel.LEVEL_1,
    RepetitionLevel.LEVEL_2,
    RepetitionLevel.LEVEL_3,
    RepetitionLevel.LEVEL_4,
    RepetitionLevel.LEVEL_5,
  ];

  return (
    <div className="flex items-center gap-1">
      {!isHideDelete && (
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full"
          onClick={() => setShowDeleteDialog(true)}
          // disabled={deleteMutation.isPending}
        >
          <Trash2 className="size-4" />
        </Button>
      )}

      {levelButton.map((num) => (
        <Button
          key={num}
          variant={level === num ? "default" : "ghost"}
          size="icon"
          className="size-8 rounded-full"
          // disabled={updateMutation.isPending}
          onClick={() => updateLevel(num)}
        >
          {num}
        </Button>
      ))}

      <Button
        variant={level === RepetitionLevel.MASTERED ? "default" : "ghost"}
        size="icon"
        className="size-8 rounded-full"
        // disabled={updateMutation.isPending}
        onClick={() => updateLevel(RepetitionLevel.MASTERED)}
      >
        <Check className="size-4" />
      </Button>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onSubmit={handleDelete}
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa từ vựng này không?"
      />
    </div>
  );
}
