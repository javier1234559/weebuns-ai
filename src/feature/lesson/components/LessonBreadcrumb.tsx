"use client";

import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { RouteNames } from "@/constraints/route-name";
import { lessonPaths } from "@/feature/lesson/lesson.type";
import { usePathname } from "next/navigation";

type BreadcrumbItem = {
  title: string;
  href: RouteNames;
};

export function LessonBreadcrumb() {
  const pathname = usePathname();
  const breadcrumb: BreadcrumbItem[] = [
    { title: "Home", href: RouteNames.Home },
    { title: lessonPaths[RouteNames.Lesson], href: RouteNames.Lesson },
  ];

  if (pathname !== RouteNames.Lesson && pathname in lessonPaths) {
    breadcrumb.push({
      title: lessonPaths[pathname as keyof typeof lessonPaths],
      href: pathname as RouteNames,
    });
  }

  return <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />;
}
