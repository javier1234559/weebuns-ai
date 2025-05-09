import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { ReadingDetailView } from "@/feature/reading/views/ReadingDetailView";
import { PageProps } from "@/types/global";
import CommentSystemView from "@/feature/comment/views/CommentSystemView";

export default function ReadingPageDetail({ params }: PageProps) {
  const { id } = params;
  const breadcrumb = [
    { title: "Home", href: RouteNames.Home },
    { title: "Bài học", href: RouteNames.Lesson },
    { title: "Reading", href: RouteNames.Reading },
    { title: `Chi tiết bài đọc`, href: "" },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="w-full p-4">
        <ReadingDetailView id={id} />
      </div>

      <div className="mx-2 my-10 rounded-xl bg-card p-4 md:mx-0">
        <CommentSystemView identifierId={`reading-detail-${id}`} />
      </div>
    </div>
  );
}
