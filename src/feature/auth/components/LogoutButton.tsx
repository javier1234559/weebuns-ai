"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/feature/auth/hooks/useLogout";

export default function LogoutButton() {
  const { handleLogout } = useLogout();

  return (
    <Button
      className="bg-red-500 hover:bg-red-600"
      size="sm"
      onClick={handleLogout}
    >
      Đăng xuất
    </Button>
  );
}
