"use client";

import FluidTabs from "@/components/animata/card/fluid-tabs";
import { RouteNames } from "@/constraints/route-name";
import {
  BookIcon,
  BookOpenIcon,
  HeadphonesIcon,
  PenLineIcon,
} from "lucide-react";

const tabs = [
  {
    id: "writing",
    label: "Viết",
    href: RouteNames.Writing,
    icon: <PenLineIcon className="size-4" />,
  },
  {
    id: "speaking",
    label: "Nói",
    href: RouteNames.Speaking,
    icon: <BookOpenIcon className="size-4" />,
  },
  {
    id: "reading",
    label: "Đọc",
    href: RouteNames.Reading,
    icon: <BookIcon className="size-4" />,
  },
  {
    id: "listening",
    label: "Nghe",
    href: RouteNames.Listening,
    icon: <HeadphonesIcon className="size-4" />,
  },
];

export function LessonNavigation() {
  return (
    <div className="rounded-full bg-card shadow-lg">
      <FluidTabs tabs={tabs} />
    </div>
  );
}
