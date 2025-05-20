import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { WritingDetailView } from "@/feature/writing/views/WritingDetailView";
import CommentSystemView from "@/feature/comment/views/CommentSystemView";

export default function WritingPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const breadcrumb = [
    { title: "Home", href: RouteNames.Home },
    { title: "Bài học", href: RouteNames.Lesson },
    { title: "Writing", href: RouteNames.Writing },
    { title: `Chi tiết bài viết`, href: RouteNames.WritingDetail },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-2 w-full p-4">
        <h1 className="text-4xl font-bold">Chi tiết bài viết</h1>
      </div>
      <div className="mx-2 w-full py-2 md:mx-auto">
        <WritingDetailView id={id} />
      </div>

      <div className="mx-2 my-10 rounded-xl bg-card p-4 md:mx-0">
        <CommentSystemView identifierId={`writingDetail_${id}`} />
      </div>
    </div>
  );
}
