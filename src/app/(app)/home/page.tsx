import NewsFeedSection from "@/feature/home/components/NewsFeedSection";
import { RouteNames } from "@/constraints/route-name";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { TestHistoryTabs } from "@/feature/home/components/TestHistoryTabs";
import { TargetSettingSection } from "@/feature/home/components/TargetSettingSection";
import StreakSection from "@/feature/home/components/StreakSection";

export default function HomePage() {
  const breadcrumb = [{ title: "Trang chủ", href: RouteNames.Home }];

  return (
    <div className="container mx-auto mt-20 space-y-6">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      {/* Newsfeed Section */}
      <div className="w-full px-4">
        <NewsFeedSection />
      </div>

      {/* Test History Section */}
      <div className="w-full px-4">
        <TestHistoryTabs />
      </div>

      {/* Target Setting Section */}
      <div className="w-full px-4">
        <TargetSettingSection />
      </div>

      {/* Streak Section */}
      <div className="w-full px-4">
        <StreakSection />
      </div>
    </div>
  );
}
