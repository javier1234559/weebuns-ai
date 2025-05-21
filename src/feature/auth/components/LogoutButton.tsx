"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/feature/auth/hooks/useLogout";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className }: LogoutButtonProps) {
  const { handleLogout } = useLogout();

  return (
    <Button
      className={cn("bg-red-500 hover:bg-red-600", className)}
      size="sm"
      onClick={handleLogout}
    >
      Đăng xuất
    </Button>
  );
}
