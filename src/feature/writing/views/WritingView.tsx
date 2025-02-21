"use client";

import AppPagination from "@/components/common/app-pagination";
import SearchInput from "@/components/feature/SearchInput";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LessonGridView } from "@/feature/lesson/components/LessonGridView";
import { LessonNavigation } from "@/feature/lesson/components/LessonNavigation";
import {
  ContainerSidebar,
  LessonSidebarFilter,
} from "@/feature/lesson/components/LessonSidebarContainer";
import { mockIELTSLessons } from "@/feature/lesson/data";
import { WritingGridView } from "@/feature/writing/components/WritingGridView";

const filters: LessonSidebarFilter[] = [
  {
    title: "Nguồn tài liệu Writing",
    items: [
      { label: "Forecast T1/2025", value: "forecast" },
      { label: "Livestream thầy Khoa", value: "livestream" },
      { label: "C10-C19", value: "c10_c19" },
      { label: "Recent Actual Tests", value: "recent_tests" },
    ],
  },
  {
    title: "Dạng đề Writing",
    items: [
      { label: "Task 1 - Graph", value: "task1_graph" },
      { label: "Task 1 - Map", value: "task1_map" },
      { label: "Task 1 - Process", value: "task1_process" },
      { label: "Task 2 - Opinion", value: "task2_opinion" },
      { label: "Task 2 - Discussion", value: "task2_discussion" },
      { label: "Task 2 - Problem Solution", value: "task2_problem" },
    ],
  },
];

export function WritingView() {
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
      {/* Navigation with shadow and rounded corners */}
      <div className="my-2 max-w-3xl">
        <div className="rounded-2xl p-1">
          <LessonNavigation />
        </div>
      </div>
      <div className="rounded-xl border bg-card p-4 shadow-sm md:p-6">
        <div className="prose max-w-none">
          <h1 className="text-xl font-semibold text-foreground">
            Writing Practice
          </h1>
          <p className="text-muted-foreground">
            Select a writing task from the sidebar to begin your practice
            session.
          </p>
        </div>
        <div className="mt-4">
          <WritingGridView lessons={mockIELTSLessons} />
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
