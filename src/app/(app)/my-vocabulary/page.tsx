import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { Button } from "@/components/ui/button";
import { RouteNames } from "@/constraints/route-name";
import VocabularyManager from "@/feature/vocabulary/components/VocabularyManager";
import { Plus } from "lucide-react";

export default function MyVocabularyPage() {
  const breadcrumb = [{ title: "Sổ từ vựng", href: RouteNames.MyVocabulary }];

  return (
    <div className="container mx-auto mt-20 max-w-7xl">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-2 w-full p-4">
        <h1 className="text-4xl font-bold">Sổ từ vựng</h1>
      </div>
      <div className="w-full p-2">
        <VocabularyManager />
      </div>
    </div>
  );
}
