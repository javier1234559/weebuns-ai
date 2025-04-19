"use client";

import EmptyState from "@/components/common/app-empty-state";
import { useSubmissionList } from "@/feature/lesson/hooks/useSubmissionLessonClient";
import AppError from "@/components/common/app-error";
import { SkillType, SubmissionStatus } from "@/services/swagger-types";
import { RouteNames } from "@/constraints/route-name";
import { useRouter } from "next/navigation";
import usePaginationUrl from "@/hooks/usePaginationUrl";
import AppPagination from "@/components/common/app-pagination";
import { Input } from "@/components/ui/input";
import { LessonCardList } from "@/feature/lesson/components/LessonCardList";
import { Skeleton } from "@/components/ui/skeleton";

interface SubmissionLessonHistoryViewProps {
  submissionType: SkillType;
  status: SubmissionStatus;
}

export function SubmissionLessonHistoryView({
  submissionType,
  status,
}: SubmissionLessonHistoryViewProps) {
  const router = useRouter();
  const { page, perPage, searchParam, updateQueryParams, setSearch, search } =
    usePaginationUrl();

  const { data, isLoading, error } = useSubmissionList({
    page,
    perPage,
    ...(searchParam && { search: searchParam }),
    ...(submissionType && { submissionType: submissionType as SkillType }),
    ...(status && { status: status as SubmissionStatus }),
  });

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleStartExercise = () => {
    switch (submissionType) {
      case SkillType.Writing:
        router.push(RouteNames.Writing);
        break;
      case SkillType.Reading:
        router.push(RouteNames.Reading);
        break;
      case SkillType.Listening:
        router.push(RouteNames.Listening);
        break;
      case SkillType.Speaking:
        router.push(RouteNames.Speaking);
        break;
      default:
        break;
    }
  };

  if (error) {
    return <AppError error={error} />;
  }

  if (data?.data.length === 0 && !isLoading) {
    return (
      <div>
        <div className="my-4 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <Input
            placeholder="Search by title..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ width: "300px" }}
          />
        </div>

        <EmptyState
          description="Bạn hiện chưa làm bài tập nào! Hãy chọn dạng phù hợp và luyện tập ngay nào!"
          onAction={handleStartExercise}
          actionText="Tiến hành làm bài tập ngay"
        />

        <div className="mt-8 flex justify-end">
          <AppPagination
            currentPage={1}
            totalPages={1}
            onPageChange={(newPage) => updateQueryParams({ page: newPage })}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="my-4 flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <Input
          placeholder="Search by title..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: "300px" }}
        />
      </div>

      {/* Content area with conditional rendering */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-3 sm:flex-row sm:items-center"
            >
              <Skeleton className="h-16 w-24 shrink-0 rounded-md" />
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-16" />
                </div>
                <Skeleton className="h-5 w-3/4" />
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <Skeleton className="size-8 self-end sm:self-center" />
            </div>
          ))}
        </div>
      ) : (
        <LessonCardList data={data?.data ?? []} />
      )}

      <div className="mt-8 flex justify-end">
        <AppPagination
          currentPage={data?.pagination.currentPage || 1}
          totalPages={data?.pagination.totalPages || 1}
          onPageChange={(newPage) => updateQueryParams({ page: newPage })}
        />
      </div>
    </div>
  );
}
