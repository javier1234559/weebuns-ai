import { RouteNames } from "@/constraints/route-name";
import { redirect } from "next/navigation";

export default function LessonPage() {
  redirect(RouteNames.Writing);
}
