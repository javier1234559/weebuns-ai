import WritingAgentLayout from "@/feature/writing/components/WritingAgentLayout";
import AppBreadcrumb from "@/shared/components/common/app-bread-crumb";
import { RouteNames } from "@/shared/constraints/route-name";

export default function NewWriting() {
  const breadcrumb = [
    { title: "Writing", href: RouteNames.WritingAgent },
    { title: "New Writing", href: RouteNames.WritingAgentCreate },
  ];

  return (
    <div className="container mx-auto mt-20 max-w-7xl">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} />
      </div>
      <div className="w-full p-4">
        <h1 className="text-4xl font-bold">New Writing</h1>
      </div>
      <div className="w-full">
        <WritingAgentLayout />
      </div>
    </div>
  );
}
