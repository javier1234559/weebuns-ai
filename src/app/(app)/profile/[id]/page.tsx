import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { RouteNames } from "@/constraints/route-name";
import ProfileView from "@/feature/user/views/ProfileView";

export default function ProfilePage() {
  const breadcrumb = [{ title: "Hồ sơ", href: RouteNames.Profile }];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-2 w-full p-4">
        <h1 className="text-4xl font-bold">Hồ sơ</h1>
      </div>
      <div className="w-full p-2">
        <ProfileView />
      </div>
    </div>
  );
}
