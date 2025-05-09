import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { PageProps } from "@/types/global";
import { ListeningResultView } from "@/feature/listening/views/ListeningResultView";

export default function ListeningResultPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = params;
  const submissionId = searchParams.submissionId as string;

  const breadcrumb = [
    { title: "Home", href: RouteNames.Home },
    { title: "Bài học", href: RouteNames.Lesson },
    { title: "Listening", href: RouteNames.Listening },
    { title: `Kết quả bài nghe`, href: "" },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="w-full p-4">
        <ListeningResultView id={id} submissionId={submissionId} />
      </div>
    </div>
  );
}
