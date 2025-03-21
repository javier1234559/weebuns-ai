"use client";

import AppPagination from "@/components/common/app-pagination";
import SearchInput from "@/components/feature/SearchInput";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LessonNavigation } from "@/feature/lesson/components/LessonNavigation";
import {
  ContainerSidebar,
  LessonSidebarFilter,
} from "@/feature/lesson/components/LessonSidebarContainer";
import { mockIELTSLessons } from "@/feature/lesson/data";
import { ReadingGridView } from "@/feature/reading/components/ReadingGridView";

const filters: LessonSidebarFilter[] = [
  {
    title: "Nguồn tài liệu Reading",
    items: [
      { label: "Forecast T1/2025", value: "forecast" },
      { label: "Livestream thầy Khoa", value: "livestream" },
      { label: "C10-C19", value: "c10_c19" },
      { label: "Recent Actual Tests", value: "recent_tests" },
    ],
  },
  {
    title: "Dạng đề Reading",
    items: [
      { label: "Multiple Choice", value: "multiple_choice" },
      { label: "True/False/Not Given", value: "true_false" },
      { label: "Matching Headings", value: "matching_headings" },
      { label: "Summary Completion", value: "summary" },
      { label: "Sentence Completion", value: "sentence" },
      { label: "Short Answer", value: "short_answer" },
    ],
  },
];

export function ReadingView() {
  const handlePageChange = (page: number) => {
    console.log(page);
  };

  return (
    <ContainerSidebar filters={filters}>
      <div className="flex gap-2">
        <SidebarTrigger className="my-2" />
        <div className="flex items-center gap-2">
          <SearchInput />
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
            Reading Practice
          </h1>
          <p className="text-muted-foreground">
            Select a reading task from the sidebar to begin your practice
            session.
          </p>
        </div>
        <div className="mt-4">
          <ReadingGridView lessons={mockIELTSLessons} />
        </div>

        <div className="mt-8 flex justify-end">
          <AppPagination
            currentPage={1}
            totalPages={10}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </ContainerSidebar>
  );
}
