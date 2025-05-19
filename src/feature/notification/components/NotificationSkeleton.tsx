import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BellRing } from "lucide-react";

export default function NotificationSkeleton() {
  return (
    <Card className="md:aspect-none relative aspect-square w-full sm:aspect-video md:w-1/3">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-2">
          <BellRing className="size-4 text-gray-500" />
          <h2 className="font-medium">Trung tâm thông báo</h2>
        </div>
        <Skeleton className="size-8 rounded-full" />
      </div>
      <CardContent className="thin-scrollbar max-h-[224px] overflow-y-auto rounded-lg p-1">
        <div className="divide-y">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-start gap-3 p-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
