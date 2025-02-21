import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";

export default function ReadingPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const breadcrumb = [
    { title: "Bài học", href: RouteNames.Lesson },
    { title: "Reading", href: RouteNames.Reading },
    { title: `Bài Đọc: ${id}`, href: RouteNames.ReadingDetail },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-2 w-full p-4">
        <h1 className="text-4xl font-bold">Chi tiết bài đọc</h1>
      </div>
      <div className="w-full p-4">
        <h1>Bài đọc {id}</h1>
      </div>
    </div>
  );
}
