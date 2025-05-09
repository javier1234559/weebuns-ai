import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { PageProps } from "@/types/global";
import { SpeakingResultView } from "@/feature/speaking/views/SpeakingResultView";

export default function SpeakingResultPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = params;
  const submissionId = searchParams.submissionId as string;

  const breadcrumb = [
    { title: "Home", href: RouteNames.Home },
    { title: "Bài học", href: RouteNames.Lesson },
    { title: "Speaking", href: RouteNames.Speaking },
    { title: `Lịch sử bài nói`, href: "" },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="w-full p-4">
        <SpeakingResultView id={id} submissionId={submissionId} />
      </div>
    </div>
  );
}
