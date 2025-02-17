import NewsFeedSection from "@/feature/home/components/NewsFeedSection";
import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { TestHistoryTabs } from "@/feature/home/components/TestHistoryTabs";
import { TargetSettingSection } from "@/feature/home/components/TargetSettingSection";
import StreakSection from "@/feature/home/components/StreakSection";

export default function HomePage() {
  const breadcrumb = [{ title: "Trang chủ", href: RouteNames.Home }];

  return (
    <div className="container mx-auto mt-10 space-y-6 p-6">
      <div className="w-full py-2 pr-4">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      {/* Newsfeed Section */}
      <NewsFeedSection />

      {/* Test History Section */}
      <TestHistoryTabs />

      {/* Target Setting Section */}
      <TargetSettingSection />

      {/* Streak Section */}
      <StreakSection />
    </div>
  );
}
