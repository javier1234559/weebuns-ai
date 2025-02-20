"use client";

import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { RouteNames } from "@/constraints/route-name";
import { usePathname } from "next/navigation";
import { lessonPaths } from "../constants/routes";

type BreadcrumbItem = {
  title: string;
  href: RouteNames;
};

export function LessonBreadcrumb() {
  const pathname = usePathname();
  const breadcrumb: BreadcrumbItem[] = [
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
