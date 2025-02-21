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
import { SpeakingGridView } from "@/feature/speaking/components/SpeakingGridView";

const filters: LessonSidebarFilter[] = [
  {
    title: "Nguồn tài liệu Speaking",
    items: [
      { label: "Forecast T1/2025", value: "forecast" },
      { label: "Livestream thầy Khoa", value: "livestream" },
      { label: "C10-C19", value: "c10_c19" },
      { label: "Recent Actual Tests", value: "recent_tests" },
    ],
  },
  {
    title: "Dạng đề Speaking",
    items: [
      { label: "Part 1 - Introduction", value: "part1" },
      { label: "Part 2 - Cue Card", value: "part2" },
      { label: "Part 3 - Discussion", value: "part3" },
      { label: "Full Test", value: "full_test" },
      { label: "Mock Test", value: "mock_test" },
    ],
  },
];

export function SpeakingView() {
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
            Speaking Practice
          </h1>
          <p className="text-muted-foreground">
            Select a speaking task from the sidebar to begin your practice
            session.
          </p>
        </div>
        <div className="mt-4">
          <SpeakingGridView lessons={mockIELTSLessons} />
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
