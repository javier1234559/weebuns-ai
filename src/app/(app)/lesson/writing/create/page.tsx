import WritingAgentLayout from "@/feature/writing/components/WritingAgentLayout";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { RouteNames } from "@/constraints/route-name";

export default function NewWriting() {
  const breadcrumb = [
    { title: "Writing", href: RouteNames.Writing },
    { title: "New Writing", href: RouteNames.WritingCreate },
  ];

  return (
    <div className="container mx-auto mt-10 space-y-6 p-6">
      <div className="w-full py-2 pr-4">
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
