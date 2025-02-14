import AppLink from "@/shared/components/common/app-link";

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="px-4 text-center">
        <h1 className="mb-4 text-6xl font-bold text-gray-500">404</h1>
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-700">
            Không tìm thấy trang
          </h2>
          <p className="mb-4 text-gray-600">
            Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          </p>
        </div>
        <AppLink
          href="/"
          className="inline-flex items-center rounded-md border border-transparent px-2 py-1 text-base font-medium text-gray-600"
        >
          Trở về trang chủ
        </AppLink>
      </div>
    </div>
  );
}
