import { RouteNames } from "@/constraints/route-name";
import { SidebarNav } from "@/feature/auth/components/settings/sidebar-nav";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sidebarNavItems = [
    {
      title: "Thông tin tài khoản",
      href: RouteNames.ME,
    },
    {
      title: "Thông báo",
      href: RouteNames.SettingsNotifications,
    },
    {
      title: "Thanh toán",
      href: RouteNames.SettingsPayment,
    },
  ];
  return (
    <div className="space-y-6 p-10 py-0 md:block ">
      <div className="relative flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="m-0 lg:w-1/6 ">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        {children}
      </div>
    </div>
  );
}
