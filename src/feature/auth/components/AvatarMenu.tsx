"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RouteNames } from "@/constraints/route-name";
import { useLogout } from "@/feature/auth/hooks/useLogout";
import { cn } from "@/lib/utils";
import { LogOut, User, Bell, CreditCard } from "lucide-react";
import Link from "next/link";

interface AvatarMenuProps {
  src: string;
  fallback: string;
  className?: string;
}

const menuItems = [
  {
    label: "Tài khoản",
    href: RouteNames.ME,
    icon: <User className="mr-2 size-4" />,
  },
  {
    label: "Thông báo",
    href: RouteNames.SettingsNotifications,
    icon: <Bell className="mr-2 size-4" />,
  },
  {
    label: "Thanh toán",
    href: RouteNames.SettingsPayment,
    icon: <CreditCard className="mr-2 size-4" />,
  },
];

export default function AvatarMenu({
  src,
  fallback,
  className,
}: AvatarMenuProps) {
  const { handleLogout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar
          className={cn("cursor-pointer shadow-md hover:opacity-80", className)}
        >
          <AvatarImage src={src} alt="avatar" />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="z-[101] w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Tài khoản</p>
            <p className="text-xs leading-none text-muted-foreground">
              Quản lý tài khoản
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className="flex cursor-pointer items-center"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 size-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
