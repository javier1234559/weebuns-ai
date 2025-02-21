import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";

export default function ListeningPageDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const breadcrumb = [
    { title: "Bài học", href: RouteNames.Lesson },
    { title: "Listening", href: RouteNames.Listening },
    { title: `Bài nghe: ${id}`, href: RouteNames.ListeningDetail },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-2 w-full p-4">
        <h1 className="text-4xl font-bold">Chi tiết bài nghe</h1>
      </div>
      <div className="w-full p-4">
        <h1>Bài nghe {id}</h1>
      </div>
    </div>
  );
}
