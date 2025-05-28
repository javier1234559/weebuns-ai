"use client";

import AppPagination from "@/components/common/app-pagination";
import { SearchInput } from "@/components/feature/SearchInput";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LessonNavigation } from "@/feature/lesson/components/LessonNavigation";
import {
  ContainerSidebar,
  LessonSidebarFilter,
} from "@/feature/lesson/components/LessonSidebarContainer";
import { LevelType } from "@/feature/lesson/lesson.type";
import { ListeningGridView } from "@/feature/listening/components/ListeningGridView";
import { useListeningList } from "@/feature/listening/hooks/useListeningClient";
import usePaginationUrl from "@/hooks/usePaginationUrl";
import { LessonType } from "@/services/swagger-types";

import { SkillType } from "@/services/swagger-types";
import { ContentStatus } from "@/services/swagger-types";

const filters: LessonSidebarFilter[] = [
  {
    title: "Chủ đề",
    queryParam: "topic",
    items: [
      { label: "TOEIC", value: "toeic" },
      { label: "IELTS", value: "ielts" },
    ],
  },
  {
    title: "Loại tài liệu",
    queryParam: "lessonType",
    items: [
      { label: "Luyện tập", value: "practice" },
      { label: "Đề thi", value: "test" },
    ],
  },
  {
    title: "Mức độ",
    queryParam: "level",
    items: [
      { label: "Bắt đầu", value: "beginner" },
      { label: "Trung bình", value: "intermediate" },
      { label: "Nâng cao", value: "advanced" },
    ],
  },
];

export function ListeningView() {
  const {
    page,
    perPage,
    searchParam,
    lessonType,
    level,
    search,
    updateQueryParams,
    setSearch,
    topic,
  } = usePaginationUrl();

  const { data, isLoading, error } = useListeningList({
    page,
    perPage,
    ...(searchParam && { search: searchParam }),
    ...(lessonType && { lessonType: lessonType as LessonType }),
    ...(level && { level: level as LevelType }),
    ...(topic && { topic: topic }),
    skill: "listening" as SkillType,
    status: ContentStatus.Published,
  });

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleFilterChange = (
    value: string,
    checked: boolean,
    queryParam: string,
  ) => {
    if (checked) {
      updateQueryParams({
        [queryParam]: value,
        page: 1,
      });
    } else {
      updateQueryParams({
        [queryParam]: undefined,
        page: 1,
      });
    }
  };

  return (
    <ContainerSidebar filters={filters} onFilterChange={handleFilterChange}>
      <div className="flex gap-2">
        <SidebarTrigger className="my-2" />
        <div className="flex items-center gap-2">
          <SearchInput value={search} onChange={handleSearch} />
        </div>
      </div>
      <div className="my-2 max-w-3xl">
        <div className="rounded-2xl p-1">
          <LessonNavigation />
        </div>
      </div>
      <div className="rounded-xl border bg-card p-4 shadow-sm md:p-6">
        <div className="prose max-w-none">
          <h1 className="text-xl font-semibold text-foreground">
            Luyện Đề Nghe Tiếng Anh
          </h1>
          <p className="text-muted-foreground">
            Chọn một bài nghe để bắt đầu phiên luyện tập.
          </p>
        </div>
        <div className="mt-4">
          <ListeningGridView
            lessons={data}
            error={error}
            isLoading={isLoading}
          />
        </div>

        <div className="mt-8 flex justify-end">
          <AppPagination
            currentPage={data?.pagination.currentPage || 1}
            totalPages={data?.pagination.totalPages || 1}
            onPageChange={(newPage) => updateQueryParams({ page: newPage })}
          />
        </div>
      </div>
    </ContainerSidebar>
  );
}
