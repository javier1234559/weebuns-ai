import { RouteNames } from "@/constraints/route-name";
import SettingLayout from "@/feature/auth/components/settings/layout";
import AppBreadcrumb from "@/components/common/app-bread-crumb";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breadcrumb = [{ title: "Cài đặt", href: RouteNames.Settings }];

  return (
    <div className="container mx-auto mt-24 space-y-6">
      <div className="w-full px-10">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
        <h1 className="mt-4 text-2xl font-bold">Cài đặt</h1>
      </div>
      <div className="w-full py-2">
        <SettingLayout>{children}</SettingLayout>
      </div>
    </div>
  );
}
