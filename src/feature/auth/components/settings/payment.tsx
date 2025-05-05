"use client";
import HistoryTransactionView from "@/feature/token/views/HistoryTransactionView";
import TokenPackageView from "@/feature/token/views/TokenPackageView";

export default function PaymentView() {
  return (
    <div className="p-4">
      <div>
        <TokenPackageView />
      </div>
      <div className="mt-4">
        <HistoryTransactionView />
      </div>
    </div>
  );
}
