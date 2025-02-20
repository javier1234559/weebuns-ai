"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useVocabularies } from "../hooks/useVocabularyQueries";
import AppPagination from "@/components/common/app-pagination";
import usePagination from "@/hooks/usePagination";
import AppError from "@/components/common/app-error";
import AppLoading from "@/components/common/app-loading/page";
import TableVocab from "@/feature/vocabulary/components/TableVocab";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Plus } from "lucide-react";

function VocabularyManager() {
  const [activeTab, setActiveTab] = useState("all");

  const { search, page, perPage, updateQueryParams } = usePagination({
    defaultPage: 1,
    defaultPerPage: 10,
  });

  const queryParams = useMemo(
    () => ({
      search,
      page,
      perPage,
      ...(activeTab === "review" ? { dueDate: true } : {}),
    }),
    [search, page, perPage, activeTab],
  );

  const { data, isLoading, error } = useVocabularies(queryParams);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Reset pagination when changing tabs
    if (page !== 1) {
      updateQueryParams({ page: 1 });
    }
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage });
  };

  console.log(data);

  // Memoize contentTabs to prevent unnecessary re-renders
  const contentTabs = useMemo(
    () => [
      {
        label: "All",
        value: "all",
        content: <TableVocab vocabularies={data?.data || []} />,
      },
      {
        label: "Due for Review(SRS)",
        value: "review",
        content: <div>Review</div>,
      },
    ],
    [data?.data],
  ); // Only re-create when data.data changes

  if (isLoading) {
    return <AppLoading />;
  }

  if (!data || error) {
    return <AppError error={error} />;
  }

  return (
    <div className="w-full space-y-6">
      <Card className="p-6">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <TabsList className="gap-1 bg-background/50">
              {contentTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex items-center gap-3">
              <div className="relative w-[250px]">
                <Input
                  placeholder="Tìm kiếm từ vựng..."
                  className="h-auto w-full"
                />
              </div>
              <Button variant="outline" size="default">
                <Plus className="size-4" />
                Thêm từ vựng
              </Button>
              <Button variant="default">
                <BookOpen className="size-4" />
                Review
              </Button>
            </div>
          </div>

          {contentTabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-2">
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {data.pagination && (
        <div className="mt-8 flex justify-center">
          <AppPagination
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default VocabularyManager;
