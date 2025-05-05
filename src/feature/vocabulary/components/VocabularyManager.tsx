"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  useVocabularies,
  useCreateVocabulary,
} from "../hooks/useVocabularyQueries";
import AppPagination from "@/components/common/app-pagination";
import usePaginationUrl from "@/hooks/usePaginationUrl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Plus } from "lucide-react";
import VocabularyTableView from "./VocabularyTableView";
import VocabularyDialog from "./VocabularyDialog";
import { vocabularyDialogSchema } from "./VocabularyDialog/schema";
import { z } from "zod";
import { toast } from "sonner";
import { RouteNames } from "@/constraints/route-name";
import { useRouter } from "next/navigation";

function VocabularyManager() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const createVocabulary = useCreateVocabulary();

  const { search, searchParam, page, perPage, updateQueryParams, setSearch } =
    usePaginationUrl({
      defaultPage: 1,
      defaultPerPage: 10,
    });

  const queryParams = {
    ...(searchParam ? { search: searchParam } : {}),
    page,
    perPage,
    ...(activeTab === "review" ? { dueDate: true } : {}),
  };

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

  const handleAddNew = () => {
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: z.infer<typeof vocabularyDialogSchema>) => {
    createVocabulary.mutate(data, {
      onSuccess: () => {
        setIsDialogOpen(false);
        toast.success("Từ vựng đã được thêm thành công");
      },
      onError: (error) => {
        toast.error("Lỗi khi thêm từ vựng");
        console.error(error);
      },
    });
  };

  const handleNavigateToReview = () => {
    router.push(RouteNames.ReviewVocabulary);
  };

  return (
    <div className="w-full space-y-6">
      <Card className="p-6">
        <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center gap-3">
            <div className="relative w-[250px]">
              <Input
                value={search}
                placeholder="Tìm kiếm từ vựng..."
                className="h-auto w-full"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button variant="outline" size="default" onClick={handleAddNew}>
              <Plus className="size-4" />
              Thêm từ vựng
            </Button>
            <Button variant="default" onClick={handleNavigateToReview}>
              <BookOpen className="size-4" />
              Review
            </Button>
          </div>
        </div>

        <VocabularyTableView
          data={data}
          isLoading={isLoading}
          error={error}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onAddNew={handleAddNew}
        />

        {data?.pagination && (
          <div className="mt-8 flex justify-center">
            <AppPagination
              currentPage={data.pagination.currentPage}
              totalPages={data.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </Card>

      <VocabularyDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default VocabularyManager;
