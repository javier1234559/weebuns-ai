import EmptyState from "@/components/common/app-empty-state";
import { RouteNames } from "@/constraints/route-name";
import { useRouter } from "next/navigation";

export function ReadingContentView() {
  const router = useRouter();
  const handleStartExercise = () => {
    router.push(RouteNames.Reading);
  };

  return (
    <EmptyState
      description="Bạn hiện chưa làm bài tập nào! Hãy chọn dạng phù hợp và luyện tập ngay nào!"
      onAction={handleStartExercise}
      actionText="Tiến hành làm bài tập ngay"
    />
  );
}
