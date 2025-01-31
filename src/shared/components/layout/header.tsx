"use client";

import FluidTabs from "@/shared/components/animata/card/fluid-tabs";
import AppLink from "@/shared/components/common/app-link";
import { Button } from "@/shared/components/ui/button";
import { HomeIcon, InfoIcon, ContactIcon, PawPrint } from "lucide-react";

const Header = () => {
  const tabs = [
    {
      id: "home",
      label: "Writing Agent",
      icon: <HomeIcon className="size-4" />,
      href: "/writing-agent"
    },
    {
      id: "about",
      label: "Giới thiệu",
      icon: <InfoIcon className="size-4" />,
      href: "/about"
    },
    {
      id: "services",
      label: "Dịch vụ",
      icon: <ContactIcon className="size-4" />,
      href: "/services"
    },
    {
      id: "contact",
      label: "Liên hệ",
      icon: <ContactIcon className="size-4" />,
      href: "/contact"
    }
  ];

  return (
    <header className=" z-50 w-full bg-background/80 shadow-sm backdrop-blur-md">
      <div className="container mx-auto">
        <nav className="flex h-16 items-center justify-between px-4 lg:px-8">
          {/* Logo - Left */}
          <div className="shrink-0">
            <AppLink
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <PawPrint className="size-8 text-primary" />
              <span className="bg-gradient-to-b from-primary to-primary-foreground bg-clip-text text-2xl font-bold text-transparent">
                Weebuns AI
              </span>
            </AppLink>
          </div>

          {/* Tabs - Center */}
          <div className="mx-auto flex max-w-xl flex-1 justify-center px-4">
            <FluidTabs tabs={tabs} />
          </div>

          {/* Buttons - Right */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="font-medium transition-colors hover:text-primary"
            >
              Sign Up
            </Button>
            <Button
              className="bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Sign In
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
