"use client";

import FluidTabs from "@/components/animata/card/fluid-tabs";
import AppLink from "@/components/common/app-link";
import ThemeToggle from "@/components/feature/ThemeToggle";
import { Button } from "@/components/ui/button";
import { RouteNames } from "@/constraints/route-name";
import { BookOpenIcon, InfoIcon, ContactIcon, PawPrint } from "lucide-react";
import Link from "next/link";

const Header = () => {
  const tabs = [
    {
      id: "home",
      label: "Writing",
      icon: <BookOpenIcon className="size-4" />,
      href: "/writing-agent",
    },
    {
      id: "speaking",
      label: "Speaking",
      icon: <InfoIcon className="size-4" />,
      href: "/voice-agent",
    },
    {
      id: "blog",
      label: "Blog",
      icon: <BookOpenIcon className="size-4" />,
      href: "/blog",
    },
    {
      id: "about",
      label: "About",
      icon: <InfoIcon className="size-4" />,
      href: "/about",
    },
  ];

  return (
    <header className="w-full bg-transparent shadow-sm">
      <div className="container mx-auto">
        <nav className="flex h-16 items-center justify-between px-4 lg:px-8">
          <div className="shrink-0">
            <AppLink
              href="/"
              className="flex items-center gap-2 transition-opacity hover:opacity-80"
            >
              <PawPrint className="size-8 text-primary" />
              <span className="bg-primary from-primary to-primary-foreground bg-clip-text text-2xl font-bold text-transparent">
                Weebuns AI
              </span>
            </AppLink>
          </div>

          <div className="mx-auto flex max-w-xl flex-1 justify-center px-4">
            <FluidTabs tabs={tabs} />
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href={RouteNames.SignUp}>
              <Button>Sign Up</Button>
            </Link>

            <Link href={RouteNames.SignIn}>
              <Button variant="outline" className="transition-colors">
                Sign In
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
