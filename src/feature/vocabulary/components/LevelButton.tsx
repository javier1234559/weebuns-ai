"use client";

import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RepetitionLevel } from "@/feature/vocabulary/types/vocabulary";
import { toast } from "sonner";
import {
  useDeleteVocabulary,
  useUpdateReviewStatus,
} from "@/feature/vocabulary/hooks/useVocabularyQueries";
import { useVocabStore } from "@/feature/vocabulary/store/vocabStore";
import { useConfirmDialog } from "@/components/common/app-confirm-dialog";

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
  const updateMutation = useUpdateReviewStatus();
  const deleteMutation = useDeleteVocabulary();
  const { updateVocab } = useVocabStore();
  const { openConfirmDialog } = useConfirmDialog();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Từ vựng đã được xóa thành công");
    } catch (error: any) {
      toast.error(`Lỗi khi xóa từ vựng: ${error.message}`);
    }
  };

  const handleOpenDeleteDialog = () => {
    openConfirmDialog({
      title: "Xác nhận xóa",
      description: "Bạn có chắc chắn muốn xóa từ vựng này không?",
      onConfirm: handleDelete,
    });
  };

  const updateLevel = (newLevel: RepetitionLevel) => {
    // Update store for quiz feature
    updateVocab({
      id,
      repetitionLevel: newLevel,
    });

    // Make the API call with optimistic updates handled in the hook
    updateMutation.mutate(
      {
        id,
        data: {
          repetitionLevel: newLevel,
        },
      },
      {
        onError: (error: any) => {
          // Revert store on error
          updateVocab({
            id,
            repetitionLevel: level,
          });
          toast.error(`Lỗi khi cập nhật level: ${error.message}`);
        },
      }
    );
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
          onClick={handleOpenDeleteDialog}
          disabled={deleteMutation.isPending}
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
          onClick={() => updateLevel(num)}
        >
          {num}
        </Button>
      ))}

      <Button
        variant={level === RepetitionLevel.MASTERED ? "default" : "ghost"}
        size="icon"
        className="size-8 rounded-full"
        onClick={() => updateLevel(RepetitionLevel.MASTERED)}
      >
        <Check className="size-4" />
      </Button>
    </div>
  );
}
