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
          <AlertCircle className="mx-auto size-12 text-red-500" />
        </div>
        <h1 className="mb-2 text-2xl font-semibold text-gray-900">
          Đã xảy ra lỗi!
        </h1>
        <div className="mb-8">
          <p className="mb-4 text-gray-600">
            Đã có vấn đề xảy ra với website. Đây có thể là lỗi tạm thời, vui
            lòng thử lại.
          </p>
          {error.digest && (
            <p className="text-sm text-gray-500">Mã lỗi: {error.digest}</p>
          )}
        </div>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Thử lại
          </button>
          <AppLink
            href="/"
            className="inline-flex items-center rounded-md border border-transparent px-2 py-1 text-base font-medium text-gray-600"
          >
            Trở về trang chủ
          </AppLink>
        </div>
      </div>
    </div>
  );
}
