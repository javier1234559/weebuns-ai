import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import VocabularyTabContent from "@/feature/vocabulary/components/VocabularyTabContent";
import { cn } from "@/lib/utils";
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
  const TABS = [
    {
      label: "Tất cả",
      value: "all",
    },
    {
      label: "Cần ôn tập (SRS)",
      value: "review",
    },
  ];

  return (
    <Tabs
      defaultValue="all"
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full"
    >
      <TabsList className="gap-1 bg-background">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "gap-2 rounded-md px-3 py-1.5 text-sm transition-all",
              "data-[state=active]:bg-card  data-[state=active]:shadow-sm",
              "data-[state=inactive]:text-muted-foreground",
            )}
          >
            {tab.label}
          </TabsTrigger>
        ))}
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
