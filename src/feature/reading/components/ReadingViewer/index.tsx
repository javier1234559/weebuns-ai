import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import ReadingVocabularyView from "./ReadingVocabularyView";
import ReadingNotesView from "./ReadingNotesView";

interface ReadingViewerProps {
  content: string;
  className?: string;
}

const ReadingViewer = ({ content, className }: ReadingViewerProps) => {
  return (
    <div className={cn("w-full space-y-4", className)}>
      <ReadingNotesView content={content} />
    </div>
  );
};

export default ReadingViewer;
