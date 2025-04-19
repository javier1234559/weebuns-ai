import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { PageProps } from "@/types/global";
import { WritingResultView } from "@/feature/writing/views/WritingResultView";

export default function WritingResultPage({ params, searchParams }: PageProps) {
  const { id } = params;
  const submissionId = searchParams.submissionId as string;

  const breadcrumb = [
    { title: "Bài học", href: RouteNames.Lesson },
    { title: "Writing", href: RouteNames.Writing },
    { title: `Kết quả bài viết`, href: "" },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="w-full p-4">
        <WritingResultView id={id} submissionId={submissionId} />
      </div>
    </div>
  );
}
