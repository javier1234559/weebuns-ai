import WritingTableHistory from "@/feature/writing/components/WritingTableHistory";
import AppBreadcrumb from "@/shared/components/common/app-bread-crumb";
import { RouteNames } from "@/shared/constraints/route-name";

export default function Writing() {
  const breadcrumb = [{ title: "Writing", href: RouteNames.WritingAgent }];

  return (
    <div className="container mx-auto mt-20 max-w-7xl">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="w-full p-4">
        <h1 className="text-4xl font-bold">Writing History</h1>
      </div>
      <div className="w-full p-4">
        <WritingTableHistory />
      </div>
    </div>
  );
}
