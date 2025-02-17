import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { RouteNames } from "@/constraints/route-name";

export default function BlogPage() {
  const breadcrumb = [{ title: "Kiến thức cần thiết", href: RouteNames.Blog }];

  return (
    <div className="container mx-auto mt-20 max-w-7xl">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-8 w-full p-4">
        <h1 className="text-4xl font-bold">Kiến thức cần thiết</h1>
      </div>
    </div>
  );
}
