import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { RouteNames } from "@/constraints/route-name";

export default function ListeningPage() {
  const breadcrumb = [{ title: "Listening", href: RouteNames.Listening }];

  return (
    <div className="container mx-auto mt-10 space-y-6 p-6">
      <div className="w-full py-2 pr-4">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-8 w-full p-4">
        <h1 className="text-4xl font-bold">Listening</h1>
      </div>
      <div className="mx-auto max-w-4xl p-4">Listening</div>
    </div>
  );
}
