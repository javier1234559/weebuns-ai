import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { ReadingDetailView } from "@/feature/reading/views/ReadingDetailView";
import { PageProps } from "@/types/global";

export default function ReadingPageDetail({ params }: PageProps) {
  const { id } = params;
  const breadcrumb = [
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
    </div>
  );
}
