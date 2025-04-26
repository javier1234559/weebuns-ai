import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import VocabularyTabContent from "@/feature/vocabulary/components/VocabularyTabContent";
import { VocabulariesResponse } from "@/services/swagger-types";

interface VocabularyTableViewProps {
  data?: VocabulariesResponse;
  isLoading: boolean;
  error: any;
  activeTab: string;
  onTabChange: (value: string) => void;
  onAddNew: () => void;
}

export default function VocabularyTableView({
  data,
  isLoading,
  error,
  activeTab,
  onTabChange,
  onAddNew,
}: VocabularyTableViewProps) {
  return (
    <Tabs
      defaultValue="all"
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full"
    >
      <TabsList className="gap-1 bg-background/50">
        <TabsTrigger
          value="all"
          className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="review"
          className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
        >
          Due for Review(SRS)
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-2">
        <VocabularyTabContent
          data={data}
          isLoading={isLoading}
          error={error}
          onAddNew={onAddNew}
        />
      </TabsContent>
      <TabsContent value="review" className="mt-2">
        <VocabularyTabContent
          data={data}
          isLoading={isLoading}
          error={error}
          onAddNew={onAddNew}
        />
      </TabsContent>
    </Tabs>
  );
}
