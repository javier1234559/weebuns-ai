"use client";
import AppLink from "@/components/common/app-link";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="px-4 text-center">
        <div className="mb-4">
          <AlertCircle className="mx-auto size-12 text-destructive" />
        </div>
        <h1 className="mb-2 text-2xl font-semibold text-foreground">
          Đã xảy ra lỗi!
        </h1>
        <div className="mb-8">
          <p className="mb-4 text-muted-foreground">
            Đã có vấn đề xảy ra với website. Đây có thể là lỗi tạm thời, vui
            lòng thử lại.
          </p>
          {error.digest && (
            <p className="text-sm text-muted-foreground">
              Mã lỗi: {error.digest}
            </p>
          )}
        </div>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-flex items-center rounded-md border border-transparent bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Thử lại
          </button>
          <AppLink
            href="/"
            className="inline-flex items-center rounded-md border border-transparent px-2 py-1 text-base font-medium text-muted-foreground"
          >
            Trở về trang chủ
          </AppLink>
        </div>
      </div>
    </div>
  );
}
