import AppBreadcrumb from "@/components/common/app-bread-crumb";
import { RouteNames } from "@/constraints/route-name";
import VocabQuizView from "@/feature/vocabulary/components/VocabQuizView";
export default function ReviewVocabularyPage() {
  const breadcrumb = [
    { title: "Sổ từ vựng", href: RouteNames.MyVocabulary },
    { title: "Review", href: RouteNames.ReviewVocabulary },
  ];

  return (
    <div className="container mx-auto mt-20">
      <div className="w-full px-4 py-2">
        <AppBreadcrumb breadcrumb={breadcrumb} isHiddenBack />
      </div>
      <div className="mb-2 w-full p-4">
        <h1 className="text-4xl font-bold">Review từ vựng</h1>
      </div>
      <div className="w-full p-2">
        <VocabQuizView />
      </div>
    </div>
  );
}
