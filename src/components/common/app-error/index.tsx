"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { RouteNames } from "@/constraints/route-name";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AppErrorProps {
  error: any;
  message?: string;
  className?: string;
}

export default function AppError({ error, message, className }: AppErrorProps) {
  const router = useRouter();

  useEffect(() => {
    const status = error?.statusCode;
    switch (status) {
      case 404:
        notFound();
      case 403:
        router.push(RouteNames.SignIn);
      case 500:
        notFound();
    }
  }, [error, router]);

  return (
    <Alert variant="destructive" className={className}>
      <AlertDescription>
        {error?.message || message || "Failed to load data"}
      </AlertDescription>
    </Alert>
  );
}
