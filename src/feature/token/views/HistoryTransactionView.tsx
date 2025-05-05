"use client";

import { useTransactions } from "@/feature/token/hooks/useToken";
import usePaginationUrl from "@/hooks/usePaginationUrl";
import HistoryTransactionTable from "../components/HistoryTransactionTable";
import HistoryTransactionTableSkeleton from "../components/HistoryTransactionTableSkeleton";
import AppPagination from "@/components/common/app-pagination";

export default function HistoryTransactionView() {
  const { page, perPage, updateQueryParams } = usePaginationUrl();

  const { data: transactions, isLoading } = useTransactions({
    page,
    perPage,
  });

  if (isLoading) {
    return <HistoryTransactionTableSkeleton />;
  }

  if (!transactions) {
    return <div>No transactions found</div>;
  }

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage });
  };

  return (
    <div className="space-y-4">
      <HistoryTransactionTable transactions={transactions.data} />
      <div className="flex items-center justify-center gap-2">
        {transactions?.pagination && (
          <div className="mt-8 flex justify-center">
            <AppPagination
              currentPage={transactions.pagination.currentPage}
              totalPages={transactions.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
