import CommentSystemView from "@/feature/comment/views/CommentSystemView";
import { LessonBreadcrumb } from "@/feature/lesson/components/LessonBreadcrumb";
import { LessonTitle } from "@/feature/lesson/components/LessonTitle";
import { ListeningView } from "@/feature/listening/views/ListeningView";

const configData = {
  title: "Listening",
  type: "Luyện tập",
  keywords: ["Listening", "Weebuns", "Logical Framework"],
  author: "Weebuns",
  instructions: [
    "Luyện tập nghe tiếng Anh với các bài tập được tạo bởi đội ngũ giáo viên của Weebuns.",
  ],
};

export const metadata = {
  title: configData.title,
  description: configData.instructions.join("\n"),
  keywords: configData.keywords,
  author: configData.author,
};

export default function ListeningPage() {
  return (
    <div className="container mx-auto mt-16">
      <div className="relative mb-8 mt-10 rounded-xl bg-card p-4">
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

      <div className="px-0">
        <ListeningView />
      </div>

      <div className="mx-2 my-10 rounded-xl bg-card p-4 md:mx-0">
        <CommentSystemView identifierId={"listeningAll"} />
      </div>
    </div>
  );
}
