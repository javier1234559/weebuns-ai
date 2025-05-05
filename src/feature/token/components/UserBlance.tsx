import React from "react";
import { useWallet } from "../hooks/useToken";
import { Skeleton } from "@/components/ui/skeleton";
import { Wallet } from "lucide-react";

export default function UserBalance() {
  const { data: wallet, isLoading } = useWallet();
  const balance = wallet?.wallet.balance || 0;

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1 shadow-sm">
      <Wallet className="size-4 text-primary" />
      {isLoading ? (
        <Skeleton className="h-5 w-12 bg-muted" />
      ) : (
        <span className="font-medium text-card-foreground">{balance}</span>
      )}
    </div>
  );
}
