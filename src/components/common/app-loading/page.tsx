import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AppLoadingProps {
  className?: string;
}

export default function AppLoading({ className }: AppLoadingProps) {
  return (
    <div
      className={cn("flex h-48 w-full items-center justify-center", className)}
    >
      <Loader2 className="size-8 animate-spin text-primary" />
    </div>
  );
}
