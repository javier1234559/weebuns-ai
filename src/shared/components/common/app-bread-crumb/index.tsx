"use client";

import { ChevronLeft } from "lucide-react";
import { memo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/shared/components/ui/button";

interface AppBreadcrumbProps {
  breadcrumb: { title: string; href?: string }[];
  isHiddenBack?: boolean;
  className?: string;
}

function AppBreadcrumb({
  breadcrumb,
  isHiddenBack,
  className,
}: AppBreadcrumbProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={`mb-2 ${className}`}>
      <div className="flex justify-between items-center w-full">
        <nav className="flex">
          {breadcrumb.map((item, index) => (
            <span key={`${item.title}-${index}`}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground text-sm md:text-base underline"
                >
                  {item.title}
                </Link>
              ) : (
                <span className="text-muted-foreground text-sm md:text-base">
                  {item.title}
                </span>
              )}
              {index < breadcrumb.length - 1 && (
                <span className="mx-2 text-muted-foreground">/</span>
              )}
            </span>
          ))}
        </nav>
        {!isHiddenBack && (
          <Button onClick={handleGoBack} className="justify-self-end">
            <ChevronLeft className="w-4 h-4 mr-1" />
            <span className="hidden lg:inline">Back</span>
          </Button>
        )}
      </div>
    </div>
  );
}

AppBreadcrumb.displayName = "AppBreadcrumb";

export default memo(AppBreadcrumb);
