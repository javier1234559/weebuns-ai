import TableVocab from "./TableVocab";
import AppError from "@/components/common/app-error";
import { VocabulariesResponse } from "@/services/swagger-types";
import TableVocabSkeleton from "./TableVocabSkeleton";
import EmptyState from "@/components/common/app-empty-state";

interface VocabularyTabContentProps {
  data?: VocabulariesResponse;
  isLoading: boolean;
  error: any;
  onAddNew?: () => void;
}

export default function VocabularyTabContent({
  data,
  isLoading,
  error,
  onAddNew,
}: VocabularyTabContentProps) {
  if (isLoading) {
    return <TableVocabSkeleton />;
  }

  if (error) {
    return <AppError error={error} />;
  }

  if (!data?.data?.length) {
    return (
      <EmptyState
        description="Bạn chưa có từ vựng nào trong danh sách. Hãy thêm từ vựng mới để bắt đầu học!"
        onAction={onAddNew || (() => {})}
        actionText="Thêm từ vựng mới"
      />
    );
  }

  return <TableVocab vocabularies={data.data} />;
}
