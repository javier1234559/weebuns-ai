import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import ReadingVocabularyView from "./ReadingVocabularyView";
import ReadingNotesView from "./ReadingNotesView";

interface ReadingViewerProps {
  title: string;
  description: string;
  content: string;
  defaultMode?: "vocabulary" | "notes";
  className?: string;
}

const ReadingViewer = ({
  title,
  description,
  content,
  defaultMode = "vocabulary",
  className,
}: ReadingViewerProps) => {
  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="space-y-2 rounded-md bg-card p-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Tabs defaultValue={defaultMode}>
        <TabsList className="grid w-full grid-cols-2 bg-card">
          <TabsTrigger
            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            value="vocabulary"
          >
            Chế độ từ vựng
          </TabsTrigger>
          <TabsTrigger
            className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            value="notes"
          >
            Chế độ ghi chú
          </TabsTrigger>
        </TabsList>

        <TabsContent value="vocabulary" className="mt-4">
          <ReadingVocabularyView
            content={content}
            wordStatuses={{
              the: {
                level: 0,
                isKnown: false,
              },
            }}
          />
        </TabsContent>

        <TabsContent value="notes" className="mt-4">
          <ReadingNotesView content={content} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReadingViewer;
