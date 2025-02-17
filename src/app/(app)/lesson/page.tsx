import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { Tabs, TabsTrigger, TabsList } from "@/components/ui/tabs";
import { RouteNames } from "@/constraints/route-name";

export default function LessonPage() {
  const breadcrumb = [{ title: "Bài Học", href: RouteNames.Lesson }];

  const tabs = [
    {
      id: "speaking",
      label: "Nghe",
      href: RouteNames.Speaking,
    },
    {
      id: "reading",
      label: "Đọc",
      href: RouteNames.Reading,
    },
    {
      id: "listening",
      label: "Nghe",
      href: RouteNames.Listening,
    },
    {
      id: "writing",
      label: "Viết",
      href: RouteNames.Writing,
    },
  ];

  return (
    <div className="container mx-auto mt-20 max-w-7xl">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-8 w-full p-4">
        <h1 className="text-4xl font-bold">Bài Học</h1>
      </div>
      <div className="mx-auto max-w-4xl p-4">
        <Tabs defaultValue="speaking">
          <TabsList>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
