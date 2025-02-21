import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { WritingDetailView } from "@/feature/writing/views/WritingDetailView";

export default function WritingPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const breadcrumb = [
    { title: "Bài viết", href: RouteNames.Writing },
    { title: `Chi tiết bài viết ${id}`, href: RouteNames.WritingDetail },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-2 w-full p-4">
        <h1 className="text-4xl font-bold">Chi tiết bài viết</h1>
      </div>
      <div className="w-full p-4">
        <WritingDetailView id={id} />
      </div>
    </div>
  );
}
