import { SidebarTrigger } from "@/components/ui/sidebar";
import { LessonBreadcrumb } from "@/feature/lesson/components/LessonBreadcrumb";
import { LessonNavigation } from "@/feature/lesson/components/LessonNavigation";
import {
  ContainerSidebar,
  LessonSidebarFilter,
} from "@/feature/lesson/components/LessonSidebarContainer";
import { LessonTitle } from "@/feature/lesson/components/LessonTitle";

const configData = {
  title: "Speaking",
  type: "Luyện tập",
  keywords: ["Speaking", "Weebuns", "Logical Framework"],
  author: "Weebuns",
  instructions: [
    "1. Luyện IELTS Speaking với AI theo phương pháp Logical Framework của Weebuns.",
  ],
};

const filters: LessonSidebarFilter[] = [
  {
    title: "Nguồn tài liệu",
    items: [
      { label: "Forecast T1/2025", value: "forecast" },
      { label: "Livestream thầy Khoa", value: "livestream" },
      { label: "C10-C19", value: "c10_c19" },
      { label: "Recent Actual Tests", value: "recent_tests" },
    ],
  },
  {
    title: "Dạng đề",
    items: [
      { label: "Agree or Disagree", value: "agree_disagree" },
      { label: "Discussion", value: "discussion" },
      { label: "Advantages and Disadvantages", value: "advantages" },
      { label: "Causes, Problems and Solutions", value: "causes" },
      { label: "Two-Part Question", value: "two_part" },
      { label: "Positive or Negative Development", value: "development" },
    ],
  },
];

export const metadata = {
  title: configData.title,
  description: configData.instructions.join("\n"),
  keywords: configData.keywords,
  author: configData.author,
};

export default function LessonSpeakingPage() {
  return (
    <div className="container mx-auto mt-16">
      {/* Header Section with subtle background */}
      <div className="relative mb-8 mt-10 rounded-xl bg-card p-4">
        <div className="mb-2">
          <LessonBreadcrumb />
        </div>

        {/* Title Section with improved visual hierarchy */}
        <div className="mb-6">
          <LessonTitle
            title={configData.title}
            type={configData.type}
            description={configData.instructions.join("\n")}
            tooltipContent={
              <div className="space-y-2">
                {configData.instructions.map((instruction, index) => (
                  <p key={index} className="text-sm">
                    {instruction}
                  </p>
                ))}
              </div>
            }
          />
        </div>
      </div>

      {/* Main Content with improved spacing and visual separation */}
      <div className="px-0">
        <ContainerSidebar filters={filters}>
          <SidebarTrigger className="my-2" />
          {/* Navigation with shadow and rounded corners */}
          <div className="my-2 max-w-3xl">
            <div className="rounded-2xl p-1">
              <LessonNavigation />
            </div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="prose max-w-none">
              <h1 className="text-xl font-semibold text-gray-900">
                IELTS Speaking Practice
              </h1>
              <p className="text-gray-600">
                Select a lesson from the sidebar to begin your practice session.
              </p>
            </div>
          </div>
        </ContainerSidebar>
      </div>
    </div>
  );
}
