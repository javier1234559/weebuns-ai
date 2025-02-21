import { LessonBreadcrumb } from "@/feature/lesson/components/LessonBreadcrumb";
import { LessonTitle } from "@/feature/lesson/components/LessonTitle";
import { LessonView } from "@/feature/lesson/views/LessonView";

const configData = {
  title: "Bài Học",
  type: "Luyện tập",
  keywords: ["Bài Học", "Weebuns", "Logical Framework"],
  author: "Weebuns",
  instructions: [
    "1. Luyện IELTS với AI theo phương pháp Logical Framework của Weebuns.",
  ],
};

export const metadata = {
  title: configData.title,
  description: configData.instructions.join("\n"),
  keywords: configData.keywords,
  author: configData.author,
};

export default function LessonPage() {
  return (
    <div className="container mx-auto mt-16">
      <div className="relative mx-2 mb-8 mt-10 rounded-xl bg-card p-4 md:mx-0">
        <div className="mb-2">
          <LessonBreadcrumb />
        </div>

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

      <div className="mx-2 md:mx-0">
        <LessonView />
      </div>
    </div>
  );
}
