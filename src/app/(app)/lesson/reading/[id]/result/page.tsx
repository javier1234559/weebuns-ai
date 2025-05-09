import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { ReadingResultView } from "@/feature/reading/views/ReadingResultView";
import { PageProps } from "@/types/global";

export default function ReadingResultPage({ params, searchParams }: PageProps) {
  const { id } = params;
  const submissionId = searchParams.submissionId as string;

  const breadcrumb = [
    { title: "Home", href: RouteNames.Home },
    { title: "Bài học", href: RouteNames.Lesson },
    { title: "Reading", href: RouteNames.Reading },
    { title: `Kết quả bài đọc`, href: "" },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="w-full p-4">
        <ReadingResultView id={id} submissionId={submissionId} />
      </div>
    </div>
  );
}
