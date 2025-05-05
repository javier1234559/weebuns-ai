"use client";

import { usePackages } from "@/feature/token/hooks/useToken";
import TokenPurchaseSection from "../components/TokenPurchaseSection";
import TokenPackageSkeleton from "../components/TokenPackageSkeleton";

export default function TokenPackageView() {
  const { data: packages, isLoading } = usePackages();

  if (isLoading) {
    return <TokenPackageSkeleton />;
  }

  if (!packages) {
    return <div>No packages found</div>;
  }

  return <TokenPurchaseSection packages={packages.packages} />;
}
