import Link from "next/link";
import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { Button } from "@/components/ui/button";
import { RouteNames } from "@/constraints/route-name";
import VocabQuizView from "@/feature/vocabulary/components/VocabQuizView";
import { Home } from "lucide-react";

export default function ReviewVocabularyPage() {
  const breadcrumb = [
    { title: "Home", href: RouteNames.Home },
    { title: "Sổ từ vựng", href: RouteNames.MyVocabulary },
    { title: "Review", href: RouteNames.ReviewVocabulary },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-2 flex w-full items-center justify-between p-4">
        <h1 className="text-4xl font-bold">Review từ vựng</h1>
        <Link href={RouteNames.MyVocabulary}>
          <Button variant="outline">
            <Home className="mr-2 size-2" />
            Quay lại trang chủ
          </Button>
        </Link>
      </div>
      <div className="w-full p-2">
        <VocabQuizView />
      </div>
    </div>
  );
}
