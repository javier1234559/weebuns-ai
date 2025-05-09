import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { ListeningDetailView } from "@/feature/listening/views/ListeningDetailView";
import CommentSystemView from "@/feature/comment/views/CommentSystemView";

export default function ListeningPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const breadcrumb = [
    { title: "Home", href: RouteNames.Home },
    { title: "Bài học", href: RouteNames.Lesson },
    { title: "Listening", href: RouteNames.Listening },
    { title: `Chi tiết bài nghe`, href: RouteNames.ListeningDetail },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="w-full py-4">
        <ListeningDetailView id={id} />
      </div>

      <div className="mx-2 my-10 rounded-xl bg-card p-4 md:mx-0">
        <CommentSystemView identifierId={`listening-detail-${id}`} />
      </div>
    </div>
  );
}
