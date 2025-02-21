import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { SpeakingDetailView } from "@/feature/speaking/views/SpeakingDetailView";

export default function SpeakingPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const breadcrumb = [
    { title: "Bài học", href: RouteNames.Lesson },
    { title: "Speaking", href: RouteNames.Speaking },
    { title: `Bài nói: ${id}`, href: RouteNames.SpeakingDetail },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-2 w-full p-4">
        <h1 className="text-4xl font-bold">Chi tiết Speaking</h1>
      </div>
      <div className="w-full">
        <SpeakingDetailView id={id} />
      </div>
    </div>
  );
}
